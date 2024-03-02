import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SvgWithCssUri } from 'react-native-svg/css';
import { calculateAverageRating } from '../constants/const_functions';
import ItemImage from './ItemImage';
import ImagePlaceholder from './ImagePlaceholder';

const radiusNumber = 6;
const starSize = 12;

const FoodCard = ({ navigation, foodItem, restaurantKey }) => {
  const { name, eater, notes, rating, imageURL } = foodItem;

  const averageRating = calculateAverageRating(rating);
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('EditFoodPage', { foodItem, restaurantKey })}
      style={{ backgroundColor: '#FFFFFF', borderRadius: radiusNumber, marginTop: 20 }}>
      {imageURL ? (
        <ItemImage imageURL={imageURL} imageHeight={120} imageWidth={160} onlyTopRounded={true} />
      ) : (
        <ImagePlaceholder imageWidth={160} imageHeight={120} onlyTopRounded={true} />
      )}

      <View style={{ padding: 6 }}>
        <Text style={{ fontWeight: '600', maxWidth: 160 }}>{name}</Text>
        {averageRating ? (
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 6 }}>
            <SvgWithCssUri
              uri='https://youreats.s3.amazonaws.com/icons/star.svg'
              width={starSize}
              height={starSize}
            />
            <Text style={{ marginLeft: 4 }}>{averageRating}</Text>
          </View>
        ) : (
          <View style={{ height: starSize, width: starSize }} />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default FoodCard;
