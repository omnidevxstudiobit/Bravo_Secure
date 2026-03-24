import {create} from 'zustand';
import {immer} from 'zustand/middleware/immer';
import {supabase, authService, userService} from '@services/supabase';
import type {User, UserRole} from '@appTypes/index';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

interface AuthActions {
  initialize: () => Promise<void>;
  sendOTP: (phone: string) => Promise<void>;
  verifyOTP: (phone: string, token: string) => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  setRole: (role: UserRole) => Promise<void>;
  updateProfile: (updates: Partial<User>) => Promise<void>;
  signOut: () => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState & AuthActions>()(
  immer((set, get) => ({
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,

    initialize: async () => {
      if (!process.env.SUPABASE_URL) return; // skip if not configured
      set(state => {
        state.isLoading = true;
      });
      try {
        const {data} = await authService.getSession();
        if (data.session?.user) {
          const {data: profile} = await userService.getProfile(data.session.user.id);
          set(state => {
            state.user = profile as User;
            state.isAuthenticated = true;
          });
        }

        // Listen for auth changes
        supabase.auth.onAuthStateChange(async (event, session) => {
          if (event === 'SIGNED_OUT') {
            set(state => {
              state.user = null;
              state.isAuthenticated = false;
            });
          }
          if (event === 'SIGNED_IN' && session?.user) {
            const {data: profile} = await userService.getProfile(session.user.id);
            set(state => {
              state.user = profile as User;
              state.isAuthenticated = true;
            });
          }
        });
      } catch (e) {
        set(state => {
          state.error = 'Failed to restore session';
        });
      } finally {
        set(state => {
          state.isLoading = false;
        });
      }
    },

    sendOTP: async (phone: string) => {
      set(state => {state.isLoading = true; state.error = null;});
      try {
        const {error} = await authService.signInWithPhone(phone);
        if (error) throw error;
      } catch (e: unknown) {
        set(state => {
          state.error = e instanceof Error ? e.message : 'Failed to send OTP';
        });
        throw e;
      } finally {
        set(state => {state.isLoading = false;});
      }
    },

    verifyOTP: async (phone: string, token: string) => {
      set(state => {state.isLoading = true; state.error = null;});
      try {
        const {error} = await authService.verifyOTP(phone, token);
        if (error) throw error;
      } catch (e: unknown) {
        set(state => {
          state.error = e instanceof Error ? e.message : 'Invalid OTP';
        });
        throw e;
      } finally {
        set(state => {state.isLoading = false;});
      }
    },

    signInWithEmail: async (email: string, password: string) => {
      set(state => {state.isLoading = true; state.error = null;});
      try {
        const {error} = await authService.signInWithEmail(email, password);
        if (error) throw error;
      } catch (e: unknown) {
        set(state => {
          state.error = e instanceof Error ? e.message : 'Sign in failed';
        });
        throw e;
      } finally {
        set(state => {state.isLoading = false;});
      }
    },

    setRole: async (role: UserRole) => {
      const {user} = get();
      if (!user) return;
      await userService.updateProfile(user.id, {role});
      set(state => {
        if (state.user) state.user.role = role;
      });
    },

    updateProfile: async (updates: Partial<User>) => {
      const {user} = get();
      if (!user) return;
      await userService.updateProfile(user.id, updates as Record<string, unknown>);
      set(state => {
        if (state.user) Object.assign(state.user, updates);
      });
    },

    signOut: async () => {
      await authService.signOut();
      set(state => {
        state.user = null;
        state.isAuthenticated = false;
      });
    },

    clearError: () =>
      set(state => {
        state.error = null;
      }),
  })),
);
