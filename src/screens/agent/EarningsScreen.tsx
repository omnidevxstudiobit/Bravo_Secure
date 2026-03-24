import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Colors} from '@theme/index';

/** Earnings — payout history, pending, total */
export default function EarningsScreen() {
  return (
    <View style={styles.container}>
      {/* TODO: Total earnings, this month, pending payout, transaction history */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: Colors.background},
});
