import AsyncStorage from '@react-native-async-storage/async-storage';
import _ from 'lodash';
import axios from 'axios';

export const apiCall = async (service, path, method, data) => {
  if (!service) {
    throw new Error('API CALL - Missing service');
  }
  if (!path) {
    throw new Error('API CALL - Missing path');
  }
  if (!method) {
    throw new Error('API CALL - Missing method');
  }
  const url = `http://localhost:3000/api/${service}/${path}`;
  const m = method.toLowerCase();
  const dataObject = { ...data };
  const config = {
    method: m,
    url: url,
    headers: {
      'Content-Type': 'application/json',
    },
  };
  if (m === 'get') {
    config.params = dataObject;
  } else {
    config.data = dataObject;
  }
  try {
    const retData = await axios.request(config);
    return retData;
  } catch (e) {
    console.log(e);
  }
};

export const StoreData = async (key, value) => {
  const convertedValue = JSON.stringify(value);
  try {
    const storeRes = await AsyncStorage.setItem(key, convertedValue);
    return storeRes;
  } catch (e) {
    console.log('Error storing data', e);
  }
};

export const RemoveFromStorage = async (key) => {
  try {
    const removeRes = await AsyncStorage.removeItem(key);
    return removeRes;
  } catch (e) {
    console.log('Error removing data', e);
  }
};

export const GetFromStorage = async (key) => {
  try {
    const getRes = await AsyncStorage.getItem(key);
    if (getRes) {
      const convertedRetValue = JSON.parse(getRes);
      return convertedRetValue;
    } else {
      return null;
    }
  } catch (e) {
    console.log('Error getting data', e);
  }
};

export const calculateAverageRating = (ratingsArray) => {
  if (ratingsArray?.length > 0) {
    const average =
      ratingsArray.reduce((a, b) => a + (b.rating ? b.rating : b), 0) / (ratingsArray.length || 0);
    return average.toFixed(1);
  } else {
    return false;
  }
};

export const returnMessage = (message) => {
  return {
    message,
  };
};

export const findRestaurantIndex = (restaurantList, searchKey) => {
  const retIndex = _.findIndex(restaurantList, (r) => r.key === searchKey, 0);
  return retIndex;
};

export const findRestaurant = (restaurantList, key) => {
  const restaurantIndex = _.findIndex(restaurantList, (r) => r.key === key);
  return restaurantList[restaurantIndex];
};
