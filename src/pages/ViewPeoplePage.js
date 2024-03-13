import React, { useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import {
  calculateAverageRating,
  findRestaurant,
  transformFoodListToPeople,
} from '../constants/const_functions';
import { Divider } from 'react-native-paper';
import { useRestaurant } from '../contexts/Restaurant';
import RatingStarText from '../components/RatingStarText';
import _ from 'lodash';
import SearchBar from '../components/SearchBar';

const ViewPeoplePage = ({ navigation, restaurantKey }) => {
  // const { restaurantsData } = useRestaurant();
  // const [searchValue, setSearchValue] = useState('');
  // const restaurant = findRestaurant(restaurantsData, restaurantKey);
  // const foodList = restaurant.foodList;
  // const masterPeopleFoodList = transformFoodListToPeople(foodList);
  // const [peopleArray, setPeopleArray] = useState(masterPeopleFoodList);

  // const handleSearch = (passedSearchValue) => {
  //   if (passedSearchValue === null || passedSearchValue === '') {
  //     setPeopleArray(masterPeopleFoodList);
  //     return;
  //   }
  //   const peopleArrayClone = _.cloneDeep(masterPeopleFoodList);
  //   const retPeopleArray = [];
  //   for (const person of peopleArrayClone) {
  //     if (person.eaterName.toLowerCase().includes(passedSearchValue.toLowerCase())) {
  //       retPeopleArray.push(person);
  //       continue;
  //     }
  //     const eatenFoodsArray = person.eatenFoods;
  //     for (const food of eatenFoodsArray) {
  //       if (food.toLowerCase().includes(passedSearchValue.toLowerCase())) {
  //         retPeopleArray.push(person);
  //         break;
  //       }
  //     }
  //   }
  //   setPeopleArray(retPeopleArray);
  // };

  // useEffect(() => {
  //   handleSearch(searchValue);
  // }, [searchValue]);

  return (
    <View style={{ height: '100%' }}>
      {/* <SearchBar
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        placeholderText={'Search by name or food'}
      />
      <FlatList
        data={peopleArray}
        style={{ flex: 1 }}
        renderItem={({ item }) => {
          return (
            <View
              style={{
                marginBottom: 10,
                marginHorizontal: 20,
              }}>
              <Text style={{ fontWeight: '600', fontSize: 16, marginBottom: 6 }}>
                {item.eaterName}
              </Text>
              <View
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: 6,
                  paddingHorizontal: 10,
                  paddingTop: 10,
                }}>
                {item.eatenFoods.map((foodItem, index) => {
                  const filteredRatingArray = item.ratings?.filter((r) => r.foodName === foodItem);
                  const averageRating = calculateAverageRating(filteredRatingArray);
                  const notesArray = item.notes?.filter((note) => note.foodName === foodItem);
                  return (
                    <View key={`${foodItem}_${index}`} style={{ marginBottom: 10 }}>
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ fontWeight: '600' }}>{foodItem}</Text>
                        {!isNaN(averageRating) ? <RatingStarText rating={averageRating} /> : null}
                      </View>
                      {notesArray?.length > 0 ? (
                        <View style={{ marginTop: 10 }}>
                          <Text style={{ marginBottom: 4 }}>Notes:</Text>
                          {notesArray.map((note, index) => {
                            return (
                              <Text
                                key={`${note.name}_${index}`}
                                style={{
                                  color: 'grey',
                                  marginLeft: 10,
                                  marginBottom: 4,
                                }}>
                                - {note.note}
                              </Text>
                            );
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
      /> */}
    </View>
  );
};

export default ViewPeoplePage;
