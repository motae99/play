import React from 'react';
import Animated from 'react-native-reanimated';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {cardWidth, cardHeigh} from './FoldingStyle';

const {interpolate, Extrapolate} = Animated;

const Base = ({toggle, animation}) => {
  const baseHieght = interpolate(animation, {
    inputRange: [0, 0.3, 0.4],
    outputRange: [cardHeigh, cardHeigh + 12, cardHeigh],
    extrapolate: Extrapolate.CLAMP,
  });

  return (
    <TouchableWithoutFeedback onPress={() => toggle()}>
      <Animated.Image
        style={{width: cardWidth, height: baseHieght, alignSelf: 'center'}}
        resizeMode="cover"
        source={require('../base.png')}
      />
    </TouchableWithoutFeedback>
  );
};

export default Base;
