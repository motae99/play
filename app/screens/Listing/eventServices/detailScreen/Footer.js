import React, {RefObject, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Feather';
import Animated from 'react-native-reanimated';
import {
  useValues,
  withTimingTransition,
  useTimingTransition,
  useDebug,
} from 'react-native-redash';
import {HEADER_IMAGE_HEIGHT} from './HeaderImage';

export const FOOTER_HEIGHT = 75;
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
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FAF9F9',
    paddingTop: 0,
    borderTopWidth: 1,
    borderColor: '#DADADA',
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    height: FOOTER_HEIGHT,
  },
});

export default ({y, paymentAncher}) => {
  // console.log(tabs)
  const [toggle] = useValues([1], []);
  // const toggle = new Value(0)
  // const [open, setOpen] = useState(0);
  // console.log('payment Ancher', paymentAncher);
  // const transition = useTimingTransition(open, { duration: 100 });
  const transition = withTimingTransition(toggle, {duration: 100});

  const opacity = transition;

  useCode(
    () =>
      block([
        // cond( and(greaterOrEq(y, tabs[paymentIndex].anchor), lessOrEq(y, tabs[paymentIndex+1].anchor) ), call( [], () => console.log('yes')))
        // cond(
        //   lessOrEq(y, paymentAncher),
        //   call([], () => console.log('less Tahan payments', paymentAncher)),
        //   call([], () =>
        //     console.log('greater than paymentAncher', paymentAncher),
        //   ),
        // ),
        cond(greaterOrEq(y, paymentAncher), set(toggle, 0), set(toggle, 1)),
      ]),
    [toggle, y, paymentAncher],
  );

  // const next = tabs[payment.index+1]
  //  useCode(
  //   () =>
  //     block(
  //       tabs.map( (tab, i) =>
  //          cond( and(greaterOrEq(y, tab.anchor), lessOrEq(y, tabs[i + 1].anchor) ),
  //          cond(
  //          greaterOrEq(y, tab.anchor) ,
  //           set(toggle, 1)
  //           cond(
  //            greaterOrEq(y, tab.anchor),
  //            call([y, i], ({}) => console.log('y now is', y)
  //          ),
  //         )
  //       )
  //       [
  //        cond(
  //          and( greaterOrEq(y, 2335), lessOrEq(y, 2990.333251953125) ),
  //          set(toggle, 0),
  //          set(toggle, 1)
  //        ),
  //       ]
  //     ),
  //   [toggle, tabs, y]
  // );

  // tabs.map( (tab, i) => console.log('name: ', tab.name, 'ancor: ', tab.anchor, 'Index :', i))

  // useCode(
  //  () =>
  //    block([
  //     tabs.map( (tab, i) =>
  //      cond(eq(y, payment.anchor), call( [], () => console.log('yes')))
  //     )
  //    ]),
  //  [toggle, tabs, y]
  // );

  return (
    <Animated.View style={[styles.container, {opacity, zIndex: 10}]}>
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
