import React, { createContext, useContext, useEffect, useState } from 'react';
import { GetFromStorage, apiCall } from '../constants/const_functions';
import { apiService } from '../constants/const_api';

// Create the RestaurantContext with the data type specified
// and a empty object
const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    retrieveData();
  }, []);

  const makeUser = async () => {};

  const retrieveData = async () => {
    const userIdRes = await GetFromStorage('userId');
    if (userIdRes) {
      try {
        const res = await apiCall(apiService.user, 'retrieveUserByUserId', 'get', {
          userId: userIdRes,
        });
        if (res?.data) {
          // Do something with data
        } else {
          console.log(res.message);
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      try {
        // Make a new user
      } catch (e) {
        console.log(e);
      }
    }
  };

  const retrieveUserId = async () => {};

  return (
    // This component will be used to encapsulate the whole App,
    // so all components will have access to the Context
    <UserContext.Provider
      value={{
        userData,
        setUserData,
      }}>
      {children}
    </UserContext.Provider>
  );
};

// A simple hooks to facilitate the access to the RestaurantContext
// and permit components to subscribe to RestaurantContext updates
function useUser() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error('useBoilerplate must be used within an BoilerplateProvider');
  }

  return context;
}

export { UserContext, UserProvider, useUser };
