import {useEffect} from 'react';
import {realtimeService} from '@services/supabase';
import {REALTIME_CHANNELS} from '@utils/constants';
import {useBookingStore} from '@store/bookingStore';
import type {Booking} from '@appTypes/index';

/**
 * Subscribes to real-time booking status updates for a given booking.
 * Use inside LiveTrackingScreen or BookingConfirmationScreen.
 */
export function useBookingRealtime(bookingId: string) {
  const {loadActiveBooking} = useBookingStore();

  useEffect(() => {
    if (!bookingId) return;

    const channel = realtimeService.subscribeToTable<{new: Booking}>(
      'bookings',
      `id=eq.${bookingId}`,
      payload => {
        // Reload booking when status changes
        loadActiveBooking(bookingId);
      },
    );

    return () => {
      realtimeService.unsubscribe(channel);
    };
  }, [bookingId, loadActiveBooking]);
}
