import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Svg, {Path} from 'react-native-svg';
import {useAuthStore} from '@store/authStore';
import type {AuthScreenProps} from '@navigation/types';

type Props = AuthScreenProps<'Login'>;

function ShieldIcon() {
  return (
    <Svg width={22} height={22} viewBox="0 0 80 80" fill="none">
      <Path
        d="M40 5L10 18.3333V38.3333C10 57.1333 22.8 74.4667 40 78.3333C57.2 74.4667 70 57.1333 70 38.3333V18.3333L40 5Z"
        stroke="#0A0F1E"
        strokeWidth={4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M40 20V60M25 35H55"
        stroke="#0A0F1E"
        strokeWidth={3}
        strokeLinecap="round"
        opacity={0.6}
      />
    </Svg>
  );
}

export default function LoginScreen({navigation}: Props) {
  const [tab, setTab] = useState<'phone' | 'email'>('phone');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {sendOTP, signInWithEmail, isLoading, error} = useAuthStore();

  const handlePhoneSubmit = async () => {
    if (!phone.trim()) return;
    try {
      await sendOTP('+971' + phone.trim());
      navigation.navigate('OTPVerification', {phone: '+971' + phone.trim(), mode: 'login'});
    } catch {
      Alert.alert('Error', error ?? 'Failed to send OTP');
    }
  };

  const handleEmailSubmit = async () => {
    if (!email.trim() || !password.trim()) return;
    try {
      await signInWithEmail(email.trim(), password.trim());
    } catch {
      Alert.alert('Error', error ?? 'Sign in failed');
    }
  };

  return (
    <SafeAreaView style={s.safe}>
      <KeyboardAvoidingView
        style={s.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={s.scroll}>

          {/* Header */}
          <View style={s.header}>
            <View style={s.logoBox}>
              <ShieldIcon />
            </View>
            <Text style={s.title}>Welcome back</Text>
          </View>

          {/* Tabs */}
          <View style={s.tabs}>
            <TouchableOpacity
              style={[s.tab, tab === 'phone' && s.tabActive]}
              onPress={() => setTab('phone')}
              activeOpacity={0.7}>
              <Text style={[s.tabText, tab === 'phone' && s.tabTextActive]}>Phone</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[s.tab, tab === 'email' && s.tabActive]}
              onPress={() => setTab('email')}
              activeOpacity={0.7}>
              <Text style={[s.tabText, tab === 'email' && s.tabTextActive]}>Email</Text>
            </TouchableOpacity>
          </View>

          {/* Phone tab */}
          {tab === 'phone' && (
            <View style={s.fields}>
              <View style={s.phoneRow}>
                <View style={s.dialBox}>
                  <Text style={s.flag}>🇦🇪</Text>
                  <Text style={s.dialCode}>+971</Text>
                </View>
                <TextInput
                  style={s.phoneInput}
                  placeholder="Mobile number"
                  placeholderTextColor="#475569"
                  keyboardType="phone-pad"
                  value={phone}
                  onChangeText={setPhone}
                  returnKeyType="done"
                  onSubmitEditing={handlePhoneSubmit}
                />
              </View>
              <TouchableOpacity
                style={[s.btn, isLoading && s.btnDisabled]}
                onPress={handlePhoneSubmit}
                disabled={isLoading}
                activeOpacity={0.85}>
                <Text style={s.btnText}>{isLoading ? 'Sending…' : 'Continue'}</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Email tab */}
          {tab === 'email' && (
            <View style={s.fields}>
              <TextInput
                style={s.input}
                placeholder="Email address"
                placeholderTextColor="#475569"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />
              <TextInput
                style={s.input}
                placeholder="Password"
                placeholderTextColor="#475569"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                returnKeyType="done"
                onSubmitEditing={handleEmailSubmit}
              />
              <TouchableOpacity
                style={[s.btn, isLoading && s.btnDisabled]}
                onPress={handleEmailSubmit}
                disabled={isLoading}
                activeOpacity={0.85}>
                <Text style={s.btnText}>{isLoading ? 'Signing in…' : 'Continue'}</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Switch mode */}
          <TouchableOpacity
            style={s.altLink}
            onPress={() => setTab(tab === 'phone' ? 'email' : 'phone')}
            activeOpacity={0.7}>
            <Text style={s.altText}>Sign in differently</Text>
          </TouchableOpacity>

          {/* Footer */}
          <View style={s.footer}>
            <Text style={s.lockIcon}>🔒</Text>
            <Text style={s.footerText}>
              All communications protected by{'\n'}Signal Protocol
            </Text>
          </View>

        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const PRIMARY = '#2563EB';
const BG      = '#0A0F1E';
const SURFACE = '#0D1929';

const s = StyleSheet.create({
  safe:          {flex: 1, backgroundColor: BG},
  flex:          {flex: 1},
  scroll:        {flexGrow: 1, paddingHorizontal: 24},
  header:        {paddingTop: 80, paddingBottom: 40, alignItems: 'center'},
  logoBox:       {
    width: 40, height: 40, backgroundColor: PRIMARY, borderRadius: 10,
    alignItems: 'center', justifyContent: 'center', marginBottom: 24,
    shadowColor: PRIMARY, shadowOpacity: 0.3, shadowRadius: 12,
    shadowOffset: {width: 0, height: 4}, elevation: 8,
  },
  title:         {fontSize: 28, fontWeight: '700', color: '#f1f5f9', letterSpacing: -0.5},
  tabs:          {
    flexDirection: 'row',
    borderBottomWidth: 1, borderBottomColor: 'rgba(201,167,74,0.1)',
    marginBottom: 32,
  },
  tab:           {flex: 1, paddingBottom: 12, borderBottomWidth: 2, borderBottomColor: 'transparent'},
  tabActive:     {borderBottomColor: PRIMARY},
  tabText:       {textAlign: 'center', fontSize: 14, fontWeight: '700', color: '#64748b'},
  tabTextActive: {color: PRIMARY},
  fields:        {gap: 12},
  phoneRow:      {flexDirection: 'row', gap: 12},
  dialBox:       {
    width: 90, height: 56, backgroundColor: SURFACE, borderRadius: 12,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6,
    borderWidth: 1, borderColor: 'rgba(201,167,74,0.05)',
  },
  flag:          {fontSize: 18},
  dialCode:      {fontSize: 14, fontWeight: '600', color: '#f1f5f9'},
  phoneInput:    {
    flex: 1, height: 56, backgroundColor: SURFACE, borderRadius: 12,
    paddingHorizontal: 16, fontSize: 16, color: '#f1f5f9',
    borderWidth: 1, borderColor: 'rgba(201,167,74,0.05)',
  },
  input:         {
    height: 56, backgroundColor: SURFACE, borderRadius: 12,
    paddingHorizontal: 16, fontSize: 16, color: '#f1f5f9',
    borderWidth: 1, borderColor: 'rgba(201,167,74,0.05)',
  },
  btn:           {
    marginTop: 16, height: 56, backgroundColor: PRIMARY, borderRadius: 12,
    alignItems: 'center', justifyContent: 'center',
    shadowColor: PRIMARY, shadowOpacity: 0.2, shadowRadius: 12,
    shadowOffset: {width: 0, height: 4}, elevation: 6,
  },
  btnDisabled:   {opacity: 0.6},
  btnText:       {fontSize: 16, fontWeight: '700', color: BG},
  altLink:       {marginTop: 20, alignItems: 'center'},
  altText:       {fontSize: 14, fontWeight: '500', color: '#64748b'},
  footer:        {marginTop: 'auto', paddingTop: 40, paddingBottom: 48, alignItems: 'center', gap: 8},
  lockIcon:      {fontSize: 18},
  footerText:    {fontSize: 12, color: '#64748b', textAlign: 'center', lineHeight: 18},
});
