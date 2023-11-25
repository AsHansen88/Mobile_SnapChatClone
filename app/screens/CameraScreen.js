import React, { useEffect, useRef, useState } from "react";
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
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
            const { status } = await Permissions.askAsync(Permissions.CAMERA);
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
    };

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
                    <Ionicons name="camera-outline" style={styles.sideIcons} size={20} color="#eee" onPress={changeCameraType}/>
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
     }
})

export default CameraScreen