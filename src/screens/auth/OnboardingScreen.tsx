import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Colors} from '@theme/index';
import type {AuthScreenProps} from '@navigation/types';

type Props = AuthScreenProps<'Onboarding'>;

/**
 * Onboarding — 3-slide intro carousel
 * Slides: 1) Bravo Messenger intro  2) Secure Booking intro  3) Get Started CTA
 */
export default function OnboardingScreen({navigation}: Props) {
  const handleGetStarted = () => navigation.navigate('Login');
  const handleRegister = () => navigation.navigate('Register');

  return (
    <View style={styles.container}>
      {/* TODO: Carousel slides + Get Started / Sign Up buttons */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});
