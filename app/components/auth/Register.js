import React, { Component } from 'react';
import { View, Button, TextInput } from 'react-native';
import * as firebase from '../../../firebase'
import { auth, firestore } from '../../../firebase';
import { createUserWithEmailAndPassword,setDoc } from 'firebase/auth'; 

export default class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      name: ''
    };

    // Bind the function properly
    this.onSignUp = this.onSignUp.bind(this);
  }

  async onSignUp() {
    const { email, password, name } = this.state;

    try {
      const result = await createUserWithEmailAndPassword(auth, email, password); // Use createUserWithEmailAndPassword from auth
      await setDoc(doc(firestore, 'users', auth.currentUser.uid), { name, email }); // Use firestore functions
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }
  
  

  render() {
    return (
      <View>
        <TextInput
          placeholder="name"
          onChangeText={(name) => this.setState({ name })}
        />
        <TextInput
          placeholder="email"
          onChangeText={(email) => this.setState({ email })}
        />
        <TextInput
          placeholder="password"
          secureTextEntry={true}
          onChangeText={(password) => this.setState({ password })}
        />

        <Button
          onPress={() => {
            this.onSignUp();
          }}
          title="Sign Up"
        />
      </View>
    );
  }
}