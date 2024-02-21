import React from 'react';
import { FlatList, View } from 'react-native';
import { TestRestaurants } from '../dummyData';
import RestaurantCard from '../components/RestaurantCard';

const HomePage = ({ navigation }) => {
  return (
    <View>
      <FlatList
        data={TestRestaurants}
        renderItem={({ item, index }) => {
          return (
            <RestaurantCard
              foodList={item.foodList}
              name={item.name}
              navigation={navigation}
            />
          );
        }}
      />
    </View>
  );
};

export default HomePage;
