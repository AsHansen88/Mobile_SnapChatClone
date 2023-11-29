import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import * as ImagePicker from 'expo-image-picker';
import { MaterialIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { storage } from '../../firebase';

export default function MapScreen() {

  const [selectedMarker, setSelectedMarker] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [region, setRegion] = useState({
    
    latitude: 55, 
    longitude: 12, 
    latitudeDelta: 20,
    longitudeDelta: 20,
  });
  
  const MapViewRef = useRef(null);
  const locationSubscription = useRef(null);

  useEffect(() => {
    async function startListening() {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert("No access to location");
      } else {
        locationSubscription.current = await Location.watchPositionAsync(
          {
            distanceInterval: 100,
            accuracy: Location.Accuracy.High,
          },
          (location) => {
            const newRegion = {
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: 0.028,
              longitudeDelta: 0.02,
            };
            setRegion(newRegion);
            if (MapViewRef.current) {
              MapViewRef.current.animateToRegion(newRegion);
            }
          }
        );
      }
    }

    startListening();

    return () => {
      if (locationSubscription.current) {
        locationSubscription.current.remove();
      }
    };
  }, []);

  function addMarker(data) {
    const { latitude, longitude } = data.nativeEvent.coordinate;
    const newMarker = {
      coordinate: { latitude, longitude },
      key: data.timeStamp.toString(),
      title: "Great place",
    };
    setMarkers([...markers, newMarker]);
    setSelectedMarker(newMarker);
  }

  const handleImagePicker = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
      });

      if (!result.canceled) {
        const { uri } = result;

        // Create a reference to the Firebase storage bucket where you want to upload the image.
        const storageRef = storage.ref().child('images/' + Date.now());

        // Convert the image URI to a Blob.
        const response = await fetch(uri);
        const blob = await response.blob();

        // Upload the image to Firebase Storage.
        const snapshot = await storageRef.put(blob);

        // Get the download URL for the uploaded image.
        const downloadURL = await snapshot.ref.getDownloadURL();

        setSelectedImage(downloadURL); // Set the image URL in your state.
      }
    } catch (error) {
      console.error('Image picker error:', error);
    }
  };

  function onMarkerPressed(text) {
    alert("You pressed " + text);
    handleImagePicker();
  }

  const SelectedImage = () => {
    if (selectedImage) {
      return (
        <View style={{ alignItems: 'center' }}>
          <Text>Selected Image:</Text>
          <Image
            source={{ uri: selectedImage }}
            style={{ width: 200, height: 200, marginTop: 10 }}
          />
        </View>
      );
    }
    return null;
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={region}
        onLongPress={addMarker}
        ref={MapViewRef}
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
      <SelectedImage />
      <StatusBar style="auto" />
      {selectedMarker && (
        <TouchableOpacity
          style={{
            backgroundColor: 'blue',
            padding: 10,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={handleImagePicker}
        >
          <MaterialIcons name="add-a-photo" size={24} color="white" />
          <Text style={{ color: 'white' }}>Select Image</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  selectedImage: {
    alignItems: 'center',
  },
});

/*
import React from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, View } from 'react-native';


const MapScreen = () => {
    return(
        <View style={styles.container}>
      <MapView style={styles.map} />
    </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    map: {
      width: '100%',
      height: '100%',
    },
  });

export default MapScreen
*/