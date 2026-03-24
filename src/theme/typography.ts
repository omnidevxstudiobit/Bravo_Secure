/**
 * Typography — uses Manrope Variable Font
 * After running `npx react-native-asset`, the font is available as 'Manrope'
 * Variable font supports all weights 200-800 via fontWeight alone.
 */

export const FontFamily = 'Manrope';

export const Typography = {
  // ─── Display ─────────────────────────────────────────
  h1: {
    fontFamily: FontFamily,
    fontSize: 32,
    fontWeight: '700' as const,
    lineHeight: 40,
    letterSpacing: -0.5,
  },
  h2: {
    fontFamily: FontFamily,
    fontSize: 24,
    fontWeight: '700' as const,
    lineHeight: 32,
    letterSpacing: -0.3,
  },
  h3: {
    fontFamily: FontFamily,
    fontSize: 20,
    fontWeight: '600' as const,
    lineHeight: 28,
  },
  h4: {
    fontFamily: FontFamily,
    fontSize: 17,
    fontWeight: '600' as const,
    lineHeight: 24,
  },

  // ─── Body ─────────────────────────────────────────────
  bodyLarge: {
    fontFamily: FontFamily,
    fontSize: 17,
    fontWeight: '400' as const,
    lineHeight: 26,
  },
  body: {
    fontFamily: FontFamily,
    fontSize: 15,
    fontWeight: '400' as const,
    lineHeight: 22,
  },
  bodySmall: {
    fontFamily: FontFamily,
    fontSize: 13,
    fontWeight: '400' as const,
    lineHeight: 18,
  },

  // ─── UI ──────────────────────────────────────────────
  label: {
    fontFamily: FontFamily,
    fontSize: 13,
    fontWeight: '500' as const,
    lineHeight: 18,
    letterSpacing: 0.3,
  },
  caption: {
    fontFamily: FontFamily,
    fontSize: 11,
    fontWeight: '400' as const,
    lineHeight: 15,
    letterSpacing: 0.2,
  },
  button: {
    fontFamily: FontFamily,
    fontSize: 16,
    fontWeight: '600' as const,
    lineHeight: 22,
    letterSpacing: 0.2,
  },
  buttonSmall: {
    fontFamily: FontFamily,
    fontSize: 14,
    fontWeight: '600' as const,
    lineHeight: 20,
  },
  overline: {
    fontFamily: FontFamily,
    fontSize: 11,
    fontWeight: '700' as const,
    lineHeight: 15,
    letterSpacing: 3,
    textTransform: 'uppercase' as const,
  },
} as const;
