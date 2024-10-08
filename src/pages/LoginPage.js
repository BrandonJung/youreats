import React, { useState } from 'react';
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useUser } from '../contexts/User';

const LoginPage = ({ navigation }) => {
  const [userName, setUserName] = useState(null);
  const [userPassword, setUserPassword] = useState(null);

  const { loginUser } = useUser();
  const handleLogin = async () => {
    if (!userName) {
      Alert.alert('Missing username');
    }
    // if (!userPassword) {
    //   Alert.alert('Missing password');
    // }
    try {
      const userRes = await loginUser(userName);
      if (userRes.success) {
        navigation.goBack();
      } else {
        Alert.alert(userRes.message);
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <View style={{ alignItems: 'center', justifyContent: 'center', height: '80%', width: '100%' }}>
      <View style={{ width: '80%', backgroundColor: '#FFFFFF', padding: 20, borderRadius: 6 }}>
        <Text style={{ marginBottom: 20 }}>Sign in to do great things</Text>
        <View style={{ marginBottom: 10 }}>
          <Text>Enter your username</Text>
          <TextInput
            onChangeText={(t) => setUserName(t)}
            placeholder='Email or Phone Number'
            style={{
              backgroundColor: '#FFFFFF',
              height: 30,
              borderColor: 'black',
              borderWidth: 1,
              marginTop: 6,
              borderRadius: 6,
              paddingLeft: 6,
            }}
          />
        </View>
        <View style={{ marginBottom: 4 }}>
          <Text>{`Enter your password (Not implemented)`}</Text>
          <TextInput
            onChangeText={(t) => setUserPassword(t)}
            secureTextEntry
            style={{
              backgroundColor: '#FFFFFF',
              height: 30,
              borderColor: 'black',
              borderWidth: 1,
              marginTop: 6,
              borderRadius: 6,
              paddingLeft: 6,
            }}
          />
        </View>
        <TouchableOpacity
          onPress={() => handleLogin()}
          style={{ justifyContent: 'flex-end', alignItems: 'flex-end' }}>
          <Text>Log In</Text>
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
          <Text style={{ color: 'darkgray' }}>Don't have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignupPage')}>
            <Text style={{ color: 'red', marginLeft: 4 }}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default LoginPage;
