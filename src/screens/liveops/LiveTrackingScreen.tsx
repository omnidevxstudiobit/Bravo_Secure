import React, {useEffect, useRef} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import MapView, {Marker, Polyline} from 'react-native-maps';
import {Colors} from '@theme/index';
import {useBookingStore} from '@store/bookingStore';
import {realtimeService} from '@services/supabase';
import {REALTIME_CHANNELS} from '@utils/constants';
import type {BookingScreenProps} from '@navigation/types';
import type {LiveConvoy} from '@appTypes/index';

type Props = BookingScreenProps<'LiveTracking'>;

/**
 * Live Tracking — real-time convoy map + encrypted team chat + SOS
 * Supabase Realtime WebSocket for location updates
 */
export default function LiveTrackingScreen({route, navigation}: Props) {
  const {bookingId} = route.params;
  const {liveConvoy, setLiveConvoy, activeBooking} = useBookingStore();
  const channelRef = useRef<ReturnType<typeof realtimeService.subscribeToChannel> | null>(null);

  useEffect(() => {
    // Subscribe to live convoy updates
    channelRef.current = realtimeService.subscribeToChannel(
      REALTIME_CHANNELS.liveTracking(bookingId),
      (payload: unknown) => {
        setLiveConvoy(payload as LiveConvoy);
      },
    );

    return () => {
      if (channelRef.current) {
        realtimeService.unsubscribe(channelRef.current);
      }
      setLiveConvoy(null);
    };
  }, [bookingId, setLiveConvoy]);

  const handleSOS = () => navigation.navigate('SOSScreen', {bookingId});

  return (
    <View style={styles.container}>
      <MapView style={styles.map} customMapStyle={darkMapStyle} showsUserLocation>
        {liveConvoy?.vehicles.map(v => (
          <Marker
            key={v.id}
            coordinate={v.location}
            title={v.label}
            description={v.cpo_name}
          />
        ))}
        {/* TODO: Route polyline, ETA polyline */}
      </MapView>
      {/*
        TODO: Design implementation overlay
        - Header: "Live Operation" + booking ref + status chip
        - Vehicle cards row (swipeable): driver name, CPO, ETA
        - Bottom sheet:
            - Encrypted chat shortcut (open ops channel chat)
            - "Contact Team" button
            - Live event feed
        - Status: "CPO En Route" / "On Site" / etc.
      */}
      <TouchableOpacity style={styles.sosButton} onPress={handleSOS} activeOpacity={0.8}>
        <Text style={styles.sosLabel}>SOS</Text>
      </TouchableOpacity>
    </View>
  );
}

const darkMapStyle = [
  {elementType: 'geometry', stylers: [{color: '#1A1A2E'}]},
  {elementType: 'labels.text.fill', stylers: [{color: '#8895A7'}]},
  {featureType: 'road', elementType: 'geometry', stylers: [{color: '#2C2C3E'}]},
  {featureType: 'water', elementType: 'geometry', stylers: [{color: '#0E1626'}]},
];

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: Colors.background},
  map: {flex: 1},
  sosButton: {
    position: 'absolute',
    bottom: 32,
    right: 24,
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: Colors.sosRed,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.sosRed,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.7,
    shadowRadius: 12,
    elevation: 8,
  },
  sosLabel: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 1,
  },
});
