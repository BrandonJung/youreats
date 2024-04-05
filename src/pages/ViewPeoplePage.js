import React, { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import { useRestaurant } from '../contexts/Restaurant';
import _ from 'lodash';
import SearchBar from '../components/SearchBar';
import ViewPeopleCard from '../components/ViewPeopleCard';

const ViewPeoplePage = ({ navigation }) => {
  const { selectedPeopleList } = useRestaurant();
  const [searchValue, setSearchValue] = useState('');
  const [peopleFoodList, setPeopleFoodList] = useState(selectedPeopleList);
  const [masterPeopleFoodList, setMasterPeopleList] = useState(selectedPeopleList);

  useEffect(() => {
    setPeopleFoodList(selectedPeopleList);
    setMasterPeopleList(selectedPeopleList);
  }, [selectedPeopleList]);

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
              <ViewPeopleCard eaterName={item.eater} foodsList={item.foods} />
            </View>
          );
        }}
      />
    </View>
  );
};

export default ViewPeoplePage;
