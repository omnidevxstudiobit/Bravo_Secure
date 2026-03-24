import {createClient} from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SUPABASE_URL, SUPABASE_ANON_KEY} from '@utils/constants';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
  realtime: {
    params: {
      eventsPerSecond: 10,
    },
  },
});

// ─── Auth helpers ─────────────────────────────────────────────────────────────

export const authService = {
  signInWithPhone: (phone: string) =>
    supabase.auth.signInWithOtp({phone}),

  signInWithEmail: (email: string, password: string) =>
    supabase.auth.signInWithPassword({email, password}),

  verifyOTP: (phone: string, token: string) =>
    supabase.auth.verifyOtp({phone, token, type: 'sms'}),

  signOut: () => supabase.auth.signOut(),

  getSession: () => supabase.auth.getSession(),

  onAuthStateChange: (callback: Parameters<typeof supabase.auth.onAuthStateChange>[0]) =>
    supabase.auth.onAuthStateChange(callback),
};

// ─── User helpers ─────────────────────────────────────────────────────────────

export const userService = {
  getProfile: (userId: string) =>
    supabase.from('users').select('*').eq('id', userId).single(),

  updateProfile: (userId: string, updates: Record<string, unknown>) =>
    supabase.from('users').update(updates).eq('id', userId),

  uploadAvatar: async (userId: string, uri: string) => {
    const ext = uri.split('.').pop() ?? 'jpg';
    const path = `${userId}/avatar.${ext}`;
    const response = await fetch(uri);
    const blob = await response.blob();
    return supabase.storage.from('avatars').upload(path, blob, {upsert: true});
  },
};

// ─── Realtime helpers ─────────────────────────────────────────────────────────

export const realtimeService = {
  subscribeToChannel: (channel: string, callback: (payload: unknown) => void) => {
    return supabase
      .channel(channel)
      .on('broadcast', {event: '*'}, callback)
      .subscribe();
  },

  subscribeToTable: <T>(
    table: string,
    filter: string,
    callback: (payload: T) => void,
  ) => {
    return supabase
      .channel(`${table}:${filter}`)
      .on(
        'postgres_changes',
        {event: '*', schema: 'public', table, filter},
        payload => callback(payload as T),
      )
      .subscribe();
  },

  unsubscribe: (channel: ReturnType<typeof supabase.channel>) =>
    supabase.removeChannel(channel),
};
