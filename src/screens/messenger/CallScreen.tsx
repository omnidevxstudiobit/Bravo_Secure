import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Colors} from '@theme/index';
import {agoraService} from '@services/agora';
import type {MessengerScreenProps} from '@navigation/types';

type Props = MessengerScreenProps<'CallScreen'>;

/**
 * Call Screen — Agora-powered voice / video call
 * Peer-to-peer via Agora RTC — no media goes through our servers
 */
export default function CallScreen({route, navigation}: Props) {
  const {conversationId, callType, isIncoming} = route.params;
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeaker, setIsSpeaker] = useState(callType === 'video');
  const [isCameraOn, setIsCameraOn] = useState(callType === 'video');
  const [callDuration, setCallDuration] = useState(0);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const engine = agoraService.initialize();

    agoraService.onUserJoined(() => setIsConnected(true));
    agoraService.onUserOffline(() => handleEndCall());

    const initCall = async () => {
      const {token, channel, uid} = await agoraService.getToken(conversationId, callType);
      await agoraService.joinChannel(token, channel, uid, callType);
    };

    initCall();

    return () => {
      agoraService.removeAllListeners();
      agoraService.destroy();
    };
  }, [conversationId, callType]);

  const handleEndCall = () => {
    agoraService.destroy();
    navigation.goBack();
  };

  const toggleMute = () => {
    agoraService.toggleMute(!isMuted);
    setIsMuted(prev => !prev);
  };

  const toggleCamera = () => {
    agoraService.toggleCamera(!isCameraOn);
    setIsCameraOn(prev => !prev);
  };

  const toggleSpeaker = () => {
    agoraService.toggleSpeaker(!isSpeaker);
    setIsSpeaker(prev => !prev);
  };

  return (
    <View style={styles.container}>
      {/*
        TODO: Design implementation
        - Full-screen video (callType === 'video') or avatar + name (voice)
        - Remote video view (Agora RtcSurfaceView)
        - Local video pip (bottom corner)
        - Call status: "Calling..." / "Connected" + duration timer
        - Control row: mute / camera / speaker / switch-camera / end call
        - End call button (red, center bottom)
        - Incoming call overlay (if isIncoming): Accept (green) + Decline (red)
      */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
});
