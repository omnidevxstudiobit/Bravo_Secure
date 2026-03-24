/**
 * Vercel API client — api.bravosecure.com
 * All business logic endpoints (booking, matching, AI, payments)
 */
import axios, {AxiosError} from 'axios';
import {API_BASE_URL} from '@utils/constants';
import {supabase} from './supabase';
import type {Booking, BookingAddOn, Location, TripItinerary} from '@appTypes/index';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30_000,
  headers: {'Content-Type': 'application/json'},
});

// Attach Supabase JWT to every request
api.interceptors.request.use(async config => {
  const {data} = await supabase.auth.getSession();
  if (data.session?.access_token) {
    config.headers.Authorization = `Bearer ${data.session.access_token}`;
  }
  return config;
});

// Global error handling
api.interceptors.response.use(
  response => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      supabase.auth.signOut();
    }
    return Promise.reject(error);
  },
);

// ─── Booking API ─────────────────────────────────────────────────────────────

export const bookingApi = {
  create: (data: {
    type: Booking['type'];
    pickup: Location;
    dropoff?: Location;
    start_time: string;
    duration_hours?: number;
    add_ons: string[];
    payment_method: Booking['payment_method'];
    region: string;
    notes?: string;
  }) => api.post<{booking: Booking; client_secret?: string}>('/bookings', data),

  getById: (id: string) => api.get<Booking>(`/bookings/${id}`),

  list: (params?: {status?: Booking['status']; page?: number}) =>
    api.get<{bookings: Booking[]; total: number}>('/bookings', {params}),

  cancel: (id: string) => api.post(`/bookings/${id}/cancel`),

  getAddOns: (region: string) =>
    api.get<BookingAddOn[]>('/bookings/add-ons', {params: {region}}),

  estimatePrice: (data: {
    type: Booking['type'];
    duration_hours?: number;
    add_ons: string[];
    region: string;
  }) => api.post<{total: number; breakdown: Record<string, number>}>('/bookings/estimate', data),
};

// ─── Agent Matching API ──────────────────────────────────────────────────────

export const agentApi = {
  getAvailable: (region: string, start_time: string) =>
    api.get('/agents/available', {params: {region, start_time}}),

  getJobRequests: () => api.get('/agent/jobs'),

  acceptJob: (jobId: string) => api.post(`/agent/jobs/${jobId}/accept`),

  declineJob: (jobId: string, reason?: string) =>
    api.post(`/agent/jobs/${jobId}/decline`, {reason}),

  updateStatus: (status: 'available' | 'busy' | 'offline') =>
    api.put('/agent/status', {status}),

  getEarnings: (params?: {from?: string; to?: string}) =>
    api.get('/agent/earnings', {params}),
};

// ─── AI / Claude API (Edge functions on Vercel) ──────────────────────────────

export const aiApi = {
  parseItinerary: (fileUri: string, mimeType: string) => {
    const formData = new FormData();
    formData.append('file', {uri: fileUri, type: mimeType, name: 'itinerary'} as unknown as Blob);
    return api.post<TripItinerary>('/ai/parse-itinerary', formData, {
      headers: {'Content-Type': 'multipart/form-data'},
    });
  },

  getRiskScore: (location: Location) =>
    api.post<{score: number; reason: string; recommendations: string[]}>('/ai/risk-score', {location}),

  getBookingSuggestions: (location: Location, date: string) =>
    api.post('/ai/booking-suggestions', {location, date}),
};

// ─── News API ────────────────────────────────────────────────────────────────

export const newsApi = {
  getFeed: (params?: {category?: string; region?: string; page?: number}) =>
    api.get('/news/feed', {params}),
};

// ─── Wallet API ──────────────────────────────────────────────────────────────

export const walletApi = {
  getBalance: () => api.get('/wallet/balance'),
  getTransactions: (params?: {page?: number}) => api.get('/wallet/transactions', {params}),
  topUp: (amount: number, currency: string) => api.post('/wallet/topup', {amount, currency}),
};

export default api;
