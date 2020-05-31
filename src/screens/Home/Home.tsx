import React, {useEffect, useState} from 'react';
import {Image} from 'react-native';
import I18n from '../../utils/i18n';
import {Text, Button} from '@ui-kitten/components';

import {ScreenNavigationProp} from '../../utils/ScreenProps';
import {MainStackParams, ROUTES} from '../../configs/navigator.configs';
import {fetchPrayTimes, PrayTime} from '../../configs/api.configs';

import TimesList from '../../components/TimesList/TimesList';

import ScreenContainer from '../../components/ScreenContainer/ScreenContainer';

import styles from './Home.styles';

interface Props extends ScreenNavigationProp<MainStackParams, ROUTES.HOME> {}

interface State {
  times: PrayTime[];
  loading: boolean;
}

const HomeScreen: React.FC<Props> = ({navigation}) => {
  const [state, setState] = useState<State>({
    times: [],
    loading: true,
  });

  useEffect(() => {
    // eslint-disable-next-line no-undef
    const controller = new AbortController();
    const {signal, abort} = controller;
    async function fetchData() {
      const times = await fetchPrayTimes(signal);
      setState((prev) => ({...prev, times, loading: false}));
    }

    fetchData();

    return () => {
      abort();
    };
  }, []);

  const onRefresh = () => {};

  const handleOnSelect = () => {
    navigation.navigate(ROUTES.SIGN_IN);
  };

  return (
    <ScreenContainer level="2">
      <Image
        source={require('../../assets/images/logo.png')}
        style={styles.logo}
      />
      <Text category="s1" style={styles.listCaption}>
        {`${I18n.t('home.timesList.caption')} 2020/12/3`}
      </Text>
      <TimesList onSelect={handleOnSelect} />
      <Button style={styles.refreshBtn} onPress={onRefresh}>
        {I18n.t('actions.refresh')}
      </Button>
    </ScreenContainer>
  );
};

export default HomeScreen;
