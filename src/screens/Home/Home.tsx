import React, {useCallback} from 'react';
import {Image, View, ImageProps} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Text, Button, Spinner} from '@ui-kitten/components';
import {RenderProp} from '@ui-kitten/components/devsupport';

import {ApplicationDispatch, ApplicationState} from '../../store';
import * as fridayPrayingActions from '../../store/fridayPraying/fridayPraying.actions';
import {ScreenNavigationProp} from '../../utils/ScreenProps';
import {MainStackParams, ROUTES} from '../../configs/navigator.configs';
import I18n, {moment} from '../../utils/i18n';

import TimesList from '../../components/TimesList/TimesList';
import ScreenContainer from '../../components/ScreenContainer/ScreenContainer';

import styles from './Home.styles';

interface Props extends ScreenNavigationProp<MainStackParams, ROUTES.HOME> {}

const HomeScreen: React.FC<Props> = ({navigation}) => {
  const dispatch = useDispatch<ApplicationDispatch>();
  const {loading} = useSelector(
    (state: ApplicationState) => state.global.getFridayPraying,
  );

  const {times: fridayPrayingTimes, nextFridayData} = useSelector(
    (state: ApplicationState) => state.fridayPraying,
  );

  const fetchData = useCallback(() => {
    dispatch(fridayPrayingActions.getFridayPrayingActionAsync.request());
  }, [dispatch]);

  const onRefresh = () => {
    fetchData();
  };

  const handleOnSelect = (id: string) => {
    navigation.navigate(ROUTES.SIGN_IN, {params: {reservePrayingTime: id}});
  };

  const LoadingIndicator: RenderProp<Partial<ImageProps>> = (props) => (
    <>
      {loading && (
        <View style={[props?.style, styles.indicator]}>
          <Spinner size="small" status="primary" />
        </View>
      )}
    </>
  );

  return (
    <ScreenContainer level="2">
      <Image
        source={require('../../assets/images/logo.png')}
        style={styles.logo}
      />
      {nextFridayData && (
        <Text category="s1" style={styles.listCaption}>
          {`${I18n.t('home.timesList.caption')} ${moment(nextFridayData).format(
            'L',
          )}`}
        </Text>
      )}
      <TimesList
        times={fridayPrayingTimes}
        onSelect={handleOnSelect}
        isLoading={loading}
      />
      <Button
        disabled={loading}
        status="primary"
        style={styles.refreshBtn}
        onPress={onRefresh}
        accessoryLeft={LoadingIndicator}>
        {I18n.t('actions.refresh')}
      </Button>
    </ScreenContainer>
  );
};

export default HomeScreen;
