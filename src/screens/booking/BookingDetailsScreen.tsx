import React, {useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {Colors} from '@theme/index';
import {useBookingStore} from '@store/bookingStore';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import type {BookingStackParamList} from '@navigation/types';

type Nav = NativeStackNavigationProp<BookingStackParamList>;

/**
 * Booking Details — date/time, duration, base package (1 CPO + 1 driver + 1 vehicle)
 */
export default function BookingDetailsScreen() {
  const {draft, updateDraft, estimatePrice} = useBookingStore();
  const navigation = useNavigation<Nav>();

  useEffect(() => {
    estimatePrice();
  }, [draft.duration_hours, draft.type, estimatePrice]);

  return (
    <View style={styles.container}>
      {/*
        TODO: Design implementation
        - Date/time picker row (minimum 3h from now)
        - Duration slider/picker (4h, 8h, 12h, 24h) — only for timeslot
        - Base package summary card: 1 CPO + 1 driver + 1 standard vehicle
        - Live price estimate at bottom
        - "Add Extras" button → AddOns
        - "Proceed" button → Payment (or AddOns)
        - Notes text input (optional)
      */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: Colors.background},
});
