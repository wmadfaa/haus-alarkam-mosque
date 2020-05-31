import React from 'react';
import {Layout, Button, Text} from '@ui-kitten/components';

import {ScreenNavigationProp} from '../../utils/ScreenProps';
import {MainStackParams, ROUTES} from '../../configs/navigator.configs';

import ScreenContainer from '../../components/ScreenContainer/ScreenContainer';

import styles from './Control.styles';
import {Image} from 'react-native';

interface Props extends ScreenNavigationProp<MainStackParams, ROUTES.CONTROL> {}

interface State {
  loading: boolean;
}

const ControlScreen: React.FC<Props> = () => {
  return (
    <ScreenContainer level="1">
      <Image
        source={require('../../assets/images/logo1.png')}
        style={styles.logo}
      />
      <Layout style={styles.container} level="1">
        <Text category="p1" style={styles.infoCation}>
          remaining for the friday prayer time
        </Text>
        <Text category="h5">2 days/ 3 hours/ 30 minutes</Text>
      </Layout>
      <Layout level="1" style={styles.actions}>
        <Button status="danger" style={styles.actionButton}>
          Sign out
        </Button>
        <Button style={styles.actionButton}>Select another time</Button>
      </Layout>
    </ScreenContainer>
  );
};

export default ControlScreen;
