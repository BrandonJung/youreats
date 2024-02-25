import React, { useEffect } from 'react';
import { FlatList, Text, View } from 'react-native';
import { transformFoodListToPeople } from '../constants/const_functions';

const ViewPeoplePage = ({ navigation, restaurant }) => {
  const foodList = restaurant.foodList;
  const peopleArray = transformFoodListToPeople(foodList);
  return (
    <View>
      <FlatList
        data={peopleArray}
        renderItem={({ item, index }) => {
          return (
            <View style={{ marginTop: 10, marginHorizontal: 20 }}>
              <Text style={{ fontSize: 16, fontWeight: '600' }}>{item.eaterName}</Text>
              <View>
                {item.eatenFoods.map((foodItem) => {
                  return (
                    <Text key={`${item.eaterName}_${foodItem}_${index}`}>
                      Name: {foodItem}
                    </Text>
                  );
                })}
              </View>
              {item.note ? (
                <View>
                  {item.note.map((note) => {
                    const noteText = note.note;
                    return (
                      <Text key={`${item.eaterName}_${noteText}_${index}`}>
                        Note: {noteText}
                      </Text>
                    );
                  })}
                </View>
              ) : null}
            </View>
          );
        }}
      />
    </View>
  );
};

export default ViewPeoplePage;
