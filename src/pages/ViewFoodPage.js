import React from 'react';
import { FlatList, View } from 'react-native';
import FoodCard from '../components/FoodCard';

const ViewFoodPage = ({ navigation, restaurant }) => {
  const foodList = restaurant.foodList;
  return (
    <View style={{ paddingTop: 20 }}>
      <FlatList
        data={foodList}
        horizontal
        contentContainerStyle={{
          justifyContent: 'space-evenly',
          flex: 1,
        }}
        renderItem={({ item }) => {
          return <FoodCard navigation={navigation} foodItem={item} />;
        }}
      />
    </View>
  );
};

export default ViewFoodPage;
