import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { calculateAverageRating } from '../constants/const_functions';
import ItemImage from './ItemImage';
import ImagePlaceholder from './ImagePlaceholder';
import RatingStarText from './RatingStarText';

const radiusNumber = 6;
const starSize = 12;

const FoodCard = ({ navigation, foodItem, restaurantKey, cardWidth }) => {
  const { name, eater, notes, ratings, imageURL } = foodItem;

  const averageRating = calculateAverageRating(ratings);
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('EditFoodPage', { foodItem, restaurantKey })}
      style={{ backgroundColor: '#FFFFFF', borderRadius: radiusNumber, marginBottom: 20 }}>
      {imageURL ? (
        <ItemImage
          imageURL={imageURL}
          imageHeight={120}
          imageWidth={cardWidth}
          onlyTopRounded={true}
        />
      ) : (
        <ImagePlaceholder imageWidth={cardWidth} imageHeight={120} onlyTopRounded={true} />
      )}

      <View style={{ padding: 6, flex: 1 }}>
        <Text style={{ fontWeight: '600', maxWidth: cardWidth }}>{name}</Text>
        {averageRating ? (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'flex-end',
              marginTop: 6,
              flex: 1,
            }}>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
              <RatingStarText rating={averageRating} />
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
