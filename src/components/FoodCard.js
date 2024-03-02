import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, Image, View } from 'react-native';
import { SvgWithCssUri } from 'react-native-svg/css';
import { calculateAverageRating } from '../constants/const_functions';

const imageSizeWidth = 160;
const imageSizeHeight = 120;
const radiusNumber = 6;
const starSize = 12;

const FoodCard = ({ navigation, foodItem, restaurantKey }) => {
  const { name, eater, note, stars, imageURL } = foodItem;
  const [foodName, setFoodName] = useState(name ?? null);

  const averageRating = calculateAverageRating(stars);
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('EditFoodPage', { foodItem, restaurantKey, foodName, setFoodName })
      }
      style={{ backgroundColor: '#FFFFFF', borderRadius: radiusNumber, marginTop: 20 }}>
      {imageURL ? (
        <Image
          width={imageSizeWidth}
          height={imageSizeHeight}
          source={{
            uri: imageURL,
          }}
          style={{
            borderTopLeftRadius: radiusNumber,
            borderTopRightRadius: radiusNumber,
          }}
          resizeMode='cover'
        />
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
        <Text style={{ fontWeight: '600' }}>{foodName}</Text>
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
