import React, { Component } from 'react';
import { View, Button, TextInput } from 'react-native';
import { auth, firestore } from '../../firebase'; 
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '', // Add a name field in the state
      email: '',
      password: '',
    };

    // Bind the function properly
    this.onSignUp = this.onSignUp.bind(this);
  }

  async onSignUp() {
    const { name, email, password } = this.state;
  
    try {
      // Create a new user with email and password
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
  
      // Access the user object
      const user = userCredential.user;
  
      // Create a Firestore document reference for the user
      const userDocRef = doc(firestore, 'users', user.uid);
  
      // Set user data in Firestore
      await setDoc(userDocRef, {
        name: name,
        email: email,
        password: password
      });
  
      console.log('User login successfully:', user);
    } catch (error) {
      console.error('Error during Login:', error);
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
          title="Login"
        />
      </View>
    );
  }
}

export default Login;