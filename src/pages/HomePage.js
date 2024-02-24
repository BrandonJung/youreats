import React, { useEffect, useState } from 'react';
import { Alert, FlatList, View } from 'react-native';
import RestaurantCard from '../components/RestaurantCard';
import {
  GetFromStorage,
  RemoveFromStorage,
  StoreData,
} from '../constants/const_functions';
import _ from 'lodash';
import OptionsPopup from '../components/OptionsPopup';
import OptionsButton from '../components/OptionsButton';

const HomePage = ({ navigation }) => {
  const [showOptions, setShowOptions] = useState(false);
  const [restaurantList, setRestaurantList] = useState([]);

  const retrieveRestaurantList = async () => {
    const restaurantRes = await GetFromStorage('restaurant-list');
    if (restaurantRes) {
      setRestaurantList(restaurantRes);
    }
  };

  useEffect(() => {
    retrieveRestaurantList();
  }, []);

  const addNewRestaurant = (restaurantName) => {
    if (!restaurantName) {
      Alert.alert('Missing restaurant name');
      return;
    }
    let restaurantListClone = _.cloneDeep(restaurantList);
    const newIndex = restaurantListClone.length;
    const newRestaurantObject = {
      id: newIndex,
      key: `rest_${newIndex}`,
      name: restaurantName,
      imageURL: 'https://youreats.s3.amazonaws.com/images/stock-resto.png',
      foodList: [],
    };
    restaurantListClone[newIndex] = newRestaurantObject;
    setRestaurantList(restaurantListClone);
    StoreData('restaurant-list', restaurantListClone);
  };

  const resetRestaurants = async () => {
    const deleteRestaurants = await RemoveFromStorage('restaurant-list');
    setRestaurantList([]);
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={restaurantList}
        renderItem={({ item, index }) => {
          return <RestaurantCard restaurant={item} navigation={navigation} />;
        }}
      />
      <View>
        {showOptions ? (
          <OptionsPopup
            showOptions={showOptions}
            setShowOptions={setShowOptions}
            addNewRestaurant={addNewRestaurant}
            resetRestaurants={resetRestaurants}
          />
        ) : null}
        <OptionsButton
          showOptions={showOptions}
          setShowOptions={setShowOptions}
        />
      </View>
    </View>
  );
};

export default HomePage;
