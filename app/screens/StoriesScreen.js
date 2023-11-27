import React from 'react';
import { Text, View, Button } from 'react-native';
import { auth } from '../../firebase';

const StoriesScreen = ({ navigation }) => {
    const handleLogout = async () => {
        try {
            await auth.signOut();
            navigation.navigate('Login');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "blue" }}>
            <Text>Story Screen</Text>
            <Button title="Logout" onPress={handleLogout} />
        </View>
    );
}

export default StoriesScreen;
