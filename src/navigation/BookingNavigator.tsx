import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import type {BookingStackParamList} from './types';
import {Colors} from '@theme/colors';

import BookingHomeScreen from '@screens/booking/BookingHomeScreen';
import ZoneMapScreen from '@screens/booking/ZoneMapScreen';
import BookingTypeScreen from '@screens/booking/BookingTypeScreen';
import BookingDetailsScreen from '@screens/booking/BookingDetailsScreen';
import AddOnsScreen from '@screens/booking/AddOnsScreen';
import PaymentScreen from '@screens/booking/PaymentScreen';
import BookingConfirmationScreen from '@screens/booking/BookingConfirmationScreen';
import LiveTrackingScreen from '@screens/liveops/LiveTrackingScreen';
import SOSScreen from '@screens/liveops/SOSScreen';

const Stack = createNativeStackNavigator<BookingStackParamList>();

export default function BookingNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: Colors.surface},
        headerTintColor: Colors.textPrimary,
        headerShadowVisible: false,
        contentStyle: {backgroundColor: Colors.background},
      }}>
      <Stack.Screen
        name="BookingHome"
        component={BookingHomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ZoneMap"
        component={ZoneMapScreen}
        options={{title: 'Select Location'}}
      />
      <Stack.Screen
        name="BookingType"
        component={BookingTypeScreen}
        options={{title: 'Booking Type'}}
      />
      <Stack.Screen
        name="BookingDetails"
        component={BookingDetailsScreen}
        options={{title: 'Booking Details'}}
      />
      <Stack.Screen
        name="AddOns"
        component={AddOnsScreen}
        options={{title: 'Add-Ons'}}
      />
      <Stack.Screen
        name="Payment"
        component={PaymentScreen}
        options={{title: 'Payment'}}
      />
      <Stack.Screen
        name="BookingConfirmation"
        component={BookingConfirmationScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="LiveTracking"
        component={LiveTrackingScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SOSScreen"
        component={SOSScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
