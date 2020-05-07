import React, {Component} from 'react';
import {View, Text} from 'react-native';
import FoldView from 'react-native-foldview';

const Frontface = props => (
  <View style={{height: 200, backgroundColor: 'blue'}}>
    <Text>Front Face </Text>
  </View>
);
const Backface = props => (
  <View style={{height: 200, backgroundColor: 'green'}}>
    <Text> Back Face </Text>
  </View>
);
const Base = props => (
  <View style={{height: 200, backgroundColor: 'red'}}>
    <Text> Base Face </Text>
  </View>
);

export default class Row extends Component {
  constructor(props) {
    super(props);

    this.state = {
      expanded: false,
    };
  }

  componentWillMount() {
    this.flip = this.flip.bind(this);
  }
  componentDidMount() {
    this.flip();
  }

  flip() {
    this.setState({
      expanded: !this.state.expanded,
    });
  }

  renderFrontface() {
    return <Frontface />;
  }

  renderBackface() {
    /**
     * You can nest <FoldView>s here to achieve the folding effect shown in the GIF above.
     * A reference implementation can be found in examples/Simple.
     */
    return <Backface />;
  }

  render() {
    return (
      <FoldView
        expanded={this.state.expanded}
        renderBackface={this.renderBackface}
        renderFrontface={this.renderFrontface}>
        <Base />
      </FoldView>
    );
  }
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

// // import React from 'react';
// // import {
// //   View,
// //   Text,
// //   StyleSheet,
// //   Dimensions,
// //   Platform,
// //   TouchableWithoutFeedback,
// // } from 'react-native';
// // import Animated, {Easing} from 'react-native-reanimated';
// // import {
// //   State,
// //   TapGestureHandler,
// //   TouchableOpacity,
// // } from 'react-native-gesture-handler';

// // import {
// //   onGestureEvent,
// //   withTransition,
// //   transformOrigin,
// //   bInterpolate,
// //   withTimingTransition,
// //   timing,
// //   // runTiming,
// //   delay,
// //   useValues,
// //   translateZ,
// // } from 'react-native-redash';

// // const {
// //   Value,
// //   multiply,
// //   concat,
// //   set,
// //   interpolate,
// //   Extrapolate,
// //   useCode,
// //   greaterOrEq,
// //   eq,
// //   cond,
// //   call,
// //   Clock,
// //   block,
// //   and,
// // } = Animated;
// // const {width, height} = Dimensions.get('window');
// // // const perspective = Platform.OS === 'ios' ? 1000 : 800;
// // const cardWidth = width - 30;
// // const cardHeigh = cardWidth / 2;
// // const styles = StyleSheet.create({
// //   container: {
// //     width: cardWidth,
// //     height: cardHeigh,
// //     alignSelf: 'center',
// //     // top: 100
// //   },
// //   card: {
// //     ...StyleSheet.absoluteFillObject,
// //     width: undefined,
// //     height: undefined,
// //   },
// //   base: {
// //     ...StyleSheet.absoluteFillObject,
// //     width: undefined,
// //     height: undefined,
// //     borderTopStartRadius: 10,
// //     borderTopEndRadius: 10,
// //   },
// //   innerCard: {
// //     ...StyleSheet.absoluteFillObject,
// //     width: undefined,
// //     height: undefined,
// //     borderTopStartRadius: 10,
// //     borderTopEndRadius: 10,
// //   },
// //   frontCard: {
// //     ...StyleSheet.absoluteFillObject,
// //     width: undefined,
// //     height: undefined,
// //     // borderRadius: 10,
// //   },
// // });

// // export default () => {
// //   const [toggle, from, to] = useValues([0, 0, 1], []);
// //   // const [from] = useValues<0 | 1>([0], [])
// //   // const [to] = useValues<0 | 1>([0], [])

// //   const expand = () => {
// //     // useCode(() => set(from, 0), [from, to]);
// //     // useCode(() => set(to, 1), [from, to]);
// //   };

// //   const TOP = 200;
// //   // const collabse = () => {
// //   //   useCode(() => set(from, 1), [from, to]);
// //   //   useCode(() => set(to, 0), [from, to]);
// //   // };

// //   useCode(
// //     () =>
// //       block([
// //         // and(cond(from, 0), cond(to, 1)), (set(from, 1), set(to, 0)),
// //         // and(cond(from, 1), cond(to, 0)), (set(from, 0), set(to, 1)),
// //         // set(from, 0)
// //       ]),
// //     [from, to],
// //   );

// //   const rotateNext = (new Value() < 0) | (1 > 0);

// //   const animation = timing({
// //     duration: 1000,
// //     from: 0,
// //     to: 1,
// //     easing: Easing.linear,
// //   });

// //   const rotateXAsDegBack = interpolate(animation, {
// //     inputRange: [0, 0.7],
// //     outputRange: [0, -180],
// //     extrapolate: Extrapolate.CLAMP,
// //   });

// //   const rotateX = concat(rotateXAsDegBack, 'deg');

// //   const NrotateXAsDegBack = interpolate(rotateNext, {
// //     inputRange: [0.7, 1],
// //     outputRange: [0, -180],
// //     extrapolate: Extrapolate.CLAMP,
// //   });
// //   const NrotateX = concat(NrotateXAsDegBack, 'deg');

// //   // // const rotateXInner = concat(rotateXAsDegBack, "deg");

// //   // useCode(  () => block([
// //   //     cond( greaterOrEq(animation, 1), [
// //   //       set(rotateNext, timing({
// //   //           duration: 1000,
// //   //           from: 0,
// //   //           to: 1,
// //   //           easing: Easing.linear
// //   //         })
// //   //       ),
// //   //     ]
// //   //   ),
// //   //   // cond( greaterOrEq(animation, 1), [
// //   //   //   delay(set(rotateNext, 1), 1000)

// //   //   //   ]
// //   //   // ),
// //   // ]),

// //   //   [rotateNext, animation]
// //   //   );
// //   // useCode(() => cond(toggle, greaterOrEq(animation, 1), set(toggle, 1) ),  [toggle, animation])
// //   // const transition = withTransition(NrotateXAsDegBack)
// //   // const NrotateX = concat(transition, "deg");

// //   const z = new Value(1);
// //   const perspective = 800;
// //   return (
// //     <View>
// //       <Animated.View
// //         style={{
// //           height: 100,
// //           width,
// //           backgroundColor: 'black',
// //           // transform: [{translateY}],
// //         }}
// //       />
// //       <Animated.View style={[styles.container]}>
// //         {/* <Animated.Code>
// //         {
// //           () => call([rotateX], ([rotateX]) => console.log(rotateX) )
// //         }
// //       </Animated.Code> */}
// //         <View style={[styles.base, {backgroundColor: 'blue'}]}>
// //           <Text style={{alignSelf: 'center', color: 'white', fontSize: 20}}>
// //             Base layout
// //           </Text>
// //         </View>

// //         <Animated.View
// //           style={{
// //             ...StyleSheet.absoluteFillObject,
// //             justifyContent: 'center',
// //             alignItems: 'center',
// //             transform: transformOrigin(
// //               {
// //                 x: 0,
// //                 y: cardHeigh / 2,
// //               },
// //               {rotateX},
// //               {perspective},
// //               // translateZ(perspective, animation),
// //             ),
// //           }}>
// //           <View
// //             style={[
// //               styles.card,
// //               {backgroundColor: 'red', transform: [{rotateX: '180deg'}]},
// //             ]}>
// //             <Text style={{alignSelf: 'center', color: 'white', fontSize: 72}}>
// //               Back
// //             </Text>
// //             <View
// //               style={{
// //                 height: cardHeigh / 3,
// //                 width: cardWidth,
// //                 ...StyleSheet.absoluteFillObject,
// //               }}>
// //               {/* <Animated.View
// //                 style={{
// //                   ...StyleSheet.absoluteFillObject,
// //                   // opacity,
// //                   // backfaceVisibility: "hidden",
// //                   transform: transformOrigin(
// //                     {
// //                       x: 0,
// //                       y: cardHeigh / 6,
// //                     },
// //                     {rotateX: NrotateX},
// //                     {perspective},
// //                   ),
// //                 }}>
// //                 <View style={[styles.innerCard, {backgroundColor: 'aqua'}]}>
// //                   <Text
// //                     style={{alignSelf: 'center', color: 'white', fontSize: 20}}>
// //                     front Face
// //                   </Text>
// //                 </View>
// //               </Animated.View> */}
// //             </View>
// //           </View>
// //         </Animated.View>

// //         <Animated.View
// //           style={{
// //             ...StyleSheet.absoluteFillObject,
// //             backfaceVisibility: 'hidden',
// //             transform: transformOrigin(
// //               {
// //                 x: 0,
// //                 y: cardHeigh / 2,
// //               },
// //               {rotateX},
// //               {perspective},
// //               // translateZ(perspective, animation),
// //             ),
// //           }}>
// //           <TouchableWithoutFeedback onPress={expand}>
// //             <View style={[styles.frontCard, {backgroundColor: 'green'}]}>
// //               <Text>front Face</Text>
// //             </View>
// //           </TouchableWithoutFeedback>
// //         </Animated.View>
// //       </Animated.View>
// //     </View>
// //   );
// // };
