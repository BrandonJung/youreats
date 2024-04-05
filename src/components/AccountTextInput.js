import React from 'react';
import { Text, TextInput, View } from 'react-native';

const AccountTextInput = ({ title, required = false, handleTextChange, placeholder }) => {
  return (
    <View style={{ marginBottom: 10 }}>
      <Text style={{ marginBottom: 4 }}>
        {title}
        <Text style={{ color: 'red' }}>{required ? '*' : ''}</Text>
      </Text>
      <TextInput
        onChangeText={(t) => handleTextChange(t)}
        placeholder={placeholder}
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 6,
          paddingLeft: 6,
          height: 30,
          borderColor: 'black',
          borderWidth: 1,
        }}
      />
    </View>
  );
};

export default AccountTextInput;
