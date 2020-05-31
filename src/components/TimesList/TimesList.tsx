import React from 'react';
import I18n from '../../utils/i18n';
import {Button, List, ListItem, Divider} from '@ui-kitten/components';

import styles from './TimesList.styles';
import {ListRenderItem} from 'react-native';

const data = [
  {
    time: '11:30',
    places: 12,
  },
  {
    time: '13:30',
    places: 60,
  },
];

export interface TimesListProps {
  onSelect(id: string): void;
}

const TimesList: React.FC<TimesListProps> = ({onSelect}) => {
  const renderItem: ListRenderItem<any> = ({item, index}) => {
    const handleOnPress = () => onSelect(`${index}`);

    const renderItemAccessory = () => (
      <Button status="basic" size="small" onPress={handleOnPress}>
        {I18n.t('actions.select')}
      </Button>
    );

    return (
      <ListItem
        title={I18n.t('home.timesList.time', {
          index: index + 1,
          time: item.time,
        })}
        description={I18n.t('home.timesList.places', {
          places: item.places,
        })}
        accessoryRight={renderItemAccessory}
        onPress={handleOnPress}
      />
    );
  };

  return (
    <List
      style={styles.container}
      data={data}
      renderItem={renderItem}
      ItemSeparatorComponent={Divider}
    />
  );
};

export default TimesList;
