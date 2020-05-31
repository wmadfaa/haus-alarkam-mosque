import React, {useState, useEffect} from 'react';
import {ImageProps} from 'react-native';
import {
  TopNavigationAction,
  Icon,
  Divider,
  TopNavigation,
  Layout,
  Text,
  Input,
  Button,
  CheckBox,
} from '@ui-kitten/components';
import {RenderProp} from '@ui-kitten/components/devsupport';

import {ScreenNavigationProp} from '../../utils/ScreenProps';
import {MainStackParams, ROUTES} from '../../configs/navigator.configs';

import ScreenContainer from '../../components/ScreenContainer/ScreenContainer';

import styles from './SignIn.styles';

interface Props extends ScreenNavigationProp<MainStackParams, ROUTES.SIGN_IN> {}

interface State {
  loading: boolean;
  canSubmit: boolean;
  saveDataOnSubmit: boolean;
}

interface UserForm {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
}

const SignInScreen: React.FC<Props> = ({navigation}) => {
  const [state, setState] = useState<State>({
    loading: false,
    canSubmit: true,
    saveDataOnSubmit: false,
  });
  const [form, setForm] = useState<UserForm>({
    firstName: undefined,
    lastName: undefined,
    phoneNumber: undefined,
  });

  useEffect(() => {
    if (form.firstName && form.lastName && form.phoneNumber) {
      setState((prev) => ({...prev, canSubmit: true}));
    } else {
      setState((prev) => ({...prev, canSubmit: false}));
    }
  }, [form]);

  const BackAction = () => {
    const BackIcon: RenderProp<Partial<ImageProps>> = (props) => (
      <Icon {...props} name="arrow-back" />
    );
    return (
      <TopNavigationAction
        icon={BackIcon}
        onPress={() => navigation.goBack()}
      />
    );
  };

  const onFormChange = (name: keyof UserForm) => (nextValue: string) =>
    setForm((prev) => ({...prev, [name]: nextValue}));

  const onSubmit = () => {
    navigation.navigate(ROUTES.CONTROL);
  };

  return (
    <ScreenContainer level="1">
      <TopNavigation accessoryLeft={BackAction} />
      <Divider />
      <Layout style={styles.container}>
        <Text category="h6">Please Enter Your Data to Sign in!</Text>
        <Layout style={styles.form}>
          <Input
            style={styles.input}
            value={form.firstName}
            label="First name"
            placeholder="Place your first name"
            onChangeText={onFormChange('firstName')}
          />
          <Input
            style={styles.input}
            value={form.lastName}
            label="Last name"
            placeholder="Place your last name"
            onChangeText={onFormChange('lastName')}
          />
          <Input
            style={styles.input}
            value={form.phoneNumber}
            label="Phone number"
            placeholder="Place your Phone number"
            onChangeText={onFormChange('phoneNumber')}
          />
          <CheckBox
            style={styles.checkbox}
            checked={state.saveDataOnSubmit}
            onChange={(nextChecked) =>
              setState((prev) => ({...prev, saveDataOnSubmit: nextChecked}))
            }>
            Remember me
          </CheckBox>
        </Layout>
      </Layout>
      <Button
        style={styles.submitButton}
        onPress={onSubmit}
        // disabled={!state.canSubmit}
      >
        Sign in
      </Button>
    </ScreenContainer>
  );
};

export default SignInScreen;
