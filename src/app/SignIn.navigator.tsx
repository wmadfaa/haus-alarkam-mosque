import React, {useCallback, useState} from 'react';
import {ImageProps} from 'react-native';
import {useSelector} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  TopNavigation,
  Divider,
  Icon,
  TopNavigationAction,
} from '@ui-kitten/components';
import {RenderProp} from '@ui-kitten/components/devsupport';

import {ScreenNavigationProp} from '../utils/ScreenProps';
import {isRTL} from '../utils/i18n';

import {
  ROUTES,
  MainStackParams,
  SignInStackParams,
} from '../configs/navigator.configs';

import {ApplicationState} from '../store/index';

import SignInScreen from '../screens/SignIn/SignIn';
import UserScreen from '../screens/User/User';
import ScreenContainer from '../components/ScreenContainer/ScreenContainer';
import {ModalProvider} from '../components/Modal/Modal';

const SignInStack = createStackNavigator<SignInStackParams>();

const SignInNavigator: React.FC<ScreenNavigationProp<
  MainStackParams,
  ROUTES.SIGN_IN
>> = ({navigation, route}) => {
  const [isMounted, setIsMounted] = useState(false);
  const {
    global: {rememberUser},
    user: {profile},
  } = useSelector((state: ApplicationState) => state);

  const pickScreen = useCallback(() => {
    if (rememberUser && profile) {
      navigation.navigate(ROUTES.SIGN_IN, {
        screen: ROUTES.SIGN_IN_USER,
        params: {reservePrayingTime: route.params.params.reservePrayingTime},
      });
    } else {
      navigation.navigate(ROUTES.SIGN_IN, {
        screen: ROUTES.SIGN_IN_FORM,
        params: {reservePrayingTime: route.params.params.reservePrayingTime},
      });
    }
  }, [
    navigation,
    profile,
    rememberUser,
    route.params.params.reservePrayingTime,
  ]);

  useFocusEffect(
    useCallback(() => {
      setIsMounted(true);
      return () => {
        setIsMounted(false);
      };
    }, []),
  );
  useFocusEffect(pickScreen);

  const BackAction = () => {
    const BackIcon: RenderProp<Partial<ImageProps>> = (props) => (
      <Icon
        {...props}
        style={[props?.style, {transform: [{scaleX: isRTL ? -1 : 1}]}]}
        name="arrow-back"
      />
    );
    return (
      <TopNavigationAction
        icon={BackIcon}
        onPress={() => navigation.goBack()}
      />
    );
  };

  if (!isMounted) {
    return null;
  }

  return (
    <ModalProvider>
      <ScreenContainer level="1">
        <TopNavigation accessoryLeft={BackAction} />
        <Divider />
        <SignInStack.Navigator headerMode="none">
          <SignInStack.Screen
            name={ROUTES.SIGN_IN_USER}
            component={UserScreen}
          />
          <SignInStack.Screen
            name={ROUTES.SIGN_IN_FORM}
            component={SignInScreen}
          />
        </SignInStack.Navigator>
      </ScreenContainer>
    </ModalProvider>
  );
};

export default SignInNavigator;
