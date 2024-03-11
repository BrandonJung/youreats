import React, { useState } from 'react';
import { useUser } from '../contexts/User';
import { Alert, Text, TextInput, View } from 'react-native';
import { Button } from 'react-native-paper';
import { apiCall } from '../constants/const_functions';
import { apiService } from '../constants/const_api';

const AccountPage = ({ navigation }) => {
  const { userData, createUser, retrieveUser } = useUser();
  const [newFirstName, setNewFirstName] = useState(null);
  const [newLastName, setNewLastName] = useState(null);
  const [newEmail, setNewEmail] = useState(null);
  const [newMobile, setNewMobile] = useState(null);
  const [retrieveId, setRetrieveId] = useState(null);

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

  const deleteAllUsers = async () => {
    try {
      const deleteAllUsersRes = await apiCall(apiService.user, 'deleteAllUsers', 'delete', {});
      if (deleteAllUsersRes?.data?.deletedCount) {
        Alert.alert('Deleted Count: ' + deleteAllUsersRes.data.deletedCount);
      }
    } catch (e) {
      console.log(e);
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
          <TextInput
            onChangeText={(t) => setRetrieveId(t)}
            style={{
              backgroundColor: '#FFFFFF',
              height: 30,
              borderColor: 'black',
              borderWidth: 1,
            }}
          />
          <Button>Search by ID</Button>
          <Button onPress={() => deleteAllUsers()}>Delete all users</Button>
        </View>
      ) : null}
    </View>
  );
};

export default AccountPage;
