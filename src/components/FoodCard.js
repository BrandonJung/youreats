import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SvgWithCssUri } from 'react-native-svg/css';
import { calculateAverageRating } from '../constants/const_functions';
import ItemImage from './ItemImage';
import ImagePlaceholder from './ImagePlaceholder';

const radiusNumber = 6;
const starSize = 12;

const FoodCard = ({ navigation, foodItem, restaurantKey }) => {
  const { name, eater, notes, ratings, imageURL } = foodItem;

  const averageRating = calculateAverageRating(ratings);
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('EditFoodPage', { foodItem, restaurantKey })}
      style={{ backgroundColor: '#FFFFFF', borderRadius: radiusNumber, marginTop: 20 }}>
      {imageURL ? (
        <ItemImage imageURL={imageURL} imageHeight={120} imageWidth={160} onlyTopRounded={true} />
      ) : (
        <ImagePlaceholder imageWidth={160} imageHeight={120} onlyTopRounded={true} />
      )}

      <View style={{ padding: 6, flex: 1 }}>
        <Text style={{ fontWeight: '600', maxWidth: 160 }}>{name}</Text>
        {averageRating ? (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'flex-end',
              marginTop: 6,
              flex: 1,
            }}>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
              <SvgWithCssUri
                uri='https://youreats.s3.amazonaws.com/icons/star.svg'
                width={starSize}
                height={starSize}
              />
              <Text style={{ marginLeft: 4 }}>{averageRating}</Text>
            </View>
          </View>
        ) : (
          <View style={{ height: starSize, width: starSize }} />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default FoodCard;
