import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { SvgWithCssUri } from 'react-native-svg/css';

const starRatingSize = 40;
const marginLeftAmount = 16;

const StarRating = ({ rating, setRating }) => {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 8 }}>
      <TouchableOpacity onPress={() => setRating(1)}>
        <SvgWithCssUri
          uri='https://youreats.s3.amazonaws.com/icons/star.svg'
          width={starRatingSize}
          height={starRatingSize}
          fill={rating >= 1 ? 'blue' : ''}
          style={{ marginLeft: marginLeftAmount }}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setRating(2)}>
        <SvgWithCssUri
          uri='https://youreats.s3.amazonaws.com/icons/star.svg'
          width={starRatingSize}
          height={starRatingSize}
          fill={rating >= 2 ? 'blue' : ''}
          style={{ marginLeft: marginLeftAmount }}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setRating(3)}>
        <SvgWithCssUri
          uri='https://youreats.s3.amazonaws.com/icons/star.svg'
          width={starRatingSize}
          height={starRatingSize}
          fill={rating >= 3 ? 'blue' : ''}
          style={{ marginLeft: marginLeftAmount }}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setRating(4)}>
        <SvgWithCssUri
          uri='https://youreats.s3.amazonaws.com/icons/star.svg'
          width={starRatingSize}
          height={starRatingSize}
          fill={rating >= 4 ? 'blue' : ''}
          style={{ marginLeft: marginLeftAmount }}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setRating(5)}>
        <SvgWithCssUri
          uri='https://youreats.s3.amazonaws.com/icons/star.svg'
          width={starRatingSize}
          height={starRatingSize}
          fill={rating === 5 ? 'blue' : ''}
          style={{ marginLeft: marginLeftAmount }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default StarRating;
