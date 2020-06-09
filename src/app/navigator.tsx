import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {ROUTES, MainStackParams} from '../configs/navigator.configs';

import SignInNavigator from './SignIn.navigator';

import HomeScreen from '../screens/Home/Home';
import ControlScreen from '../screens/Control/Control';
import LoadingScreen from '../screens/Loading/Loading';

const Stack = createStackNavigator<MainStackParams>();

const Navigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name={ROUTES.LOADING} component={LoadingScreen} />
        <Stack.Screen name={ROUTES.HOME} component={HomeScreen} />
        <Stack.Screen name={ROUTES.SIGN_IN} component={SignInNavigator} />
        <Stack.Screen name={ROUTES.CONTROL} component={ControlScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
