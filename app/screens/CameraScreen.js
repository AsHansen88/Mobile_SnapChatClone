import { Camera, CameraType } from 'expo-camera';
import { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
//import  firebase from '../../firebase/storage'; 
import { storage } from '../../firebase'; 
import {ref, uploadBytes, getDownloadURL} from 'firebase/storage'
import { getUnixTime } from 'date-fns'; // Import date-fns function for timestamp


export default function CameraScreen({ navigation }) {
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [hasCameraPermission, setHasCameraPermissions] = useState(null);
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [imagePath, setImagepath] = useState(null)



  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermissions(cameraStatus.status === 'granted');

      const GalleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(GalleryStatus.status === 'granted');
    })();
  }, []);

  // Updated takePicture function
  const takePicture = async () => {
    console.log("Taking picture...");
    if (camera) {
      const photo = await camera.takePictureAsync();
      setImage(photo.uri); // Store the taken image URI in the state
    }
  };
  
  // Updated uploadImage function to use the stored image URI
  const uploadImage = async () => {
    if (image) { // Check if image is provided in the state
      const res = await fetch(image);
      const blob = await res.blob();
      
      // Generate a unique file name using a timestamp
      const timestamp = getUnixTime(new Date()); // Get current Unix timestamp
      const fileName = `${timestamp}.jpg`; // Create a unique file name
      
      const storageRef = ref(storage, fileName);
      
      uploadBytes(storageRef, blob).then((snapshot) => {
        alert("Image Uploaded");
      });
    } else {
      alert("No image selected");
    }
  }
  
 
  const PickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
  
    if (!result.canceled) {
      setImage(result.uri);
    }
  };

  if (hasCameraPermission === null || hasGalleryPermission === false) {
    return <View />;
  }

  if (hasCameraPermission === false || hasGalleryPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="Grant permission" />
      </View>
    );
  }

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.cameraContainer}>
        <Camera style={styles.camera} type={type} ratio={'1:1'} ref={(ref) => setCamera(ref)}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
              <Text style={styles.text}>Flip Camera</Text>
            </TouchableOpacity>
          </View>
        </Camera>
      </View>

      <View style={styles.imageContainer}>
        {image && <Image source={{ uri: image }} style={{ flex: 1 }} />}
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Take Picture" onPress={takePicture} />

        <Button
          title="Pick Image from Gallery"
          onPress={() => PickImage()}
          style={styles.pickImageButton}
        />
         <Button
  title="Save"
  onPress={() => uploadImage('Save', {image})} 
/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cameraContainer: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  imageContainer: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 16,
  },
  button: {
    backgroundColor: 'transparent',
    padding: 16,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});


/*
import React, { useEffect, useRef, useState } from "react";
import { Camera, requestCameraPermissionsAsync } from 'expo-camera';
import { TouchableOpacity, View, Text, StyleSheet, Modal, Image } from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

const CameraScreen = () => {
    const [allowedCamera, setAllowedCamera] = useState(false);
    const [typeCamera, setTypeCamera] = useState(Camera.Constants.Type.back);
    const [flashMode, setFlashMode] = useState(Camera.Constants.FlashMode.off);
    const [imagePreview, setImagePreview] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    const changeFlashMode = () => {
        setFlashMode(flashMode === Camera.Constants.FlashMode.off 
            ? Camera.Constants.FlashMode.on 
            : Camera.Constants.FlashMode.off);
    };

    const changeCameraType = () => {
        setTypeCamera(typeCamera === Camera.Constants.Type.back 
            ? Camera.Constants.Type.front 
            : Camera.Constants.Type.back);
    };

    
    useEffect(() => {
        allowPermission();
    }, []);

    const allowPermission = async () => {
        try {
            const { status } = await requestCameraPermissionsAsync();
            setAllowedCamera(status === 'granted');
        } catch (error) {
            console.log("error loading the camera");
        }
    };

    const camRef = useRef(null);
    const takePicture = async () => {
        if (camRef.current) {
            try {
                const pic = await camRef.current.takePictureAsync();
                setImagePreview(pic.uri);
                setIsOpen(true);
            } catch (error) {
                console.log('error taking picture');
            }
        }
    }

    const closeImagePreview = () => {
        setImagePreview(null)
        setIsOpen(false)
    }

    if (!allowedCamera) {
        return (
            <View style={styles.notAllowed}>
                <TouchableOpacity style={styles.btn} onPress={allowPermission}>
                    <Text style={styles.btnText}>Allow Camera Permissions</Text>
                </TouchableOpacity>
            </View>
        );
    }

    if (imagePreview) {
        return (
            <Modal animationType="fade" visible={isOpen} transparent={false}>
                <Image source={{ uri: imagePreview }} style={{ height: "100%", width: "100%" }} />
                <View style={styles.actionBottom}>
                    <Ionicons name="send-outline" size={25} color={"#0e153a"} onPress={() => console.log('Send')}/>
                </View>
                <View style={styles.closeBtn}>
                    <Ionicons name="close-circle-outline" size={38} color="#eee" onPress={closeImagePreview}/>
                </View>
            </Modal>
        );
    }

    return (
        <View style={{ flex: 1 }}>
            <Camera style={{ flex: 1 }} type={typeCamera} flashMode={flashMode} ref={camRef}>
                <TouchableOpacity style={styles.captureBtn} onPress={takePicture}/>
                <View style={styles.header}>
                    <FontAwesome name="user" style={styles.headerIcon} color="#eee" size={24} />
                    <Ionicons name="settings-outline" style={styles.headerIcon} color="#eee" size={24} />
                </View>
                <View style={styles.sideItem}>
                    <Ionicons name="camera-reverse-outline" style={styles.sideIcons} size={20} color="#eee" onPress={changeCameraType}/>
                    <Ionicons name="flash-outline" style={styles.sideIcons} size={20} color="#eee" onPress={changeFlashMode}/>
                    <Ionicons name="musical-notes-outline" style={styles.sideIcons} size={20} color="#eee" />
                </View>
            </Camera>
        </View>
    );
};

const styles = StyleSheet.create({
    
    notAllowed: {
        flex: 1,
        justifyContent: "center",
        alignItem: "center"
    },
     btn: {
        padding: 20,
        backgroundColor: "#000",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10
     },
     btnText: {
        color: "#eee",
        fontSize: 18,
        fontWeight: "bold"
     },
     captureBtn: {
        position: "absolute",
        bottom: 20,
        width: 80,
        height: 80,
        borderRadius: 100,
        borderColor: "#eee",
        borderWidth: 6,
        alignSelf: "center"

     },
     header: {
        position: "absolute",
        top: 40,
        justifyContent: "space-between",
        padding: 10,
        flexDirection: "row",
        width: "100%"
     },

     headerIcon: {
        width: 50,
        height: 50
     },

     sideItem: {
        position: "absolute",
        top: 110,
        right: 0,
        padding: 10,
        backgroundColor:  "#ccc"
     },
     sideIcons: {
        width: 45,
        height: 45,
        marginVertical: 10
     },
     actionBottom: {
        position: "absolute",
        bottom: 20,
        padding: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%"
     },
     sendBtn: {
        backgroundColor: "yellow"
     },
     closeBtn: {
        padding: 10,
        position: "absolute",
        top: 40
     }
})

export default CameraScreen
*/