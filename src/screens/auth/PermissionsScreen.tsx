import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Dimensions,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import type {AuthScreenProps} from '@navigation/types';

type Props = AuthScreenProps<'Permissions'>;
type PermStatus = 'idle' | 'granted' | 'denied';

const PERMISSIONS = [
  {id: 'location',      label: 'Location',      icon: '📍', desc: 'Required for live tracking and bookings'},
  {id: 'notifications', label: 'Notifications',  icon: '🔔', desc: 'Alerts, SOS updates, booking confirmations'},
  {id: 'camera',        label: 'Camera',         icon: '📷', desc: 'Document scanning and video calls'},
];

const FOOTER_HEIGHT = 140;

export default function PermissionsScreen({navigation}: Props) {
  const [statuses, setStatuses] = useState<Record<string, PermStatus>>({
    location:      'idle',
    notifications: 'granted',
    camera:        'idle',
  });

  const handleAllow = (id: string) => {
    try {
      setStatuses(prev => ({...prev, [id]: 'granted'}));
    } catch {
      Alert.alert('Permission denied', 'Please enable in device settings.');
      setStatuses(prev => ({...prev, [id]: 'denied'}));
    }
  };

  const handleContinue = () => {
    navigation.navigate('MainDashboard' as never);
  };

  return (
    <SafeAreaView style={s.safe}>

      {/* Everything in one ScrollView — most reliable pattern */}
      <ScrollView
        style={s.scroll}
        contentContainerStyle={s.content}
        showsVerticalScrollIndicator={true}
        indicatorStyle="white"
        bounces={true}>

        <TouchableOpacity style={s.backBtn} onPress={() => navigation.goBack()} activeOpacity={0.7}>
          <Text style={s.backIcon}>←</Text>
        </TouchableOpacity>

        <View style={s.pills}>
          {[0, 1, 2, 3, 4].map(i => (
            <View key={i} style={[s.pill, i === 2 && s.pillActive]} />
          ))}
        </View>

        <View style={s.heading}>
          <Text style={s.title}>Allow access</Text>
          <Text style={s.subtitle}>Bravo Secure needs these to keep you protected</Text>
        </View>

        <View style={s.list}>
          {PERMISSIONS.map(perm => {
            const status = statuses[perm.id];
            return (
              <View key={perm.id} style={s.row}>
                <View style={s.iconBox}>
                  <Text style={s.iconEmoji}>{perm.icon}</Text>
                </View>
                <View style={s.rowText}>
                  <Text style={s.rowLabel}>{perm.label}</Text>
                  <Text style={s.rowDesc}>{perm.desc}</Text>
                </View>
                {status === 'granted' ? (
                  <View style={s.checkBox}>
                    <Text style={s.checkMark}>✓</Text>
                  </View>
                ) : (
                  <TouchableOpacity
                    style={[s.allowBtn, status === 'idle' ? s.allowBtnPrimary : s.allowBtnOutline]}
                    onPress={() => handleAllow(perm.id)}
                    activeOpacity={0.8}>
                    <Text style={[s.allowBtnText, status !== 'idle' && s.allowBtnTextMuted]}>
                      Allow
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            );
          })}
        </View>

        {/* Spacer so last card clears the absolute footer */}
        <View style={{height: FOOTER_HEIGHT + 20}} />
      </ScrollView>

      {/* Absolute footer — always on top of scroll */}
      <View style={s.footer}>
        <TouchableOpacity style={s.continueBtn} onPress={handleContinue} activeOpacity={0.85}>
          <Text style={s.continueBtnText}>Continue</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleContinue} activeOpacity={0.7}>
          <Text style={s.skipText}>Skip — I'll do this later</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
}

const PRIMARY = '#2563EB';
const BG      = '#0A0F1E';
const BORDER  = '#1E2D45';

const s = StyleSheet.create({
  safe:              {flex: 1, backgroundColor: BG},
  scroll:            {flex: 1},
  content:           {paddingHorizontal: 24},

  backBtn:           {
    marginTop: 8, marginBottom: 4,
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.05)',
    alignItems: 'center', justifyContent: 'center',
  },
  backIcon:          {fontSize: 20, color: '#f1f5f9'},

  pills:             {flexDirection: 'row', justifyContent: 'center', gap: 8, paddingVertical: 20},
  pill:              {height: 6, width: 24, borderRadius: 3, backgroundColor: 'rgba(37,99,235,0.2)'},
  pillActive:        {width: 40, backgroundColor: PRIMARY},

  heading:           {marginBottom: 24},
  title:             {fontSize: 28, fontWeight: '700', color: '#f1f5f9', letterSpacing: -0.5, marginBottom: 6},
  subtitle:          {fontSize: 15, color: '#64748b'},

  list:              {gap: 12},
  row:               {
    flexDirection: 'row', alignItems: 'center', gap: 14,
    backgroundColor: 'rgba(37,99,235,0.05)',
    borderWidth: 1, borderColor: BORDER,
    padding: 16, borderRadius: 16,
  },
  iconBox:           {
    width: 48, height: 48, borderRadius: 12,
    backgroundColor: 'rgba(37,99,235,0.15)',
    alignItems: 'center', justifyContent: 'center',
  },
  iconEmoji:         {fontSize: 22},
  rowText:           {flex: 1},
  rowLabel:          {fontSize: 15, fontWeight: '700', color: '#f1f5f9', marginBottom: 2},
  rowDesc:           {fontSize: 12, color: '#64748b', lineHeight: 16},

  checkBox:          {width: 32, height: 32, borderRadius: 16, backgroundColor: 'rgba(34,197,94,0.15)', alignItems: 'center', justifyContent: 'center'},
  checkMark:         {fontSize: 16, color: '#22c55e', fontWeight: '700'},
  allowBtn:          {paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20},
  allowBtnPrimary:   {backgroundColor: PRIMARY},
  allowBtnOutline:   {borderWidth: 1, borderColor: BORDER},
  allowBtnText:      {fontSize: 13, fontWeight: '700', color: '#fff'},
  allowBtnTextMuted: {color: '#94a3b8'},

  footer:            {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    height: FOOTER_HEIGHT,
    paddingHorizontal: 24, paddingTop: 12, paddingBottom: 32,
    gap: 12, alignItems: 'center',
    backgroundColor: BG,
    borderTopWidth: 1, borderTopColor: BORDER,
  },
  continueBtn:       {
    width: '100%', height: 56, backgroundColor: PRIMARY, borderRadius: 14,
    alignItems: 'center', justifyContent: 'center',
    shadowColor: PRIMARY, shadowOpacity: 0.25, shadowRadius: 12,
    shadowOffset: {width: 0, height: 4}, elevation: 6,
  },
  continueBtnText:   {fontSize: 16, fontWeight: '700', color: '#fff'},
  skipText:          {fontSize: 14, color: '#64748b', fontWeight: '500'},
});
