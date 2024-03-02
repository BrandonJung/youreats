import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const OptionsButton = ({ setShowOptions, showOptions }) => {
  return (
    <TouchableOpacity style={styles.addButton} onPress={() => setShowOptions(!showOptions)}>
      <Text style={{ fontSize: 20 }}>+</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  addButton: {
    position: 'absolute',
    // With bottom nav
    // bottom: 16,
    // right: 16,
    bottom: 45,
    right: 40,
    backgroundColor: 'lightblue',
    width: 50,
    height: 50,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default OptionsButton;
