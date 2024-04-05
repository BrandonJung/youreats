import React from 'react';
import { View } from 'react-native';

const socialIconSize = 50;

const SocialIcon = ({}) => {
  return (
    <View
      style={{
        height: socialIconSize,
        width: socialIconSize,
        backgroundColor: 'grey',
        marginHorizontal: 10,
        borderRadius: 50,
      }}
    />
  );
};

export default SocialIcon;
