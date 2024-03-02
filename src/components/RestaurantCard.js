import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import ItemImage from './ItemImage';
import ImagePlaceholder from './ImagePlaceholder';

const radiusNumber = 6;

const RestaurantCard = ({ restaurant, navigation }) => {
  const { name, imageURL, key } = restaurant;
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('RestaurantPage', {
          restaurantKey: key,
          restaurantName: name,
        })
      }
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: radiusNumber,
        marginTop: 20,
      }}>
      {imageURL ? (
        <ItemImage imageURL={imageURL} imageHeight={120} imageWidth={160} onlyTopRounded={true} />
      ) : (
        <ImagePlaceholder
          type='restaurant'
          imageWidth={160}
          imageHeight={120}
          onlyTopRounded={true}
        />
      )}
      <View style={{ padding: 6 }}>
        <Text style={{ fontWeight: '600' }}>{name}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default RestaurantCard;
