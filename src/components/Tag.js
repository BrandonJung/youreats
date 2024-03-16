import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useRestaurant } from '../contexts/Restaurant';

const Tag = ({ tag, index, foodId, setItem, restaurantKey }) => {
  const [isFocussed, setIsFocussed] = useState(false);

  const { removeFoodTag } = useRestaurant();

  const handleOnClick = async () => {
    const removeFoodTagRes = await removeFoodTag(foodId, index, restaurantKey);
    console.log('Remove Tag', removeFoodTagRes?.data);
    if (removeFoodTagRes?.data) {
      setItem(removeFoodTagRes.data);
    }
  };

  return (
    <View
      style={{
        marginRight: 8,
        borderColor: 'grey',
        borderRadius: 10,
        borderWidth: 1,
        paddingHorizontal: 6,
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <TouchableOpacity
        onPress={() => {
          setIsFocussed(!isFocussed);
        }}
        key={`${tag}_${index}`}
        style={{}}>
        <Text style={{ lineHeight: 24 }}>{tag}</Text>
      </TouchableOpacity>
      {isFocussed ? (
        <TouchableOpacity onPress={() => handleOnClick()} style={{ marginLeft: 6 }}>
          <Text>X</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default Tag;
