import React, {useState, useEffect, useRef} from 'react';
import {ImageProps} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import I18n, {isRTL} from '../../utils/i18n';
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
import Modal from '../../components/Modal/Modal';

import styles from './SignIn.styles';

interface Props extends ScreenNavigationProp<MainStackParams, ROUTES.SIGN_IN> {}

interface State {
  loading: boolean;
  canSubmit: boolean;
  saveDataOnSubmit: boolean;
  showModal: boolean;
}

interface UserForm {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
}

const SignInScreen: React.FC<Props> = ({navigation}) => {
  const refs = useRef({
    firstName: useRef<Input>(null),
    lastName: useRef<Input>(null),
    phoneNumber: useRef<Input>(null),
  });
  const [state, setState] = useState<State>({
    loading: false,
    canSubmit: true,
    saveDataOnSubmit: false,
    showModal: false,
  });
  const [{form, errors}, setForm] = useState<{
    form: UserForm;
    errors: {[key in keyof UserForm]?: string};
  }>({
    errors: {
      firstName: undefined,
      lastName: undefined,
      phoneNumber: undefined,
    },
    form: {
      firstName: undefined,
      lastName: undefined,
      phoneNumber: undefined,
    },
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
      <Icon
        {...props}
        style={[props?.style, {transform: [{scaleX: isRTL ? -1 : 1}]}]}
        name="arrow-back"
      />
    );
    return (
      <TopNavigationAction
        icon={BackIcon}
        onPress={() => navigation.goBack()}
      />
    );
  };

  const onFormChange = (name: keyof UserForm) => (nextValue: string) =>
    setForm((prev) => ({
      ...prev,
      form: {...prev.form, [name]: nextValue},
      errors: {
        ...prev.errors,
        [name]: nextValue ? undefined : `${name} is required`,
      },
    }));

  const onSubmit = () => {
    closeModal();
    navigation.navigate(ROUTES.CONTROL);
  };

  const openModal = () => {
    let hasError = false;
    for (const key in form) {
      const current = key as keyof UserForm;
      if (!form[current]) {
        hasError = true;
        setForm((prev) => ({
          ...prev,
          errors: {...prev.errors, [current]: `${current} is required`},
        }));
      }
    }
    if (!hasError) {
      setState((prev) => ({...prev, showModal: true}));
    }
  };

  const closeModal = () => setState((prev) => ({...prev, showModal: false}));

  const onNext = (
    fromRef: keyof typeof refs.current,
    toRef: keyof typeof refs.current,
  ) => () => {
    const from = refs.current[fromRef].current;
    const to = refs.current[toRef].current;

    if (!form[fromRef] && from) {
      setForm((prev) => ({
        ...prev,
        errors: {...prev.errors, [fromRef]: `${fromRef} is required`},
      }));
      from.blur();
      return;
    }

    if (from && to) {
      from.blur();
      to.focus();
    }
  };

  return (
    <ScreenContainer level="1">
      <TopNavigation accessoryLeft={BackAction} />
      <Divider />
      <Layout style={styles.container}>
        <ScrollView>
          <Text category="h6">{I18n.t('signIn.userForm.caption')}</Text>
          <Layout style={styles.form}>
            <Input
              autoFocus
              ref={refs.current.firstName}
              enablesReturnKeyAutomatically
              keyboardType="default"
              returnKeyType="next"
              autoCorrect={false}
              onSubmitEditing={onNext('firstName', 'lastName')}
              style={styles.input}
              value={form.firstName}
              label={I18n.t('signIn.userForm.inputs.firstName.label')}
              placeholder={I18n.t(
                'signIn.userForm.inputs.firstName.placeholder',
              )}
              caption={
                errors.firstName &&
                I18n.t('signIn.userForm.inputs.firstName.errors.isRequired')
              }
              status={errors.firstName ? 'danger' : 'default'}
              onChangeText={onFormChange('firstName')}
            />
            <Input
              ref={refs.current.lastName}
              enablesReturnKeyAutomatically
              keyboardType="default"
              returnKeyType="next"
              autoCorrect={false}
              onSubmitEditing={onNext('lastName', 'phoneNumber')}
              style={styles.input}
              value={form.lastName}
              label={I18n.t('signIn.userForm.inputs.lastName.label')}
              placeholder={I18n.t(
                'signIn.userForm.inputs.lastName.placeholder',
              )}
              caption={
                errors.lastName &&
                I18n.t('signIn.userForm.inputs.lastName.errors.isRequired')
              }
              status={errors.lastName ? 'danger' : 'default'}
              onChangeText={onFormChange('lastName')}
            />
            <Input
              ref={refs.current.phoneNumber}
              enablesReturnKeyAutomatically
              keyboardType="phone-pad"
              returnKeyType="next"
              autoCorrect={false}
              onSubmitEditing={openModal}
              style={styles.input}
              value={form.phoneNumber}
              label={I18n.t('signIn.userForm.inputs.phoneNumber.label')}
              placeholder={I18n.t(
                'signIn.userForm.inputs.phoneNumber.placeholder',
              )}
              caption={
                errors.phoneNumber &&
                I18n.t('signIn.userForm.inputs.phoneNumber.errors.isRequired')
              }
              status={errors.phoneNumber ? 'danger' : 'default'}
              onChangeText={onFormChange('phoneNumber')}
            />
            <CheckBox
              style={styles.checkbox}
              checked={state.saveDataOnSubmit}
              onChange={(nextChecked) =>
                setState((prev) => ({...prev, saveDataOnSubmit: nextChecked}))
              }>
              {I18n.t('signIn.userForm.inputs.rememberMe.label')}
            </CheckBox>
          </Layout>
        </ScrollView>
      </Layout>
      <Button
        style={styles.submitButton}
        onPress={openModal}
        disabled={!state.canSubmit}>
        {I18n.t('actions.signIn')}
      </Button>
      <Modal
        show={state.showModal}
        onAgree={onSubmit}
        onDisagree={closeModal}
      />
    </ScreenContainer>
  );
};

export default SignInScreen;
