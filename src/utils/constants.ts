export const API_BASE_URL = process.env.API_BASE_URL ?? 'https://api.bravosecure.com';
export const MSG_BASE_URL = process.env.MSG_BASE_URL ?? 'https://msg.bravosecure.com';

export const SUPABASE_URL = process.env.SUPABASE_URL ?? '';
export const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY ?? '';

export const AGORA_APP_ID = process.env.AGORA_APP_ID ?? '';
export const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY ?? '';

// ─── Booking ─────────────────────────────────────────────────────────────────
export const BOOKING_MIN_LEAD_HOURS = 3;
export const BOOKING_MIN_DURATION_HOURS = 4;
export const BOOKING_MAX_DURATION_HOURS = 24;

// ─── Regions ─────────────────────────────────────────────────────────────────
export const SUPPORTED_REGIONS = [
  {code: 'AE', label: 'UAE', currency: 'AED'},
  {code: 'GB', label: 'United Kingdom', currency: 'GBP'},
  {code: 'ZA', label: 'South Africa', currency: 'ZAR'},
  {code: 'US', label: 'United States', currency: 'USD'},
] as const;

// ─── User Roles ──────────────────────────────────────────────────────────────
export const USER_ROLE_LABELS = {
  individual: 'Individual Client',
  corporate: 'Corporate Client',
  agent: 'Security Agent / CPO',
  ops: 'Operations Room',
} as const;

// ─── Message Self-Destruct Intervals ─────────────────────────────────────────
export const SELF_DESTRUCT_OPTIONS = [
  {label: 'Off', value: null},
  {label: '1 minute', value: 60},
  {label: '5 minutes', value: 300},
  {label: '1 hour', value: 3600},
  {label: '24 hours', value: 86400},
  {label: '7 days', value: 604800},
] as const;

// ─── Storage Buckets ─────────────────────────────────────────────────────────
export const STORAGE_BUCKETS = {
  avatars: 'avatars',
  vault: 'secure-vault',
  kyc: 'kyc-documents',
  itineraries: 'itineraries',
} as const;

// ─── Realtime Channels ───────────────────────────────────────────────────────
export const REALTIME_CHANNELS = {
  liveTracking: (bookingId: string) => `live:${bookingId}`,
  sos: (bookingId: string) => `sos:${bookingId}`,
  jobRequests: (agentId: string) => `jobs:${agentId}`,
  bookingStatus: (bookingId: string) => `booking:${bookingId}`,
} as const;
