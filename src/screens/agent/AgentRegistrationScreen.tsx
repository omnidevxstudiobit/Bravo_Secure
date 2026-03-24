import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Colors} from '@theme/index';

/**
 * Agent Registration — KYC verification flow
 * Collects: certifications, regions, vehicle types, ID document upload
 */
export default function AgentRegistrationScreen() {
  return (
    <View style={styles.container}>
      {/*
        TODO: Design implementation
        - Step 1: Personal details (already from auth) — confirm
        - Step 2: Professional details:
            - Years of experience
            - Certifications (multi-select: CPO, First Aid, Firearms, etc.)
            - Regions available (UAE, UK, ZA, etc.)
            - Vehicle types (standard, SUV, armoured)
        - Step 3: KYC documents:
            - Government ID upload
            - Security license upload
            - Professional photo
        - Step 4: Review & Submit
        - Progress stepper at top
        - "KYC Under Review" post-submit state
      */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: Colors.background},
});
