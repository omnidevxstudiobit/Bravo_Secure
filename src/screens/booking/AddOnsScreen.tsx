import React, {useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {Colors} from '@theme/index';
import {useBookingStore} from '@store/bookingStore';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import type {BookingStackParamList} from '@navigation/types';

type Nav = NativeStackNavigationProp<BookingStackParamList>;

/**
 * Add-Ons — extra CPOs, armoured vehicles, surveillance, medic
 * Items requiring Ops Room approval show an approval badge
 */
export default function AddOnsScreen() {
  const {draft, updateDraft, availableAddOns, loadAddOns, estimatePrice} = useBookingStore();
  const navigation = useNavigation<Nav>();

  useEffect(() => {
    loadAddOns(draft.region);
  }, [draft.region, loadAddOns]);

  const toggleAddOn = (id: string) => {
    const current = draft.selected_add_ons;
    const updated = current.includes(id)
      ? current.filter(a => a !== id)
      : [...current, id];
    updateDraft({selected_add_ons: updated});
    estimatePrice();
  };

  return (
    <View style={styles.container}>
      {/*
        TODO: Design implementation
        - "Enhance Your Protection" header
        - Add-on cards with checkbox:
            - Extra CPO (+$X/h)
            - Armoured Vehicle (⚠ Ops approval required)
            - Surveillance Team (⚠ Ops approval required)
            - Medical Standby
        - Running total price at bottom
        - "Ops Approval" info tooltip
        - "Confirm & Pay" button → Payment
      */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: Colors.background},
});
