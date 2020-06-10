import React from 'react';
import momentJs from 'moment';
import I18n, {moment, localNumber} from '../../utils/i18n';
import {
  Button,
  List,
  ListItem,
  Divider,
  Spinner,
  Layout,
} from '@ui-kitten/components';

import styles from './TimesList.styles';
import {ListRenderItem} from 'react-native';
import {FridayPrayingTime} from '../../store/fridayPraying/fridayPraying.types';

export interface TimesListProps {
  times?: FridayPrayingTime[];
  isLoading?: boolean;
  onSelect(id: string): void;
}

const TimesList: React.FC<TimesListProps> = ({times, onSelect, isLoading}) => {
  const renderItem: ListRenderItem<FridayPrayingTime> = ({item, index}) => {
    const handleOnPress = () => onSelect(momentJs(item.time).format('HH:mm'));

    const renderItemAccessory = () => (
      <Button
        status="basic"
        size="small"
        onPress={handleOnPress}
        disabled={isLoading}>
        {I18n.t('actions.select')}
      </Button>
    );

    return (
      <ListItem
        title={I18n.t('home.timesList.time', {
          index: localNumber.format(index + 1),
          time: moment(item.time).format('LT'),
        })}
        description={I18n.t('home.timesList.places', {
          places: localNumber.format(item.personSpaceLeft),
        })}
        accessoryRight={renderItemAccessory}
        onPress={handleOnPress}
        disabled={isLoading}
      />
    );
  };

  if (!times) {
    return (
      <Layout style={[styles.container, styles.indicator]} level="2">
        <Spinner />
      </Layout>
    );
  }

  return (
    <List
      style={styles.container}
      data={times}
      renderItem={renderItem}
      ItemSeparatorComponent={Divider}
      bounces={false}
    />
  );
};

export default TimesList;
