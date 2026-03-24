import React, {useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import {Colors} from '@theme/index';
import {useAuthStore} from '@store/authStore';
import {useBookingStore} from '@store/bookingStore';
import {useNavigation} from '@react-navigation/native';
import type {CompositeNavigationProp} from '@react-navigation/native';
import type {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import type {MainTabParamList, BookingStackParamList} from '@navigation/types';

type DashboardNav = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamList, 'Dashboard'>,
  NativeStackNavigationProp<BookingStackParamList>
>;

/**
 * Main Dashboard — module hub
 * Shows: active booking card, quick-access to Messenger + Secure,
 * risk alerts, and role-based shortcuts (Pro/Agent)
 */
export default function DashboardScreen() {
  const {user} = useAuthStore();
  const {bookings, loadBookings} = useBookingStore();
  const navigation = useNavigation<DashboardNav>();

  useEffect(() => {
    loadBookings();
  }, [loadBookings]);

  const activeBooking = bookings.find(b =>
    ['confirmed', 'en_route', 'active'].includes(b.status),
  );

  const handleSOS = () => {
    if (!activeBooking) {
      return;
    }
    navigation.navigate('SecureTab', {
      screen: 'SOSScreen',
      params: {bookingId: activeBooking.id},
    });
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/*
        TODO: Design implementation
        - Top bar: Bravo Secure logo + notification bell + avatar
        - Greeting: "Good morning, [name]"
        - Active booking banner (if exists) → taps to LiveTracking
        - 2×2 module grid:
            [Bravo Messenger]  [Bravo Secure]
            [Bravo Pro]        [News Intel]
        - Agent-only: "Available Jobs" quick-access card
        - Ops-only: "Ops Room" quick-access card
        - "Coming Soon" locked cards: Equipment, Logistics, Travel, Medical
        - Recent bookings list (last 3)
      */}
      {activeBooking && (
        <TouchableOpacity
          style={styles.sosButton}
          onPress={handleSOS}
          activeOpacity={0.8}>
          <Text style={styles.sosLabel}>SOS</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    paddingBottom: 24,
    flexGrow: 1,
  },
  sosButton: {
    position: 'absolute',
    bottom: 32,
    right: 24,
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: Colors.sosRed,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.sosRed,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.7,
    shadowRadius: 12,
    elevation: 8,
  },
  sosLabel: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 1,
  },
});
