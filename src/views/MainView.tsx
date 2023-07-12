import {ImageBackground, StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';
import SelectedItem from '../components/SelectedItem';
import SliderOptions from '../components/SliderOptions';
import {mockFetchData} from '../helpers/api';
import {useDispatch} from 'react-redux';
import {setItemsList} from '../redux/reducers/itemsSlice';
import {ListType} from '../../types/enums';

const MainView: React.FC = () => {
  const dispatch = useDispatch();

  //check that not causing infinmite loop
  useEffect(() => {
    mockFetchData().then(data => dispatch(setItemsList({data: data})));
  }, [dispatch]);

  return (
    <ImageBackground source={require('../../assets/bg.png')}>
      <View style={styles.container}>
        <View style={styles.itemWarpper}>
          <SelectedItem />
        </View>
        <View style={styles.slidersContainer}>
          <SliderOptions listType={ListType.BrandList} />
          <SliderOptions listType={ListType.QualityList} />
          <SliderOptions listType={ListType.SizeList} />
        </View>
      </View>
    </ImageBackground>
  );
};

export default MainView;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    // backgroundColor: 'rgb(10,0, 125)',
    height: '100%',
  },
  slidersContainer: {
    marginTop: 30,
    flex: 3,
  },
  itemWarpper: {
    flex: 1,
    marginTop: 30,
  },
});
