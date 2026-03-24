import React, {useEffect} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {Colors} from '@theme/index';
import {useBookingStore} from '@store/bookingStore';
import {useAuthStore} from '@store/authStore';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import type {BookingStackParamList} from '@navigation/types';

type Nav = NativeStackNavigationProp<BookingStackParamList>;

/**
 * Booking Home — entry point for Bravo Secure booking
 * Shows: active/recent bookings, "Book Now" CTA, Bravo Pro shortcut
 */
export default function BookingHomeScreen() {
  const {bookings, loadBookings} = useBookingStore();
  const {user} = useAuthStore();
  const navigation = useNavigation<Nav>();

  useEffect(() => {
    loadBookings();
  }, [loadBookings]);

  const activeBooking = bookings.find(b =>
    ['confirmed', 'en_route', 'active'].includes(b.status),
  );

  return (
    <ScrollView style={styles.container}>
      {/*
        TODO: Design implementation
        - Header: "Bravo Secure" + region selector (flag icon)
        - Active booking card with "Track" button → LiveTracking
        - "Book Now" hero CTA card with location preview map
        - Bravo Pro section (if tier === 'pro' or corporate user)
        - Recent bookings list
        - "How it works" section for new users
      */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});
