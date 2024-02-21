import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import HomePage from './src/pages/HomePage';

const Stack = creatNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Home' component={HomePage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
