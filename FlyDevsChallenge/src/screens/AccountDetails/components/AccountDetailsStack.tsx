import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AccountDetails from '../AccountDetails';

const AccountDetailsStackNavigator = createStackNavigator();

export const AccountDetailsStack = () => {
  return (
    <AccountDetailsStackNavigator.Navigator>
      <AccountDetailsStackNavigator.Screen
        name="Account"
        component={AccountDetails}
        options={{
          title: 'Account',
        }}
      />
    </AccountDetailsStackNavigator.Navigator>
  );
};
