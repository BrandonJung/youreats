import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { SvgWithCssUri } from 'react-native-svg/css';

const starRatingSize = 40;
const marginLeftAmount = 16;

const StarRating = ({ rating, setRating }) => {
  const filledStarURL = 'https://youreats.s3.amazonaws.com/icons/star-filled.svg';

  const starButton = (passedRating) => {
    return (
      <TouchableOpacity onPress={() => setRating(passedRating)}>
        <SvgWithCssUri
          uri={filledStarURL}
          width={starRatingSize}
          height={starRatingSize}
          fill={rating >= passedRating ? '#FFe16F' : '#F6F6F6'}
          stroke={'black'}
          strokeWidth={2}
          style={{ marginLeft: marginLeftAmount }}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 8 }}>
      {starButton(1)}
      {starButton(2)}
      {starButton(3)}
      {starButton(4)}
      {starButton(5)}
    </View>
  );
};

export default StarRating;
