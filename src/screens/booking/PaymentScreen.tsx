import React, {useState} from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import {Colors} from '@theme/index';
import {usePaymentFlow} from '@services/stripe';
import {useBookingStore} from '@store/bookingStore';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import type {BookingStackParamList} from '@navigation/types';

type Nav = NativeStackNavigationProp<BookingStackParamList>;

/**
 * Payment — Stripe payment sheet + Bravo Credits + Corporate billing
 */
export default function PaymentScreen() {
  const {draft, confirmBooking} = useBookingStore();
  const {pay} = usePaymentFlow();
  const navigation = useNavigation<Nav>();
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePay = async () => {
    setIsProcessing(true);
    try {
      const booking = await confirmBooking();

      if (draft.payment_method === 'card') {
        await pay(booking.id, booking.total_price, 'usd');
      }

      navigation.replace('BookingConfirmation', {bookingId: booking.id});
    } catch (e: unknown) {
      Alert.alert('Payment Failed', e instanceof Error ? e.message : 'Please try again');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <View style={styles.container}>
      {/*
        TODO: Design implementation
        - Order summary card: location, date, package, add-ons, total
        - Payment method selector:
            [💳 Card]  [🪙 Bravo Credits]  [🏢 Corporate]
        - Bravo Credits balance display
        - "Pay [amount]" primary button → Stripe sheet
        - isProcessing loading state
        - Secure payment badge
      */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: Colors.background},
});
