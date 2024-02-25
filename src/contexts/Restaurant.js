import React, { createContext, useContext, useEffect, useState } from 'react';
import { GetFromStorage, StoreData } from '../constants/const_functions';
import _ from 'lodash';

// Create the RestaurantContext with the data type specified
// and a empty object
const RestaurantContext = createContext();

const RestaurantProvider = ({ children }) => {
  const [restaurantsData, setRestaurantsData] = useState(null);

  useEffect(() => {
    retrieveData();
  }, []);

  useEffect(() => {
    StoreData('restaurant-list', restaurantsData);
  }, [restaurantsData]);

  const addFoodItem = (foodName, eaterName, rating, notes, restaurantKey) => {
    let restaurantListClone = _.cloneDeep(restaurantsData);
    const restaurantFoodListIndex = _.findIndex(
      restaurantListClone,
      (r) => r.key === restaurantKey,
    );
    const restaurantFoodList =
      restaurantListClone[restaurantFoodListIndex].foodList;
    const foodListIndex = restaurantFoodList.length;
    const newFoodObject = {
      id: foodListIndex,
      key: `food_${foodListIndex}`,
      name: foodName,
      eater: eaterName,
      stars: rating,
      note: notes,
    };
    restaurantListClone[restaurantFoodListIndex].foodList[foodListIndex] =
      newFoodObject;
    setRestaurantsData(restaurantListClone);
  };

  const retrieveData = async () => {
    const restaurantRes = await GetFromStorage('restaurant-list');
    if (restaurantRes) {
      setRestaurantsData(restaurantRes);
    }
  };

  return (
    // This component will be used to encapsulate the whole App,
    // so all components will have access to the Context
    <RestaurantContext.Provider
      value={{
        restaurantsData,
        setRestaurantsData,
        addFoodItem,
      }}>
      {children}
    </RestaurantContext.Provider>
  );
};

// A simple hooks to facilitate the access to the RestaurantContext
// and permit components to subscribe to RestaurantContext updates
function useRestaurant() {
  const context = useContext(RestaurantContext);

  if (!context) {
    throw new Error('useRestaurant must be used within an RestaurantProvider');
  }

  return context;
}

export { RestaurantContext, RestaurantProvider, useRestaurant };
