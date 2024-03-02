import React, { useRef, useState } from 'react';
import { ScrollView, TouchableOpacity, View, Text, TextInput } from 'react-native';
import { SvgWithCssUri } from 'react-native-svg/css';
import ImagePlaceholder from '../components/ImagePlaceholder';
import { useRestaurant } from '../contexts/Restaurant';
import { launchImageLibrary } from 'react-native-image-picker';
import ItemImage from '../components/ItemImage';

const imageSize = 140;
const iconImageSize = 30;

const EditFoodPage = ({ navigation, route }) => {
  const { foodItem, restaurantKey } = route.params;
  const inputRef = useRef();
  const [inputFocussed, setInputFocussed] = useState(false);
  const [foodName, setFoodName] = useState(foodItem.name ?? null);
  const [newNameText, setNewNameText] = useState(foodItem.name ?? null);
  const [foodItemImage, setFoodItemImage] = useState(foodItem.imageURL ?? null);

  const { updateFoodItemField } = useRestaurant();

  const uploadPhoto = async () => {
    const fieldKey = 'imageURL';
    const photoResult = await launchImageLibrary({ mediaType: 'photo' });
    setFoodItemImage(photoResult.assets[0].uri);
    updateFoodItemField(fieldKey, photoResult.assets[0].uri, foodItem.key, restaurantKey);
  };

  const handleUpdateName = () => {
    const fieldKey = 'name';
    setFoodName(newNameText);
    updateFoodItemField(fieldKey, newNameText, foodItem.key, restaurantKey);
    inputRef?.current?.blur();
  };

  const handleCancelEditName = () => {
    inputRef?.current?.blur();
    setNewNameText(foodName);
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-between' }}>
      <View>
        <View
          style={{
            marginTop: 10,
            marginLeft: 10,
            marginBottom: 10,
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
            {foodItemImage ? <ItemImage imageURL={foodItemImage} /> : <ImagePlaceholder />}
            <TouchableOpacity
              onPress={() => {
                uploadPhoto();
              }}
              style={{ marginTop: 4 }}>
              <Text style={{ color: 'darkgray' }}>
                {foodItemImage ? `Replace Photo` : `Upload Photo`}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default EditFoodPage;
