import React from 'react';
import {Button, List, ListItem, Divider} from '@ui-kitten/components';

import styles from './TimesList.styles';
import {ListRenderItem} from 'react-native';

const data = new Array(2).fill({
  title: 'Title for Item',
  description: 'Description for Item',
});

export interface TimesListProps {
  onSelect(id: string): void;
}

const TimesList: React.FC<TimesListProps> = ({onSelect}) => {
  const renderItem: ListRenderItem<any> = ({item, index}) => {
    const handleOnPress = () => onSelect(`${index}`);

    const renderItemAccessory = () => (
      <Button status="basic" size="small" onPress={handleOnPress}>
        Select
      </Button>
    );

    return (
      <ListItem
        title={`${item.title} ${index + 1}`}
        description={`${item.description} ${index + 1}`}
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
