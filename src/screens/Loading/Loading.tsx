import React, {useState, useCallback} from 'react';
import {Image, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import LottieView from 'lottie-react-native';
import {Layout} from '@ui-kitten/components';

import ScreenContainer from '../../components/ScreenContainer/ScreenContainer';
import {ApplicationDispatch, ApplicationState} from '../../store';
import * as fridayPrayingActions from '../../store/fridayPraying/fridayPraying.actions';
import {isDateInThePast} from '../../utils/time';
import {ScreenNavigationProp} from '../../utils/ScreenProps';
import {MainStackParams, ROUTES} from '../../configs/navigator.configs';

import styles from './Loading.styles';
import {useFocusEffect} from '@react-navigation/native';

interface Props extends ScreenNavigationProp<MainStackParams, ROUTES.LOADING> {}

interface State {
  mounted: boolean;
  fetchingFridayPrayingData: boolean;
}

const LoadingScreen: React.FC<Props> = ({navigation}) => {
  const dispatch = useDispatch<ApplicationDispatch>();
  const {
    global: {getFridayPraying: getFridayPrayingActionState},
    user: {reservePrayingTime},
    fridayPraying: {nextFridayData},
  } = useSelector((state: ApplicationState) => state);
  const [state, setState] = useState<State>({
    fetchingFridayPrayingData: true,
    mounted: false,
  });

  useFocusEffect(
    useCallback(() => {
      setState((prev) => ({...prev, mounted: true}));
      return () => {
        setState((prev) => ({...prev, mounted: false}));
      };
    }, []),
  );

  const fetchData = useCallback(() => {
    setState((prev) => ({...prev, fetchingFridayPrayingData: true}));
    dispatch(fridayPrayingActions.getFridayPrayingActionAsync.request());
  }, [dispatch]);

  // const cancelFetchingData = useCallback(() => {
  //   dispatch(fridayPrayingActions.getFridayPrayingActionAsync.cancel());
  //   setState((prev) => ({...prev, fetchingFridayPrayingData: false}));
  // }, [dispatch]);

  useFocusEffect(
    useCallback(() => {
      fetchData();
      // return () => {
      //   cancelFetchingData();
      // };
    }, [fetchData]),
  );

  useFocusEffect(
    useCallback(() => {
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
    ]),
  );

  const navigateToInitialScreen = useCallback(() => {
    if (
      reservePrayingTime &&
      nextFridayData &&
      !isDateInThePast(`${nextFridayData} ${reservePrayingTime}`)
    ) {
      navigation.navigate(ROUTES.CONTROL);
    } else {
      navigation.navigate(ROUTES.HOME);
    }
  }, [navigation, nextFridayData, reservePrayingTime]);

  useFocusEffect(
    useCallback(() => {
      if (state.mounted && !state.fetchingFridayPrayingData) {
        navigateToInitialScreen();
      }
    }, [
      navigateToInitialScreen,
      state.fetchingFridayPrayingData,
      state.mounted,
    ]),
  );

  return (
    <ScreenContainer>
      <Image
        source={require('../../assets/images/logo.png')}
        style={styles.logo}
      />
      <Layout style={styles.content}>
        <View style={styles.progress}>
          <LottieView
            source={require('../../assets/animations/loading.json')}
            autoPlay
            loop
          />
        </View>
      </Layout>
    </ScreenContainer>
  );
};

export default LoadingScreen;
