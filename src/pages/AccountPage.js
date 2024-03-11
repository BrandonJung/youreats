import React, { useState } from 'react';
import { useUser } from '../contexts/User';
import { Alert, Text, TextInput, View } from 'react-native';
import { Button } from 'react-native-paper';

const AccountPage = ({ navigation }) => {
  const { userData, createUser, retrieveUser } = useUser();
  const [newFirstName, setNewFirstName] = useState(null);
  const [newLastName, setNewLastName] = useState(null);
  const [newEmail, setNewEmail] = useState(null);
  const [newMobile, setNewMobile] = useState(null);

  const handleCreateUser = async () => {
    if (!newFirstName) {
      Alert.alert('Missing first name');
    }
    if (!newEmail) {
      Alert.alert('Missing email');
    }
    const createUserRes = await createUser(newFirstName, newLastName, newEmail, newMobile);
    if (createUserRes) {
      Alert.alert('New User successfully created');
    } else {
      Alert.alert('Error creating user');
    }
  };

  return (
    <View>
      {!userData ? (
        <View style={{ padding: 20 }}>
          <Text>First Name*</Text>
          <TextInput
            onChangeText={(t) => setNewFirstName(t)}
            style={{
              backgroundColor: '#FFFFFF',
              height: 30,
              borderColor: 'black',
              borderWidth: 1,
            }}
          />
          <Text>Last Name</Text>
          <TextInput
            onChangeText={(t) => setNewLastName(t)}
            style={{
              backgroundColor: '#FFFFFF',
              height: 30,
              borderColor: 'black',
              borderWidth: 1,
            }}
          />

          <Text>Email*</Text>
          <TextInput
            onChangeText={(t) => setNewEmail(t)}
            style={{
              backgroundColor: '#FFFFFF',
              height: 30,
              borderColor: 'black',
              borderWidth: 1,
            }}
          />

          <Text>Phone Number</Text>
          <TextInput
            onChangeText={(t) => setNewMobile(t)}
            style={{
              backgroundColor: '#FFFFFF',
              height: 30,
              borderColor: 'black',
              borderWidth: 1,
            }}
          />
          <Button onPress={() => handleCreateUser()}>Create User</Button>
          <Button>Log Out</Button>
        </View>
      ) : null}
    </View>
  );
};

export default AccountPage;
