import React, { useState } from 'react';
import { Text, TouchableOpacity, View, Image } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { useRestaurant } from '../contexts/Restaurant';

const imageSize = 140;
const radiusNumber = 6;

const EditRestaurantPage = ({ navigation, restaurant }) => {
  const [restaurantImage, setRestaurantImage] = useState(restaurant.imageURL ?? null);

  const { AddRestaurantPhoto } = useRestaurant();

  const uploadPhoto = async () => {
    const photoResult = await launchImageLibrary({ mediaType: 'photo' });
    setRestaurantImage(photoResult.assets[0].uri);
    AddRestaurantPhoto(photoResult.assets[0].uri, restaurant.key);
  };
  return (
    <View style={{ padding: 10 }}>
      {restaurantImage ? (
        <Image
          width={imageSize}
          height={imageSize}
          source={{
            uri: restaurantImage,
          }}
          style={{
            borderRadius: radiusNumber,
          }}
          resizeMode='cover'
        />
      ) : null}
      <TouchableOpacity
        onPress={() => {
          uploadPhoto();
        }}>
        <Text>{restaurantImage ? `Replace Photo` : `Upload Photo`}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EditRestaurantPage;
