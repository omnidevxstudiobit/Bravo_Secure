import React, {useEffect} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {Colors} from '@theme/index';
import {useBookingStore} from '@store/bookingStore';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import type {AgentStackParamList} from '@navigation/types';

type Nav = NativeStackNavigationProp<AgentStackParamList>;

/**
 * Job Marketplace — available job requests for this agent's region
 * Shows: job card with location, date, payout, expiry timer
 */
export default function JobMarketplaceScreen() {
  const {jobRequests, loadJobRequests, acceptJob, declineJob} = useBookingStore();
  const navigation = useNavigation<Nav>();

  useEffect(() => {
    loadJobRequests();
  }, [loadJobRequests]);

  const openJobs = jobRequests.filter(j => j.status === 'open');

  return (
    <View style={styles.container}>
      {/*
        TODO: Design implementation
        - "Available Jobs" header + region filter
        - FlatList of JobCard:
            - Booking type badge (Transfer / Time Slot)
            - Location + distance from you
            - Date & duration
            - Payout amount (bold, green)
            - Expiry countdown timer
            - Accept (green) / Decline (grey) buttons
        - Empty state: "No jobs available in your region"
        - Pull-to-refresh
      */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: Colors.background},
});
