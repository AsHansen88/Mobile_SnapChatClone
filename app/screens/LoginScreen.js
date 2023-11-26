import React, { useState } from "react";
import { Text, View, Button, StyleSheet, TextInput } from 'react-native';
import axios from 'axios';
 

const LoginScreen = () => {

    const ApiKey = "AIzaSyDTVhUc3zC_D_91SgNku2cqCWLrr-xrv18"; 
    const url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=";

    const [ EnteredEmail, setEnteredEmail ] = useState("Anders@a.dk")
    const [ EnteredPassword, setEnteredPassword ] = useState("123456")

    async function login() {
        try {
            const response = await axios.post(url + ApiKey, {
                email: EnteredEmail,
                password: EnteredPassword,
                returnSecureToken: true
            })
           alert("Logget ind" + response.data.idToken); 

        } catch (error) {

            alert("Ikke logget ind" + error.response.data.error.errors[0].message);
        }
    }

    return (
        <View style={styles.container}>
        <Text>Login Screen</Text>
        <TextInput 
        onChangeText={newText => setEnteredEmail(newText)}
        value={EnteredEmail}
        />
        <TextInput 
        onChangeText={newText => setEnteredPassword(newText)}
        value={EnteredPassword}
        />
            <Button
                title='Log in'
                onPress={login}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default LoginScreen;
