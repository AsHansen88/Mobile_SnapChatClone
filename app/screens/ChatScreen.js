import React from "react";
import { FlatList, Text, View, StyleSheet } from 'react-native';
import { Chats } from "../chats/Chats";

const ChatScreen = () => {
    // Example userData array
    const userData = [
        { name: 'Alice', min: '5 min ago' },
        { name: 'Bob', min: '10 min ago' },
        // ... other users
    ];

    return (
        <View>
            <FlatList
                data={userData}
                keyExtractor={(item) => item.name}
                renderItem={({ item }) => <Chats name={item.name} timeAgo={item.min} />}
                ItemSeparatorComponent={() => <View style={styles.divider} />}
            />        
        </View>
    );
};

// Example styles
const styles = StyleSheet.create({
    divider: {
        height: 1,
        width: "100%",
        backgroundColor: "#CED0CE",
    },
    // ... other styles if needed
});

export default ChatScreen;
