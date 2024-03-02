import React from 'react';
import { View } from 'react-native';
import { SvgWithCssUri } from 'react-native-svg/css';

const imageSize = 140;
const radiusNumber = 6;

const acceptedPlaceholderTypes = ['fork'];

const ImagePlaceholder = ({ type = 'fork' }) => {
  let imageType = type;
  if (!acceptedPlaceholderTypes.includes(imageType)) {
    imageType = 'fork';
  }
  const imageURL = `https://youreats.s3.amazonaws.com/icons/${imageType}.svg`;
  return (
    <View
      style={{
        marginTop: 10,
        borderRadius: radiusNumber,
        width: imageSize,
        height: imageSize,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E3E3E3',
      }}>
      <SvgWithCssUri uri={imageURL} width={imageSize - 40} height={imageSize - 40} fill={'grey'} />
    </View>
  );
};

export default ImagePlaceholder;
