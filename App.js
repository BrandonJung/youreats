import { NavigationContainer } from '@react-navigation/native';
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

const Stack = createNativeStackNavigator();
const TopTabs = createMaterialTopTabNavigator();
const BottomTabs = createMaterialBottomTabNavigator();

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
      <BottomTabs.Screen
        name='CameraPage'
        component={HomePage}
        options={({ navigation, route }) => ({ title: 'Camera' })}
      />
      <BottomTabs.Screen
        name='Account'
        component={HomePage}
        options={({ navigation, route }) => ({ title: 'Account' })}
      />
    </BottomTabs.Navigator>
  );
};

const RestaurantTabs = ({ navigation, route }) => {
  return (
    <TopTabs.Navigator
      initialRouteName='ViewFoodPage'
      screenOptions={{ headerShown: false }}>
      <TopTabs.Screen
        name='ViewFoodPage'
        options={({ navigation, route }) => ({ title: 'Food' })}>
        {() => <ViewFoodPage restaurant={route.params?.restaurant} />}
      </TopTabs.Screen>
      <TopTabs.Screen
        name='ViewPeoplePage'
        options={({ navigation, route }) => ({ title: 'People' })}>
        {() => <ViewPeoplePage restaurant={route.params?.restaurant} />}
      </TopTabs.Screen>
      <TopTabs.Screen
        name='EditRestaurantPage'
        options={({ navigation, route }) => ({ title: 'Edit' })}>
        {() => <EditRestaurantPage restaurant={route.params?.restaurant} />}
      </TopTabs.Screen>
    </TopTabs.Navigator>
  );
};

const App = () => {
  return (
    <RestaurantProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName='HomeTabs'
          screenOptions={({ navigation, route }) => ({
            headerBackTitle: 'Back',
          })}>
          <Stack.Screen
            name='Home'
            component={HomeTabs}
            options={({ navigation, route }) => ({ headerShown: true })}
          />
          <Stack.Screen
            name='RestaurantPage'
            component={RestaurantTabs}
            options={({ navigation, route }) => ({
              headerShown: true,
              title: route.params.restaurant.name,
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
        </Stack.Navigator>
      </NavigationContainer>
    </RestaurantProvider>
  );
};

export default App;
