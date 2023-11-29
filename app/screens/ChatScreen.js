import React, { useEffect, useCallback, useState, useLayoutEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-elements';
import { auth } from '../../firebase';
import { GiftedChat } from 'react-native-gifted-chat';

const ChatScreen = ({ navigation }) => {
    const [messages, setMessages] = useState([]);

    const signOut = () => {
        auth.signOut().then(() => {
            navigation.replace("Login");
        }).catch((error) => {
            // Handle errors here, e.g., show a toast notification
            console.log('Sign out error:', error);
        });
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <View style={{ marginLeft: 20 }}>
                    <Avatar
                        rounded
                        source={{
                            uri: auth?.currentUser?.photoURL,
                        }}
                    />
                </View>
            ),
            headerRight: () => (
                <TouchableOpacity 
                    style={{ marginRight: 10 }}
                    onPress={signOut}
                >
                    <Text>Logout</Text>
                </TouchableOpacity>
            )
        });
    }, [navigation]);

    useEffect(() => {
        setMessages([
            // This is a sample message. Replace with your message fetching logic
            {
                _id: 1,
                text: 'Hello developer',
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'React Native',
                    avatar: 'https://placeimg.com/140/140/any',
                },
            },
        ]);
    }, []);

    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages));
    }, []);

    return (
        <GiftedChat
            messages={messages}
            showAvatarForEveryMessage={true}
            onSend={messages => onSend(messages)}
            user={{
                _id: auth?.currentUser?.email,
                name: auth?.currentUser?.displayName,
                avatar: auth?.currentUser?.photoURL
                          
        }}
        />
        
        
    );
}

const styles = StyleSheet.create({
    // Define your styles here if needed
});

export default ChatScreen;