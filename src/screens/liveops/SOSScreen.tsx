import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Vibration,
  Alert,
  TouchableOpacity,
  Animated,
  Pressable,
} from 'react-native';
import {Colors} from '@theme/index';
import {supabase} from '@services/supabase';
import {REALTIME_CHANNELS} from '@utils/constants';
import type {BookingScreenProps} from '@navigation/types';

type Props = BookingScreenProps<'SOSScreen'>;

const HOLD_DURATION = 3000;

/**
 * SOS Screen — emergency distress signal
 * Broadcasts location + alert to Ops Room via Supabase Realtime
 * Requires 3-second hold to confirm (prevent accidental triggers)
 */
export default function SOSScreen({route, navigation}: Props) {
  const {bookingId} = route.params;
  const [isActivated, setIsActivated] = useState(false);
  const progressAnim = useRef(new Animated.Value(0)).current;
  const holdAnimation = useRef<Animated.CompositeAnimation | null>(null);

  const activateSOS = async () => {
    Vibration.vibrate([0, 500, 200, 500]);
    setIsActivated(true);

    await supabase.channel(REALTIME_CHANNELS.sos(bookingId)).send({
      type: 'broadcast',
      event: 'sos',
      payload: {booking_id: bookingId, timestamp: new Date().toISOString()},
    });

    Alert.alert(
      'SOS Activated',
      'Your distress signal has been sent to the Operations Room. Stay calm — help is on the way.',
      [{text: 'OK', onPress: () => navigation.goBack()}],
    );
  };

  const handlePressIn = () => {
    holdAnimation.current = Animated.timing(progressAnim, {
      toValue: 1,
      duration: HOLD_DURATION,
      useNativeDriver: false,
    });
    holdAnimation.current.start(({finished}) => {
      if (finished) {
        activateSOS();
      }
    });
  };

  const handlePressOut = () => {
    holdAnimation.current?.stop();
    Animated.timing(progressAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const ringScale = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.4],
  });
  const ringOpacity = progressAnim.interpolate({
    inputRange: [0, 0.1, 1],
    outputRange: [0, 0.6, 1],
  });

  if (isActivated) {
    return (
      <View style={styles.activatedContainer}>
        <Text style={styles.activatedTitle}>SOS SENT</Text>
        <Text style={styles.activatedSubtitle}>Ops Room Notified</Text>
        <Text style={styles.activatedInfo}>Stay calm — help is on the way</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
        <Text style={styles.cancelText}>Cancel</Text>
      </TouchableOpacity>

      <Text style={styles.title}>EMERGENCY SOS</Text>
      <Text style={styles.subtitle}>Hold for 3 seconds to activate</Text>

      <View style={styles.sosButtonWrapper}>
        <Animated.View
          style={[
            styles.progressRing,
            {transform: [{scale: ringScale}], opacity: ringOpacity},
          ]}
        />
        <Pressable
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          style={styles.sosButton}>
          <Text style={styles.sosLabel}>SOS</Text>
        </Pressable>
      </View>

      <TouchableOpacity style={styles.emergencyButton}>
        <Text style={styles.emergencyText}>Call Emergency Services</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activatedContainer: {
    flex: 1,
    backgroundColor: Colors.sosRed,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButton: {
    position: 'absolute',
    top: 56,
    left: 24,
    padding: 8,
  },
  cancelText: {
    color: Colors.textPrimary,
    fontSize: 16,
  },
  title: {
    color: Colors.sosRed,
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: 4,
    marginBottom: 8,
  },
  subtitle: {
    color: Colors.textSecondary,
    fontSize: 14,
    marginBottom: 60,
  },
  sosButtonWrapper: {
    width: 200,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 60,
  },
  progressRing: {
    position: 'absolute',
    width: 190,
    height: 190,
    borderRadius: 95,
    borderWidth: 3,
    borderColor: Colors.sosRed,
  },
  sosButton: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: Colors.sosRed,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.sosRed,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.6,
    shadowRadius: 20,
    elevation: 10,
  },
  sosLabel: {
    color: '#FFFFFF',
    fontSize: 36,
    fontWeight: '900',
    letterSpacing: 2,
  },
  emergencyButton: {
    borderWidth: 1,
    borderColor: Colors.danger,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  emergencyText: {
    color: Colors.danger,
    fontSize: 14,
    fontWeight: '600',
  },
  activatedTitle: {
    color: '#FFFFFF',
    fontSize: 48,
    fontWeight: '900',
    letterSpacing: 6,
    marginBottom: 16,
  },
  activatedSubtitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 8,
  },
  activatedInfo: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 16,
  },
});
