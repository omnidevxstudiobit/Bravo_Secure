/**
 * Stripe payments
 * Payment sheet initialized from Vercel API (which holds Stripe secret key)
 */
import {useStripe} from '@stripe/stripe-react-native';
import api from './api';

// ─── Payment Sheet (used in PaymentScreen) ────────────────────────────────────

export async function initPaymentSheet(
  bookingId: string,
  amount: number,
  currency: string,
): Promise<{clientSecret: string; ephemeralKey: string; customerId: string}> {
  const response = await api.post('/payments/sheet', {
    booking_id: bookingId,
    amount: Math.round(amount * 100), // stripe uses cents
    currency: currency.toLowerCase(),
  });
  return response.data;
}

// Hook-based helper — use inside a React component
export function usePaymentFlow() {
  const {initPaymentSheet: stripeInit, presentPaymentSheet} = useStripe();

  const pay = async (bookingId: string, amount: number, currency = 'usd') => {
    const {clientSecret, ephemeralKey, customerId} = await initPaymentSheet(
      bookingId,
      amount,
      currency,
    );

    const {error: initError} = await stripeInit({
      merchantDisplayName: 'Bravo Secure',
      customerId,
      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: clientSecret,
      allowsDelayedPaymentMethods: false,
      defaultBillingDetails: {name: 'Bravo Secure Client'},
    });

    if (initError) throw new Error(initError.message);

    const {error: presentError} = await presentPaymentSheet();
    if (presentError) throw new Error(presentError.message);
  };

  return {pay};
}

// ─── Bravo Credits top-up ────────────────────────────────────────────────────

export const creditsApi = {
  topUp: (amount: number, currency: string) =>
    api.post('/wallet/topup', {amount, currency}),
};
