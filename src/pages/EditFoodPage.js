import React, { useRef, useState } from 'react';
import { ScrollView, TouchableOpacity, View, Text, TextInput } from 'react-native';
import ImagePlaceholder from '../components/ImagePlaceholder';
import { useRestaurant } from '../contexts/Restaurant';
import { launchImageLibrary } from 'react-native-image-picker';
import ItemImage from '../components/ItemImage';
import { Divider } from 'react-native-paper';
import EditPenIcon from '../components/EditPenIcon';
import { calculateAverageRating } from '../constants/const_functions';
import RatingStarText from '../components/RatingStarText';

const EditFoodPage = ({ navigation, route }) => {
  const { foodItem, restaurantKey } = route.params;
  const titleInputRef = useRef();
  const [titleInputFocussed, setTitleInputFocussed] = useState(false);
  const [foodName, setFoodName] = useState(foodItem.name ?? null);
  const [newNameText, setNewNameText] = useState(foodItem.name ?? null);
  const [foodItemImage, setFoodItemImage] = useState(foodItem.imageURL ?? null);

  const [foodNotes, setFoodNote] = useState(foodItem.notes ?? []);
  const [ratings, setRatings] = useState(foodItem.ratings ?? 0);
  const averageRating = calculateAverageRating(ratings);

  const { updateFoodItemField } = useRestaurant();

  const uploadPhoto = async () => {
    const fieldKey = 'imageURL';
    const photoResult = await launchImageLibrary({ mediaType: 'photo' });
    setFoodItemImage(photoResult?.assets[0].uri);
    updateFoodItemField(fieldKey, photoResult?.assets[0].uri, foodItem.key, restaurantKey);
  };

  const handleUpdateName = () => {
    const fieldKey = 'name';
    setFoodName(newNameText);
    updateFoodItemField(fieldKey, newNameText, foodItem.key, restaurantKey);
    titleInputRef?.current?.blur();
  };

  const handleCancelEditName = () => {
    titleInputRef?.current?.blur();
    setNewNameText(foodName);
  };

  const renderEditSaveCancel = (saveAction, cancelAction, editAction, focussed) => {
    return (
      <>
        {focussed ? (
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity
              onPress={() => saveAction()}
              style={{ marginLeft: 10, flexDirection: 'row' }}>
              <Text style={{ color: 'darkgray', fontSize: 16 }}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => cancelAction()}
              style={{ marginLeft: 10, flexDirection: 'row' }}>
              <Text style={{ color: 'darkgray', fontSize: 16 }}>Cancel</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity onPress={() => editAction()}>
            <EditPenIcon />
          </TouchableOpacity>
        )}
      </>
    );
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
            ref={titleInputRef}
            onFocus={() => setTitleInputFocussed(true)}
            onBlur={() => setTitleInputFocussed(false)}
            style={[
              titleInputFocussed
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
          {renderEditSaveCancel(
            handleUpdateName,
            handleCancelEditName,
            () => titleInputRef?.current?.focus(),
            titleInputFocussed,
          )}
        </View>
        <View style={{ paddingHorizontal: 20 }}>
          <View style={{ flexDirection: 'row' }}>
            <View>
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
            <View style={{ flex: 1, marginLeft: 10, flexDirection: 'row' }}>
              <Text style={{ fontWeight: '600' }}>Average Rating:</Text>
              <View style={{ marginLeft: 6 }}>
                {!isNaN(averageRating) ? (
                  <RatingStarText rating={averageRating} fill={'#F6F6F6'} />
                ) : null}
              </View>
            </View>
          </View>
          <Text style={{ fontWeight: 'bold', fontSize: 18, marginTop: 10 }}>Notes</Text>
          <Divider style={{ marginTop: 10 }} />
          {foodNotes.map((note, index) => {
            return (
              <View key={`note_${index}`} style={{ marginTop: 10 }}>
                <Text style={{ fontWeight: '600', fontSize: 16 }}>{note.name}</Text>
                <Text style={{ marginTop: 4 }}>{`- ${note.note}`}</Text>
              </View>
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
};

export default EditFoodPage;
