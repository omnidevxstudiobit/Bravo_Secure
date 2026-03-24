import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Colors} from '@theme/index';
import type {AgentStackParamList} from '@navigation/types';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<AgentStackParamList, 'JobDetail'>;

/** Job Detail — full booking info before accept/decline */
export default function JobDetailScreen({route}: Props) {
  const {jobId} = route.params;

  return (
    <View style={styles.container}>
      {/* TODO: Full job details, map preview, client info (anonymized), accept/decline */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: Colors.background},
});
