import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useAuthStore} from '@store/authStore';
import {Colors, Typography} from '@theme/index';
import type {MainTabParamList} from './types';

import DashboardScreen from '@screens/dashboard/DashboardScreen';
import MessengerNavigator from './MessengerNavigator';
import BookingNavigator from './BookingNavigator';
import NewsFeedScreen from '@screens/news/NewsFeedScreen';
import ProfileScreen from '@screens/settings/ProfileScreen';
import AgentNavigator from './AgentNavigator';

// Tab bar icons — replace with your icon component
import {Text, View} from 'react-native';

function TabIcon({icon, focused}: {icon: string; focused: boolean}) {
  return (
    <Text style={{fontSize: 22, opacity: focused ? 1 : 0.4}}>{icon}</Text>
  );
}

const Tab = createBottomTabNavigator<MainTabParamList>();

export default function MainNavigator() {
  const {user} = useAuthStore();
  const isAgent = user?.role === 'agent';

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: Colors.tabBar,
          borderTopColor: Colors.surfaceBorder,
          height: 60,
          paddingBottom: 8,
        },
        tabBarActiveTintColor: Colors.tabActive,
        tabBarInactiveTintColor: Colors.tabInactive,
        tabBarLabelStyle: {
          ...Typography.caption,
          marginTop: 2,
        },
      }}>
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({focused}) => <TabIcon icon="⊞" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="MessengerTab"
        component={MessengerNavigator}
        options={{
          tabBarLabel: 'Messenger',
          tabBarIcon: ({focused}) => <TabIcon icon="✉" focused={focused} />,
        }}
      />
      {isAgent ? (
        <Tab.Screen
          name="SecureTab"
          component={AgentNavigator}
          options={{
            tabBarLabel: 'Jobs',
            tabBarIcon: ({focused}) => <TabIcon icon="⊕" focused={focused} />,
          }}
        />
      ) : (
        <Tab.Screen
          name="SecureTab"
          component={BookingNavigator}
          options={{
            tabBarLabel: 'Secure',
            tabBarIcon: ({focused}) => <TabIcon icon="⊕" focused={focused} />,
          }}
        />
      )}
      <Tab.Screen
        name="NewsTab"
        component={NewsFeedScreen}
        options={{
          tabBarLabel: 'Intel',
          tabBarIcon: ({focused}) => <TabIcon icon="◉" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({focused}) => <TabIcon icon="◎" focused={focused} />,
        }}
      />
    </Tab.Navigator>
  );
}
