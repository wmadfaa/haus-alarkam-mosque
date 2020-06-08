import React, {useState, useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Button, Layout, Text, Spinner} from '@ui-kitten/components';

import * as UserActions from '../../store/user/user.actions';
import * as userActions from '../../store/user/user.actions';
import * as GlobalActions from '../../store/globalState/globalState.actions';

import {ApplicationDispatch, ApplicationState} from '../../store';
import {NestedScreenNavigationProp} from '../../utils/ScreenProps';
import {
  MainStackParams,
  ROUTES,
  SignInStackParams,
} from '../../configs/navigator.configs';
import I18n, {moment} from '../../utils/i18n';

import styles from './User.styles';
import {RenderProp} from '@ui-kitten/components/devsupport';
import {ImageProps, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

interface Props
  extends NestedScreenNavigationProp<
    MainStackParams,
    SignInStackParams,
    ROUTES.SIGN_IN_USER
  > {}

interface State {
  confirmingReservation: boolean;
  deletingProfile: boolean;
}

const UserScreen: React.FC<Props> = ({navigation, route}) => {
  const [appState, setState] = useState<State>({
    confirmingReservation: false,
    deletingProfile: false,
  });
  const dispatch = useDispatch<ApplicationDispatch>();
  const {
    user: {profile},
    global: {setUser, deleteUserProfile},
  } = useSelector((state: ApplicationState) => state);

  const handleConfirmReservation = useCallback(() => {
    if (profile) {
      dispatch(
        UserActions.setUserProfileActionAsync.request({
          profile,
          reservePrayingTime: route.params.reservePrayingTime,
        }),
      );
      setState((prev) => ({...prev, confirmingReservation: true}));
    }
  }, [dispatch, profile, route.params.reservePrayingTime]);

  const onConfirmedReservation = useCallback(() => {
    setState((prev) => ({...prev, confirmingReservation: false}));
    navigation.navigate(ROUTES.CONTROL);
  }, [navigation]);

  useEffect(() => {
    if (!setUser.loading && appState.confirmingReservation) {
      onConfirmedReservation();
    }
  }, [onConfirmedReservation, setUser.loading, appState.confirmingReservation]);

  const handleDeleteProfile = useCallback(() => {
    setState((prev) => ({...prev, deletingProfile: true}));
    dispatch(userActions.deleteUserProfileActionAsync.request());
  }, [dispatch]);

  const onDeletedProfile = useCallback(() => {
    setState((prev) => ({...prev, deletingProfile: false}));
    dispatch(GlobalActions.setRememberUser(false));
    navigation.navigate(ROUTES.SIGN_IN, {
      screen: ROUTES.SIGN_IN_FORM,
      params: {reservePrayingTime: route.params.reservePrayingTime},
    });
  }, [dispatch, navigation, route.params.reservePrayingTime]);

  useEffect(() => {
    if (!deleteUserProfile.loading && appState.deletingProfile) {
      onDeletedProfile();
    }
  }, [appState.deletingProfile, deleteUserProfile.loading, onDeletedProfile]);

  const LoadingIndicator = (
    action: 'conformReservation' | 'deleteProfile',
  ): RenderProp<Partial<ImageProps>> =>
    useCallback(
      (props) => {
        if (
          action === 'conformReservation' &&
          !appState.confirmingReservation
        ) {
          return <></>;
        }
        if (action === 'deleteProfile' && !appState.deletingProfile) {
          return <></>;
        }
        return (
          <View style={[props?.style, styles.indicator]}>
            <Spinner size="small" status="primary" />
          </View>
        );
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [action, appState.deletingProfile, appState.confirmingReservation],
    );

  return (
    <Layout style={styles.container}>
      <ScrollView>
        <Layout style={styles.content}>
          <Text category="h6" style={styles.title}>
            {I18n.t('signIn.profile')}
          </Text>
          {profile && (
            <Layout level="3" style={styles.profileCard}>
              <Text category="p1">
                <Text category="s1">
                  {I18n.t('signIn.userForm.inputs.firstName.label')}:
                </Text>{' '}
                {profile.firstName}
              </Text>
              <Text category="p1">
                <Text category="s1">
                  {I18n.t('signIn.userForm.inputs.lastName.label')}:
                </Text>{' '}
                {profile.lastName}
              </Text>
              <Text category="p1">
                <Text category="s1">
                  {I18n.t('signIn.userForm.inputs.phoneNumber.label')}:
                </Text>{' '}
                {profile.phoneNumber}
              </Text>
              <Text category="p1">
                <Text category="s1">{I18n.t('signIn.reservationDate')}:</Text>{' '}
                {moment(route.params.reservePrayingTime).calendar()}
              </Text>
            </Layout>
          )}
        </Layout>
      </ScrollView>
      <Layout style={styles.actions}>
        <Button
          style={styles.button}
          status="danger"
          onPress={handleDeleteProfile}
          disabled={appState.deletingProfile}
          accessoryLeft={LoadingIndicator('deleteProfile')}>
          {I18n.t('actions.deleteProfile')}
        </Button>
        <Button
          style={styles.button}
          status="primary"
          onPress={handleConfirmReservation}
          disabled={appState.confirmingReservation}
          accessoryLeft={LoadingIndicator('conformReservation')}>
          {I18n.t('actions.confirmReservation')}
        </Button>
      </Layout>
    </Layout>
  );
};

export default UserScreen;
