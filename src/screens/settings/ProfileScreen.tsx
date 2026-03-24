import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {Colors} from '@theme/index';
import {useAuthStore} from '@store/authStore';

/**
 * Profile / Settings screen
 * Account info, security settings, preferences, sign out
 */
export default function ProfileScreen() {
  const {user, signOut} = useAuthStore();

  return (
    <ScrollView style={styles.container}>
      {/*
        TODO: Design implementation
        - Profile header: avatar (tap to change) + name + role badge
        - Sections:
            Account
            ├── Edit Profile
            ├── Change Phone Number
            └── Linked Devices (future)

            Security
            ├── Biometric Lock toggle
            ├── Auto-Lock timer
            ├── Active Sessions
            └── Two-Factor Auth

            Preferences
            ├── Region / Currency
            ├── Notification Settings
            ├── Language
            └── Theme (dark only for now)

            Billing (non-agents)
            ├── Bravo Credits balance + Top Up
            ├── Payment Methods
            └── Transaction History

            Agent-only
            ├── Availability & Regions
            ├── KYC Status
            └── Payout Settings

            Support
            ├── Help Centre
            ├── Privacy Policy
            └── Terms of Service

        - "Sign Out" button (bottom, red)
        - App version number
      */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: Colors.background},
});
