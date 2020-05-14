import React, {RefObject, useState} from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Feather';
import Animated from 'react-native-reanimated';
import {useValues, withTimingTransition} from 'react-native-redash';

import {HEADER_IMAGE_HEIGHT} from './HeaderImage';
import {MIN_HEADER_HEIGHT} from './Header';
export const DATES_HEIGHT = 50;
const SECTION_HEIGHT = 200;
const {height} = Dimensions.get('window');
const {
  useCode,
  set,
  block,
  and,
  lessOrEq,
  eq,
  cond,
  greaterOrEq,
  call,
} = Animated;
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 122,
    left: 0,
    right: 0,
    backgroundColor: 'gray',
    paddingTop: 0,
    borderTopWidth: 1,
    borderColor: '#DADADA',
    zIndex: 100,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    height: DATES_HEIGHT,
  },
});

export default ({y, tabs, dateAncher}) => {
  // console.log(tabs)
  const [toggle] = useValues([0]);

  const transition = withTimingTransition(toggle, {duration: 100});

  const opacity = transition;

  // const dates = tabs.filter( (tab) => tab.name === 'Dates')
  // // console.log(payment.)
  // const dateIndex = tabs.indexOf(dates[0])
  // const dateAnchor = tabs[dateIndex].anchor

  useCode(
    () =>
      block([
        cond(
          // greaterOrEq(y, dateAnchor+SECTION_HEIGHT),
          greaterOrEq(y, dateAncher + SECTION_HEIGHT),
          set(toggle, 1),
          set(toggle, 0),
        ),
      ]),
    [toggle, y, dateAncher],
  );

  return (
    <Animated.View style={[styles.container, {opacity}]}>
      <View style={styles.content}>
        <Icon name="home" size={24} />
        <Icon name="search" size={24} />
        <Icon name="plus-square" size={24} />
        <Icon name="heart" size={24} />
        <Icon name="user" size={24} />
      </View>
    </Animated.View>
  );
};
