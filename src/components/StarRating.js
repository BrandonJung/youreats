import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { SvgWithCssUri } from 'react-native-svg/css';

const starRatingSize = 40;
const marginLeftAmount = 16;

const StarRating = ({ rating, setRating }) => {
  const filledStarURL = 'https://youreats.s3.amazonaws.com/icons/star-filled.svg';

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 8 }}>
      <TouchableOpacity onPress={() => setRating(1)}>
        <SvgWithCssUri
          uri='https://youreats.s3.amazonaws.com/icons/star-filled.svg'
          width={starRatingSize}
          height={starRatingSize}
          fill={rating >= 1 ? 'yellow' : '#F6F6F6'}
          stroke={'black'}
          strokeWidth={2}
          style={{ marginLeft: marginLeftAmount }}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setRating(2)}>
        <SvgWithCssUri
          uri='https://youreats.s3.amazonaws.com/icons/star-filled.svg'
          width={starRatingSize}
          height={starRatingSize}
          fill={rating >= 2 ? 'yellow' : '#F6F6F6'}
          stroke={'black'}
          strokeWidth={2}
          style={{ marginLeft: marginLeftAmount }}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setRating(3)}>
        <SvgWithCssUri
          uri='https://youreats.s3.amazonaws.com/icons/star-filled.svg'
          width={starRatingSize}
          height={starRatingSize}
          fill={rating >= 3 ? 'yellow' : '#F6F6F6'}
          stroke={'black'}
          strokeWidth={2}
          style={{ marginLeft: marginLeftAmount }}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setRating(4)}>
        <SvgWithCssUri
          uri={filledStarURL}
          width={starRatingSize}
          height={starRatingSize}
          fill={rating >= 4 ? 'yellow' : '#F6F6F6'}
          stroke={'black'}
          strokeWidth={2}
          style={{ marginLeft: marginLeftAmount }}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setRating(5)}>
        <SvgWithCssUri
          uri={filledStarURL}
          width={starRatingSize}
          height={starRatingSize}
          fill={rating === 5 ? 'yellow' : '#F6F6F6'}
          stroke={'black'}
          strokeWidth={2}
          style={{ marginLeft: marginLeftAmount }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default StarRating;
