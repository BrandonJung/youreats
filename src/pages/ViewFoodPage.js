import React from 'react';
import { FlatList, View, Text, TouchableOpacity } from 'react-native';

const ViewFoodPage = ({ navigation, restaurant }) => {
  const foodList = restaurant.foodList;
  return (
    <View>
      <FlatList
        data={foodList}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={
                () => {}
                // navigation.navigate('EditPage', {
                //   navigation: navigation,
                //   restaurant: restaurant,
                // })
              }>
              <Text>{item.name}</Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default ViewFoodPage;
