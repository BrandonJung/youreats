import React from 'react';
import { FlatList, View } from 'react-native';
import FoodCard from '../components/FoodCard';

const ViewFoodPage = ({ navigation, restaurant }) => {
  const foodList = restaurant.foodList;
  return (
    <View>
      <FlatList
        data={foodList}
        numColumns={2}
        columnWrapperStyle={{
          flex: 1,
          justifyContent: 'space-evenly',
        }}
        renderItem={({ item }) => {
          return <FoodCard navigation={navigation} foodItem={item} />;
        }}
      />
    </View>
  );
};

export default ViewFoodPage;
