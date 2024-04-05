import React, { useState } from 'react';
import { Alert, ScrollView, View } from 'react-native';
import { apiCall } from '../constants/const_functions';
import { Button } from 'react-native-paper';
import { useUser } from '../contexts/User';
import AccountTextInput from '../components/AccountTextInput';

const SignupPage = ({ navigation }) => {
  const { userData, createUser, retrieveUser } = useUser();

  const [newFirstName, setNewFirstName] = useState(null);
  const [newLastName, setNewLastName] = useState(null);
  const [newEmail, setNewEmail] = useState(null);
  const [newMobile, setNewMobile] = useState(null);
  const [retrieveId, setRetrieveId] = useState(null);

  const handleCreateUser = async () => {
    if (!newFirstName) {
      Alert.alert('Missing first name');
      return;
    }
    if (!newEmail) {
      Alert.alert('Missing email');
      return;
    }
    const createUserRes = await createUser(newFirstName, newLastName, newEmail, newMobile);
    if (createUserRes) {
      navigation.navigate('HomePage');
    } else {
      Alert.alert('Error creating user');
      return;
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
    <ScrollView>
      {!userData ? (
        <View style={{ padding: 20 }}>
          <AccountTextInput
            title={'First Name'}
            required
            handleTextChange={setNewFirstName}
            placeholder={'John'}
          />
          <AccountTextInput
            title={'Last Name'}
            required
            handleTextChange={setNewLastName}
            placeholder={'Doe'}
          />
          <AccountTextInput
            title={'Email'}
            required
            handleTextChange={setNewEmail}
            placeholder={'youreats@gmail.com'}
          />
          <AccountTextInput
            title={'Phone Number'}
            handleTextChange={setNewMobile}
            placeholder={'1234567890'}
          />
          <Button onPress={() => handleCreateUser()}>Create Account</Button>
          {/* <TextInput
            onChangeText={(t) => setRetrieveId(t)}
            style={{
              backgroundColor: '#FFFFFF',
              height: 30,
              borderColor: 'black',
              borderWidth: 1,
            }}
          />
          <Button>Search by ID</Button>
          <Button onPress={() => deleteAllUsers()}>Delete all users</Button> */}
        </View>
      ) : null}
    </ScrollView>
  );
};

export default SignupPage;
