import React, {useState, useContext, useEffect} from 'react';
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

const initialModalContextValue = {
  show: false,
  onAgree: () => {},
  onDisagree: () => {},
};

interface ModalContextValue {
  props: ModalProps;
  setProps: React.Dispatch<React.SetStateAction<ModalProps>>;
}

const ModalContext = React.createContext<ModalContextValue>({
  props: initialModalContextValue,
  setProps: () => {},
});

const ModalComponent: React.FC = () => {
  const {
    props: {show, onAgree, onDisagree},
  } = useContext(ModalContext);
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

export const ModalProvider: React.FC = ({children}) => {
  const [props, setProps] = useState<ModalProps>(initialModalContextValue);

  return (
    <ModalContext.Provider value={{props, setProps}}>
      {children}
      <ModalComponent />
    </ModalContext.Provider>
  );
};

const Modal: React.FC<ModalProps> = (props) => {
  const {setProps} = useContext(ModalContext);

  useEffect(() => {
    setProps(props);
  }, [props, setProps]);

  return null;
};

export default Modal;
