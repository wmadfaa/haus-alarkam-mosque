import React, {useState, useEffect, useRef, useCallback} from 'react';
import {ImageProps, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import I18n from '../../utils/i18n';
import {
  Layout,
  Text,
  Input,
  Button,
  CheckBox,
  Spinner,
} from '@ui-kitten/components';
import {RenderProp} from '@ui-kitten/components/devsupport';

import {ApplicationDispatch, ApplicationState} from '../../store';
import * as UserActions from '../../store/user/user.actions';
import * as GlobalActions from '../../store/globalState/globalState.actions';

import {NestedScreenNavigationProp} from '../../utils/ScreenProps';
import {
  SignInStackParams,
  ROUTES,
  MainStackParams,
} from '../../configs/navigator.configs';

import Modal from '../../components/Modal/Modal';

import styles from './SignIn.styles';
import {UserProfile} from '../../store/user/user.types';

interface Props
  extends NestedScreenNavigationProp<
    MainStackParams,
    SignInStackParams,
    ROUTES.SIGN_IN_FORM
  > {}

interface State {
  submitting: boolean;
  canSubmit: boolean;
  saveDataOnSubmit: boolean;
  showModal: boolean;
}

const SignInScreen: React.FC<Props> = ({navigation, route}) => {
  const refs = useRef({
    firstName: useRef<Input>(null),
    lastName: useRef<Input>(null),
    phoneNumber: useRef<Input>(null),
  });
  const [state, setState] = useState<State>({
    submitting: false,
    canSubmit: true,
    saveDataOnSubmit: false,
    showModal: false,
  });
  const [{form, errors}, setForm] = useState<{
    form: Partial<UserProfile>;
    errors: {[key in keyof UserProfile]?: string};
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

  const dispatch = useDispatch<ApplicationDispatch>();
  const {loading} = useSelector(
    (applicationState: ApplicationState) => applicationState.global.setUser,
  );

  useEffect(() => {
    if (form.firstName && form.lastName && form.phoneNumber) {
      setState((prev) => ({...prev, canSubmit: true}));
    } else {
      setState((prev) => ({...prev, canSubmit: false}));
    }
  }, [form]);

  const onFormChange = (name: keyof UserProfile) => (nextValue: string) =>
    setForm((prev) => ({
      ...prev,
      form: {...prev.form, [name]: nextValue},
      errors: {
        ...prev.errors,
        [name]: nextValue ? undefined : `${name} is required`,
      },
    }));

  const onSubmit = () => {
    if (form.firstName && form.lastName && form.phoneNumber) {
      setState((prev) => ({...prev, submitting: true}));
      closeModal();
      const profile: UserProfile = {
        firstName: form.firstName,
        lastName: form.lastName,
        phoneNumber: form.phoneNumber,
      };
      dispatch(
        UserActions.setUserProfileActionAsync.request({
          profile,
          reservePrayingTime: route.params.reservePrayingTime,
        }),
      );
    }
  };

  const onSubmitted = useCallback(() => {
    setState((prev) => ({...prev, submitting: false}));
    navigation.navigate(ROUTES.CONTROL);
    dispatch(GlobalActions.setRememberUser(state.saveDataOnSubmit));
  }, [dispatch, navigation, state.saveDataOnSubmit]);

  useEffect(() => {
    if (!loading && state.submitting) {
      onSubmitted();
    }
  }, [loading, onSubmitted, state.submitting]);

  const openModal = () => {
    let hasError = false;
    for (const key in form) {
      const current = key as keyof UserProfile;
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
            placeholder={I18n.t('signIn.userForm.inputs.firstName.placeholder')}
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
            placeholder={I18n.t('signIn.userForm.inputs.lastName.placeholder')}
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
      <Button
        style={styles.submitButton}
        status="primary"
        onPress={openModal}
        disabled={!state.canSubmit || loading}
        accessoryLeft={LoadingIndicator}>
        {I18n.t('actions.signIn')}
      </Button>
      <Modal
        show={state.showModal}
        onAgree={onSubmit}
        onDisagree={closeModal}
      />
    </Layout>
  );
};

export default SignInScreen;
