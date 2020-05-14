import React, {useState, useRef} from 'react';
import {StyleSheet, View, Image, Text, findNodeHandle} from 'react-native';
import Animated from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {BlurView} from '@react-native-community/blur';

const AnimatedBlur = Animated.createAnimatedComponent(BlurView);

const {
  call,
  cond,
  eq,
  useCode,
  greaterOrEq,
  interpolate,
  Extrapolate,
} = Animated;

const uri =
  'https://s3.amazonaws.com/exp-icon-assets/ExpoEmptyManifest_192.png';
const backgroundImage = require('../../images/host.jpg');

const styles = StyleSheet.create({
  root: {
    justifyContent: 'flex-end',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    // height: '100%',
    width: '100%',
    resizeMode: 'cover',
  },
  icon: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
});

// interface ButtonProps {
//   progress: Animated.Node<number>;
//   imageSize: number;
// }

export default ({progress, imageSize, selected}) => {
  const backImage = useRef();
  const [blurRef, setBlurRef] = useState(null);

  const height = interpolate(progress, {
    inputRange: [0, 1],
    outputRange: [imageSize, 0],
    extrapolate: Extrapolate.CLAMP,
  });

  const width = interpolate(progress, {
    inputRange: [0, 1],
    outputRange: [imageSize, 5],
    extrapolate: Extrapolate.CLAMP,
  });

  // const opacity = interpolate(progress, {
  //   inputRange: [0, 1],
  //   outputRange: [1, 0],
  //   extrapolate: Extrapolate.CLAMP,
  // });

  // const imageLoaded = () => {
  //   setBlurRef(findNodeHandle(backImage.current));
  // };

  return (
    <View
      style={[
        styles.root,
        {
          width: imageSize + imageSize * 0.1,
          height: imageSize + imageSize * 0.1,
        },
      ]}>
      <View
        style={[
          styles.container,
          {width: imageSize, height: imageSize, borderRadius: imageSize * 0.1},
        ]}>
        <Image
          // ref={backImage}
          source={backgroundImage}
          style={[
            styles.image,
            {borderRadius: imageSize * 0.05, height: '100%'},
          ]}
          // onLoadEnd={() => imageLoaded()}
        />

        {/* <BlurView
          tint="light"
          intensity={60}
          style={{
            ...StyleSheet.absoluteFillObject,
            height,
            opacity: selected ? 0 : 1,
          }}
        /> */}

        <Animated.View
          style={{
            ...StyleSheet.absoluteFillObject,
            backgroundColor: 'pink',
            opacity: selected ? 0 : 0.3,
            height,
            // width,
          }}
        />
        {/* <AnimatedBlur
          style={{
            ...StyleSheet.absoluteFillObject,
            // backgroundColor: 'pink',
            opacity: selected ? 0 : 1,
            height,
          }}
          viewRef={blurRef}
          blurType={'light'}
          blurAmount={2}
          // reducedTransparencyFallbackColor={'pink'}
        /> */}
        {/* </Animated.View> */}
      </View>
      <View
        style={[
          styles.icon,
          {
            opacity: selected ? 1 : 0,
            backgroundColor: 'white',
            borderRadius: imageSize * 0.2,
          },
        ]}>
        <Icon name={'check-circle'} size={imageSize * 0.2} color={'pink'} />
      </View>
    </View>
  );
};
