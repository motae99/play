import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import Animated from 'react-native-reanimated';
import {useTransition, useSpringTransition} from 'react-native-redash';

import FirstNest from './Components/FirstNest';
import {
  cardWidth,
  cardHeigh,
  perspective,
  fHeight,
  sHeight,
} from './Components/FoldingStyle';
import Base from './Components/Base';
import FrontFace from './Components/FrontFace';
import BackFace from './Components/BackFace';

const {concat, interpolate, Extrapolate} = Animated;

const styles = StyleSheet.create({
  container: {margin: 6, width: cardWidth},
  content: {
    width: cardWidth,
    height: cardHeigh,
    alignSelf: 'center',
  },
  backFace: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  frontFace: {...StyleSheet.absoluteFillObject, backfaceVisibility: 'hidden'},
});

const FoldView = () => {
  const [open, setOpen] = useState(false);
  const animation = useTransition(open, {duration: 700});
  // const animation = useSpringTransition(open);

  const toggle = () => {
    setOpen(prev => !prev);
  };

  const height = interpolate(animation, {
    inputRange: [0, 0.8],
    outputRange: [cardHeigh, cardHeigh * 2 + fHeight + sHeight + 5],
    extrapolate: Extrapolate.CLAMP,
  });

  const rotateXAsDegBack = interpolate(animation, {
    inputRange: [0, 0.4],
    outputRange: [0, -180],
    extrapolate: Extrapolate.CLAMP,
  });

  const rotateX = concat(rotateXAsDegBack, 'deg');

  const transformBackFace = [
    {perspective},
    {translateY: cardHeigh / 2},
    {rotateX},
    {translateY: -cardHeigh / 2},
    {rotateX: '180deg'},
  ];

  const transformFrontFace = [
    {perspective},
    {translateY: cardHeigh / 2},
    {rotateX},
    {translateY: -cardHeigh / 2},
  ];

  return (
    <Animated.View style={[styles.container, {height}]}>
      <Animated.View style={styles.content}>
        <Base {...{toggle, animation}} />

        <Animated.View
          style={[styles.backFace, {transform: transformBackFace}]}>
          <BackFace {...{toggle}} />

          <FirstNest {...{animation, toggle}} />
        </Animated.View>

        <Animated.View
          style={[styles.frontFace, {transform: transformFrontFace}]}>
          <FrontFace {...{toggle}} />
        </Animated.View>
      </Animated.View>
    </Animated.View>
  );
};

export default FoldView;
