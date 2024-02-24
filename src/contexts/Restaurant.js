import React, { createContext, useContext, useEffect, useState } from 'react';
import { GetFromStorage } from '../constants/const_functions';

// Create the RestaurantContext with the data type specified
// and a empty object
const RestaurantContext = createContext();

const RestaurantProvider = ({ children }) => {
  const [restaurantsData, setRestaurantsData] = useState(null);

  useEffect(() => {
    retrieveData();
  }, []);

  useEffect(() => {
    console.log('Delete this, updated restaurant list: ', restaurantsData);
  }, [restaurantsData]);

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
