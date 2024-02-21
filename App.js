import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import HomePage from './src/pages/HomePage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FoodPage from './src/pages/FoodPage';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName='HomePage'
      screenOptions={{ headerShown: true }}>
      <Tab.Screen
        name='HomePage'
        component={HomePage}
        options={({ navigation, route }) => ({ title: 'Home' })}
      />
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='TabNavigator'
        screenOptions={({ navigation, route }) => ({
          headerBackTitle: 'Back',
        })}>
        <Stack.Screen
          name='TabNavigator'
          component={TabNavigator}
          options={({ navigation, route }) => ({ headerShown: false })}
        />
        <Stack.Screen
          name='FoodPage'
          component={FoodPage}
          options={({ navigation, route }) => ({ headerShown: true })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
