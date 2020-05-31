import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {ROUTES, MainStackParams} from '../configs/navigator.configs';

import HomeScreen from '../screens/Home/Home';
import SignInScreen from '../screens/SignIn/SignIn';

const Stack = createStackNavigator<MainStackParams>();

const Navigator: React.FC = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name={ROUTES.HOME} component={HomeScreen} />
      <Stack.Screen name={ROUTES.SIGN_IN} component={SignInScreen} />
    </Stack.Navigator>
  );
};

export default Navigator;
