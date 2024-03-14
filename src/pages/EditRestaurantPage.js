import React, { useEffect, useRef, useState } from 'react';
import { Text, TouchableOpacity, View, TextInput, ScrollView } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { useRestaurant } from '../contexts/Restaurant';
import { SvgWithCssUri } from 'react-native-svg/css';
import ItemImage from '../components/ItemImage';
import ImagePlaceholder from '../components/ImagePlaceholder';

const iconImageSize = 30;

const EditRestaurantPage = ({ navigation, restaurantKey }) => {
  const { retrieveRestaurantById, updateRestaurantField } = useRestaurant();
  const [restaurant, setRestaurant] = useState(null);

  const [newNameText, setNewNameText] = useState(restaurant?.name ?? null);

  const [inputFocussed, setInputFocussed] = useState(false);
  const inputRef = useRef();

  const retrieveData = async () => {
    const restaurantRes = await retrieveRestaurantById(restaurantKey);
    setNewNameText(restaurantRes.name);
    setRestaurant(restaurantRes);
  };

  useEffect(() => {
    retrieveData();
  }, []);

  const uploadPhoto = async () => {
    const fieldKey = 'imageURL';
    const photoResult = await launchImageLibrary({ mediaType: 'photo' });
    const newRestaurantObj = await updateRestaurantField(
      fieldKey,
      photoResult?.assets[0].uri,
      restaurantKey,
    );
    setRestaurant(newRestaurantObj);
  };

  const handleUpdateName = async () => {
    const fieldKey = 'name';
    const newRestaurantObj = await updateRestaurantField(fieldKey, newNameText, restaurantKey);
    setRestaurant(newRestaurantObj);
    navigation.setOptions({ title: newRestaurantObj.name });
    inputRef?.current?.blur();
  };

  const handleCancelEditName = () => {
    inputRef?.current?.blur();
    setNewNameText(restaurant.name);
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-between' }}>
      <View>
        <View
          style={{
            marginTop: 10,
            marginBottom: 10,
            marginLeft: 10,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <TextInput
            ref={inputRef}
            onFocus={() => setInputFocussed(true)}
            onBlur={() => setInputFocussed(false)}
            style={[
              inputFocussed
                ? {
                    borderWidth: 1,
                    padding: 10,
                    borderRadius: 6,
                  }
                : { padding: 10 },
              { fontSize: 20 },
            ]}
            maxLength={20}
            value={newNameText}
            onChangeText={(t) => setNewNameText(t)}
          />

          {inputFocussed ? (
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity
                onPress={() => handleUpdateName()}
                style={{ marginLeft: 10, flexDirection: 'row' }}>
                <Text style={{ color: 'darkgray', fontSize: 16 }}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleCancelEditName()}
                style={{ marginLeft: 10, flexDirection: 'row' }}>
                <Text style={{ color: 'darkgray', fontSize: 16 }}>Cancel</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity onPress={() => inputRef?.current?.focus()}>
              <SvgWithCssUri
                uri='https://youreats.s3.amazonaws.com/icons/pen.svg'
                width={iconImageSize}
                height={iconImageSize}
                fill={'darkgray'}
                stroke={'gray'}
                style={{ marginLeft: 10 }}
              />
            </TouchableOpacity>
          )}
        </View>
        <View style={{ paddingLeft: 20, flexDirection: 'row' }}>
          <View>
            {restaurant?.imageURL ? (
              <ItemImage imageURL={restaurant.imageURL} />
            ) : (
              <ImagePlaceholder type='restaurant' />
            )}
            <TouchableOpacity
              onPress={() => {
                uploadPhoto();
              }}
              style={{ marginTop: 4 }}>
              <Text style={{ color: 'darkgray' }}>
                {restaurant?.imageURL ? `Replace Photo` : `Upload Photo`}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1, marginLeft: 10 }}></View>
        </View>
      </View>
    </ScrollView>
  );
};

export default EditRestaurantPage;
