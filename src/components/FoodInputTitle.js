import React from 'react';
import { Text } from 'react-native';

const FoodInputTitle = ({ title, required }) => {
  return (
    <Text style={{ marginTop: 16, fontWeight: '600', fontSize: 16 }}>
      {title} {required ? <Text style={{ color: 'red' }}>*</Text> : null}
    </Text>
  );
};

export default FoodInputTitle;
