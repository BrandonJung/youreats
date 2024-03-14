import React, { createContext, useContext, useEffect, useState } from 'react';
import { GetFromStorage, StoreData, apiCall, returnMessage } from '../constants/const_functions';
import _ from 'lodash';
import { apiService } from '../constants/const_api';
import { useUser } from './User';

// Create the RestaurantContext with the data type specified
// and a empty object
const RestaurantContext = createContext();

const RestaurantProvider = ({ children }) => {
  const [restaurantsData, setRestaurantsData] = useState([]);
  const [retrievedData, setRetrievedData] = useState(false);
  const [selectedFoodsList, setSelectedFoodsList] = useState([]);
  const [selectedPeopleList, setSelectedPeopleList] = useState([]);

  const { userData } = useUser();

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
      console.log('Add Food Res: ', foodRes?.data);
      if (foodRes?.data) {
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
      const foodsArray = restaurantRes.foods;
      const retrieveFoodRes = await apiCall(apiService.food, 'retrieveFoods', 'get', {
        foodsArray,
      });
      if (retrieveFoodRes?.data) {
        setSelectedFoodsList(retrieveFoodRes.data);
        retrievePeopleList(retrieveFoodRes.data);
      } else {
        return [];
      }
    }
  };

  const retrievePeopleList = (foodArray) => {
    let retObj = {};
    let retArray = [];
    for (const foodItem of foodArray) {
      for (const eater of foodItem.eaters) {
        const foodItemRatingsArray = foodItem.ratings.filter((r) => r.eater === eater);
        const foodItemNotesArray = foodItem.notes.filter((n) => n.eater === eater);
        if (retObj[eater]) {
          retObj[eater].foods.push({
            name: foodItem.name,
            ratings: foodItemRatingsArray,
            notes: foodItemNotesArray,
          });
        } else {
          retObj[eater] = {
            eater,
            foods: [
              {
                _id: foodItem._id,
                name: foodItem.name,
                ratings: foodItemRatingsArray,
                notes: foodItemNotesArray,
              },
            ],
          };
        }
      }
    }
    for (const key in retObj) {
      retArray.push(retObj[key]);
    }
    setSelectedPeopleList(retArray);
  };

  // const updateRestaurantField = (fieldKey, fieldValue, restaurantKey) => {
  //   const restaurantsDataClone = _.cloneDeep(restaurantsData);
  //   const restaurantIndex = findRestaurantIndex(restaurantsDataClone, restaurantKey);
  //   if (restaurantIndex > -1) {
  //     restaurantsDataClone[restaurantIndex][`${fieldKey}`] = fieldValue;
  //     setRestaurantsData(restaurantsDataClone);
  //   }
  // };

  // const updateFoodItemField = (fieldKey, fieldValue, foodItemKey, restaurantKey) => {
  //   const restaurantsDataClone = _.cloneDeep(restaurantsData);
  //   const restaurantIndex = findRestaurantIndex(restaurantsDataClone, restaurantKey);
  //   const foodList = restaurantsDataClone[restaurantIndex].foodList;
  //   const foodListIndex = _.findIndex(foodList, (foodItem) => foodItem.key === foodItemKey);
  //   if (foodListIndex > -1) {
  //     foodList[foodListIndex][`${fieldKey}`] = fieldValue;
  //     restaurantsDataClone[restaurantIndex].foodList = foodList;
  //     setRestaurantsData(restaurantsDataClone);
  //   }
  // };

  return (
    // This component will be used to encapsulate the whole App,
    // so all components will have access to the Context
    <RestaurantContext.Provider
      value={{
        restaurantsData,
        setRestaurantsData,
        addFoodItem,
        addRestaurant,
        deleteAllRestaurants,
        retrieveFoodData,
        selectedFoodsList,
        selectedPeopleList,
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
