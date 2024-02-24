import React from 'react';
import { FlatList, View } from 'react-native';

const ViewPeoplePage = ({ restaurant }) => {
  return (
    <View>
      <FlatList data={restaurant.foodList} />
    </View>
  );
};

export default ViewPeoplePage;
