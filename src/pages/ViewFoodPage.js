import React, { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import FoodCard from '../components/FoodCard';
import { useRestaurant } from '../contexts/Restaurant';
import { findRestaurant } from '../constants/const_functions';
import SearchBar from '../components/SearchBar';
import _ from 'lodash';

const ViewFoodPage = ({ navigation, restaurantKey }) => {
  const { restaurantsData } = useRestaurant();
  const restaurant = findRestaurant(restaurantsData, restaurantKey);
  const masterFoodList = restaurant.foodList;
  const [foodList, setFoodList] = useState(masterFoodList);

  const [searchValue, setSearchValue] = useState('');

  const handleSearch = (passedSearchValue) => {
    if (passedSearchValue === null || passedSearchValue === '') {
      setFoodList(masterFoodList);
      return;
    }
    const foodListClone = _.cloneDeep(foodList);
    const retFoodList = foodListClone.filter((f) =>
      f.name.toLowerCase().includes(passedSearchValue.toLowerCase()),
    );
    setFoodList(retFoodList);
  };

  useEffect(() => {
    handleSearch(searchValue);
  }, [searchValue]);

  return (
    <View style={{ flex: 1 }}>
      <SearchBar
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        placeholderText={'Search by food'}
        handleSearch={handleSearch}
      />
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
    </View>
  );
};

export default ViewFoodPage;
