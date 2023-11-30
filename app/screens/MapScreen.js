import React, { useState, useEffect, useRef } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View } from 'react-native';
import * as Location from 'expo-location';

const MapScreen = () => {
  const [markers, setMarker] = useState([]);
  const [region, setRegion] = useState({
    latitude: 55,
    longitude: 12,
    latitudeDelta: 20,
    longitudeDelta: 20,
  });

  const mapViewRef = useRef(null); // Renamed from MapView
  const locationSubscription = useRef(null);

  useEffect(() => {
    async function startListening() {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert("Ingen adgang til location");
        return;
      }
      locationSubscription.current = await Location.watchPositionAsync({
        distanceInterval: 100,
        accuracy: Location.Accuracy.High,
      }, (location) => {
        const newRegion = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 20,
          longitudeDelta: 20,
        };
        setRegion(newRegion);
        if (mapViewRef.current) {
          mapViewRef.current.animateToRegion(newRegion);
        }
      });
    }
    startListening()
    return ()=> {
      if(locationSubscription.current){
        locationSubscription.current.remove()
      }
    }
  }, []); 

  function addMarker(data) {
    const { latitude, longitude } = data.nativeEvent.coordinate;
    const newMarker = {
      coordinate: { latitude, longitude },
      key: data.timeStamp,
      title: "Great Place",
    };
    setMarker([...markers, newMarker]);
  }

  function onMarkerPressed(text) {
    alert("YOu pressed " + text);
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={region}
        onLongPress={addMarker}
        ref={mapViewRef} // Updated to use the renamed ref
      >
        {markers.map((marker) => (
          <Marker
            coordinate={marker.coordinate}
            key={marker.key}
            title={marker.title}
            onPress={() => onMarkerPressed(marker.title)}
          />
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});

export default MapScreen;
