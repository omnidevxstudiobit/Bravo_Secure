import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Colors} from '@theme/index';

/**
 * Secure Vault — encrypted file storage
 * Upload / view / share files. All stored in Supabase Storage (encrypted bucket).
 */
export default function VaultScreen() {
  return (
    <View style={styles.container}>
      {/*
        TODO: Design implementation
        - Grid/list view toggle for stored files
        - File type filters (images, docs, audio)
        - Upload FAB (image picker / document picker)
        - File row: icon, name, size, date, share / delete actions
        - Biometric lock toggle
      */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: Colors.background},
});
