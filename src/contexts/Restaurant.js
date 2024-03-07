import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  GetFromStorage,
  StoreData,
  apiCall,
  findRestaurantIndex,
} from '../constants/const_functions';
import _ from 'lodash';
import { apiService } from '../constants/const_api';
import { useUser } from './User';

// Create the RestaurantContext with the data type specified
// and a empty object
const RestaurantContext = createContext();

const RestaurantProvider = ({ children }) => {
  const [restaurantsData, setRestaurantsData] = useState([]);

  const { retrieveUserId } = useUser();

  useEffect(() => {
    retrieveData();
  }, []);

  useEffect(() => {
    StoreData('restaurant-list', restaurantsData);
  }, [restaurantsData]);

  const updateRestaurantField = (fieldKey, fieldValue, restaurantKey) => {
    const restaurantsDataClone = _.cloneDeep(restaurantsData);
    const restaurantIndex = findRestaurantIndex(restaurantsDataClone, restaurantKey);
    if (restaurantIndex > -1) {
      restaurantsDataClone[restaurantIndex][`${fieldKey}`] = fieldValue;
      setRestaurantsData(restaurantsDataClone);
    }
  };

  const updateFoodItemField = (fieldKey, fieldValue, foodItemKey, restaurantKey) => {
    const restaurantsDataClone = _.cloneDeep(restaurantsData);
    const restaurantIndex = findRestaurantIndex(restaurantsDataClone, restaurantKey);
    const foodList = restaurantsDataClone[restaurantIndex].foodList;
    const foodListIndex = _.findIndex(foodList, (foodItem) => foodItem.key === foodItemKey);
    if (foodListIndex > -1) {
      foodList[foodListIndex][`${fieldKey}`] = fieldValue;
      restaurantsDataClone[restaurantIndex].foodList = foodList;
      setRestaurantsData(restaurantsDataClone);
    }
  };

  const AddFoodItem = (foodName, eaterName, rating, note, restaurantKey) => {
    const restaurantsDataClone = _.cloneDeep(restaurantsData);
    const restaurantIndex = findRestaurantIndex(restaurantsDataClone, restaurantKey);
    const restaurantFoodList = restaurantsDataClone[restaurantIndex].foodList;
    let foodListIndex = restaurantFoodList.length;
    // Check if already exiting food name
    const foodAlreadyExistsIndex = _.findIndex(
      restaurantFoodList,
      (foodItem) => foodItem.name.toLowerCase() === foodName.toLowerCase(),
    );
    if (foodAlreadyExistsIndex > -1) {
      foodListIndex = foodAlreadyExistsIndex;
      const eaterArray = restaurantsDataClone[restaurantIndex].foodList[foodListIndex].eater;
      const ratingsArray = restaurantsDataClone[restaurantIndex].foodList[foodListIndex].ratings;
      const notesArray = restaurantsDataClone[restaurantIndex].foodList[foodListIndex].notes;
      if (eaterName && !eaterArray.includes(eaterName)) {
        restaurantsDataClone[restaurantIndex].foodList[foodListIndex].eater.push(eaterName);
      }
      if (rating) {
        const ratingObject = eaterName ? { name: eaterName, rating } : { rating };
        if (ratingsArray) {
          restaurantsDataClone[restaurantIndex].foodList[foodListIndex].ratings.push(ratingObject);
        } else {
          restaurantsDataClone[restaurantIndex].foodList[foodListIndex].ratings = [ratingObject];
        }
      }
      if (note) {
        const notesObject = eaterName ? { name: eaterName, note } : { note };
        if (notesArray) {
          restaurantsDataClone[restaurantIndex].foodList[foodListIndex].notes.push(notesObject);
        } else {
          restaurantsDataClone[restaurantIndex].foodList[foodListIndex].notes = [notesObject];
        }
      }
      setRestaurantsData(restaurantsDataClone);
    } else {
      const newFoodObject = {
        id: foodListIndex,
        key: `food_${foodListIndex}`,
        name: foodName,
        eater: [eaterName],
      };
      if (rating) {
        const ratingObject = eaterName ? { name: eaterName, rating } : { rating };
        newFoodObject.ratings = [ratingObject];
      }
      if (note) {
        const notesObject = eaterName ? { name: eaterName, note } : { note };
        newFoodObject.notes = [notesObject];
      }
      restaurantsDataClone[restaurantIndex].foodList[foodListIndex] = newFoodObject;
      setRestaurantsData(restaurantsDataClone);
    }
  };

  const retrieveRestaurants = async () => {
    try {
      const retrieveRes = await apiCall(apiService.restaurant, 'retrieve', 'get', {});
    } catch (e) {
      console.log(e);
    }
  };

  const addRestaurant = async (restaurantName) => {
    try {
      // const addRes = await apiCall(apiService.restaurant, 'add', 'post', { name: restaurantName });
      // console.log('Add Restaurant res: ', res?.body);
      // if (addRes?.body) {
      //   retrieveRestaurants();
      // } else {
      //   // Add to local storage
      // }
    } catch (e) {
      console.log(e);
    }
  };

  // const retrieveData = async () => {
  //   const restaurantRes = await GetFromStorage('restaurant-list');
  //   if (restaurantRes) {
  //     setRestaurantsData(restaurantRes);
  //   }
  // };

  const retrieveData = async () => {
    try {
      // const res = await apiCall(apiService.food, '', 'get', {});
      // console.log('res: ', res.data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    // This component will be used to encapsulate the whole App,
    // so all components will have access to the Context
    <RestaurantContext.Provider
      value={{
        restaurantsData,
        setRestaurantsData,
        AddFoodItem,
        updateRestaurantField,
        updateFoodItemField,
        addRestaurant,
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
