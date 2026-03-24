import React, {useEffect} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {Colors} from '@theme/index';
import {useMessengerStore} from '@store/messengerStore';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import type {MessengerStackParamList} from '@navigation/types';
import {useRealtimeMessages} from '@hooks/useRealtimeMessages';

type Nav = NativeStackNavigationProp<MessengerStackParamList>;

/**
 * Messenger Home — list of conversations
 * Shows: conversation list, search bar, new chat FAB, vault shortcut
 * End-to-end encrypted indicator in header
 */
export default function MessengerHomeScreen() {
  const {conversations, loadConversations, isLoadingConversations} = useMessengerStore();
  const navigation = useNavigation<Nav>();

  useEffect(() => {
    loadConversations();
  }, [loadConversations]);

  useRealtimeMessages(); // Subscribes to incoming messages via Supabase Realtime

  return (
    <View style={styles.container}>
      {/*
        TODO: Design implementation
        - Header: "Bravo Messenger" + lock icon (E2E) + vault icon
        - Search bar (filter conversations)
        - FlatList of ConversationRow components:
            - Avatar / group icon
            - Name
            - Last message preview (encrypted — show "Encrypted message" or actual content)
            - Timestamp
            - Unread badge
        - "Compose" FAB → NewChat screen
        - Empty state: "No conversations yet"
        - Loading skeleton
      */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});
