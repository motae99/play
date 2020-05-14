import React from 'react';
import {StyleSheet, processColor} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Animated from 'react-native-reanimated';
import {mix, mixColor} from 'react-native-redash';

const size = 30;
const styles = StyleSheet.create({
  container: {
    height: size,
    width: size,
    borderRadius: size / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ({transition}) => {
  const rotateZ = mix(transition, Math.PI, 0);
  const backgroundColor = mixColor(
    transition,
    processColor('#525251'),
    processColor('#e45645'),
  );
  return (
    <Animated.View
      style={[styles.container, {transform: [{rotateZ}], backgroundColor}]}>
      <Icon name="chevron-down" color="white" size={24} />
    </Animated.View>
  );
};
