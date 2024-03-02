import React, { useEffect, useRef, useState } from 'react';
import { Text, TouchableOpacity, View, Image, TextInput, ScrollView } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { useRestaurant } from '../contexts/Restaurant';
import { SvgWithCssUri } from 'react-native-svg/css';
import { findRestaurant } from '../constants/const_functions';
import ItemImage from '../components/ItemImage';

const imageSize = 140;
const radiusNumber = 6;
const iconImageSize = 30;

const EditRestaurantPage = ({ navigation, restaurantKey }) => {
  const { restaurantsData } = useRestaurant();
  const restaurant = findRestaurant(restaurantsData, restaurantKey);

  const [restaurantName, setRestaurantName] = useState(restaurant.name ?? null);
  const [newNameText, setNewNameText] = useState(restaurant.name ?? null);
  const [restaurantImage, setRestaurantImage] = useState(restaurant.imageURL ?? null);

  const { updateRestaurantField } = useRestaurant();

  const [inputFocussed, setInputFocussed] = useState(false);
  const inputRef = useRef();

  const uploadPhoto = async () => {
    const fieldKey = 'imageURL';
    const photoResult = await launchImageLibrary({ mediaType: 'photo' });
    setRestaurantImage(photoResult.assets[0].uri);
    updateRestaurantField(fieldKey, photoResult.assets[0].uri, restaurant.key);
  };

  const handleUpdateName = () => {
    const fieldKey = 'name';
    setRestaurantName(newNameText);
    updateRestaurantField(fieldKey, newNameText, restaurant.key);
    inputRef?.current?.blur();
  };

  const handleCancelEditName = () => {
    inputRef?.current?.blur();
    setNewNameText(restaurantName);
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
        <View style={{ paddingLeft: 20 }}>
          <View style={{ maxWidth: imageSize }}>
            {restaurantImage ? <ItemImage imageURL={restaurantImage} /> : null}
            <TouchableOpacity
              onPress={() => {
                uploadPhoto();
              }}
              style={{ marginTop: 4 }}>
              <Text style={{ color: 'darkgray' }}>
                {restaurantImage ? `Replace Photo` : `Upload Photo`}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default EditRestaurantPage;
