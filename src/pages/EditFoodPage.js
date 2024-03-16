import React, { useRef, useState } from 'react';
import { ScrollView, TouchableOpacity, View, Text, TextInput, Alert } from 'react-native';
import ImagePlaceholder from '../components/ImagePlaceholder';
import { launchImageLibrary } from 'react-native-image-picker';
import ItemImage from '../components/ItemImage';
import { Divider } from 'react-native-paper';
import EditPenIcon from '../components/EditPenIcon';
import { calculateAverageRating } from '../constants/const_functions';
import RatingStarText from '../components/RatingStarText';
import { useRestaurant } from '../contexts/Restaurant';
import Tag from '../components/Tag';

const EditFoodPage = ({ navigation, route }) => {
  const { foodItem, restaurantKey } = route.params;
  const titleInputRef = useRef();
  const [titleInputFocussed, setTitleInputFocussed] = useState(false);
  const [item, setItem] = useState(foodItem);
  const [newNameText, setNewNameText] = useState(item.name ?? null);
  const averageRating = calculateAverageRating(item.ratings);

  const { updateFoodItemField, addFoodTag } = useRestaurant();

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

  const AlertPrompt = (
    title,
    subtitle,
    buttonCancelText,
    buttonCancelAction,
    buttonSubmitText,
    buttonSubmitAction,
  ) => {
    return Alert.prompt(title, subtitle, [
      {
        text: buttonCancelText,
        onPress: () => buttonCancelAction,
        style: 'cancel',
      },
      {
        text: buttonSubmitText,
        onPress: (t) => {
          buttonSubmitAction(t);
          setAddFoodStep(addFoodStep + 1);
        },
      },
    ]);
  };

  const addTag = () => {
    const buttonSubmitAction = async (tagText) => {
      const updatedFoodItem = await addFoodTag(item._id, tagText, restaurantKey);
      console.log('Add Tag', updatedFoodItem);
      if (updatedFoodItem?.data) {
        setItem(updatedFoodItem.data);
      } else {
        Alert.alert('Error adding tag', 'Please try again later');
      }
    };
    Alert.prompt('Enter Tag', '', [
      {
        text: 'Cancel',
        onPress: () => {},
        style: 'cancel',
      },
      {
        text: 'Submit',
        onPress: (t) => {
          buttonSubmitAction(t);
        },
      },
    ]);
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

          {item?.notes?.length > 0 ? (
            <View style={{ marginTop: 20 }}>
              <Text style={{ fontWeight: 'bold', fontSize: 18, marginTop: 10 }}>Notes</Text>
              <Divider style={{ marginTop: 10 }} />
              {item?.notes.map((note, index) => {
                return (
                  <View key={`note_${index}`} style={{ marginTop: 10 }}>
                    <Text style={{ fontWeight: '600', fontSize: 15 }}>{note.eater}</Text>
                    <Text style={{ marginTop: 4, marginLeft: 0 }}>{`- ${note.note}`}</Text>
                  </View>
                );
              })}
            </View>
          ) : null}
        </View>

        <View style={{ paddingHorizontal: 20, marginTop: 30 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 18,
              }}>
              Tags
            </Text>
            <TouchableOpacity
              onPress={() => addTag()}
              style={{ justifyContent: 'center', alignItems: 'center', marginLeft: 6 }}>
              <Text>+</Text>
            </TouchableOpacity>
          </View>
          <Divider style={{ marginTop: 10 }} />
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 6 }}>
            {item?.tags?.map((tag, index) => {
              return (
                <Tag
                  tag={tag}
                  index={index}
                  foodId={item._id}
                  setItem={setItem}
                  restaurantKey={restaurantKey}
                />
              );
            })}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default EditFoodPage;
