import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign, Ionicons, FontAwesome } from '@expo/vector-icons';

const AppIcon = ({ AntName, IonName, FontAwesomeName, style, color = '#000', size = 24, onPress }) => {
  return (
    <TouchableOpacity style={[styles.icon, style]} onPress={onPress}>
      {AntName && <AntDesign name={AntName} size={size} color={color} />}
      {IonName && <Ionicons name={IonName} size={size} color={color} />}
      {FontAwesomeName && <FontAwesome name="sign-in" size={24} color="black" />}

    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  icon: {
    height: 60,
    width: 60,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0e153a"
  }
});

export default AppIcon;
