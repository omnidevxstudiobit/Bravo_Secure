// ─── User & Auth ─────────────────────────────────────────────────────────────

export type UserRole = 'individual' | 'corporate' | 'agent' | 'ops';

export interface User {
  id: string;
  phone: string;
  email?: string;
  full_name: string;
  avatar_url?: string;
  role: UserRole;
  is_verified: boolean;
  kyc_status?: 'pending' | 'approved' | 'rejected';
  created_at: string;
}

export interface AuthSession {
  access_token: string;
  refresh_token: string;
  user: User;
}

// ─── Booking ─────────────────────────────────────────────────────────────────

export type BookingType = 'transfer' | 'timeslot';
export type BookingStatus =
  | 'pending'
  | 'ops_review'
  | 'confirmed'
  | 'en_route'
  | 'active'
  | 'completed'
  | 'cancelled';

export type PackageTier = 'lite' | 'pro';
export type PaymentMethod = 'card' | 'bravo_credits' | 'corporate';

export interface Location {
  latitude: number;
  longitude: number;
  address?: string;
  label?: string;
}

export interface BookingAddOn {
  id: string;
  label: string;
  price: number;
  requires_ops_approval: boolean;
  type: 'extra_cpo' | 'armoured_vehicle' | 'surveillance' | 'medic';
}

export interface Booking {
  id: string;
  client_id: string;
  type: BookingType;
  status: BookingStatus;
  tier: PackageTier;
  pickup: Location;
  dropoff?: Location;
  start_time: string;
  end_time?: string;
  duration_hours?: number;
  cpo_count: number;
  vehicle_type: 'standard' | 'armoured' | 'suv';
  add_ons: BookingAddOn[];
  total_price: number;
  payment_method: PaymentMethod;
  region: string;
  notes?: string;
  created_at: string;
}

// ─── Messenger ───────────────────────────────────────────────────────────────

export type MessageType = 'text' | 'image' | 'file' | 'audio' | 'system';
export type MessageStatus = 'sending' | 'sent' | 'delivered' | 'read' | 'failed';

export interface Message {
  id: string;
  conversation_id: string;
  sender_id: string;
  type: MessageType;
  content: string;
  media_url?: string;
  media_mime?: string;
  self_destruct_at?: string;
  status: MessageStatus;
  is_encrypted: boolean;
  created_at: string;
}

export interface Conversation {
  id: string;
  type: 'direct' | 'group' | 'ops_channel';
  name?: string;
  avatar_url?: string;
  participants: string[];
  last_message?: Message;
  unread_count: number;
  is_muted: boolean;
  created_at: string;
}

// ─── Agent ───────────────────────────────────────────────────────────────────

export type AgentStatus = 'available' | 'busy' | 'offline';

export interface Agent {
  id: string;
  user_id: string;
  full_name: string;
  avatar_url?: string;
  rating: number;
  total_jobs: number;
  status: AgentStatus;
  regions: string[];
  specializations: string[];
  vehicle_types: string[];
  kyc_verified: boolean;
  earnings_total: number;
}

export interface JobRequest {
  id: string;
  booking_id: string;
  agent_id?: string;
  status: 'open' | 'accepted' | 'declined' | 'expired';
  expires_at: string;
  payout: number;
  booking: Booking;
}

// ─── Live Operations ──────────────────────────────────────────────────────────

export interface LiveConvoy {
  booking_id: string;
  vehicles: ConvoyVehicle[];
  sos_active: boolean;
  status: 'en_route' | 'on_site' | 'complete';
}

export interface ConvoyVehicle {
  id: string;
  label: string;
  driver_name: string;
  cpo_name: string;
  location: Location;
  heading: number;
  speed: number;
  last_updated: string;
}

// ─── News Feed ───────────────────────────────────────────────────────────────

export interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  source: string;
  source_logo?: string;
  url: string;
  image_url?: string;
  published_at: string;
  category: 'security' | 'geopolitical' | 'general' | 'ad';
  risk_level?: 'low' | 'medium' | 'high';
  region_tags: string[];
}

// ─── Wallet ──────────────────────────────────────────────────────────────────

export interface WalletBalance {
  bravo_credits: number;
  currency: string;
}

export interface Transaction {
  id: string;
  user_id: string;
  type: 'topup' | 'payment' | 'refund' | 'payout';
  amount: number;
  currency: string;
  description: string;
  booking_id?: string;
  created_at: string;
}

// ─── Itinerary / Pro ─────────────────────────────────────────────────────────

export interface ItineraryEvent {
  id: string;
  title: string;
  location: Location;
  start_time: string;
  end_time: string;
  risk_score: number;
  risk_reason?: string;
  security_recommended: boolean;
  booking_id?: string;
}

export interface TripItinerary {
  id: string;
  client_id: string;
  name: string;
  events: ItineraryEvent[];
  created_at: string;
  ai_parsed: boolean;
}
