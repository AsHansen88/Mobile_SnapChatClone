import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LandingScreen from './app/components/auth/Landing.js';
import RegisterScreen from './app/components/auth/Register.js';
import LoginScreen from './app/components/auth/Login.js';
import { auth } from './firebase'; // Make sure this is correctly set up
import { Provider } from 'react-redux';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import rootReducer from './app/redux/reducers/index'; // Correct this import
import thunk from 'redux-thunk';
import MapScreen from './app/screens/MapScreen.js';
import ChatScreen from './app/screens/ChatScreen.js';
import CameraScreen from './app/screens/CameraScreen.js';
import StoriesScreen from './app/screens/StoriesScreen.js';
import { BottomNav } from './app/navigation/BottomNav.js';

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware().concat(thunk),
});

const Stack = createStackNavigator();

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      loggedIn: false, // Initialize loggedIn
    };
  }

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      this.setState({
        loggedIn: !!user, // Simplified
        loaded: true,
      });
    });
  }

  render() {
    const { loggedIn, loaded } = this.state;

    if (!loaded) {
      return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text>Loading</Text>
        </View>
      );
    }

    if (!loggedIn) {
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Landing">
            <Stack.Screen name="Landing" component={LandingScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      );
    }

    return (
      <Provider store={store}>
        <NavigationContainer>
            
           <BottomNav />

        </NavigationContainer>
      </Provider>
    );
  }
}

export default App;
