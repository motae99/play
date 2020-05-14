import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Animated from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/FontAwesome';
import {interpolateColor} from 'react-native-redash';

const AnimatedIcons = Animated.createAnimatedComponent(Icon);
//use this in react native build it works

const {call, cond, eq, useCode, interpolate, Extrapolate} = Animated;

const styles = StyleSheet.create({
  icon: {
    top: 0,
    left: 0,
  },
  selectedIcon: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 10,
  },
});

// interface ButtonProps {
//   progress: Animated.Node<number>;
//   primaryColor: String;
//   colorBack: String;
//   iconName: String;
//   SelectediconName: String;
//   ICON_SIZE: number;
// }

export default ({
  progress,
  primaryColor,
  colorBack,
  iconName,
  SelectediconName,
  ICON_SIZE,
  selected,
}) => {
  // const [selected, select] = useState(false);

  const height = interpolate(progress, {
    inputRange: [0, 1],
    outputRange: [ICON_SIZE, 0],
    extrapolate: Extrapolate.CLAMP,
  });

  const AnimatedColor = interpolateColor(progress, {
    inputRange: [0, 1],
    outputRange: [colorBack, primaryColor],
  });

  return (
    <View>
      <View
        style={{
          height: ICON_SIZE,
          width: ICON_SIZE,
          borderRadius: ICON_SIZE / 2,
        }}>
        <Icon
          name={selected ? SelectediconName : iconName}
          size={ICON_SIZE}
          color={selected ? primaryColor : colorBack}
          style={styles.icon}
        />
        <AnimatedIcons
          style={[styles.selectedIcon, {height, opacity: selected ? 0 : 1}]}
          name={iconName}
          size={ICON_SIZE}
          color={AnimatedColor}
        />
        {/* <Animated.View
          style={[styles.selectedIcon, {height, opacity: selected ? 0 : 1}]}>
          <Icon
            name={iconName}
            size={ICON_SIZE}
            color={primaryColor}
            style={{flex: 1}} // flex one is neccessary to be used with animated view on Hight on top
          />
        </Animated.View> */}
      </View>
    </View>
  );
};
