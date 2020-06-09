import React from 'react';
import {Layout} from '@ui-kitten/components';
import LottieView from 'lottie-react-native';

import styles from './Loading.styles';
import ScreenContainer from '../../components/ScreenContainer/ScreenContainer';
import {Image, View} from 'react-native';

const LoadingScreen: React.FC = () => {
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
