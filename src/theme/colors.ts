// Bravo Secure — Design Token: Colors
// Dark tactical theme with electric blue accent

export const Colors = {
  // ─── Brand ───────────────────────────────────────────
  primary: '#2563EB',        // Blue — brand accent
  primaryDark: '#1D4ED8',
  primaryLight: '#60A5FA',
  accent: '#2563EB',         // Blue accent
  danger: '#FF3B3B',         // SOS / alerts
  warning: '#FFB800',
  success: '#00C851',

  // ─── Backgrounds ────────────────────────────────────
  background: '#0A0F1E',     // Dark navy
  surface: '#0D1929',        // Card surface
  surfaceElevated: '#112236',
  surfaceBorder: '#1E2D45',

  // ─── Text ───────────────────────────────────────────
  textPrimary: '#F1F5F9',    // slate-100
  textSecondary: '#94A3B8',  // slate-400
  textMuted: '#475569',      // slate-600
  textInverse: '#0A0A0A',

  // ─── Messenger ──────────────────────────────────────
  bubbleOutgoing: '#0066FF',
  bubbleIncoming: '#1A1A26',
  bubbleOutgoingText: '#FFFFFF',
  bubbleIncomingText: '#FFFFFF',

  // ─── Functional ─────────────────────────────────────
  online: '#00C851',
  offline: '#5A5A72',
  away: '#FFB800',
  encrypted: '#00D4FF',

  // ─── Tabs ───────────────────────────────────────────
  tabActive: '#2563EB',
  tabInactive: '#475569',
  tabBar: '#141414',

  // ─── Map ────────────────────────────────────────────
  mapOverlay: 'rgba(10, 10, 15, 0.7)',
  sosRed: '#FF1A1A',

  // ─── Transparent ────────────────────────────────────
  overlay: 'rgba(0, 0, 0, 0.6)',
  overlayLight: 'rgba(0, 0, 0, 0.3)',
} as const;

export type ColorKey = keyof typeof Colors;
