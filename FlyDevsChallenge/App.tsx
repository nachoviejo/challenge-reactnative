import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from './src/redux/store';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {colors} from './src/shared/styles/colors';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {HomeStack} from './src/screens/Home/components/HomeStack';
import {AccountDetailsStack} from './src/screens/AccountDetails/components/AccountDetailsStack';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NavigationContainer>
          <Tab.Navigator>
            <Tab.Screen
              name="Home"
              component={HomeStack}
              options={{
                tabBarIcon: () => {
                  return (
                    <MaterialCommunityIcon
                      name="home-outline"
                      size={40}
                      color={colors.black}
                    />
                  );
                },
              }}
            />
            <Tab.Screen
              name="Account"
              component={AccountDetailsStack}
              options={{
                tabBarIcon: () => {
                  return (
                    <MaterialCommunityIcon
                      name="account-outline"
                      size={40}
                      color={colors.black}
                    />
                  );
                },
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
