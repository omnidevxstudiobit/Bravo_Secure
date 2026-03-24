import React, {useState, useRef, useEffect} from 'react';
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
import {useAuthStore} from '@store/authStore';
import type {AuthScreenProps} from '@navigation/types';

type Props = AuthScreenProps<'OTPVerification'>;

const OTP_LENGTH = 6;
const RESEND_SECONDS = 45;

export default function OTPVerificationScreen({navigation, route}: Props) {
  const {phone, mode} = route.params;
  const [digits, setDigits] = useState<string[]>(Array(OTP_LENGTH).fill(''));
  const [countdown, setCountdown] = useState(RESEND_SECONDS);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef<(TextInput | null)[]>([]);
  const {verifyOTP, sendOTP, isLoading, error} = useAuthStore();

  // Countdown timer
  useEffect(() => {
    if (countdown <= 0) { setCanResend(true); return; }
    const t = setTimeout(() => setCountdown(c => c - 1), 1000);
    return () => clearTimeout(t);
  }, [countdown]);

  const handleChange = (text: string, index: number) => {
    const val = text.replace(/[^0-9]/g, '').slice(-1);
    const next = [...digits];
    next[index] = val;
    setDigits(next);
    if (val && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (key: string, index: number) => {
    if (key === 'Backspace' && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const code = digits.join('');
    if (code.length < OTP_LENGTH) return;
    try {
      await verifyOTP(phone, code);
      if (mode === 'register') {
        navigation.navigate('RoleSelection');
      }
    } catch {
      Alert.alert('Error', error ?? 'Invalid code');
    }
  };

  const handleResend = async () => {
    if (!canResend) return;
    try {
      await sendOTP(phone);
      setDigits(Array(OTP_LENGTH).fill(''));
      setCountdown(RESEND_SECONDS);
      setCanResend(false);
      inputRefs.current[0]?.focus();
    } catch {
      Alert.alert('Error', 'Could not resend code');
    }
  };

  const maskedPhone = phone.replace(/(\+\d{3})\d+(\d{4})/, '$1 ** *** $2');
  const isComplete = digits.every(d => d !== '');

  const formatTime = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

  return (
    <SafeAreaView style={s.safe}>
      <KeyboardAvoidingView
        style={s.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>

        {/* Header */}
        <View style={s.header}>
          <TouchableOpacity style={s.backBtn} onPress={() => navigation.goBack()} activeOpacity={0.7}>
            <Text style={s.backIcon}>←</Text>
          </TouchableOpacity>
          <Text style={s.headerTitle}>Verify</Text>
          <View style={s.headerSpacer} />
        </View>

        {/* Progress dots */}
        <View style={s.dots}>
          {[0, 1, 2, 3].map(i => (
            <View key={i} style={[s.dot, i === 0 && s.dotActive]} />
          ))}
        </View>

        {/* Content */}
        <View style={s.content}>
          <Text style={s.title}>Verify your number</Text>
          <Text style={s.subtitle}>
            We sent a 6-digit code to{' '}
            <Text style={s.phone}>{maskedPhone}</Text>
          </Text>

          {/* OTP boxes */}
          <View style={s.otpRow}>
            {digits.map((digit, i) => (
              <TextInput
                key={i}
                ref={el => { inputRefs.current[i] = el; }}
                style={[s.otpBox, digit ? s.otpBoxFilled : null]}
                value={digit}
                onChangeText={text => handleChange(text, i)}
                onKeyPress={({nativeEvent}) => handleKeyPress(nativeEvent.key, i)}
                keyboardType="number-pad"
                maxLength={1}
                textAlign="center"
                autoFocus={i === 0}
                selectTextOnFocus
              />
            ))}
          </View>

          {/* Resend */}
          <View style={s.resendRow}>
            {canResend ? (
              <TouchableOpacity onPress={handleResend} activeOpacity={0.7}>
                <Text style={s.resendActive}>Resend code</Text>
              </TouchableOpacity>
            ) : (
              <Text style={s.resendTimer}>
                Resend code in <Text style={s.timerValue}>{formatTime(countdown)}</Text>
              </Text>
            )}
          </View>
        </View>

        {/* Verify button */}
        <View style={s.footer}>
          <TouchableOpacity
            style={[s.btn, (!isComplete || isLoading) && s.btnDisabled]}
            onPress={handleVerify}
            disabled={!isComplete || isLoading}
            activeOpacity={0.85}>
            <Text style={s.btnText}>{isLoading ? 'Verifying…' : 'Verify'}</Text>
          </TouchableOpacity>
        </View>

      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const PRIMARY = '#2563EB';
const BG      = '#0A0F1E';
const SURFACE = '#0f172a'; // slate-900

const s = StyleSheet.create({
  safe:         {flex: 1, backgroundColor: BG},
  flex:         {flex: 1},

  // Header
  header:       {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 12},
  backBtn:      {width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.05)', alignItems: 'center', justifyContent: 'center'},
  backIcon:     {fontSize: 20, color: '#f1f5f9'},
  headerTitle:  {fontSize: 18, fontWeight: '700', color: '#f1f5f9'},
  headerSpacer: {width: 40},

  // Dots
  dots:         {flexDirection: 'row', justifyContent: 'center', gap: 12, paddingVertical: 24},
  dot:          {width: 8, height: 8, borderRadius: 4, backgroundColor: '#334155'},
  dotActive:    {backgroundColor: PRIMARY},

  // Content
  content:      {flex: 1, paddingHorizontal: 24, paddingTop: 16},
  title:        {fontSize: 28, fontWeight: '700', color: '#f1f5f9', marginBottom: 8, letterSpacing: -0.5},
  subtitle:     {fontSize: 16, color: '#94a3b8', lineHeight: 24, marginBottom: 32},
  phone:        {color: '#f1f5f9', fontWeight: '500'},

  // OTP
  otpRow:       {flexDirection: 'row', justifyContent: 'space-between', marginBottom: 32},
  otpBox:       {
    width: 48, height: 56,
    backgroundColor: SURFACE,
    borderWidth: 1, borderColor: '#1e293b',
    borderRadius: 10,
    fontSize: 22, fontWeight: '700', color: '#f1f5f9',
  },
  otpBoxFilled: {borderWidth: 2, borderColor: PRIMARY},

  // Resend
  resendRow:    {alignItems: 'center'},
  resendTimer:  {fontSize: 14, color: '#64748b'},
  timerValue:   {color: PRIMARY, fontWeight: '700'},
  resendActive: {fontSize: 14, color: PRIMARY, fontWeight: '700'},

  // Footer
  footer:       {paddingHorizontal: 24, paddingBottom: 40},
  btn:          {
    height: 56, backgroundColor: PRIMARY, borderRadius: 14,
    alignItems: 'center', justifyContent: 'center',
    shadowColor: PRIMARY, shadowOpacity: 0.25, shadowRadius: 12,
    shadowOffset: {width: 0, height: 4}, elevation: 6,
  },
  btnDisabled:  {opacity: 0.5},
  btnText:      {fontSize: 16, fontWeight: '700', color: BG},
});
