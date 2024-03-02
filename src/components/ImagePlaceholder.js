import React from 'react';
import { View } from 'react-native';
import { SvgWithCssUri } from 'react-native-svg/css';

const radiusNumber = 6;

const acceptedPlaceholderTypes = ['fork', 'restaurant'];

const ImagePlaceholder = ({
  type = 'fork',
  imageWidth = 140,
  imageHeight = 140,
  onlyTopRounded = false,
}) => {
  let imageType = type;
  if (!acceptedPlaceholderTypes.includes(imageType)) {
    imageType = 'fork';
  }
  const imageURL = `https://youreats.s3.amazonaws.com/icons/${imageType}.svg`;
  return (
    <View
      style={[
        {
          width: imageWidth,
          height: imageHeight,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#E3E3E3',
        },
        onlyTopRounded
          ? { borderTopLeftRadius: radiusNumber, borderTopRightRadius: radiusNumber }
          : { borderRadius: radiusNumber },
      ]}>
      <SvgWithCssUri
        uri={imageURL}
        width={imageWidth - 40}
        height={imageHeight - 40}
        fill={'#bebebe'}
      />
    </View>
  );
};

export default ImagePlaceholder;
