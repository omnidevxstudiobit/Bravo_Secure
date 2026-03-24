import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useAuthStore} from '@store/authStore';
import type {AuthScreenProps} from '@navigation/types';

type Props = AuthScreenProps<'RoleSelection'>;

type Role = 'individual' | 'corporate' | 'agent' | 'ops';

const ROLES: {id: Role; label: string; icon: string; desc: string}[] = [
  {id: 'individual', label: 'Individual',  icon: '🛡️', desc: 'Personal protection and secure messaging'},
  {id: 'corporate',  label: 'Corporate',   icon: '🏢', desc: 'Team-wide security and enterprise comms'},
  {id: 'agent',      label: 'Agent / CPO', icon: '🪪', desc: 'Receive jobs and manage security operations'},
  {id: 'ops',        label: 'Ops Room',    icon: '🎧', desc: 'Dispatch teams and monitor live operations'},
];

export default function RoleSelectionScreen({navigation}: Props) {
  const [selected, setSelected] = useState<Role>('individual');
  const {setRole, isLoading} = useAuthStore();

  const handleContinue = async () => {
    try {
      await setRole(selected);
    } catch {
      Alert.alert('Error', 'Could not set role. Please try again.');
    }
  };

  return (
    <SafeAreaView style={s.safe}>

      {/* Header */}
      <TouchableOpacity style={s.backBtn} onPress={() => navigation.goBack()} activeOpacity={0.7}>
        <Text style={s.backIcon}>←</Text>
      </TouchableOpacity>

      <ScrollView
        contentContainerStyle={s.scroll}
        showsVerticalScrollIndicator={false}>

        {/* Progress */}
        <View style={s.progressContainer}>
          <Text style={s.progressLabel}>Step 2 of 4</Text>
          <View style={s.progressBar}>
            <View style={s.progressFill} />
          </View>
        </View>

        {/* Heading */}
        <View style={s.heading}>
          <Text style={s.title}>Who are you?</Text>
          <Text style={s.subtitle}>Your role shapes your experience</Text>
        </View>

        {/* Role grid */}
        <View style={s.grid}>
          {ROLES.map(role => {
            const active = selected === role.id;
            return (
              <TouchableOpacity
                key={role.id}
                style={[s.card, active && s.cardActive]}
                onPress={() => setSelected(role.id)}
                activeOpacity={0.8}>
                <View style={[s.iconBox, active && s.iconBoxActive]}>
                  <Text style={s.iconEmoji}>{role.icon}</Text>
                </View>
                <Text style={s.cardTitle}>{role.label}</Text>
                <Text style={s.cardDesc}>{role.desc}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={{height: 80}} />
      </ScrollView>

      {/* Footer */}
      <View style={s.footer}>
        <TouchableOpacity
          style={[s.btn, isLoading && s.btnDisabled]}
          onPress={handleContinue}
          disabled={isLoading}
          activeOpacity={0.85}>
          <Text style={s.btnText}>{isLoading ? 'Saving…' : 'Continue'}</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
}

const PRIMARY = '#2563EB';
const BG      = '#0A0F1E';
const SURFACE = '#0D1929';
const BORDER  = '#1E2D45';

const s = StyleSheet.create({
  safe:              {flex: 1, backgroundColor: BG},
  backBtn:           {
    margin: 8, width: 40, height: 40, borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.05)',
    alignItems: 'center', justifyContent: 'center',
  },
  backIcon:          {fontSize: 20, color: '#f1f5f9'},
  scroll:            {paddingHorizontal: 24},

  // Progress
  progressContainer: {marginBottom: 16},
  progressLabel:     {fontSize: 12, fontWeight: '600', color: PRIMARY, marginBottom: 6},
  progressBar:       {height: 4, backgroundColor: BORDER, borderRadius: 2, overflow: 'hidden'},
  progressFill:      {width: '50%', height: '100%', backgroundColor: PRIMARY, borderRadius: 2},

  // Heading
  heading:           {marginBottom: 16},
  title:             {fontSize: 22, fontWeight: '700', color: '#f1f5f9', letterSpacing: -0.5, marginBottom: 2},
  subtitle:          {fontSize: 13, color: '#64748b'},

  // Grid
  grid:              {flexDirection: 'row', flexWrap: 'wrap', gap: 10},
  card:              {
    width: '47%',
    padding: 12, borderRadius: 14,
    borderWidth: 2, borderColor: BORDER,
    backgroundColor: SURFACE,
  },
  cardActive:        {
    borderColor: PRIMARY,
    backgroundColor: 'rgba(37,99,235,0.1)',
  },
  iconBox:           {
    width: 40, height: 40, borderRadius: 10,
    backgroundColor: BORDER,
    alignItems: 'center', justifyContent: 'center',
    marginBottom: 10,
  },
  iconBoxActive:     {backgroundColor: PRIMARY},
  iconEmoji:         {fontSize: 20},
  cardTitle:         {fontSize: 14, fontWeight: '700', color: '#f1f5f9', marginBottom: 2},
  cardDesc:          {fontSize: 11, color: '#64748b', lineHeight: 15},

  // Footer
  footer:            {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    paddingHorizontal: 24, paddingBottom: 40, paddingTop: 16,
    backgroundColor: BG,
  },
  btn:               {
    height: 56, backgroundColor: PRIMARY, borderRadius: 14,
    alignItems: 'center', justifyContent: 'center',
    shadowColor: PRIMARY, shadowOpacity: 0.25, shadowRadius: 12,
    shadowOffset: {width: 0, height: 4}, elevation: 6,
  },
  btnDisabled:       {opacity: 0.5},
  btnText:           {fontSize: 16, fontWeight: '700', color: '#ffffff'},
});
