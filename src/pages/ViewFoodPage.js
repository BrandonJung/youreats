import React, { useEffect, useState } from 'react';
import { Dimensions, FlatList, View } from 'react-native';
import FoodCard from '../components/FoodCard';
import { useRestaurant } from '../contexts/Restaurant';
import { findRestaurant } from '../constants/const_functions';
import SearchBar from '../components/SearchBar';
import _ from 'lodash';

const { width, height } = Dimensions.get('window');
const cardWidth = 160;
const cardGap = (width - 2 * cardWidth) / 3;

const ViewFoodPage = ({ navigation, restaurantKey }) => {
  const { restaurantsData } = useRestaurant();
  const [masterFoodList, setMasterFoodList] = useState(null);
  const [foodList, setFoodList] = useState(masterFoodList);
  const [searchValue, setSearchValue] = useState('');

  const retrieveData = (passedRestaurantData) => {
    const restaurant = findRestaurant(passedRestaurantData, restaurantKey);
    setMasterFoodList(restaurant.foodList);
  };

  useEffect(() => {
    setFoodList(masterFoodList);
  }, [masterFoodList]);

  useEffect(() => {
    retrieveData(restaurantsData);
  }, [restaurantsData]);

  const handleSearch = (passedSearchValue) => {
    if (passedSearchValue === null || passedSearchValue === '') {
      setFoodList(masterFoodList);
      return;
    }
    const foodListClone = _.cloneDeep(masterFoodList);
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
        columnWrapperStyle={{ columnGap: cardGap, marginHorizontal: cardGap }}
        renderItem={({ item }) => {
          return (
            <FoodCard
              navigation={navigation}
              foodItem={item}
              restaurantKey={restaurantKey}
              cardWidth={cardWidth}
            />
          );
        }}
        keyExtractor={(item) => item.key}
      />
    </View>
  );
};

export default ViewFoodPage;
