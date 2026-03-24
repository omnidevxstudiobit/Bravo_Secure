import React, {useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  StatusBar,
  Dimensions,
} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {LinearGradient} from 'expo-linear-gradient';
import type {AuthScreenProps} from '@navigation/types';

const {width, height} = Dimensions.get('window');

// ─── Brand colours (local — no theme dependency for splash) ──────────────────
const GOLD = '#2563EB';
const BG = '#0A0A0A';

type Props = AuthScreenProps<'Splash'>;

export default function SplashScreen({navigation}: Props) {
  // ─── Animation refs ────────────────────────────────────────────────────────
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const logoScale = useRef(new Animated.Value(0.85)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;
  const taglineOpacity = useRef(new Animated.Value(0)).current;
  const versionOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Sequence: logo fades in → wordmark → tagline → version → navigate
    Animated.sequence([
      // Logo: fade + scale up
      Animated.parallel([
        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.spring(logoScale, {
          toValue: 1,
          tension: 60,
          friction: 8,
          useNativeDriver: true,
        }),
      ]),
      // Wordmark
      Animated.timing(textOpacity, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      // Tagline
      Animated.timing(taglineOpacity, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      // Version
      Animated.timing(versionOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      // Hold before navigating
      Animated.delay(900),
    ]).start(() => {
      navigation.replace('Onboarding');
    });
  }, [
    logoOpacity,
    logoScale,
    navigation,
    taglineOpacity,
    textOpacity,
    versionOpacity,
  ]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={BG} />

      {/* Subtle top gradient overlay */}
      <LinearGradient
        colors={['rgba(201,167,74,0.08)', 'transparent']}
        style={styles.gradientOverlay}
        pointerEvents="none"
      />

      {/* Center content */}
      <View style={styles.center}>
        {/* Shield logo */}
        <Animated.View
          style={[
            styles.logoWrap,
            {opacity: logoOpacity, transform: [{scale: logoScale}]},
          ]}>
          <Svg width={80} height={80} viewBox="0 0 80 80" fill="none">
            {/* Outer shield */}
            <Path
              d="M40 5L10 18.3333V38.3333C10 57.1333 22.8 74.4667 40 78.3333C57.2 74.4667 70 57.1333 70 38.3333V18.3333L40 5Z"
              stroke={GOLD}
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            {/* Inner crosshair / plus mark */}
            <Path
              d="M40 20V60M25 35H55"
              stroke={GOLD}
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity={0.4}
            />
          </Svg>
        </Animated.View>

        {/* Wordmark */}
        <Animated.Text style={[styles.wordmark, {opacity: textOpacity}]}>
          BRAVO SECURE
        </Animated.Text>

        {/* Tagline */}
        <Animated.Text style={[styles.tagline, {opacity: taglineOpacity}]}>
          Security. Reimagined.
        </Animated.Text>
      </View>

      {/* Version footer */}
      <Animated.View style={[styles.footer, {opacity: versionOpacity}]}>
        <Text style={styles.version}>v1.0.0</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: height * 0.5,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 0,
  },
  logoWrap: {
    width: 96,
    height: 96,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 28,
  },
  wordmark: {
    color: '#F1F5F9',
    fontSize: 18,
    fontFamily: 'Manrope',
    fontWeight: '700',
    letterSpacing: 4.5,
    textAlign: 'center',
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  tagline: {
    color: '#94A3B8',
    fontSize: 14,
    fontFamily: 'Manrope',
    fontWeight: '300',
    textAlign: 'center',
    letterSpacing: 0.3,
  },
  footer: {
    position: 'absolute',
    bottom: 48,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  version: {
    color: '#475569',
    fontSize: 11,
    fontFamily: 'Manrope',
    fontWeight: '500',
    letterSpacing: 2,
  },
});
