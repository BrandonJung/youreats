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
  const { selectedPeopleList } = useRestaurant();
  const [searchValue, setSearchValue] = useState('');
  const masterPeopleFoodList = selectedPeopleList;
  const [peopleFoodList, setPeopleFoodList] = useState(selectedPeopleList);

  const handleSearch = (passedSearchValue) => {
    if (passedSearchValue === null || passedSearchValue === '') {
      setPeopleFoodList(masterPeopleFoodList);
      return;
    }
    const lowerSearchValue = passedSearchValue.toLowerCase();
    const peopleArrayClone = _.cloneDeep(masterPeopleFoodList);
    const retPeopleFoodArray = [];
    for (const personObj of peopleArrayClone) {
      if (personObj.eater.toLowerCase().includes(lowerSearchValue)) {
        retPeopleFoodArray.push(personObj);
        continue;
      }
      const foodsArray = personObj.foods;
      for (const food of foodsArray) {
        if (food.name.toLowerCase().includes(lowerSearchValue)) {
          retPeopleFoodArray.push(personObj);
          break;
        }
      }
    }
    setPeopleFoodList(retPeopleFoodArray);
  };

  useEffect(() => {
    handleSearch(searchValue);
  }, [searchValue]);

  return (
    <View style={{ height: '100%' }}>
      <SearchBar
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        placeholderText={'Search by name or food'}
      />
      <FlatList
        data={peopleFoodList}
        style={{ flex: 1 }}
        renderItem={({ item }) => {
          return (
            <View
              style={{
                marginBottom: 20,
                marginHorizontal: 20,
              }}>
              <Text style={{ fontWeight: '600', fontSize: 16, marginBottom: 6 }}>{item.eater}</Text>
              <View
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: 6,
                  paddingHorizontal: 10,
                  paddingTop: 10,
                }}>
                {item.foods.map((food, index) => {
                  const averageRating = calculateAverageRating(food.ratings);
                  return (
                    <View key={`${item.eater}_${food._id}`} style={{ marginBottom: 10 }}>
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ fontWeight: '600' }}>{food.name}</Text>
                        {!isNaN(averageRating) ? <RatingStarText rating={averageRating} /> : null}
                      </View>
                      {food.notes?.length > 0 ? (
                        <View style={{ marginTop: 10 }}>
                          <Text style={{ marginBottom: 4 }}>Notes:</Text>
                          {food.notes.map((note, index) => {
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
                      {index !== item.foods.length - 1 && item.foods.length > 1 ? (
                        <Divider style={{ marginTop: 10 }} />
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
