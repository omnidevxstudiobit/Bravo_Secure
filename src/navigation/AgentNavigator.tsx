import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import type {AgentStackParamList} from './types';
import {Colors} from '@theme/colors';

import AgentDashboardScreen from '@screens/agent/AgentDashboardScreen';
import AgentRegistrationScreen from '@screens/agent/AgentRegistrationScreen';
import JobMarketplaceScreen from '@screens/agent/JobMarketplaceScreen';
import JobDetailScreen from '@screens/agent/JobDetailScreen';
import EarningsScreen from '@screens/agent/EarningsScreen';

const Stack = createNativeStackNavigator<AgentStackParamList>();

export default function AgentNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: Colors.surface},
        headerTintColor: Colors.textPrimary,
        headerShadowVisible: false,
        contentStyle: {backgroundColor: Colors.background},
      }}>
      <Stack.Screen
        name="AgentDashboard"
        component={AgentDashboardScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AgentRegistration"
        component={AgentRegistrationScreen}
        options={{title: 'Agent Registration'}}
      />
      <Stack.Screen
        name="JobMarketplace"
        component={JobMarketplaceScreen}
        options={{title: 'Available Jobs'}}
      />
      <Stack.Screen
        name="JobDetail"
        component={JobDetailScreen}
        options={{title: 'Job Details'}}
      />
      <Stack.Screen
        name="Earnings"
        component={EarningsScreen}
        options={{title: 'Earnings'}}
      />
    </Stack.Navigator>
  );
}
