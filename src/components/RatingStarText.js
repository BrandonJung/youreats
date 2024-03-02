import React from 'react';
import { Text, View } from 'react-native';
import { SvgWithCssUri } from 'react-native-svg/css';

const RatingStarText = ({ rating, starSize = 12, fill = '#FFFFFF' }) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text style={{ marginRight: 4 }}>{rating}</Text>
      <SvgWithCssUri
        uri='https://youreats.s3.amazonaws.com/icons/star-filled.svg'
        fill={fill}
        stroke={'black'}
        strokeWidth={2}
        width={starSize}
        height={starSize}
      />
    </View>
  );
};

export default RatingStarText;
