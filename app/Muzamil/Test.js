import React from 'react';
import {ScrollView} from 'react-native';
import FoldView from './FoldView';

export default function() {
  return (
    <ScrollView
      contentContainerStyle={{
        backgroundColor: '#555b6e',
        alignItems: 'center',
      }}>
      <FoldView />
      <FoldView />
      <FoldView />
      <FoldView />
      <FoldView />
      <FoldView />
    </ScrollView>
  );
}

// import React from 'react';

// import {View, Text, StyleSheet} from 'react-native';
// import Animated from 'react-native-reanimated';
// import {
//   useLoop,
//   tween2d,
//   decompose2d,
//   processTransform2d,
//   vec,
// } from 'react-native-redash';
// const {tan} = Animated;
// export default function() {
//   // const src = [{rotateZ: Math.PI / 2}, {scale: 0.2}];
//   // const dst = [{skewX: Math.PI / 6}];
//   // const progress = useLoop(1000);
//   // const transform = tween2d(progress, src, dst);

//   // not working yet
//   // const transform = decompose2d([
//   //   [1.25, tan(Math.PI / 12), 50],
//   //   [tan(Math.PI / 12), 1.25, 50],
//   //   [0, 0, 1],
//   // ]);
//   // const {translateX} = transform[0];
//   // const {translateY} = transform[1];
//   // const {skewX} = transform[2];
//   // const {scaleX} = transform[3];
//   // const {scaleY} = transform[4];
//   // const {rotateZ} = transform[5];

//   // const m = processTransform2d([
//   //   {translateX: 100},
//   //   {translateX: -200 / 2},
//   //   {rotateZ: -Math.PI / 6},
//   //   {translateX: 200 / 2},
//   // ]);
//   // const [translateX, translateY] = vec.create(m[0][2], m[1][2]);
//   // console.log(translateX);

//   return (
//     <View>
//       <View style={{height: 200}} />
//       <Fold />
//       {/* <Animated.View
//         style={
//           {
//             // transform: [{translateX}, {translateY}],
//           }
//         }>
//         <View style={{height: 200, width: 200, backgroundColor: 'blue'}} />
//       </Animated.View> */}
//     </View>
//   );
// }

// // // My Client Secret
// // // 50b044caaf25de468dd9fadcc34397c7

// import React, {useState} from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   Platform,
//   ScrollView,
//   TouchableOpacity,
//   Image,
// } from 'react-native';
// import Animated, {Easing} from 'react-native-reanimated';

// import {
//   onGestureEvent,
//   withTransition,
//   transformOrigin,
//   bInterpolate,
//   withTimingTransition,
//   timing,
//   useTransition,
//   delay,
//   useValues,
//   translateZ,
// } from 'react-native-redash';

// const {
//   Value,
//   multiply,
//   concat,
//   set,
//   interpolate,
//   Extrapolate,
//   useCode,
//   greaterOrEq,
//   eq,
//   cond,
//   call,
//   Clock,
//   block,
//   and,
//   lessOrEq,
//   lessThan,
//   greaterThan,
// } = Animated;

// import FirstNest from './Components/FirstNest';
// import {
//   cardWidth,
//   cardHeigh,
//   perspective,
//   fHeight,
//   sHeight,
// } from './Components/FoldingStyle';
// import Base from './Components/Base';
// import FrontFace from './Components/FrontFace';
// import BackFace from './Components/BackFace';
// const styles = StyleSheet.create({
//   container: {
//     width: cardWidth,
//     height: cardHeigh,
//     alignSelf: 'center',
//     // top: 100
//   },
//   card: {
//     // ...StyleSheet.absoluteFillObject,
//     width: undefined,
//     height: undefined,
//   },
//   base: {
//     ...StyleSheet.absoluteFillObject,
//     width: undefined,
//     height: undefined,
//     borderTopStartRadius: 10,
//     borderTopEndRadius: 10,
//   },
//   innerCard: {
//     ...StyleSheet.absoluteFillObject,
//     width: undefined,
//     height: undefined,
//     borderTopStartRadius: 10,
//     borderTopEndRadius: 10,
//   },
//   frontCard: {
//     ...StyleSheet.absoluteFillObject,
//     width: undefined,
//     height: undefined,
//     // borderRadius: 10,
//   },
// });

// const Fold = () => {
//   const [open, setOpen] = useState(false);
//   const animation = useTransition(open, {duration: 700});
//   const [backZindex, frontZindex] = useValues([0, 1]);

//   const toggle = () => {
//     setOpen(prev => !prev);
//   };

//   const height = interpolate(animation, {
//     inputRange: [0, 0.8],
//     outputRange: [cardHeigh, cardHeigh * 2 + fHeight + sHeight + 5],
//     extrapolate: Extrapolate.CLAMP,
//   });

//   const rotateXAsDegBack = interpolate(animation, {
//     inputRange: [0, 0.4],
//     outputRange: [0, -180],
//     extrapolate: Extrapolate.CLAMP,
//   });

//   const rotateX = concat(rotateXAsDegBack, 'deg');

//   useCode(
//     () =>
//       block([
//         // cond(greaterThan(animation, 0.4), set(backZindex, 2), 0),
//         // cond(
//         //   greaterThan(animation, 0.4),
//         //   // set(backZindex, 10),
//         //   [
//         //     // set(frontZindex, 0),
//         //     set(backZindex, 1),
//         //     set(frontZindex, 0),
//         //     // call([], () => {
//         //     //   console.log('  backZindex  ', backZindex);
//         //     // }),
//         //   ],
//         // ),
//         // cond(
//         //   lessThan(animation, 0.4),
//         //   // set(backZindex, 10),
//         //   [
//         //     // set(frontZindex, 0),
//         //     set(backZindex, 0),
//         //     set(frontZindex, 1),
//         //     // call([], () => {
//         //     //   console.log('  backZindex  ', backZindex);
//         //     // }),
//         //   ],
//         // ),
//       ]),

//     [animation, backZindex, frontZindex],
//   );

//   return (
//     <Animated.View style={{margin: 6, height, width: cardWidth}}>
//       <Animated.View style={styles.container}>
//         <Base {...{toggle, animation}} />

//         <Animated.View
//           style={{
//             ...StyleSheet.absoluteFillObject,
//             // backfaceVisibility: 'hidden',
//             justifyContent: 'center',
//             alignItems: 'center',
//             // zIndex: animation,
//             transform: [
//               {perspective},
//               {translateY: cardHeigh / 2},
//               {rotateX},
//               {translateY: -cardHeigh / 2},
//               {rotateX: '180deg'},
//             ],
//           }}>
//           <BackFace {...{toggle}} />

//           <FirstNest {...{animation, toggle}} />
//         </Animated.View>

//         <Animated.View
//           style={{
//             ...StyleSheet.absoluteFillObject,
//             backfaceVisibility: 'hidden',
//             transform: [
//               {perspective},
//               {translateY: cardHeigh / 2},
//               {rotateX},
//               {translateY: -cardHeigh / 2},
//             ],
//           }}>
//           <FrontFace {...{toggle}} />
//         </Animated.View>
//       </Animated.View>
//     </Animated.View>
//   );
// };
