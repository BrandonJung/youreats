import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const RestaurantCard = ({ foodList, name, bgColor, navigation }) => {
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('RestaurantPage', {
          foodList,
          restaurantName: name,
        })
      }
      style={{ padding: 6 }}>
      <Text>{name}</Text>
    </TouchableOpacity>
  );
};

export default RestaurantCard;
