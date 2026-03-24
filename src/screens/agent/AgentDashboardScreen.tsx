import React, {useEffect} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {Colors} from '@theme/index';
import {useBookingStore} from '@store/bookingStore';
import {agentApi} from '@services/api';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import type {AgentStackParamList} from '@navigation/types';

type Nav = NativeStackNavigationProp<AgentStackParamList>;

/**
 * Agent Dashboard — overview for CPO/security agents
 * Shows: status toggle, pending jobs, earnings summary, ratings
 */
export default function AgentDashboardScreen() {
  const {jobRequests, loadJobRequests} = useBookingStore();
  const navigation = useNavigation<Nav>();

  useEffect(() => {
    loadJobRequests();
  }, [loadJobRequests]);

  const handleToggleStatus = async (status: 'available' | 'busy' | 'offline') => {
    await agentApi.updateStatus(status);
  };

  return (
    <ScrollView style={styles.container}>
      {/*
        TODO: Design implementation
        - Header: "Good morning, [name]" + avatar + notification bell
        - Status toggle pill: Available (green) / Busy (orange) / Offline (grey)
        - Rating card: ★ X.X / 5 · N jobs completed
        - Earnings this month card → Earnings screen
        - Pending job requests (badge count) → JobMarketplace
        - Active job card (if on a job)
        - KYC status banner (if pending)
      */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: Colors.background},
});
