import React, { useEffect, useState } from 'react';
import { Dimensions, FlatList, View } from 'react-native';
import FoodCard from '../components/FoodCard';
import { useRestaurant } from '../contexts/Restaurant';
import SearchBar from '../components/SearchBar';
import _ from 'lodash';

const { width, height } = Dimensions.get('window');
const cardWidth = 160;
const cardGap = (width - 2 * cardWidth) / 3;

const ViewFoodPage = ({ navigation, restaurantKey }) => {
  const [foodList, setFoodList] = useState(null);
  const [masterFoodList, setMasterFoodList] = useState(null);
  const [searchValue, setSearchValue] = useState('');

  const { retrieveFoodData, selectedFoodsList } = useRestaurant();

  useEffect(() => {
    retrieveFoodData(restaurantKey);
  }, []);

  useEffect(() => {
    if (selectedFoodsList?.length > 0) {
      setFoodList(selectedFoodsList);
      setMasterFoodList(selectedFoodsList);
    }
  }, [selectedFoodsList]);

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
