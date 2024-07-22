import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import React from 'react';
import HomePage from './src/pages/HomePage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ViewFoodPage from './src/pages/ViewFoodPage';
import EditRestaurantPage from './src/pages/EditRestaurantPage';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import ViewPeoplePage from './src/pages/ViewPeoplePage';
import AddFoodPage from './src/pages/AddFoodPage';
import { RestaurantProvider } from './src/contexts/Restaurant';
import EditFoodPage from './src/pages/EditFoodPage';
import { UserProvider } from './src/contexts/User';
import AccountPage from './src/pages/AccountPage';
import LoginPage from './src/pages/LoginPage';
import SignupPage from './src/pages/SignupPage';
import { SvgWithCssUri } from 'react-native-svg/css';
import { Text } from 'react-native';

const Stack = createNativeStackNavigator();
const TopTabs = createMaterialTopTabNavigator();
const BottomTabs = createMaterialBottomTabNavigator();

const HomeIcon = 'https://youreats.s3.amazonaws.com/icons/home.svg';
const AccountIcon = 'https://youreats.s3.amazonaws.com/icons/account.svg';
const tabIconSize = 26;
const backgroundColor = '#EFEFEF';

const HomeTabs = () => {
  return (
    <BottomTabs.Navigator
      initialRouteName='HomePage'
      shifting={false}
      barStyle={{
        backgroundColor: backgroundColor,
        borderTopColor: 'lightgrey',
        borderTopWidth: 1,
      }}
      screenOptions={{ headerShown: true }}>
      <BottomTabs.Screen
        name='HomePage'
        component={HomePage}
        options={({ navigation, route }) => ({
          title: <Text>{'Home'}</Text>,
          tabBarIcon: ({ focused, color, size }) => (
            <SvgWithCssUri uri={HomeIcon} width={tabIconSize} height={tabIconSize} />
          ),
        })}
      />
      {/* <BottomTabs.Screen
        name='CameraPage'
        component={HomePage}
        options={({ navigation, route }) => ({ title: 'Camera' })}
      /> */}
      <BottomTabs.Screen
        name='Account'
        component={AccountPage}
        options={({ navigation, route }) => ({
          title: <Text>{'Account'}</Text>,
          tabBarIcon: ({ focused, color, size }) => (
            <SvgWithCssUri uri={AccountIcon} width={tabIconSize} height={tabIconSize} />
          ),
        })}
      />
    </BottomTabs.Navigator>
  );
};

const RestaurantTabs = ({ navigation, route }) => {
  // const [tabIndex, setTabIndex] = useState(null);
  return (
    <TopTabs.Navigator
      initialRouteName='ViewFoodPage'
      screenOptions={{ headerShown: false }}
      // screenListeners={{ state: (e) => setTabIndex(e.data.state.index) }}
    >
      <TopTabs.Screen name='ViewFoodPage' options={({ navigation, route }) => ({ title: 'Food' })}>
        {() => <ViewFoodPage navigation={navigation} restaurantKey={route.params?.restaurantKey} />}
      </TopTabs.Screen>
      <TopTabs.Screen
        name='ViewPeoplePage'
        options={({ navigation, route }) => ({ title: 'People' })}>
        {() => (
          <ViewPeoplePage navigation={navigation} restaurantKey={route.params?.restaurantKey} />
        )}
      </TopTabs.Screen>
      <TopTabs.Screen
        name='EditRestaurantPage'
        options={({ navigation, route }) => ({ title: 'Restaurant' })}>
        {() => (
          <EditRestaurantPage navigation={navigation} restaurantKey={route.params?.restaurantKey} />
        )}
      </TopTabs.Screen>
    </TopTabs.Navigator>
  );
};

const App = () => {
  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: backgroundColor,
      // secondaryContainer: 'transparent', // Use transparent to disable the little highlighting oval
    },
  };
  return (
    <UserProvider>
      <RestaurantProvider>
        <NavigationContainer theme={theme}>
          <Stack.Navigator
            initialRouteName='HomeTabs'
            screenOptions={({ navigation, route }) => ({
              headerBackTitle: 'Back',
            })}>
            <Stack.Screen
              name='Home'
              component={HomeTabs}
              options={({ navigation, route }) => ({
                headerShown: true,
                title: 'Good Morning',
              })}
            />
            <Stack.Screen
              name='RestaurantPage'
              component={RestaurantTabs}
              options={({ navigation, route }) => ({
                headerShown: true,
                title: route.params.restaurantName,
                headerBackTitle: 'Home',
              })}
            />
            <Stack.Screen
              name='AddFoodPage'
              component={AddFoodPage}
              options={({ navigation, route }) => ({
                headerShown: true,
                headerTitle: 'Add New Food',
              })}
            />
            <Stack.Screen
              name='EditFoodPage'
              component={EditFoodPage}
              options={({ navigation, route }) => ({
                headerShown: true,
                headerTitle: '',
                headerBackTitle: 'Food',
              })}
            />
            <Stack.Screen
              name='LoginPage'
              component={LoginPage}
              options={({ navigation, route }) => ({
                headerShown: true,
                headerTitle: 'Log In',
                headerBackTitle: 'Account',
              })}
            />
            <Stack.Screen
              name='SignupPage'
              component={SignupPage}
              options={({ navigation, route }) => ({
                headerShown: true,
                headerTitle: 'Sign Up',
                headerBackTitle: 'Login',
              })}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </RestaurantProvider>
    </UserProvider>
  );
};

export default App;
