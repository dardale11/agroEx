import {Pressable, StyleSheet, Text} from 'react-native';
import React from 'react';
import {SliderItem} from '../../types/types';
import {useDispatch} from 'react-redux';
import {handleSelectionChange} from '../redux/reducers/itemsSlice';
import {ListType} from '../../types/enums';

export type Props = {
  item: SliderItem;
  listType: ListType;
};

const SliderItemView: React.FC<Props> = ({item, listType}) => {
  const dispatch = useDispatch();

  const handlePress = () => {
    dispatch(handleSelectionChange({listType: listType, item: item}));
  };

  const textColor = !item.isActive
    ? {color: 'grey'}
    : item.isSelected
    ? {color: 'yellow'}
    : {color: 'white'};

  return (
    <Pressable style={styles.container} onPress={handlePress}>
      <Text style={[styles.text, textColor]}>{item.name}</Text>
    </Pressable>
  );
};

export default SliderItemView;

const styles = StyleSheet.create({
  container: {margin: 10},
  text: {fontSize: 20},
});
