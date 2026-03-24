import React, {useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {Colors} from '@theme/index';
import {useBookingStore} from '@store/bookingStore';
import {useNavigation} from '@react-navigation/native';
import type {BookingScreenProps} from '@navigation/types';

type Props = BookingScreenProps<'BookingConfirmation'>;

/**
 * Booking Confirmation — success state + track / go home options
 */
export default function BookingConfirmationScreen({route}: Props) {
  const {bookingId} = route.params;
  const {loadActiveBooking, activeBooking} = useBookingStore();
  const navigation = useNavigation();

  useEffect(() => {
    loadActiveBooking(bookingId);
  }, [bookingId, loadActiveBooking]);

  return (
    <View style={styles.container}>
      {/*
        TODO: Design implementation
        - Success animation (checkmark / shield)
        - "Booking Confirmed!" header
        - Booking reference number
        - Summary: date, location, package
        - Status chip: "Pending Ops Review" or "Confirmed"
        - ETA info
        - "Track Live" button → LiveTracking
        - "Back to Home" button
        - Share booking details option
      */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: Colors.background},
});
