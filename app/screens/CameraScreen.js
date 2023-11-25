import React, { useState } from "react";
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome'; // Import FontAwesome
import Ionicons from 'react-native-vector-icons/Ionicons'; // Import Ionicons

const CameraScreen = () => {
    const [allowedCamera, setAllowedCamera] = useState(false);

    const allowPermission = async () => {
        try {
            const camera = await Permissions.askAsync(Permissions.CAMERA);
            if (!camera.granted) {
                return Permissions.askAsync(Permissions.CAMERA);
            }
            setAllowedCamera(true);
        } catch (error) {
            console.log("error loading the camera");
        }
    };

    if (!allowedCamera) {
        return (
            <View style={styles.notAllowed}>
                <TouchableOpacity style={styles.btn} onPress={allowPermission}>
                    <Text style={styles.btnText}>
                        Allow Camera Permissions
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={{ flex: 1 }}>
            <Camera style={{ flex: 1 }}>
                <TouchableOpacity style={styles.captureBtn} />

                <View style={styles.header}>
                    <FontAwesome name="user" style={styles.headerIcon} color="#eee" size={24} />
                    <Ionicons name="settings-outline" style={styles.headerIcon} color="#eee" size={24} />
                </View>

                <View style={styles.sideItem}>
                    <Ionicons name="camera-outline" style={styles.sideIcons} size={20} color="#eee" />
                    <Ionicons name="flash-outline" style={styles.sideIcons} size={20} color="#eee" />
                    <Ionicons name="musical-notes-outline" style={styles.sideIcons} size={20} color="#eee" />
                </View>
            </Camera>
        </View>
    );
}

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