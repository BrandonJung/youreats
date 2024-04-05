import React from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

const LoginPage = ({ navigation }) => {
  return (
    <View style={{ alignItems: 'center', justifyContent: 'center', height: '80%', width: '100%' }}>
      <View style={{ width: '80%', backgroundColor: '#FFFFFF', padding: 20, borderRadius: 6 }}>
        <Text style={{ marginBottom: 20 }}>Sign in to do great things</Text>
        <View style={{ marginBottom: 10 }}>
          <Text>Enter your username</Text>
          <TextInput
            onChangeText={(t) => console.log(t)}
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
          <Text>Enter your password</Text>
          <TextInput
            onChangeText={(t) => console.log(t)}
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
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ color: 'darkgray' }}>Don't have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignupPage')}>
            <Text style={{ color: 'red' }}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default LoginPage;
