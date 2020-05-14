import React, {useState} from 'react';
import {StyleSheet, View, Text, Dimensions} from 'react-native';
import {
  State,
  TapGestureHandler,
  LongPressGestureHandler,
} from 'react-native-gesture-handler';
import Animated, {greaterThan} from 'react-native-reanimated';
import {
  mix,
  onGestureEvent,
  withTransition,
  useValue,
  useValues,
} from 'react-native-redash';
import LongPressIcon from './app/components/LongPressIcon';
import LongPressImage from './app/components/LongPressImage';

const {height, width} = Dimensions.get('window');
const {Value, cond, eq, useCode, call, set, and} = Animated;
const primaryColor = 'pink';
const colorBack = 'gray';
const iconName = 'camera';
const SelectediconName = 'camera';
const imageSize = 200;
const ICON_SIZE = 200;

export const backgroundImage = require('./images/beer1.jpg');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'space-between',
  },
  service: {},
  image: {
    flex: 2,
    width,
  },
  info: {
    flex: 1,
  },
  action: {
    flex: 1,
  },
});

export default () => {
  const [selected, select] = useState(false);

  const state = new Value(State.UNDETERMINED);
  // console.log(state);
  const gestureHandler = onGestureEvent({state});
  const isActive = eq(state, State.BEGAN);
  const duration = cond(isActive, 300, 200);
  const progress = withTransition(isActive, {duration});

  const scale = mix(progress, 1, 1.3);

  useCode(
    () => [
      //
      // cond(eq(state, State.END), call([], () => toggle())),
      cond(
        eq(progress, 1),
        [call([], () => toggle()), set(state, new Value(State.UNDETERMINED))],
        // and(
        //   set(state, State.UNDETERMINED),
        //   set(progress, 0)
        //   ),
      ),
    ],

    [(progress, state)],
  );

  const toggle = () => {
    console.log('END');
    select(!selected);
  };

  // const [open, setOpen] = useState(false);
  // const animation = useTransition(open, {duration: 700});

  return (
    <View style={styles.container}>
      <LongPressGestureHandler {...gestureHandler}>
        <Animated.View style={{transform: [{scale}]}}>
          <LongPressIcon
            {...{
              selected,
              toggle,
              progress,
              primaryColor,
              colorBack,
              iconName,
              SelectediconName,
              ICON_SIZE,
            }}
          />
          <LongPressImage {...{progress, imageSize, selected}} />

          {/* <View style={styles.image}> */}
          {/* </View> */}
          {/* <View style={styles.info}>*}

         /{* </View>
          <View style={styles.image}>
            <LongPressIcon
              {...{
                progress,
                primaryColor,
                colorBack,
                iconName,
                SelectediconName,
                ICON_SIZE,
              }}
            />
          </View> */}
        </Animated.View>
      </LongPressGestureHandler>
    </View>
  );
};

// import React, {Component, useState, useRef} from 'react';
// import {View, Image, Text, findNodeHandle, StyleSheet} from 'react-native';
// import {BlurView} from '@react-native-community/blur';

// export default function() {
//   const img = useRef();
//   const [viewRef, setViewRef] = useState(null);

//   // constructor(props) {
//   //   super(props);
//   //   this.state = {viewRef: null};
//   // }

//   const imageLoaded = () => {
//     console.log('done');
//     setViewRef(findNodeHandle(img.current));
//     // this.setState({viewRef: findNodeHandle(this.backgroundImage)});
//   };

//   return (
//     <View style={styles.container}>
//       <Image
//         ref={img}
//         source={require('./images/beer1.jpg')}
//         style={styles.absolute}
//         onLoadEnd={() => imageLoaded()}
//       />
//       <BlurView
//         style={styles.absolute}
//         viewRef={viewRef}
//         blurType="light"
//         blurAmount={5}
//       />
//       <Text>Hi, I am some unblurred text</Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   absolute: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     bottom: 0,
//     right: 0,
//   },
// });
