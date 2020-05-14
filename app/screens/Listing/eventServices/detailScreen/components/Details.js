import React, {RefObject, useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Animated from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/AntDesign';

import {HEADER_IMAGE_HEIGHT} from '../HeaderImage';
import {MIN_HEADER_HEIGHT} from '../Header';

const {Extrapolate, interpolate} = Animated;

const styles = StyleSheet.create({
  section: {
    padding: 16,
  },
  placeholder: {
    height: HEADER_IMAGE_HEIGHT,
    marginBottom: MIN_HEADER_HEIGHT,
  },
  text: {
    fontFamily: 'UberMoveRegular',
    fontSize: 14,
  },
  title1: {
    fontFamily: 'UberMoveMedium',
    fontSize: 24,
  },
  title2: {
    fontFamily: 'UberMoveMedium',
    fontSize: 16,
  },
  divider: {
    height: 2,
    backgroundColor: '#e2e3e4',
  },
  info: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  ratings: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 8,
  },
  link: {
    color: '#247A00',
  },
  item: {
    borderBottomColor: '#e2e3e4',
    borderBottomWidth: 1,
    marginTop: 16,
  },
  title: {
    fontFamily: 'UberMoveMedium',
    fontSize: 16,
    marginBottom: 8,
  },
  description: {
    marginBottom: 8,
  },
  price: {
    fontFamily: 'UberMoveMedium',
    marginBottom: 16,
  },
});

export default ({y}) => {
  const opacity = interpolate(y, {
    inputRange: [
      HEADER_IMAGE_HEIGHT - MIN_HEADER_HEIGHT - 100,
      HEADER_IMAGE_HEIGHT - MIN_HEADER_HEIGHT,
    ],
    outputRange: [1, 0],
    extrapolate: Extrapolate.CLAMP,
  });

  return (
    <Animated.View style={[{opacity}]}>
      <Text style={styles.title}>Address should go here with full Details</Text>
      <View style={styles.info}>
        <Text style={styles.text}>Opens at 11:30 AM</Text>
        <View style={styles.ratings}>
          <Icon name="star" color="#f4c945" size={24} style={styles.icon} />
          <Text style={styles.text}>(186)</Text>
        </View>
      </View>
    </Animated.View>
  );
};
