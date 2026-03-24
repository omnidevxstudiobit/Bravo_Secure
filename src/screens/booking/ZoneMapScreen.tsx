import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import MapView, {Marker, Region} from 'react-native-maps';
import {Colors} from '@theme/index';
import {useBookingStore} from '@store/bookingStore';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import type {BookingStackParamList} from '@navigation/types';
import type {Location} from '@appTypes/index';

type Nav = NativeStackNavigationProp<BookingStackParamList>;

/**
 * Zone Map — pick pickup (and optionally dropoff) location
 * Shows service zones overlaid on map. Validates location is in a supported region.
 */
export default function ZoneMapScreen() {
  const {draft, updateDraft} = useBookingStore();
  const navigation = useNavigation<Nav>();
  const [pickingDropoff, setPickingDropoff] = useState(false);

  const handleMapPress = (location: Location) => {
    if (!pickingDropoff) {
      updateDraft({pickup: location});
    } else {
      updateDraft({dropoff: location});
    }
  };

  const handleConfirm = () => {
    if (draft.pickup) navigation.navigate('BookingType');
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        customMapStyle={darkMapStyle}
        showsUserLocation
        initialRegion={{latitude: 25.2048, longitude: 55.2708, latitudeDelta: 0.1, longitudeDelta: 0.1}}>
        {draft.pickup && <Marker coordinate={draft.pickup} pinColor={Colors.primary} />}
        {draft.dropoff && <Marker coordinate={draft.dropoff} pinColor={Colors.accent} />}
        {/* TODO: Service zone polygons overlay */}
      </MapView>
      {/*
        TODO: Design implementation
        - Address search bar at top (Google Places Autocomplete)
        - "Pickup" / "Drop-off" toggle tabs
        - Crosshair pin in center of map (drag to place)
        - Selected address chip at bottom
        - Risk score badge for selected area (AI)
        - "Confirm Location" button
      */}
    </View>
  );
}

// Dark tactical map style
const darkMapStyle = [
  {elementType: 'geometry', stylers: [{color: '#1A1A2E'}]},
  {elementType: 'labels.text.fill', stylers: [{color: '#8895A7'}]},
  {elementType: 'labels.text.stroke', stylers: [{color: '#1A1A2E'}]},
  {featureType: 'road', elementType: 'geometry', stylers: [{color: '#2C2C3E'}]},
  {featureType: 'water', elementType: 'geometry', stylers: [{color: '#0E1626'}]},
];

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: Colors.background},
  map: {flex: 1},
});
