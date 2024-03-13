import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  GetFromStorage,
  StoreData,
  apiCall,
  findRestaurantIndex,
  returnMessage,
} from '../constants/const_functions';
import _ from 'lodash';
import { apiService } from '../constants/const_api';
import { useUser } from './User';

// Create the RestaurantContext with the data type specified
// and a empty object
const RestaurantContext = createContext();

const RestaurantProvider = ({ children }) => {
  const [restaurantsData, setRestaurantsData] = useState([]);
  const [retrievedData, setRetrievedData] = useState(false);

  const { userData } = useUser();

  useEffect(() => {
    console.log('restaurants data', restaurantsData);
  }, [restaurantsData]);

  useEffect(() => {
    if (userData && !retrievedData) {
      retrieveRestaurants();
    }
  }, [userData]);

  useEffect(() => {
    StoreData('restaurant-list', restaurantsData);
  }, [restaurantsData]);

  const retrieveRestaurants = async () => {
    try {
      const retrieveRes = await apiCall(apiService.restaurant, 'retrieveRestaurants', 'get', {
        userId: userData._id,
      });
      console.log('Retrieve Restaurant Res: ', retrieveRes.data);
      setRestaurantsData(retrieveRes?.data);
      setRetrievedData(true);
    } catch (e) {
      console.log(e);
    }
  };

  const addRestaurant = async (restaurantName) => {
    try {
      const addRes = await apiCall(apiService.restaurant, 'addRestaurant', 'post', {
        name: restaurantName,
        userId: userData._id,
      });
      console.log('Add Restaurant res: ', addRes?.data);
      if (addRes?.data?.insertedId) {
        retrieveRestaurants();
      } else {
        // Add to local storage
      }
    } catch (e) {
      console.log(e);
    }
  };

  const deleteAllRestaurants = async () => {
    try {
      const deleteRes = await apiCall(apiService.restaurant, 'deleteAllRestaurants', 'delete', {});
      const deleteFoodRest = await apiCall(apiService.food, 'deleteAllFoods', 'delete', {});
      console.log('Delete Restaurants Res: ', deleteRes?.data, deleteFoodRest?.data);
      retrieveRestaurants();
    } catch (e) {
      console.log(e);
    }
  };

  const addFoodItem = async (foodName, eaterName, rating, note, restaurantId) => {
    try {
      const foodRes = await apiCall(apiService.food, 'addFoodItem', 'post', {
        foodName,
        eaterName,
        rating,
        note,
        restaurantId,
      });
      console.log('Add Food Res: ', foodRes.data);
      if (foodRes.data) {
        retrieveRestaurants();
        return returnMessage('Success');
      }
    } catch (e) {
      console.log(e);
    }
  };

  const retrieveFoodData = async (restaurantId) => {
    const restaurantRes = restaurantsData.find((r) => r._id === restaurantId);
    if (restaurantRes) {
      const foodsListId = restaurantRes.foodListId;
      const retrieveFoodRes = await apiCall(apiService.food, 'retrieveFoods', 'get', {
        foodsListId,
      });
      if (retrieveFoodRes?.data) {
        return retrieveFoodRes.data;
      } else {
        return [];
      }
    }
  };

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

  return (
    // This component will be used to encapsulate the whole App,
    // so all components will have access to the Context
    <RestaurantContext.Provider
      value={{
        restaurantsData,
        setRestaurantsData,
        addFoodItem,
        updateRestaurantField,
        updateFoodItemField,
        addRestaurant,
        deleteAllRestaurants,
        retrieveFoodData,
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
