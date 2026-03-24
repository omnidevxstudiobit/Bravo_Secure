import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useAuthStore} from '@store/authStore';
import type {AuthScreenProps} from '@navigation/types';

type Props = AuthScreenProps<'Register'>;

const PRIMARY  = '#2563EB';
const BG       = '#0A0F1E';
const SURFACE  = '#0D1929';
const BORDER   = '#1E2D45';
const GREEN    = '#00C851';
const LABEL_BLUE = '#60A5FA';

function getPasswordStrength(pw: string): {level: number; label: string; color: string} {
  if (pw.length === 0) return {level: 0, label: '', color: '#FF3B3B'};
  if (pw.length < 6)   return {level: 1, label: 'WEAK',   color: '#FF3B3B'};
  if (pw.length < 10)  return {level: 2, label: 'FAIR',   color: '#FFB800'};
  const hasUpper   = /[A-Z]/.test(pw);
  const hasSpecial = /[^a-zA-Z0-9]/.test(pw);
  if (hasUpper && hasSpecial) return {level: 4, label: 'STRONG', color: GREEN};
  return {level: 3, label: 'GOOD', color: '#60A5FA'};
}

export default function RegisterScreen({navigation}: Props) {
  const [fullName, setFullName]       = useState('');
  const [email, setEmail]             = useState('');
  const [password, setPassword]       = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const {sendOTP, isLoading, error} = useAuthStore();

  const strength = getPasswordStrength(password);

  const handleSubmit = async () => {
    if (!fullName.trim() || !email.trim() || !password.trim()) return;
    try {
      await sendOTP(email.trim());
      navigation.navigate('OTPVerification', {phone: email.trim(), mode: 'register'});
    } catch {
      Alert.alert('Error', error ?? 'Registration failed');
    }
  };

  return (
    <SafeAreaView style={s.safe}>
      <ScrollView
        style={s.scroll}
        contentContainerStyle={s.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>

        {/* Back button */}
        <TouchableOpacity style={s.backBtn} onPress={() => navigation.goBack()} activeOpacity={0.7}>
          <Text style={s.backIcon}>←</Text>
        </TouchableOpacity>

        {/* Header label */}
        <Text style={s.headerLabel}>EMAIL REGISTRATION</Text>

        {/* Title */}
        <Text style={s.titleWhite}>Create Your</Text>
        <Text style={s.titleGreen}>Secure Account</Text>
        <Text style={s.subtitle}>All fields are end-to-end encrypted at rest.</Text>

        {/* Full Name */}
        <View style={s.fieldGroup}>
          <Text style={s.fieldLabel}>FULL NAME</Text>
          <TextInput
            style={s.input}
            placeholder="John Doe"
            placeholderTextColor="#475569"
            value={fullName}
            onChangeText={setFullName}
            autoCapitalize="words"
            returnKeyType="next"
          />
        </View>

        {/* Email */}
        <View style={s.fieldGroup}>
          <Text style={s.fieldLabel}>EMAIL ADDRESS</Text>
          <TextInput
            style={s.input}
            placeholder="you@example.com"
            placeholderTextColor="#475569"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            returnKeyType="next"
          />
        </View>

        {/* Password */}
        <View style={s.fieldGroup}>
          <Text style={s.fieldLabel}>SECURE PASSWORD</Text>
          <View style={s.passwordRow}>
            <TextInput
              style={[s.input, s.passwordInput]}
              placeholder="••••••••••"
              placeholderTextColor="#475569"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              returnKeyType="done"
              onSubmitEditing={handleSubmit}
            />
            <TouchableOpacity
              style={s.eyeBtn}
              onPress={() => setShowPassword(v => !v)}
              activeOpacity={0.7}>
              <Text style={s.eyeIcon}>{showPassword ? '🙈' : '👁'}</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Password strength */}
        {password.length > 0 && (
          <View style={s.strengthRow}>
            <Text style={s.strengthLabel}>PASSWORD STRENGTH</Text>
            <View style={s.strengthBars}>
              {[1, 2, 3, 4].map(i => (
                <View
                  key={i}
                  style={[
                    s.strengthBar,
                    {backgroundColor: i <= strength.level ? strength.color : BORDER},
                  ]}
                />
              ))}
            </View>
            <Text style={[s.strengthText, {color: strength.color}]}>{strength.label}</Text>
          </View>
        )}

        {/* CTA */}
        <TouchableOpacity
          style={[s.createBtn, isLoading && s.createBtnDisabled]}
          onPress={handleSubmit}
          activeOpacity={0.85}
          disabled={isLoading}>
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={s.createBtnText}>CREATE ACCOUNT</Text>
          )}
        </TouchableOpacity>

        {/* Sign in link */}
        <View style={s.signinRow}>
          <Text style={s.signinText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')} activeOpacity={0.7}>
            <Text style={s.signinLink}>Sign In</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe:    {flex: 1, backgroundColor: BG},
  scroll:  {flex: 1},
  content: {paddingHorizontal: 24, paddingBottom: 40},

  backBtn: {
    marginTop: 8, marginBottom: 20,
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.05)',
    alignItems: 'center', justifyContent: 'center',
  },
  backIcon: {fontSize: 20, color: '#f1f5f9'},

  headerLabel: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 2.5,
    color: LABEL_BLUE,
    marginBottom: 16,
  },

  titleWhite: {fontSize: 32, fontWeight: '800', color: '#f1f5f9', letterSpacing: -0.5},
  titleGreen: {fontSize: 32, fontWeight: '800', color: LABEL_BLUE, letterSpacing: -0.5, marginBottom: 10},
  subtitle:   {fontSize: 13, color: '#64748b', marginBottom: 32, lineHeight: 18},

  fieldGroup: {marginBottom: 20},
  fieldLabel: {
    fontSize: 11, fontWeight: '700', letterSpacing: 2,
    color: LABEL_BLUE, marginBottom: 8,
  },
  input: {
    backgroundColor: SURFACE,
    borderWidth: 1, borderColor: BORDER,
    borderRadius: 14,
    height: 56,
    paddingHorizontal: 16,
    fontSize: 15, color: '#f1f5f9',
    flex: 1,
  },

  passwordRow:  {flexDirection: 'row', alignItems: 'center'},
  passwordInput:{flex: 1, marginRight: 0, borderTopRightRadius: 0, borderBottomRightRadius: 0},
  eyeBtn: {
    height: 56, width: 52,
    backgroundColor: SURFACE,
    borderWidth: 1, borderLeftWidth: 0, borderColor: BORDER,
    borderTopRightRadius: 14, borderBottomRightRadius: 14,
    alignItems: 'center', justifyContent: 'center',
  },
  eyeIcon: {fontSize: 16},

  strengthRow: {
    flexDirection: 'row', alignItems: 'center',
    gap: 8, marginTop: -8, marginBottom: 24,
  },
  strengthLabel: {fontSize: 10, fontWeight: '700', letterSpacing: 1.5, color: '#64748b'},
  strengthBars:  {flexDirection: 'row', gap: 4, flex: 1},
  strengthBar:   {flex: 1, height: 4, borderRadius: 2},
  strengthText:  {fontSize: 11, fontWeight: '800', letterSpacing: 1},

  createBtn: {
    height: 56, backgroundColor: PRIMARY, borderRadius: 14,
    alignItems: 'center', justifyContent: 'center',
    marginTop: 8,
    shadowColor: PRIMARY, shadowOpacity: 0.35,
    shadowRadius: 16, shadowOffset: {width: 0, height: 6},
    elevation: 8,
  },
  createBtnDisabled: {opacity: 0.6},
  createBtnText: {
    fontSize: 14, fontWeight: '800',
    color: '#fff', letterSpacing: 2,
  },

  signinRow: {flexDirection: 'row', justifyContent: 'center', marginTop: 24},
  signinText: {fontSize: 14, color: '#64748b'},
  signinLink: {fontSize: 14, color: LABEL_BLUE, fontWeight: '700'},
});
