import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const RestaurantCard = ({ restaurant, navigation }) => {
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('RestaurantPage', {
          restaurant: restaurant,
        })
      }
      style={{ padding: 6 }}>
      <Text>{restaurant.name}</Text>
    </TouchableOpacity>
  );
};

export default RestaurantCard;
