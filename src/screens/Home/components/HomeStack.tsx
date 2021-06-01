import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../Home';

const HomeStackNavigator = createStackNavigator();

export const HomeStack = () => {
  return (
    <HomeStackNavigator.Navigator>
      <HomeStackNavigator.Screen
        name="Home"
        component={Home}
        options={{
          title: 'Home',
        }}
      />
    </HomeStackNavigator.Navigator>
  );
};
