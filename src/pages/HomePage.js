import React, { useEffect, useState } from 'react';
import { Alert, Dimensions, FlatList, Text, TouchableOpacity, View } from 'react-native';
import RestaurantCard from '../components/RestaurantCard';
import _ from 'lodash';
import OptionsPopup from '../components/OptionsPopup';
import OptionsButton from '../components/OptionsButton';
import { useRestaurant } from '../contexts/Restaurant';
import { useUser } from '../contexts/User';
import { SvgWithCssUri } from 'react-native-svg/css';
import RestaurantListItem from '../components/RestaurantListItem';
import SearchBar from '../components/SearchBar';

const { width, height } = Dimensions.get('window');
const cardWidth = 160;
const cardGap = (width - 2 * cardWidth) / 3;

const viewIconSize = 30;

const HomePage = ({ navigation }) => {
  const [showOptions, setShowOptions] = useState(false);
  const [viewStyle, setViewStyle] = useState(1);
  const [searchValue, setSearchValue] = useState('');

  const { restaurantsData, addRestaurant } = useRestaurant();
  const [restaurantList, setRestaurantList] = useState(null);
  const { userData } = useUser();

  const handleAddRestaurant = (restaurantName) => {
    if (!restaurantName) {
      Alert.alert('Missing restaurant name');
      return;
    }
    let restaurantListClone = _.cloneDeep(restaurantsData);
    if (restaurantListClone) {
      for (let restaurant of restaurantListClone) {
        if (restaurant.name.toLowerCase() === restaurantName.toLowerCase()) {
          Alert.alert('Restaurant name already exists');
          return;
        }
      }
    }
    addRestaurant(restaurantName);
  };

  useEffect(() => {
    if (restaurantsData?.length > 0) {
      setRestaurantList(restaurantsData);
    }
  }, [restaurantsData]);

  const handleSearch = (passedSearchValue) => {
    if (passedSearchValue === null || passedSearchValue === '') {
      setRestaurantList(restaurantsData);
      return;
    }
    const lowerSearchValue = passedSearchValue.toLowerCase();
    const restaurantListClone = _.cloneDeep(restaurantList);
    const retRestaurantArray = [];
    for (const restaurantObj of restaurantListClone) {
      if (restaurantObj.name.toLowerCase().includes(lowerSearchValue))
        retRestaurantArray.push(restaurantObj);
      continue;
    }
    setRestaurantList(retRestaurantArray);
  };

  useEffect(() => {
    handleSearch(searchValue);
  }, [searchValue]);

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: 'row',
          // justifyContent: 'flex-end',
          alignItems: 'center',
          marginTop: 20,
          marginRight: 20,
        }}>
        <View style={{ flex: 1 }}>
          <SearchBar
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            placeholderText='Search here'
          />
        </View>
        <TouchableOpacity
          onPress={() => setViewStyle(0)}
          style={[
            { marginLeft: 10, padding: 4, borderRadius: 6 },
            viewStyle === 0 ? { backgroundColor: '#FFFFFF' } : {},
          ]}>
          <SvgWithCssUri
            uri={`https://youreats.s3.amazonaws.com/icons/list.svg`}
            width={viewIconSize}
            height={viewIconSize}
            fill={'#bebebe'}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setViewStyle(1)}
          style={[
            { marginLeft: 10, padding: 4, borderRadius: 6 },
            viewStyle === 1 ? { backgroundColor: '#FFFFFF' } : {},
          ]}>
          <SvgWithCssUri
            uri={`https://youreats.s3.amazonaws.com/icons/menu.svg`}
            width={viewIconSize}
            height={viewIconSize}
            fill={'#bebebe'}
          />
        </TouchableOpacity>
      </View>
      {restaurantsData?.length > 0 ? (
        viewStyle === 0 ? (
          <FlatList
            key={'restaurant-list-1'}
            contentContainerStyle={{ marginHorizontal: 10, marginTop: 10 }}
            data={restaurantList}
            renderItem={({ item, index }) => {
              return (
                <RestaurantListItem
                  restaurant={item}
                  navigation={navigation}
                  cardWidth={cardWidth}
                  setShowOptions={setShowOptions}
                />
              );
            }}
          />
        ) : (
          <FlatList
            key={'restaurant-list-2'}
            data={restaurantList}
            numColumns={2}
            columnWrapperStyle={{ columnGap: cardGap, marginHorizontal: cardGap }}
            renderItem={({ item, index }) => {
              return (
                <RestaurantCard
                  restaurant={item}
                  navigation={navigation}
                  cardWidth={cardWidth}
                  setShowOptions={setShowOptions}
                />
              );
            }}
          />
        )
      ) : (
        <Text style={{ flex: 1 }}>Add a restaurant to start!</Text>
      )}
      {userData ? (
        <View>
          {showOptions ? (
            <OptionsPopup
              showOptions={showOptions}
              setShowOptions={setShowOptions}
              handleAddRestaurant={handleAddRestaurant}
              showAddFood={restaurantsData?.length > 0}
              navigation={navigation}
            />
          ) : null}
          <OptionsButton showOptions={showOptions} setShowOptions={setShowOptions} />
        </View>
      ) : null}
    </View>
  );
};

export default HomePage;
