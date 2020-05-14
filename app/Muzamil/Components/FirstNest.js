import React from 'react';
import {StyleSheet} from 'react-native';
import Animated from 'react-native-reanimated';

import {perspective, fHeight, fWidth} from './FoldingStyle';
import FirstNestView from './FirstNestView';

import SecondNest from './SecondNest';

const {concat, interpolate, Extrapolate} = Animated;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    height: fHeight,
    width: fWidth,
  },
  backFace: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'white',
  },
  fronFace: {
    ...StyleSheet.absoluteFillObject,
    backfaceVisibility: 'hidden',
    backgroundColor: '#ffd9ff',
  },
});

export default function({animation, toggle}) {
  const NrotateXAsDegBack1 = interpolate(animation, {
    inputRange: [0.4, 0.7],
    outputRange: [0, -180],
    extrapolate: Extrapolate.CLAMP,
  });
  const rotateX1 = concat(NrotateXAsDegBack1, 'deg');

  const transformBackFace = [
    {perspective},
    {translateY: fHeight / 2},
    {rotateX: rotateX1},
    {translateY: -fHeight / 2},
    {rotateX: '180deg'},
  ];

  const transformFrontFace = [
    {perspective},
    {translateY: fHeight / 2},
    {rotateX: rotateX1},
    {translateY: -fHeight / 2},
  ];

  return (
    <Animated.View style={styles.container}>
      {/* Back face */}
      <Animated.View style={[styles.backFace, {transform: transformBackFace}]}>
        <FirstNestView />

        <SecondNest {...{animation, toggle}} />
      </Animated.View>

      {/* front face */}
      <Animated.View
        style={[styles.fronFace, {transform: transformFrontFace}]}
      />
    </Animated.View>
  );
}
