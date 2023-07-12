import {FlatList, StyleSheet, View} from 'react-native';
import React from 'react';
import {SliderItem} from '../../types/types';
import SliderItemView from './SliderItemView';
import {useTypedSelector} from '../hooks/hooks';
import {ListType} from '../../types/enums';

export type Props = {
  listType: ListType;
};

const SliderOptions: React.FC<Props> = ({listType}) => {
  const list: SliderItem[] = useTypedSelector(
    state => state.items.lists[listType].list,
  ) as SliderItem[];

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.contentContainerStyle}
        style={styles.listStyle}
        keyExtractor={item => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        data={list}
        renderItem={({item}) => (
          <SliderItemView item={item} listType={listType} />
        )}
      />
    </View>
  );
};

export default SliderOptions;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listStyle: {
    flex: 1,
    margin: 20,
    padding: 10,
    borderWidth: 3,
    borderColor: 'white',
    borderRadius: 35,
  },
  contentContainerStyle: {
    alignItems: 'center',
  },
});
