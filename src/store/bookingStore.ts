import {create} from 'zustand';
import {immer} from 'zustand/middleware/immer';
import {bookingApi, agentApi} from '@services/api';
import type {Booking, BookingAddOn, Location, JobRequest, LiveConvoy} from '@appTypes/index';

interface BookingDraft {
  type: Booking['type'];
  pickup: Location | null;
  dropoff: Location | null;
  start_time: string;
  duration_hours: number;
  selected_add_ons: string[];
  payment_method: Booking['payment_method'];
  region: string;
  notes: string;
  estimated_price: number | null;
}

interface BookingState {
  bookings: Booking[];
  activeBooking: Booking | null;
  liveConvoy: LiveConvoy | null;
  draft: BookingDraft;
  availableAddOns: BookingAddOn[];
  jobRequests: JobRequest[];
  isLoading: boolean;
  error: string | null;
}

interface BookingActions {
  loadBookings: () => Promise<void>;
  loadActiveBooking: (id: string) => Promise<void>;
  updateDraft: (updates: Partial<BookingDraft>) => void;
  resetDraft: () => void;
  estimatePrice: () => Promise<void>;
  confirmBooking: () => Promise<Booking>;
  cancelBooking: (id: string) => Promise<void>;
  loadAddOns: (region: string) => Promise<void>;
  setLiveConvoy: (convoy: LiveConvoy | null) => void;
  // Agent actions
  loadJobRequests: () => Promise<void>;
  acceptJob: (jobId: string) => Promise<void>;
  declineJob: (jobId: string, reason?: string) => Promise<void>;
  clearError: () => void;
}

const defaultDraft: BookingDraft = {
  type: 'timeslot',
  pickup: null,
  dropoff: null,
  start_time: '',
  duration_hours: 4,
  selected_add_ons: [],
  payment_method: 'card',
  region: 'AE',
  notes: '',
  estimated_price: null,
};

export const useBookingStore = create<BookingState & BookingActions>()(
  immer((set, get) => ({
    bookings: [],
    activeBooking: null,
    liveConvoy: null,
    draft: {...defaultDraft},
    availableAddOns: [],
    jobRequests: [],
    isLoading: false,
    error: null,

    loadBookings: async () => {
      set(s => {s.isLoading = true;});
      try {
        const {data} = await bookingApi.list();
        set(s => {s.bookings = data.bookings;});
      } catch (e: unknown) {
        set(s => {s.error = e instanceof Error ? e.message : 'Failed to load bookings';});
      } finally {
        set(s => {s.isLoading = false;});
      }
    },

    loadActiveBooking: async (id: string) => {
      set(s => {s.isLoading = true;});
      try {
        const {data} = await bookingApi.getById(id);
        set(s => {s.activeBooking = data;});
      } catch (e: unknown) {
        set(s => {s.error = e instanceof Error ? e.message : 'Failed to load booking';});
      } finally {
        set(s => {s.isLoading = false;});
      }
    },

    updateDraft: (updates: Partial<BookingDraft>) =>
      set(s => {Object.assign(s.draft, updates);}),

    resetDraft: () =>
      set(s => {s.draft = {...defaultDraft};}),

    estimatePrice: async () => {
      const {draft} = get();
      if (!draft.pickup) return;
      try {
        const {data} = await bookingApi.estimatePrice({
          type: draft.type,
          duration_hours: draft.duration_hours,
          add_ons: draft.selected_add_ons,
          region: draft.region,
        });
        set(s => {s.draft.estimated_price = data.total;});
      } catch {
        // Silently fail price estimate
      }
    },

    confirmBooking: async () => {
      const {draft} = get();
      if (!draft.pickup) throw new Error('Pickup location required');
      set(s => {s.isLoading = true; s.error = null;});
      try {
        const {data} = await bookingApi.create({
          type: draft.type,
          pickup: draft.pickup,
          dropoff: draft.dropoff ?? undefined,
          start_time: draft.start_time,
          duration_hours: draft.duration_hours,
          add_ons: draft.selected_add_ons,
          payment_method: draft.payment_method,
          region: draft.region,
          notes: draft.notes,
        });
        set(s => {s.bookings.unshift(data.booking);});
        return data.booking;
      } catch (e: unknown) {
        set(s => {s.error = e instanceof Error ? e.message : 'Booking failed';});
        throw e;
      } finally {
        set(s => {s.isLoading = false;});
      }
    },

    cancelBooking: async (id: string) => {
      await bookingApi.cancel(id);
      set(s => {
        const booking = s.bookings.find(b => b.id === id);
        if (booking) booking.status = 'cancelled';
      });
    },

    loadAddOns: async (region: string) => {
      const {data} = await bookingApi.getAddOns(region);
      set(s => {s.availableAddOns = data;});
    },

    setLiveConvoy: (convoy: LiveConvoy | null) =>
      set(s => {s.liveConvoy = convoy;}),

    loadJobRequests: async () => {
      set(s => {s.isLoading = true;});
      try {
        const {data} = await agentApi.getJobRequests();
        set(s => {s.jobRequests = data;});
      } catch (e: unknown) {
        set(s => {s.error = e instanceof Error ? e.message : 'Failed to load jobs';});
      } finally {
        set(s => {s.isLoading = false;});
      }
    },

    acceptJob: async (jobId: string) => {
      await agentApi.acceptJob(jobId);
      set(s => {
        const job = s.jobRequests.find(j => j.id === jobId);
        if (job) job.status = 'accepted';
      });
    },

    declineJob: async (jobId: string, reason?: string) => {
      await agentApi.declineJob(jobId, reason);
      set(s => {
        const job = s.jobRequests.find(j => j.id === jobId);
        if (job) job.status = 'declined';
      });
    },

    clearError: () => set(s => {s.error = null;}),
  })),
);
