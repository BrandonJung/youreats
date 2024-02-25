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
  if (starsArray) {
    const average =
      starsArray.reduce((a, b) => a + (b.rating ? b.rating : b), 0) /
      (starsArray.length || 0);
    return average;
  } else {
    return false;
  }
};

export const transformFoodListToPeople = (foodList) => {
  const transformPeopleRes = (passedPeopleRes) => {
    const retArray = [];
    for (let key in passedPeopleRes) {
      const retObject = {
        eaterName: key,
        eatenFoods: passedPeopleRes[key].eatenFoods,
        ratings: passedPeopleRes[key].ratings,
        note: passedPeopleRes[key].note,
      };
      retArray.push(retObject);
    }
    return retArray;
  };
  if (!foodList) return null;
  let peopleRes = {};
  for (let foodItem of foodList) {
    for (let name of foodItem.eater) {
      let personStarsArray = [];
      let personNotesArray = [];
      if (foodItem.stars) {
        personStarsArray = foodItem.stars.filter(
          (rating) => rating.name?.toLowerCase() === name.toLowerCase(),
        );
        personStarsArray.map((r) => (r.foodName = foodItem.name));
      }
      if (foodItem.note) {
        personNotesArray = foodItem.note.filter(
          (note) => note.name?.toLowerCase() === name.toLowerCase(),
        );
        personNotesArray.map((n) => (n.foodName = foodItem.name));
      }
      if (peopleRes[name]) {
        if (!peopleRes[name].eatenFoods.includes(foodItem.name)) {
          peopleRes[name].eatenFoods.push(foodItem.name);
        }
        const newRatingsArray = peopleRes[name].ratings.concat(personStarsArray);
        const newNotesArray = peopleRes[name].note.concat(personNotesArray);
        peopleRes[name].ratings = newRatingsArray;
        peopleRes[name].note = newNotesArray;
      } else {
        peopleRes[name] = {
          eatenFoods: [foodItem.name],
          ratings: personStarsArray,
          note: personNotesArray,
        };
      }
    }
  }
  const retPeopleList = transformPeopleRes(peopleRes);
  return retPeopleList;
};
