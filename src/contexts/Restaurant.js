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

  const addFoodItem = (foodName, eaterName, rating, note, restaurantKey) => {
    let restaurantListClone = _.cloneDeep(restaurantsData);
    const restaurantFoodListIndex = _.findIndex(
      restaurantListClone,
      (r) => r.key === restaurantKey,
    );
    const restaurantFoodList = restaurantListClone[restaurantFoodListIndex].foodList;
    let foodListIndex = restaurantFoodList.length;
    // Check if already exiting food name
    const foodAlreadyExistsIndex = _.findIndex(
      restaurantFoodList,
      (foodItem) => foodItem.name === foodName,
    );
    if (foodAlreadyExistsIndex > -1) {
      foodListIndex = foodAlreadyExistsIndex;
      if (eaterName) {
        restaurantListClone[restaurantFoodListIndex].foodList[foodListIndex].eater.push(
          eaterName,
        );
      }
      if (rating) {
        const ratingObject = eaterName ? { name: eaterName, rating } : { rating };
        restaurantListClone[restaurantFoodListIndex].foodList[foodListIndex].stars.push(
          ratingObject,
        );
      }
      if (note) {
        const notesObject = eaterName ? { name: eaterName, note } : { note };
        restaurantListClone[restaurantFoodListIndex].foodList[foodListIndex].note.push(
          notesObject,
        );
      }
      setRestaurantsData(restaurantListClone);
    } else {
      let newFoodObject = {
        id: foodListIndex,
        key: `food_${foodListIndex}`,
        name: foodName,
        eater: [eaterName],
      };
      if (rating) {
        const ratingObject = eaterName ? { name: eaterName, rating } : { rating };
        newFoodObject.stars = [ratingObject];
      }
      if (note) {
        const notesObject = eaterName ? { name: eaterName, note } : { note };
        newFoodObject.note = [notesObject];
      }
      restaurantListClone[restaurantFoodListIndex].foodList[foodListIndex] =
        newFoodObject;
      setRestaurantsData(restaurantListClone);
    }
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
