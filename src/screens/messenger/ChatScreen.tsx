import React, {useEffect, useRef} from 'react';
import {View, FlatList, StyleSheet, KeyboardAvoidingView, Platform} from 'react-native';
import {Colors} from '@theme/index';
import {useMessengerStore} from '@store/messengerStore';
import type {MessengerScreenProps} from '@navigation/types';

type Props = MessengerScreenProps<'Chat'>;

/**
 * Chat Screen — 1:1 or group chat
 * Features: encrypted messages, media, self-destruct timer, call button
 */
export default function ChatScreen({route, navigation}: Props) {
  const {conversationId, name, isGroup} = route.params;
  const {messages, loadMessages, sendMessage, markRead, isLoadingMessages} = useMessengerStore();
  const conversationMessages = messages[conversationId] ?? [];

  useEffect(() => {
    loadMessages(conversationId);
    markRead(conversationId);
  }, [conversationId, loadMessages, markRead]);

  const handleSend = async (text: string, selfDestructSeconds?: number | null) => {
    if (!text.trim()) return;
    await sendMessage(conversationId, text.trim(), selfDestructSeconds);
  };

  const handleVoiceCall = () =>
    navigation.navigate('CallScreen', {
      conversationId,
      callType: 'voice',
      isIncoming: false,
    });

  const handleVideoCall = () =>
    navigation.navigate('CallScreen', {
      conversationId,
      callType: 'video',
      isIncoming: false,
    });

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      {/*
        TODO: Design implementation
        - Header: avatar/group icon + name + voice/video call icons + info icon
        - FlatList of MessageBubble components (bottom-anchored, inverted)
        - Self-destruct countdown badge on message bubble
        - MessageInput bar:
            - Attachment button (image, file, audio)
            - Text input (multiline)
            - Self-destruct timer selector
            - Send button
        - "Encrypted" indicator bar at top
        - Loading skeleton for first load
      */}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});
