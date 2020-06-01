import React from 'react';
import {View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Text, Button, Divider} from '@ui-kitten/components';
import BlurOverlay from '../BlurOverlay/BlurOverlay';

import styles from './Modal.styles';
import I18n from '../../utils/i18n';

export interface ModalProps {
  show?: boolean;
  onAgree(): void;
  onDisagree(): void;
}

const Modal: React.FC<ModalProps> = ({show = false, onAgree, onDisagree}) => {
  if (!show) {
    return null;
  }

  return (
    <BlurOverlay blurAmount={5} blurType="dark">
      <ScrollView contentContainerStyle={styles.overlayContainer}>
        <View style={styles.modal}>
          <Text category="h6" style={styles.header}>
            {I18n.t('signIn.termsModal.header')}
          </Text>
          <Divider />
          <Text category="p1" style={styles.content}>
            {I18n.t('signIn.termsModal.terms')}
          </Text>
          <Divider />
          <View style={styles.actions}>
            <Button
              style={styles.button}
              size="small"
              status="primary"
              onPress={onAgree}>
              {I18n.t('actions.agree')}
            </Button>
            <Button
              style={styles.button}
              size="small"
              status="danger"
              onPress={onDisagree}>
              {I18n.t('actions.disagree')}
            </Button>
          </View>
        </View>
      </ScrollView>
    </BlurOverlay>
  );
};

export default Modal;
