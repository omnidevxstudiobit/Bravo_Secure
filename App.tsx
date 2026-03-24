import React, {useEffect} from 'react';
import {StatusBar, LogBox} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {StripeProvider} from '@stripe/stripe-react-native';
import RootNavigator from '@navigation/index';
import {useAuthStore} from '@store/authStore';

LogBox.ignoreLogs(['Non-serializable values were found in the navigation state']);

const STRIPE_KEY = process.env.STRIPE_PUBLISHABLE_KEY ?? '';

export default function App(): React.JSX.Element {
  const {initialize} = useAuthStore();

  useEffect(() => {
    initialize();
  }, [initialize]);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaProvider>
        <StripeProvider publishableKey={STRIPE_KEY}>
          <StatusBar barStyle="light-content" backgroundColor="#0A0A0F" />
          <RootNavigator />
        </StripeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
