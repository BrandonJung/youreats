import React, { useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { TestRestaurants } from '../dummyData';
import RestaurantCard from '../components/RestaurantCard';

const HomePage = ({ navigation }) => {
  const [showOptions, setShowOptions] = useState(false);
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={TestRestaurants}
        renderItem={({ item, index }) => {
          return (
            <RestaurantCard
              foodList={item.foodList}
              name={item.name}
              navigation={navigation}
            />
          );
        }}
      />
      <View>
        {showOptions ? (
          <View style={styles.addButtonOptionContainer}>
            <TouchableOpacity style={styles.addButtonOption} onPress={() => {}}>
              <Text>Add Restaurant</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.addButtonOption} onPress={() => {}}>
              <Text>Add Food</Text>
            </TouchableOpacity>
          </View>
        ) : null}
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setShowOptions(!showOptions)}>
          <Text style={{ fontSize: 20 }}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  addButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor: 'lightblue',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonOptionContainer: {
    position: 'absolute',
    bottom: 36,
    right: 36,
    backgroundColor: 'lightblue',
    paddingBottom: 20,
    padding: 6,
    borderRadius: 6,
  },
  addButtonOption: { padding: 6 },
});

export default HomePage;
