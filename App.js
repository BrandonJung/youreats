import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import HomePage from './src/pages/HomePage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ViewRestaurantPage from './src/pages/ViewRestaurantPage';
import EditRestaurantPage from './src/pages/EditRestaurantPage';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();
const TopTabs = createMaterialTopTabNavigator();

const HomeTabs = () => {
  return (
    <BottomTabs.Navigator
      initialRouteName='HomePage'
      screenOptions={{ headerShown: true }}>
      <BottomTabs.Screen
        name='HomePage'
        component={HomePage}
        options={({ navigation, route }) => ({ title: 'Home' })}
      />
    </BottomTabs.Navigator>
  );
};

const RestaurantTabs = () => {
  return (
    <TopTabs.Navigator
      initialRouteName='ViewRestaurantPage'
      screenOptions={{ headerShown: false }}>
      <TopTabs.Screen
        name='ViewRestaurantPage'
        component={ViewRestaurantPage}
        options={({ navigation, route }) => ({ title: 'View' })}
      />
      <TopTabs.Screen
        name='EditRestaurantPage'
        component={EditRestaurantPage}
        options={({ navigation, route }) => ({ title: 'Edit' })}
      />
    </TopTabs.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='HomeTabs'
        screenOptions={({ navigation, route }) => ({
          headerBackTitle: 'Back',
        })}>
        <Stack.Screen
          name='HomeTabs'
          component={HomeTabs}
          options={({ navigation, route }) => ({ headerShown: false })}
        />
        <Stack.Screen
          name='RestaurantPage'
          component={RestaurantTabs}
          options={({ navigation, route }) => ({
            headerShown: true,
            title: route.params.restaurant.name,
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
