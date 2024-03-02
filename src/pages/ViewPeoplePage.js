import React from 'react';
import { FlatList, Text, View } from 'react-native';
import {
  calculateAverageRating,
  findRestaurant,
  transformFoodListToPeople,
} from '../constants/const_functions';
import { Divider } from 'react-native-paper';
import { useRestaurant } from '../contexts/Restaurant';
import RatingStarText from '../components/RatingStarText';

const ViewPeoplePage = ({ navigation, restaurantKey }) => {
  const { restaurantsData } = useRestaurant();
  const restaurant = findRestaurant(restaurantsData, restaurantKey);
  const foodList = restaurant.foodList;
  const peopleArray = transformFoodListToPeople(foodList);
  return (
    <View style={{ height: '100%' }}>
      <FlatList
        data={peopleArray}
        style={{ flex: 1 }}
        renderItem={({ item }) => {
          return (
            <View
              style={{
                marginTop: 10,
                marginHorizontal: 20,
              }}>
              <Text style={{ fontWeight: '600', fontSize: 16, marginBottom: 4 }}>
                {item.eaterName}
              </Text>
              <View
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: 6,
                  padding: 10,
                }}>
                {item.eatenFoods.map((foodItem, index) => {
                  const filteredRatingArray = item.ratings?.filter((r) => r.foodName === foodItem);
                  const averageRating = calculateAverageRating(filteredRatingArray);
                  return (
                    <View key={`${foodItem}_${index}`} style={{ marginBottom: 10 }}>
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ fontWeight: '600' }}>{foodItem}</Text>
                        {!isNaN(averageRating) ? <RatingStarText rating={averageRating} /> : null}
                      </View>
                      {item.notes?.length ? (
                        <View style={{ marginTop: 10 }}>
                          <Text style={{ marginBottom: 4 }}>Notes:</Text>
                          {item.notes.map((note) => {
                            if (note.foodName === foodItem) {
                              return (
                                <Text
                                  style={{
                                    color: 'grey',
                                    marginLeft: 10,
                                    marginBottom: 4,
                                  }}>
                                  - {note.note}
                                </Text>
                              );
                            }
                          })}
                        </View>
                      ) : null}
                      {index !== item.eatenFoods.length - 1 ? (
                        <Divider style={{ marginTop: 14 }} />
                      ) : null}
                    </View>
                  );
                })}
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

export default ViewPeoplePage;
