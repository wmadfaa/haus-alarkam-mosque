import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {ROUTES, MainStackParams} from '../configs/navigator.configs';

import HomeScreen from '../screens/Home/Home';

const Stack = createStackNavigator<MainStackParams>();

const Navigator: React.FC = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name={ROUTES.HOME} component={HomeScreen} />
    </Stack.Navigator>
  );
};

export default Navigator;
