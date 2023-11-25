import React from 'react'
import { View, Text } from 'react-native-web'
import CameraScreen from './app/screens/CameraScreen'
import { BottomNav } from './app/navigation/BottomNav'
import {NavigationContainer} from '@react-navigation/native'
import { StatusBar } from 'react-native'

const App = () => {
  return(

  <NavigationContainer>
  
  <BottomNav />
  <StatusBar barStyle="dark-content" />

  </NavigationContainer>
  )
 }

export default App
