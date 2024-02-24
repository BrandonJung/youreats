import React from 'react';
import { Text } from 'react-native';

const FoodInputTitle = ({ title }) => {
  return (
    <Text style={{ marginTop: 16, fontWeight: '600', fontSize: 16 }}>
      {title}
    </Text>
  );
};

export default FoodInputTitle;
