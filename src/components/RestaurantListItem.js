import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import ItemImage from './ItemImage';
import ImagePlaceholder from './ImagePlaceholder';
import { useRestaurant } from '../contexts/Restaurant';

const radiusNumber = 6;

const RestaurantListItem = ({ restaurant, navigation, cardWidth, setShowOptions }) => {
  const { name, imageURL, _id } = restaurant;
  const { retrieveFoodData } = useRestaurant();

  return (
    <TouchableOpacity
      onPress={() => {
        setShowOptions(false);
        retrieveFoodData(_id);
        navigation.navigate('RestaurantPage', {
          restaurantKey: _id,
          restaurantName: name,
        });
      }}
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: radiusNumber,
        marginTop: 10,
        flex: 1,
      }}>
      <View style={{ padding: 6 }}>
        <Text style={{ fontWeight: '600' }}>{name}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default RestaurantListItem;
