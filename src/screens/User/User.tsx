import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Button, Layout, Divider, List, ListItem} from '@ui-kitten/components';

import {ApplicationDispatch, ApplicationState} from '../../store';
import {NestedScreenNavigationProp} from '../../utils/ScreenProps';
import {
  MainStackParams,
  ROUTES,
  SignInStackParams,
} from '../../configs/navigator.configs';
import I18n from '../../utils/i18n';

import styles from './User.styles';

interface Props
  extends NestedScreenNavigationProp<
    MainStackParams,
    SignInStackParams,
    ROUTES.SIGN_IN_USER
  > {}

const data = new Array(8).fill({
  title: 'Item',
  description: 'Description for Item',
});

const UserScreen: React.FC<Props> = ({navigation}) => {
  const dispatch = useDispatch<ApplicationDispatch>();
  const {loading} = useSelector(
    (state: ApplicationState) => state.global.getFridayPraying,
  );

  const renderItem = ({item, index}: any) => (
    <ListItem
      title={`${item.title} ${index + 1}`}
      description={`${item.description} ${index + 1}`}
    />
  );

  return (
    <Layout style={styles.container}>
      <List
        style={styles.usersList}
        data={data}
        ItemSeparatorComponent={Divider}
        renderItem={renderItem}
      />
      <Layout style={styles.actions}>
        <Button disabled={loading} status="primary">
          {I18n.t('actions.refresh')}
        </Button>
      </Layout>
    </Layout>
  );
};

export default UserScreen;
