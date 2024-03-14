import React, { useRef, useState } from 'react';
import { ScrollView, TouchableOpacity, View, Text, TextInput } from 'react-native';
import ImagePlaceholder from '../components/ImagePlaceholder';
import { launchImageLibrary } from 'react-native-image-picker';
import ItemImage from '../components/ItemImage';
import { Divider } from 'react-native-paper';
import EditPenIcon from '../components/EditPenIcon';
import { calculateAverageRating } from '../constants/const_functions';
import RatingStarText from '../components/RatingStarText';
import { useRestaurant } from '../contexts/Restaurant';

const EditFoodPage = ({ navigation, route }) => {
  const { foodItem, restaurantKey } = route.params;
  const titleInputRef = useRef();
  const [titleInputFocussed, setTitleInputFocussed] = useState(false);
  const [item, setItem] = useState(foodItem);
  const [newNameText, setNewNameText] = useState(item.name ?? null);
  const averageRating = calculateAverageRating(item.ratings);

  const { updateFoodItemField } = useRestaurant();

  const uploadPhoto = async () => {
    const fieldKey = 'imageURL';
    const photoResult = await launchImageLibrary({ mediaType: 'photo' });
    const newFoodItem = await updateFoodItemField(
      fieldKey,
      photoResult?.assets[0].uri,
      foodItem._id,
      restaurantKey,
    );
    setItem(newFoodItem);
  };

  const handleUpdateName = async () => {
    const fieldKey = 'name';
    const newFoodItem = await updateFoodItemField(
      fieldKey,
      newNameText,
      foodItem._id,
      restaurantKey,
    );
    setItem(newFoodItem);
    titleInputRef?.current?.blur();
  };

  const handleCancelEditName = () => {
    titleInputRef?.current?.blur();
    setNewNameText(item.name);
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
              {item?.imageURL ? <ItemImage imageURL={item.imageURL} /> : <ImagePlaceholder />}
              <TouchableOpacity
                onPress={() => {
                  uploadPhoto();
                }}
                style={{ marginTop: 4 }}>
                <Text style={{ color: 'darkgray' }}>
                  {item?.imageURL ? `Replace Photo` : `Upload Photo`}
                </Text>
              </TouchableOpacity>
            </View>
            {averageRating ? (
              <View style={{ flex: 1, marginLeft: 10, flexDirection: 'row' }}>
                <Text style={{ fontWeight: '600' }}>Average Rating:</Text>
                <View style={{ marginLeft: 6 }}>
                  {!isNaN(averageRating) ? (
                    <RatingStarText rating={averageRating} fill={'#F6F6F6'} />
                  ) : null}
                </View>
              </View>
            ) : null}
          </View>
          <Text style={{ fontWeight: 'bold', fontSize: 18, marginTop: 10 }}>Notes</Text>
          <Divider style={{ marginTop: 10 }} />
          {item?.notes.map((note, index) => {
            return (
              <View key={`note_${index}`} style={{ marginTop: 10 }}>
                <Text style={{ fontWeight: '600', fontSize: 16 }}>{note.eater}</Text>
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
