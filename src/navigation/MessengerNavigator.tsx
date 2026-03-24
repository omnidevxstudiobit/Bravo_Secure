import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import type {MessengerStackParamList} from './types';
import {Colors} from '@theme/colors';

import MessengerHomeScreen from '@screens/messenger/MessengerHomeScreen';
import ChatScreen from '@screens/messenger/ChatScreen';
import NewChatScreen from '@screens/messenger/NewChatScreen';
import GroupInfoScreen from '@screens/messenger/GroupInfoScreen';
import VaultScreen from '@screens/messenger/VaultScreen';
import CallScreen from '@screens/messenger/CallScreen';

const Stack = createNativeStackNavigator<MessengerStackParamList>();

export default function MessengerNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: Colors.surface},
        headerTintColor: Colors.textPrimary,
        headerShadowVisible: false,
        contentStyle: {backgroundColor: Colors.background},
      }}>
      <Stack.Screen
        name="MessengerHome"
        component={MessengerHomeScreen}
        options={{title: 'Bravo Messenger', headerShown: false}}
      />
      <Stack.Screen
        name="Chat"
        component={ChatScreen}
        options={({route}) => ({title: route.params.name})}
      />
      <Stack.Screen
        name="NewChat"
        component={NewChatScreen}
        options={{title: 'New Conversation'}}
      />
      <Stack.Screen
        name="GroupInfo"
        component={GroupInfoScreen}
        options={{title: 'Group Info'}}
      />
      <Stack.Screen
        name="VaultScreen"
        component={VaultScreen}
        options={{title: 'Secure Vault'}}
      />
      <Stack.Screen
        name="CallScreen"
        component={CallScreen}
        options={{headerShown: false, animation: 'fade'}}
      />
    </Stack.Navigator>
  );
}
