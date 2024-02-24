import React from 'react';
import { Image, ScrollView } from 'react-native';

const ViewFoodPage = ({ restaurant }) => {
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

export default ViewFoodPage;
