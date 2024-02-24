import React from 'react';
import { FlatList, View, Text } from 'react-native';

const ViewFoodPage = ({ restaurant }) => {
  const foodList = restaurant.foodList;
  return (
    <View>
      <FlatList
        data={foodList}
        renderItem={({ item }) => {
          return <Text>{item.name}</Text>;
        }}
      />
    </View>
  );
};

export default ViewFoodPage;
