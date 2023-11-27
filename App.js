import React from 'react';
import { StatusBar, View, Text } from 'react-native'; // Importing from react-native
import { NavigationContainer } from '@react-navigation/native';
import { BottomNav } from './app/navigation/BottomNav';
import { useFonts, Lato_700Bold } from '@expo-google-fonts/lato'; // Corrected import statement
import { createStackNavigator } from '@react-navigation/stack'
import LandingScreen from './app/components/auth/Landing'
import RegisterScreen from './app/components/auth/Register';
import * as firebaseapp from './firebase'


const App = () => {
  const [fontsLoaded] = useFonts({ // Correct usage of useFonts
    Lato_700Bold,
  });

  const stack = createStackNavigator();

  if (!fontsLoaded) {
    return null; 
  }

  return (

    <NavigationContainer>
      
      <stack.Navigator initialRouteName="Landing">

              <stack.Screen
                  name="Landing"
                  component={LandingScreen}
                  options={{headerShown: false}}
                />
              <stack.Screen
                  name="Register"
                  component={RegisterScreen}
                />
                
              
                
      </stack.Navigator>

      
      <StatusBar barStyle="dark-content" />
    </NavigationContainer>
    
  );
};

export default App;

