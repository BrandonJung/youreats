import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Divider } from 'react-native-paper';
import { useUser } from '../contexts/User';

const AccountOption = ({ title, titleColor = 'black', navPage, noDivider = false, navigation }) => {
  const { logoutUser } = useUser();
  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          if (title === 'Log Out') {
            logoutUser();
          } else if (navPage) {
            navigation.navigate(navPage);
          }
        }}
        style={{
          padding: 10,
          paddingVertical: 16,
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={[{ color: titleColor, fontSize: 16 }]}>{title}</Text>
      </TouchableOpacity>
      {!noDivider ? <Divider /> : null}
    </View>
  );
};

export default AccountOption;
