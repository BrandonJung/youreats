import React, { useState } from 'react';
import { Alert, Dimensions, FlatList, Text, View } from 'react-native';
import RestaurantCard from '../components/RestaurantCard';
import _ from 'lodash';
import OptionsPopup from '../components/OptionsPopup';
import OptionsButton from '../components/OptionsButton';
import { useRestaurant } from '../contexts/Restaurant';

const { width, height } = Dimensions.get('window');
const cardWidth = 160;
const cardGap = (width - 2 * cardWidth) / 3;

const HomePage = ({ navigation }) => {
  const [showOptions, setShowOptions] = useState(false);

  const { restaurantsData, setRestaurantsData, addRestaurant } = useRestaurant();

  const handleAddRestaurant = (restaurantName) => {
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
    addRestaurant(restaurantName);
  };

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
            handleAddRestaurant={handleAddRestaurant}
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
