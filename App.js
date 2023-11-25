import React from 'react';
import { StatusBar, View, Text } from 'react-native'; // Importing from react-native
import { NavigationContainer } from '@react-navigation/native';
import { BottomNav } from './app/navigation/BottomNav';
import { useFonts, Lato_700Bold } from '@expo-google-fonts/lato'; // Corrected import statement

const App = () => {
  const [fontsLoaded] = useFonts({ // Correct usage of useFonts
    Lato_700Bold,
  });

  if (!fontsLoaded) {
    return null; // Render nothing if fonts are not loaded
  }

  return (
    <NavigationContainer>
      <BottomNav />
      <StatusBar barStyle="dark-content" />
    </NavigationContainer>
  );
};

export default App;

