import React from 'react';
import { Image, ScrollView } from 'react-native';

const imageSize = 200;

const ViewRestaurantPage = ({ restaurant }) => {
  return (
    <ScrollView>
      {restaurant.imageURL ? (
        <Image
          source={{ uri: restaurant.imageURL }}
          height={200}
          resizeMode='cover'
        />
      ) : null}
    </ScrollView>
  );
};

export default ViewRestaurantPage;
