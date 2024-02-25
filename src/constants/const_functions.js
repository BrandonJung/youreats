import AsyncStorage from '@react-native-async-storage/async-storage';

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

export const calculateAverageRating = (starsArray) => {
  if (!starsArray) return false;
  const average =
    starsArray.reduce((a, b) => a + (b.rating ? b.rating : b), 0) /
    (starsArray.length || 0);
  return average;
};
