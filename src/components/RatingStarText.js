import React from 'react';
import { Text, View } from 'react-native';
import { SvgWithCssUri } from 'react-native-svg/css';

const RatingStarText = ({ rating, starSize = 12 }) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <SvgWithCssUri
        uri='https://youreats.s3.amazonaws.com/icons/star.svg'
        width={starSize}
        height={starSize}
      />
      <Text style={{ marginLeft: 4 }}>{rating}</Text>
    </View>
  );
};

export default RatingStarText;
