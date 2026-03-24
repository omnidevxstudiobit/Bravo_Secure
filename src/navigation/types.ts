import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import type {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import type {CompositeScreenProps, NavigatorScreenParams} from '@react-navigation/native';

// ─── Auth Stack ───────────────────────────────────────────────────────────────

export type AuthStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  Login: undefined;
  Register: undefined;
  OTPVerification: {phone: string; mode: 'login' | 'register'};
  RoleSelection: undefined;
};

// ─── Main Bottom Tabs ─────────────────────────────────────────────────────────

export type MainTabParamList = {
  Dashboard: undefined;
  MessengerTab: NavigatorScreenParams<MessengerStackParamList> | undefined;
  SecureTab: NavigatorScreenParams<BookingStackParamList> | NavigatorScreenParams<AgentStackParamList> | undefined;
  NewsTab: undefined;
  ProfileTab: undefined;
};

// ─── Messenger Stack ─────────────────────────────────────────────────────────

export type MessengerStackParamList = {
  MessengerHome: undefined;
  Chat: {conversationId: string; name: string; isGroup: boolean};
  NewChat: undefined;
  GroupInfo: {conversationId: string};
  VaultScreen: undefined;
  CallScreen: {
    conversationId: string;
    callType: 'voice' | 'video';
    isIncoming: boolean;
    remoteUserId?: string;
  };
};

// ─── Booking Stack ───────────────────────────────────────────────────────────

export type BookingStackParamList = {
  BookingHome: undefined;
  ZoneMap: undefined;
  BookingType: undefined;
  BookingDetails: undefined;
  AddOns: undefined;
  Payment: {bookingId?: string};
  BookingConfirmation: {bookingId: string};
  LiveTracking: {bookingId: string};
  SOSScreen: {bookingId: string};
};

// ─── Agent Stack ─────────────────────────────────────────────────────────────

export type AgentStackParamList = {
  AgentDashboard: undefined;
  AgentRegistration: undefined;
  JobMarketplace: undefined;
  JobDetail: {jobId: string};
  Earnings: undefined;
};

// ─── Pro Stack ───────────────────────────────────────────────────────────────

export type ProStackParamList = {
  ProDashboard: undefined;
  ItineraryUpload: undefined;
  ItineraryDetail: {itineraryId: string};
  TripHistory: undefined;
  TripDetail: {bookingId: string};
};

// ─── Root Stack (wraps all) ──────────────────────────────────────────────────

export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
  AgentStack: undefined;
  ProStack: undefined;
};

// ─── Screen prop types ────────────────────────────────────────────────────────

export type AuthScreenProps<T extends keyof AuthStackParamList> = NativeStackScreenProps<
  AuthStackParamList,
  T
>;

export type MessengerScreenProps<T extends keyof MessengerStackParamList> = CompositeScreenProps<
  NativeStackScreenProps<MessengerStackParamList, T>,
  BottomTabScreenProps<MainTabParamList>
>;

export type BookingScreenProps<T extends keyof BookingStackParamList> = CompositeScreenProps<
  NativeStackScreenProps<BookingStackParamList, T>,
  BottomTabScreenProps<MainTabParamList>
>;
