import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const RestaurantCard = ({ foodList, name, bgColor, navigation }) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('FoodPage', { foodList })}
      style={{ backgroundColor: bgColor ? bgColor : 'red', padding: 6 }}>
      <Text>{name}</Text>
    </TouchableOpacity>
  );
};

export default RestaurantCard;
