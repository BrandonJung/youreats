import React from 'react';
import { TextInput } from 'react-native';

const FoodTextInput = ({
  placeholderText,
  handleOnChange,
  passedStyle,
  passedValue,
  passedKeyboardType = 'default',
  passedMultiLine = false,
}) => {
  return (
    <TextInput
      style={[
        { ...passedStyle },
        {
          backgroundColor: '#FFFFFF',
          borderColor: 'black',
          borderWidth: 1,
          padding: 8,
          borderRadius: 6,
          marginTop: 8,
        },
      ]}
      multiline={passedMultiLine}
      onChangeText={(t) => handleOnChange(t)}
      value={passedValue}
      placeholder={placeholderText ? placeholderText : ''}
      keyboardType={passedKeyboardType}
    />
  );
};

export default FoodTextInput;
