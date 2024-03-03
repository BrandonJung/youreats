import React, { useEffect, useState } from 'react';
import { Alert, Dimensions, FlatList, Text, View } from 'react-native';
import RestaurantCard from '../components/RestaurantCard';
import { RemoveFromStorage, StoreData, apiCall } from '../constants/const_functions';
import _ from 'lodash';
import OptionsPopup from '../components/OptionsPopup';
import OptionsButton from '../components/OptionsButton';
import { useRestaurant } from '../contexts/Restaurant';
import { apiService } from '../constants/const_api';

const { width, height } = Dimensions.get('window');
const cardWidth = 160;
const cardGap = (width - 2 * cardWidth) / 3;

const HomePage = ({ navigation }) => {
  const [showOptions, setShowOptions] = useState(false);

  const { restaurantsData, setRestaurantsData } = useRestaurant();

  const addNewRestaurant = (restaurantName) => {
    if (!restaurantName) {
      Alert.alert('Missing restaurant name');
      return;
    }
    let restaurantListClone = _.cloneDeep(restaurantsData);
    if (restaurantListClone) {
      for (let restaurant of restaurantListClone) {
        if (restaurant.name.toLowerCase() === restaurantName.toLowerCase()) {
          Alert.alert('Restaurant name already exists');
          return;
        }
      }
    }
    const newIndex = restaurantListClone.length;
    const newRestaurantObject = {
      id: newIndex,
      key: `rest_${newIndex}`,
      name: restaurantName,
      imageURL: '',
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

  const retrieveData = async () => {
    try {
      const res = await apiCall(apiService.food, 'retrieveList', 'get', { userId: 'hello1' });
      console.log('res: ', res);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    retrieveData();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {restaurantsData?.length > 0 ? (
        <FlatList
          data={restaurantsData}
          numColumns={2}
          columnWrapperStyle={{ columnGap: cardGap, marginHorizontal: cardGap }}
          renderItem={({ item, index }) => {
            return (
              <RestaurantCard
                restaurant={item}
                navigation={navigation}
                cardWidth={cardWidth}
                setShowOptions={setShowOptions}
              />
            );
          }}
        />
      ) : (
        <Text style={{ flex: 1 }}>Add a restaurant to start!</Text>
      )}
      <View>
        {showOptions ? (
          <OptionsPopup
            showOptions={showOptions}
            setShowOptions={setShowOptions}
            addNewRestaurant={addNewRestaurant}
            resetRestaurants={resetRestaurants}
            showAddFood={restaurantsData?.length > 0}
            navigation={navigation}
          />
        ) : null}
        <OptionsButton showOptions={showOptions} setShowOptions={setShowOptions} />
      </View>
    </View>
  );
};

export default HomePage;
