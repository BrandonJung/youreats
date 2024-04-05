import React from 'react';
import { useUser } from '../contexts/User';
import { ScrollView, Text, View } from 'react-native';
import AccountOption from '../components/AccountOption';
import SocialIcon from '../components/SocialIcon';

const AccountPage = ({ navigation }) => {
  const { userData } = useUser();

  return (
    <ScrollView>
      <View style={{ backgroundColor: 'black', width: '100%', height: 220 }}></View>
      <View>
        <AccountOption
          title={userData ? 'My Account' : 'Log In'}
          navigation={navigation}
          navPage={userData ? 'AccountPage' : 'LoginPage'}
        />
        <AccountOption title={'Manage My Lists'} navigation={navigation} />
        <AccountOption title={'Refer a Friend'} navigation={navigation} />
        <AccountOption title={'Support'} navigation={navigation} />
        {!userData ? <AccountOption title={'Log Out'} titleColor={'red'} noDivider /> : null}
      </View>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Follow for News & Updates</Text>
        <View
          style={{
            marginTop: 14,
            flexDirection: 'row',
            justifyContent: 'center',
            width: '80%',
          }}>
          <SocialIcon />
          <SocialIcon />
          <SocialIcon />
        </View>
      </View>
    </ScrollView>
  );
};

export default AccountPage;
