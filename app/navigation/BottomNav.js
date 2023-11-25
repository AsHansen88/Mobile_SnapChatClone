import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CameraScreen from "../screens/CameraScreen";
import StoriesScreen from "../screens/StoriesScreen";
import ChatScreen from "../screens/ChatScreen";
import MapScreen from "../screens/MapScreen";
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export const BottomNav = () => {
    const icons = {
        Map: "md-location-outline",
        Chat: "ios-chatbox-outline",
        Camera: "camera-outline",
        Users: "people-outline" // Assuming you have an icon named "people-outline"
    };

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ size, color }) => {
                    const iconName = icons[route.name];
                    return <Ionicons name={iconName} size={size} color={color} />;
                }
            })}
        >
            <Tab.Screen name="Map" component={MapScreen} />
            <Tab.Screen name="Chat" component={ChatScreen} />
            <Tab.Screen name="Camera" component={CameraScreen} />
            <Tab.Screen name="Users" component={StoriesScreen} />
            
        </Tab.Navigator>
    );
};
