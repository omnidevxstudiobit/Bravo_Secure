import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Colors} from '@theme/index';
import type {MessengerScreenProps} from '@navigation/types';

type Props = MessengerScreenProps<'GroupInfo'>;

/** Group Info — participants list, mute, leave group */
export default function GroupInfoScreen({route}: Props) {
  const {conversationId} = route.params;

  return (
    <View style={styles.container}>
      {/* TODO: Group avatar, name editor (admin), participant list, mute toggle, leave group */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: Colors.background},
});
