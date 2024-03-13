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
  if (ratingsArray) {
    const average =
      ratingsArray.reduce((a, b) => a + (b.rating ? b.rating : b), 0) / (ratingsArray.length || 0);
    return average.toFixed(1);
  } else {
    return false;
  }
};

export const transformFoodListToPeople = (foodList) => {
  const transformPeopleRes = (passedPeopleRes) => {
    const retArray = [];
    for (const key in passedPeopleRes) {
      const retObject = {
        eaterName: key,
        eatenFoods: passedPeopleRes[key].eatenFoods,
        ratings: passedPeopleRes[key].ratings,
        notes: passedPeopleRes[key].notes,
      };
      retArray.push(retObject);
    }
    return retArray;
  };
  if (!foodList) return null;
  const peopleRes = {};
  for (const foodItem of foodList) {
    for (const name of foodItem.eater) {
      let personRatingsArray = [];
      let personNotesArray = [];
      if (foodItem.ratings) {
        personRatingsArray = foodItem.ratings.filter(
          (rating) => rating.name?.toLowerCase() === name.toLowerCase(),
        );
        personRatingsArray.map((r) => (r.foodName = foodItem.name));
      }
      if (foodItem.notes) {
        personNotesArray = foodItem.notes.filter(
          (notes) => notes.name?.toLowerCase() === name.toLowerCase(),
        );
        personNotesArray.map((n) => (n.foodName = foodItem.name));
      }
      if (peopleRes[name]) {
        if (!peopleRes[name].eatenFoods.includes(foodItem.name)) {
          peopleRes[name].eatenFoods.push(foodItem.name);
        }
        const newRatingsArray = peopleRes[name].ratings.concat(personRatingsArray);
        const newNotesArray = peopleRes[name].notes.concat(personNotesArray);
        peopleRes[name].ratings = newRatingsArray;
        peopleRes[name].notes = newNotesArray;
      } else {
        peopleRes[name] = {
          eatenFoods: [foodItem.name],
          ratings: personRatingsArray,
          notes: personNotesArray,
        };
      }
    }
  }
  const retPeopleList = transformPeopleRes(peopleRes);
  return retPeopleList;
};

export const findRestaurantIndex = (restaurantList, searchKey) => {
  const retIndex = _.findIndex(restaurantList, (r) => r.key === searchKey, 0);
  return retIndex;
};

export const findRestaurant = (restaurantList, key) => {
  const restaurantIndex = _.findIndex(restaurantList, (r) => r.key === key);
  return restaurantList[restaurantIndex];
};

export const returnMessage = (message) => {
  return {
    message,
  };
};
