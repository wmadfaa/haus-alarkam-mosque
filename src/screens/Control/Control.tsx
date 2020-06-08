import React, {useEffect, useCallback} from 'react';
import {Image, View, ImageProps} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Layout, Button, Text, Spinner} from '@ui-kitten/components';
import {RenderProp} from '@ui-kitten/components/devsupport';
import {ApplicationDispatch, ApplicationState} from '../../store';
import I18n, {moment} from '../../utils/i18n';

import {ScreenNavigationProp} from '../../utils/ScreenProps';
import {MainStackParams, ROUTES} from '../../configs/navigator.configs';

import ScreenContainer from '../../components/ScreenContainer/ScreenContainer';

import styles from './Control.styles';
import * as userActions from '../../store/user/user.actions';

interface Props extends ScreenNavigationProp<MainStackParams, ROUTES.CONTROL> {}

const ControlScreen: React.FC<Props> = ({navigation}) => {
  const dispatch = useDispatch<ApplicationDispatch>();
  const {
    user: {reservePrayingTime},
    fridayPraying: {nextFridayData},
    global: {cancelPrayingReservation},
  } = useSelector((state: ApplicationState) => state);

  const LoadingIndicator: RenderProp<Partial<ImageProps>> = (props) => (
    <>
      {cancelPrayingReservation.loading && (
        <View style={[props?.style, styles.indicator]}>
          <Spinner size="small" status="primary" />
        </View>
      )}
    </>
  );

  const handleCancelPrayingReservation = () => {
    dispatch(userActions.cancelPrayingReservationActionAsync.request());
  };

  const onCancelPrayingReservation = useCallback(() => {
    if (!cancelPrayingReservation.loading && !reservePrayingTime) {
      navigation.navigate(ROUTES.HOME);
    }
  }, [cancelPrayingReservation.loading, navigation, reservePrayingTime]);

  useEffect(() => {
    onCancelPrayingReservation();
  }, [onCancelPrayingReservation]);

  return (
    <ScreenContainer level="1">
      <Image
        source={require('../../assets/images/logo.png')}
        style={styles.logo}
      />
      <Layout style={styles.container} level="1">
        <Text category="p1" style={styles.infoCation}>
          {I18n.t('control.info.caption')}
        </Text>
        <Text category="h5">
          {moment(`${nextFridayData} ${reservePrayingTime}`).fromNow(true)}
        </Text>
      </Layout>
      <Layout level="1" style={styles.actions}>
        <Button
          status="danger"
          disabled={cancelPrayingReservation.loading}
          style={styles.actionButton}
          onPress={handleCancelPrayingReservation}
          accessoryLeft={LoadingIndicator}>
          {I18n.t('actions.signOut')}
        </Button>
      </Layout>
    </ScreenContainer>
  );
};

export default ControlScreen;
