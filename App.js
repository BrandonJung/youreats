import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import React, { useState } from 'react';
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
import { useColorScheme } from 'react-native';

const Stack = createNativeStackNavigator();
const TopTabs = createMaterialTopTabNavigator();
const BottomTabs = createMaterialBottomTabNavigator();

const HomeTabs = () => {
  return (
    <BottomTabs.Navigator
      initialRouteName='HomePage'
      shifting={false}
      barStyle={{ backgroundColor: '#FFFFFF' }}
      screenOptions={{ headerShown: true }}>
      <BottomTabs.Screen
        name='HomePage'
        component={HomePage}
        options={({ navigation, route }) => ({ title: 'Home' })}
      />
      {/* <BottomTabs.Screen
        name='CameraPage'
        component={HomePage}
        options={({ navigation, route }) => ({ title: 'Camera' })}
      />
      <BottomTabs.Screen
        name='Account'
        component={HomePage}
        options={({ navigation, route }) => ({ title: 'Account' })}
      /> */}
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
  const colorScheme = useColorScheme();
  return (
    <RestaurantProvider>
      <NavigationContainer theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack.Navigator
          initialRouteName='HomeTabs'
          screenOptions={({ navigation, route }) => ({
            headerBackTitle: 'Back',
          })}>
          <Stack.Screen
            name='Home'
            component={HomePage}
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
        </Stack.Navigator>
      </NavigationContainer>
    </RestaurantProvider>
  );
};

export default App;
