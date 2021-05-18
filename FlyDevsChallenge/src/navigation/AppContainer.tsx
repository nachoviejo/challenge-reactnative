import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screens/Home/Home';

const AppStack = () => {
  const App = createNativeStackNavigator();
  return (
    <App.Navigator>
      <App.Screen name="Home" component={Home} />
    </App.Navigator>
  );
};

export default AppStack;
