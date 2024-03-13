import React from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { useRestaurant } from '../contexts/Restaurant';

const OptionsPopup = ({
  showOptions,
  setShowOptions,
  handleAddRestaurant,
  showAddFood,
  navigation,
}) => {
  const { deleteAllRestaurants } = useRestaurant();
  return (
    <Animated.View entering={FadeIn} exiting={FadeOut} style={styles.addButtonOptionContainer}>
      <TouchableOpacity
        style={styles.addButtonOption}
        onPress={() => {
          Alert.prompt('Please enter the name of restaurant', '', [
            {
              text: 'Cancel',
              onPress: () => {},
              style: 'cancel',
            },
            {
              text: 'Submit',
              onPress: (t) => {
                setShowOptions(!showOptions);
                handleAddRestaurant(t);
              },
            },
          ]);
        }}>
        <Text>Add Restaurant</Text>
      </TouchableOpacity>
      {showAddFood ? (
        <TouchableOpacity
          style={styles.addButtonOption}
          onPress={() => {
            setShowOptions(!showOptions);
            navigation.navigate('AddFoodPage');
          }}>
          <Text>Add Food</Text>
        </TouchableOpacity>
      ) : null}
      <TouchableOpacity
        style={styles.addButtonOption}
        onPress={() => {
          Alert.alert('Are you sure you want to delete restaurants', '', [
            {
              text: 'Cancel',
              onPress: () => {},
              style: 'cancel',
            },
            {
              text: 'Yes',
              onPress: () => {
                deleteAllRestaurants();
                setShowOptions(!showOptions);
              },
            },
          ]);
        }}>
        <Text>Delete Restaurants</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  addButtonOptionContainer: {
    position: 'absolute',
    // With bottom nav
    // bottom: 36,
    // right: 36,
    bottom: 70,
    right: 50,
    backgroundColor: 'lightblue',
    paddingBottom: 20,
    padding: 6,
    borderRadius: 6,
  },
  addButtonOption: { padding: 6 },
});

export default OptionsPopup;
