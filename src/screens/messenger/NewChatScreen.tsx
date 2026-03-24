import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Colors} from '@theme/index';
import {useMessengerStore} from '@store/messengerStore';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import type {MessengerStackParamList} from '@navigation/types';

type Nav = NativeStackNavigationProp<MessengerStackParamList>;

/**
 * New Chat — search contacts, start 1:1 or create group
 */
export default function NewChatScreen() {
  const {createDirect, createGroup} = useMessengerStore();
  const navigation = useNavigation<Nav>();

  const handleStartDirect = async (userId: string, userName: string) => {
    const convo = await createDirect(userId);
    navigation.replace('Chat', {conversationId: convo.id, name: userName, isGroup: false});
  };

  return (
    <View style={styles.container}>
      {/*
        TODO: Design implementation
        - Search bar (search by name or phone)
        - "New Group" option at top
        - Contact list from user's verified contacts
        - Tap contact → start direct chat
      */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: Colors.background},
});
