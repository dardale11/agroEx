import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useTypedSelector} from '../hooks/hooks';

const SelectedItem: React.FC = () => {
  const selectdItem = useTypedSelector(state => state.items.selectedItem);
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {selectdItem?.fullName ?? 'Item is not selected'}
      </Text>
    </View>
  );
};

export default SelectedItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    borderColor: 'white',
    borderWidth: 3,
    paddingHorizontal: 50,
  },
  text: {
    color: 'white',
    fontSize: 22,
    textDecorationLine: 'underline',
    fontWeight: 'bold',
  },
});
