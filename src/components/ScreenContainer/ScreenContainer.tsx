import React from 'react';
import {KeyboardAvoidingView} from 'react-native';
import {useSafeArea} from 'react-native-safe-area-context';
import {Layout, LayoutProps} from '@ui-kitten/components';

import styles from './ScreenContainer.styles';

interface ScreenContainerProps extends LayoutProps {}

const ScreenContainer: React.FC<ScreenContainerProps> = ({
  children,
  style,
  ...props
}) => {
  const edgeInsets = useSafeArea();
  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={-500}
      behavior="padding"
      style={styles.keyboardAvoidingView}>
      <Layout
        style={[
          styles.root,
          {
            paddingTop: edgeInsets.top,
            paddingBottom: edgeInsets.bottom,
            paddingLeft: edgeInsets.left,
            paddingRight: edgeInsets.right,
          },
          style,
        ]}
        {...props}>
        {children}
      </Layout>
    </KeyboardAvoidingView>
  );
};

export default ScreenContainer;
