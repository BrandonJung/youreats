import React from 'react';
import { Image } from 'react-native';

const radiusNumber = 6;

const ItemImage = ({ imageURL, imageWidth = 140, imageHeight = 140, onlyTopRounded = false }) => {
  return (
    <Image
      width={imageWidth}
      height={imageHeight}
      source={{
        uri: imageURL,
      }}
      style={[
        onlyTopRounded
          ? { borderTopLeftRadius: radiusNumber, borderTopRightRadius: radiusNumber }
          : {
              borderRadius: radiusNumber,
            },
      ]}
      resizeMode='cover'
    />
  );
};

export default ItemImage;
