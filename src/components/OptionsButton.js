import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const OptionsButton = ({ setShowOptions, showOptions }) => {
  return (
    <TouchableOpacity
      style={styles.addButton}
      onPress={() => setShowOptions(!showOptions)}>
      <Text style={{ fontSize: 20 }}>+</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  addButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor: 'lightblue',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default OptionsButton;
