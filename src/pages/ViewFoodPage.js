import React from 'react';
import { FlatList } from 'react-native';
import FoodCard from '../components/FoodCard';
import { useRestaurant } from '../contexts/Restaurant';
import { findRestaurant } from '../constants/const_functions';

const ViewFoodPage = ({ navigation, restaurantKey }) => {
  const { restaurantsData } = useRestaurant();
  const restaurant = findRestaurant(restaurantsData, restaurantKey);
  const foodList = restaurant.foodList;
  return (
    <FlatList
      data={foodList}
      numColumns={2}
      columnWrapperStyle={{
        flex: 1,
        justifyContent: 'space-evenly',
      }}
      renderItem={({ item }) => {
        return <FoodCard navigation={navigation} foodItem={item} restaurantKey={restaurantKey} />;
      }}
    />
  );
};

export default ViewFoodPage;
