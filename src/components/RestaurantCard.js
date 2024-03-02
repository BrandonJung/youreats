import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import ItemImage from './ItemImage';
import ImagePlaceholder from './ImagePlaceholder';

const radiusNumber = 6;

const RestaurantCard = ({ restaurant, navigation, cardWidth, setShowOptions }) => {
  const { name, imageURL, key } = restaurant;
  return (
    <TouchableOpacity
      onPress={() => {
        setShowOptions(false);
        navigation.navigate('RestaurantPage', {
          restaurantKey: key,
          restaurantName: name,
        });
      }}
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: radiusNumber,
        marginTop: 20,
      }}>
      {imageURL ? (
        <ItemImage
          imageURL={imageURL}
          imageHeight={120}
          imageWidth={cardWidth}
          onlyTopRounded={true}
        />
      ) : (
        <ImagePlaceholder
          type='restaurant'
          imageWidth={cardWidth}
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
