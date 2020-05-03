import React, {memo, useContext} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Swiber from '../components/Swiber';
import HeartButton from './Heart';
import Feather from 'react-native-vector-icons/Feather';
import * as Animatable from 'react-native-animatable';
import {SharedElement} from 'react-navigation-shared-element';
import {useNavigation} from 'react-navigation-hooks';
import {ListingContext} from '../../../context/ListingContext';

const {width} = Dimensions.get('window');
const height = width * 0.5;

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#f9c2ff',
    flex: 1,
    margin: 10,
    height: height + 5,
  },
  heartButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    // opacity: 5,
    // backgroundColor: 'rgba(0, 0, 0, 0.5)',
    // borderRadius: 20,
  },
  providerName: {
    position: 'absolute',
    bottom: 15,
    color: 'white',
  },
  moreButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    opacity: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.10)',
    borderRadius: 20,
  },
});

export default memo(({item}) => {
  const {navigate} = useNavigation();
  const {heart} = useContext(ListingContext);

  return (
    <View key={item.key} style={styles.item}>
      <SharedElement id={`item.${item.key}.photo`}>
        <Swiber swipeData={item} minimal={true} />
      </SharedElement>
      <TouchableOpacity
        style={styles.moreButton}
        onPress={() => {
          navigate('EventDetail', {data: item});
        }}>
        <Feather name="more-horizontal" size={35} color={'#ffff'} />
      </TouchableOpacity>
      <View style={styles.heartButton}>
        <HeartButton item={item} />
      </View>

      <Animatable.Text animation="bounceInRight" style={styles.providerName}>
        {item.partyHallName}
      </Animatable.Text>
    </View>
  );
});
