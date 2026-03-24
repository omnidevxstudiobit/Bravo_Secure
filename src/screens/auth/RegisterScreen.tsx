import React, {useState} from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import {Colors} from '@theme/index';
import {useAuthStore} from '@store/authStore';
import type {AuthScreenProps} from '@navigation/types';

type Props = AuthScreenProps<'Register'>;

/**
 * Register — full name + phone number
 * Triggers OTP verification then role selection
 */
export default function RegisterScreen({navigation}: Props) {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const {sendOTP, isLoading, error} = useAuthStore();

  const handleSubmit = async () => {
    if (!fullName.trim() || !phone.trim()) return;
    try {
      await sendOTP(phone.trim());
      navigation.navigate('OTPVerification', {phone: phone.trim(), mode: 'register'});
    } catch {
      Alert.alert('Error', error ?? 'Registration failed');
    }
  };

  return (
    <View style={styles.container}>
      {/*
        TODO: Design implementation
        - Back button header
        - Full name input
        - Phone input with country code picker
        - Email input (optional)
        - Terms & Privacy checkbox
        - "Continue" primary button
        - isLoading state
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
