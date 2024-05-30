import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  GetFromStorage,
  RemoveFromStorage,
  StoreData,
  apiCall,
} from '../constants/const_functions';
import { apiService } from '../constants/const_api';

// Create the RestaurantContext with the data type specified
// and a empty object
const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    retrieveUser();
  }, []);

  const createUser = async (firstName, lastName, email, mobile) => {
    try {
      const userRes = await apiCall(apiService.user, 'createUser', 'post', {
        firstName,
        lastName,
        mobile,
        email,
      });
      if (userRes?.data?.insertedId) {
        console.log('User Res: ' + userRes.data.insertedId);
        const userId = userRes.data.insertedId;
        const retrieveUserRes = await retrieveUser(userId);
        if (retrieveUserRes) {
          return retrieveUserRes;
        }
      } else if (userRes.meessage) {
        console.log(userRes.message);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const retrieveUser = async (passedUserId) => {
    let userId = passedUserId;
    if (userId) {
      try {
        const res = await apiCall(apiService.user, 'retrieveUserByUserId', 'get', {
          userId,
        });
        if (res?.data) {
          console.log('RetrieveRes: ', res.data);
          setUserData(res?.data);
          return res.data;
        } else {
          console.log(res.message);
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  const loginUser = async (passedUserName) => {
    let userName = passedUserName;
    if (userName) {
      try {
        const res = await apiCall(apiService.user, 'loginUserByUsername', 'get', {
          userName,
        });
        if (res?.data) {
          console.log('LoginRes:', res.data);
          setUserData(res?.data);
          return { ...res.data, success: true };
        } else {
          return { success: false, message: 'No user found' };
          console.log(res.message);
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  const logoutUser = async () => {
    try {
      setUserData(null);
      const deleteLocalUser = await RemoveFromStorage('userName');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    // This component will be used to encapsulate the whole App,
    // so all components will have access to the Context
    <UserContext.Provider
      value={{
        userData,
        setUserData,
        retrieveUser,
        createUser,
        logoutUser,
        loginUser,
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
