import React, { useEffect, useRef, useState } from 'react';
import { Alert, ScrollView, Text, TextInput, View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { GetFromStorage, StoreData } from '../constants/const_functions';
import FoodInputTitle from '../components/FoodInputTitle';
import FoodTextInput from '../components/FoodTextInput';
import StarRating from '../components/StarRating';
import { Button } from 'react-native-paper';
import _ from 'lodash';
import { useRestaurant } from '../contexts/Restaurant';

const ADD_FOOD_STEPS = {
  INIT: 0,
  NAME_STEP: 1,
  EATER_STEP: 2,
  RANKING_STEP: 3,
  NOTES_STEP: 4,
  RESTAURANT_STEP: 5,
};

const AddFoodPage = ({ navigation, route }) => {
  const [addFoodStep, setAddFoodStep] = useState(ADD_FOOD_STEPS.INIT);
  const [restaurantDropdownList, setRestaurantDropdownList] = useState(null);
  const [foodName, setFoodName] = useState(null);
  const [eaterName, setEaterName] = useState(null);
  const [rating, setRating] = useState(0);
  const [notes, setNotes] = useState('');
  const [restaurant, setRestaurant] = useState(null);

  const { restaurantsData, setRestaurantsData } = useRestaurant();

  const retrieveData = async () => {
    if (restaurantsData) {
      const transformedRestaurantList = restaurantsData.map((restaurant) => {
        return {
          label: restaurant.name,
          value: restaurant.key,
        };
      });
      setRestaurantDropdownList(transformedRestaurantList);
    } else {
      // handle no restaurants
      console.log('No restaurants');
    }
  };

  useEffect(() => {
    retrieveData();
  }, []);

  const SubmitFood = () => {
    if (!foodName) {
      Alert.alert('Missing food name');
      return;
    }
    if (!restaurant) {
      Alert.alert('Missing restaurant');
      return;
    }
    let restaurantListClone = _.cloneDeep(restaurantsData);
    const restaurantFoodListIndex = _.findIndex(
      restaurantListClone,
      (r) => r.key === restaurant,
    );
    const restaurantFoodList =
      restaurantListClone[restaurantFoodListIndex].foodList;
    const foodListIndex = restaurantFoodList.length;
    const newFoodObject = {
      id: foodListIndex,
      key: `food_${foodListIndex}`,
      name: foodName,
      eater: eaterName,
      stars: rating,
      note: notes,
    };
    restaurantListClone[restaurantFoodListIndex].foodList[foodListIndex] =
      newFoodObject;
    setRestaurantsData(restaurantListClone);
    navigation.pop();
  };

  const AlertPrompt = (
    title,
    subtitle,
    buttonCancelText,
    buttonCancelAction,
    buttonSubmitText,
    buttonSubmitAction,
  ) => {
    return Alert.prompt(title, subtitle, [
      {
        text: buttonCancelText,
        onPress: () => buttonCancelAction,
        style: 'cancel',
      },
      {
        text: buttonSubmitText,
        onPress: (t) => {
          buttonSubmitAction(t);
          setAddFoodStep(addFoodStep + 1);
        },
      },
    ]);
  };

  const handleAddFoodStep = (step) => {
    if (step === ADD_FOOD_STEPS.INIT) {
      return AlertPrompt(
        'Enter Food Name',
        '',
        'Cancel',
        {},
        'Submit',
        setFoodName,
      );
    } else if (step === ADD_FOOD_STEPS.NAME_STEP) {
      return AlertPrompt(
        'Enter Eater Name',
        '',
        'Cancel',
        {},
        'Submit',
        setEaterName,
      );
    } else if (step === ADD_FOOD_STEPS.EATER_STEP) {
      return AlertPrompt('Enter Notes', '', 'Cancel', {}, 'Submit', setNotes);
    } else if (step === ADD_FOOD_STEPS.RANKING_STEP) {
    } else if (step === ADD_FOOD_STEPS.NOTES_STEP) {
    } else if (step === ADD_FOOD_STEPS.RESTAURANT_STEP) {
    }
  };

  useEffect(() => {
    handleAddFoodStep(addFoodStep);
  }, [addFoodStep]);

  const Dropdown = () => {
    return (
      <RNPickerSelect
        onValueChange={(value) => setRestaurant(value)}
        value={restaurant}
        items={restaurantDropdownList}
      />
    );
  };

  return (
    <ScrollView
      contentContainerStyle={{ flex: 1, justifyContent: 'space-between' }}
      style={{ marginHorizontal: 16 }}>
      {restaurantDropdownList ? (
        <View>
          <FoodInputTitle title={'Food name'} />
          <FoodTextInput
            placeholderText={'Enter food name'}
            handleOnChange={setFoodName}
            passedValue={foodName}
          />
          <FoodInputTitle title={'Eater name'} />
          <FoodTextInput
            placeholderText={'Enter eater name'}
            handleOnChange={setEaterName}
            passedValue={eaterName}
          />
          <FoodInputTitle title={'Notes'} />
          <FoodTextInput
            placeholderText={'Enter notes'}
            handleOnChange={setNotes}
            passedValue={notes}
          />
          <FoodInputTitle title={'Restaurant'} />
          <View
            style={{
              backgroundColor: '#FFFFFF',
              borderColor: 'black',
              borderWidth: 1,
              padding: 8,
              borderRadius: 6,
              marginTop: 8,
            }}>
            <Dropdown />
          </View>
          <FoodInputTitle title={'Rating'} />
          <StarRating rating={rating} setRating={setRating} />
        </View>
      ) : null}
      <Button
        style={{ marginBottom: 24, backgroundColor: 'lightblue' }}
        onPress={() => SubmitFood()}>
        Add Food
      </Button>
    </ScrollView>
  );
};

export default AddFoodPage;
