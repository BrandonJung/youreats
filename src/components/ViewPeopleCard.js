import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { calculateAverageRating } from '../constants/const_functions';
import RatingStarText from './RatingStarText';
import { Divider } from 'react-native-paper';

const ViewPeopleCard = ({ eaterName, foodsList }) => {
  const [showFoods, setShowFoods] = useState(false);
  return (
    <View>
      <TouchableOpacity
        onPress={() => setShowFoods(!showFoods)}
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingBottom: 10,
        }}>
        <Text style={{ fontWeight: '600', fontSize: 16, marginBottom: 6 }}>{eaterName}</Text>
        <Text>{showFoods ? `^` : `>`}</Text>
      </TouchableOpacity>
      {showFoods ? (
        <View
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 6,
            paddingHorizontal: 10,
            paddingTop: 10,
          }}>
          {foodsList.map((food, index) => {
            const averageRating = calculateAverageRating(food.ratings);
            return (
              <View key={food._id} style={{ marginBottom: 10 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={{ fontWeight: '600' }}>{food.name}</Text>
                  {!isNaN(averageRating) ? <RatingStarText rating={averageRating} /> : null}
                </View>
                {food.notes?.length > 0 ? (
                  <View style={{ marginTop: 10 }}>
                    <Text style={{ marginBottom: 4 }}>Notes:</Text>
                    {food.notes.map((note, index) => {
                      return (
                        <Text
                          key={`${note.name}_${index}`}
                          style={{
                            color: 'grey',
                            marginLeft: 10,
                            marginBottom: 4,
                          }}>
                          - {note.note}
                        </Text>
                      );
                    })}
                  </View>
                ) : null}
                {index !== foodsList.length - 1 && foodsList.length > 1 ? (
                  <Divider style={{ marginTop: 10 }} />
                ) : null}
              </View>
            );
          })}
        </View>
      ) : null}
      {!showFoods ? <Divider /> : null}
    </View>
  );
};

export default ViewPeopleCard;
