import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { SvgWithCssUri } from 'react-native-svg/css';
import ItemImage from './ItemImage';

const imageSizeWidth = 160;
const imageSizeHeight = 120;
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
        <View
          style={{
            borderTopLeftRadius: radiusNumber,
            borderTopRightRadius: radiusNumber,
            width: imageSizeWidth,
            height: imageSizeHeight,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#E3E3E3',
          }}>
          <SvgWithCssUri
            uri='https://youreats.s3.amazonaws.com/icons/fork.svg'
            width={imageSizeWidth - 40}
            height={imageSizeHeight - 40}
            fill={'grey'}
          />
        </View>
      )}
      <View style={{ padding: 6 }}>
        <Text style={{ fontWeight: '600' }}>{name}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default RestaurantCard;
