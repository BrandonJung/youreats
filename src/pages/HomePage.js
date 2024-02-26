import React, { useState } from 'react';
import { Alert, FlatList, Text, View } from 'react-native';
import RestaurantCard from '../components/RestaurantCard';
import { RemoveFromStorage, StoreData } from '../constants/const_functions';
import _ from 'lodash';
import OptionsPopup from '../components/OptionsPopup';
import OptionsButton from '../components/OptionsButton';
import { useRestaurant } from '../contexts/Restaurant';

const HomePage = ({ navigation }) => {
  const [showOptions, setShowOptions] = useState(false);

  const { restaurantsData, setRestaurantsData } = useRestaurant();

  const addNewRestaurant = (restaurantName) => {
    if (!restaurantName) {
      Alert.alert('Missing restaurant name');
      return;
    }
    let restaurantListClone = _.cloneDeep(restaurantsData);
    const newIndex = restaurantListClone.length;
    const newRestaurantObject = {
      id: newIndex,
      key: `rest_${newIndex}`,
      name: restaurantName,
      imageURL: 'https://youreats.s3.amazonaws.com/images/stock-resto.png',
      foodList: [],
    };
    restaurantListClone[newIndex] = newRestaurantObject;
    setRestaurantsData(restaurantListClone);
    StoreData('restaurant-list', restaurantListClone);
  };

  const resetRestaurants = async () => {
    const deleteRestaurants = await RemoveFromStorage('restaurant-list');
    setRestaurantsData([]);
  };

  return (
    <View style={{ flex: 1 }}>
      {restaurantsData?.length > 0 ? (
        <FlatList
          data={restaurantsData}
          renderItem={({ item, index }) => {
            return <RestaurantCard restaurant={item} navigation={navigation} />;
          }}
        />
      ) : (
        <Text>Add a restaurant to start!</Text>
      )}
      <View>
        {showOptions ? (
          <OptionsPopup
            showOptions={showOptions}
            setShowOptions={setShowOptions}
            addNewRestaurant={addNewRestaurant}
            resetRestaurants={resetRestaurants}
            navigation={navigation}
          />
        ) : null}
        <OptionsButton showOptions={showOptions} setShowOptions={setShowOptions} />
      </View>
    </View>
  );
};

export default HomePage;
