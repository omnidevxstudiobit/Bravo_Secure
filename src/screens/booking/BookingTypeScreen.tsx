import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Colors} from '@theme/index';
import {useBookingStore} from '@store/bookingStore';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import type {BookingStackParamList} from '@navigation/types';

type Nav = NativeStackNavigationProp<BookingStackParamList>;

/**
 * Booking Type — Transfer (A→B) or Time Slot (4-24h protection)
 */
export default function BookingTypeScreen() {
  const {draft, updateDraft} = useBookingStore();
  const navigation = useNavigation<Nav>();

  return (
    <View style={styles.container}>
      {/*
        TODO: Design implementation
        - "Select Booking Type" header
        - Card: Transfer
            Icon + "Airport / Point-to-Point Transfer"
            "A to B, minimum 3h lead time"
            Selects dropoff location after choosing this
        - Card: Time Slot
            Icon + "Timed Protection"
            "4-24 hours of dedicated protection"
        - Selected card: blue highlight border
        - "Next" button → BookingDetails
      */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: Colors.background},
});
