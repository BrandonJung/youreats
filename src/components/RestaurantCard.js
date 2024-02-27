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
      style={{
        padding: 10,
        backgroundColor: '#FFFFFF',
        marginTop: 16,
        marginHorizontal: 20,
        borderRadius: 6,
      }}>
      <Text>{restaurant.name}</Text>
    </TouchableOpacity>
  );
};

export default RestaurantCard;
