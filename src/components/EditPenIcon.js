import React from 'react';
import { SvgWithCssUri } from 'react-native-svg/css';

const EditPenIcon = ({ imageSize = 30, fill = 'darkgray' }) => {
  return (
    <SvgWithCssUri
      uri='https://youreats.s3.amazonaws.com/icons/pen.svg'
      width={imageSize}
      height={imageSize}
      fill={'darkgray'}
      style={{ marginLeft: 10 }}
    />
  );
};

export default EditPenIcon;
