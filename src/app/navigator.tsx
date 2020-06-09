import React, {useRef, useEffect, useState, useCallback} from 'react';
import {
  NavigationContainer,
  NavigationContainerRef,
} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {useDispatch, useSelector} from 'react-redux';

import {ROUTES, MainStackParams} from '../configs/navigator.configs';
import {ApplicationDispatch, ApplicationState} from '../store';
import * as fridayPrayingActions from '../store/fridayPraying/fridayPraying.actions';

import SignInNavigator from './SignIn.navigator';

import HomeScreen from '../screens/Home/Home';
import ControlScreen from '../screens/Control/Control';
import LoadingScreen from '../screens/Loading/Loading';

const Stack = createStackNavigator<MainStackParams>();

interface State {
  mounted: boolean;
  fetchingFridayPrayingData: boolean;
}

const Navigator: React.FC = () => {
  const ref = useRef<NavigationContainerRef>(null);
  const dispatch = useDispatch<ApplicationDispatch>();
  const {
    global: {getFridayPraying: getFridayPrayingActionState},
  } = useSelector((state: ApplicationState) => state);
  const [state, setState] = useState<State>({
    fetchingFridayPrayingData: true,
    mounted: false,
  });

  useEffect(() => {
    setState((prev) => ({...prev, mounted: true}));
    return () => {
      setState((prev) => ({...prev, mounted: false}));
    };
  }, []);

  const fetchData = useCallback(() => {
    setState((prev) => ({...prev, fetchingFridayPrayingData: true}));
    dispatch(fridayPrayingActions.getFridayPrayingActionAsync.request());
  }, [dispatch]);

  const cancelFetchingData = useCallback(() => {
    dispatch(fridayPrayingActions.getFridayPrayingActionAsync.cancel());
    setState((prev) => ({...prev, fetchingFridayPrayingData: false}));
  }, [dispatch]);

  useEffect(() => {
    fetchData();
    return cancelFetchingData;
  }, [cancelFetchingData, fetchData]);

  useEffect(() => {
    if (
      state.mounted &&
      !getFridayPrayingActionState.loading &&
      state.fetchingFridayPrayingData
    ) {
      setState((prev) => ({...prev, fetchingFridayPrayingData: false}));
    }
  }, [
    getFridayPrayingActionState,
    state.fetchingFridayPrayingData,
    state.mounted,
  ]);

  useEffect(() => {
    if (ref.current) {
    }
  }, []);

  return (
    <NavigationContainer ref={ref}>
      <Stack.Navigator headerMode="none">
        {state.fetchingFridayPrayingData ? (
          <Stack.Screen name={ROUTES.LOADING} component={LoadingScreen} />
        ) : (
          <>
            <Stack.Screen name={ROUTES.HOME} component={HomeScreen} />
            <Stack.Screen name={ROUTES.SIGN_IN} component={SignInNavigator} />
            <Stack.Screen name={ROUTES.CONTROL} component={ControlScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
