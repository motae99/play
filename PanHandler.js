import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StatusBar
} from "react-native";
import LinearGradient from "react-native-linear-gradient";

import { useMemoOne } from "use-memo-one";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import { snapPoint, verticalPanGestureHandler } from "react-native-redash";

import Animated from "react-native-reanimated";
const { width, height } = Dimensions.get("window");
const ic_action_back = require("./images/ic_action_back.png");
const styles = StyleSheet.create({
 container: {
   flex: 1
 },
 SearchContainer: {
  position: "absolute",
  left: 0,
  right: 0,
  top: -CONTAINER_HEIGHT,
  justifyContent: "center",
  alignItems: "center"
},
search: {
  width: size,
  height: size,
  borderRadius: size / 2,
  justifyContent: "center",
  alignItems: "center"
}
});


const {
  SpringUtils,
  Value,
  Clock,
  eq,
  startClock,
  set,
  add,
  and,
  greaterOrEq,
  lessOrEq,
  cond,
  decay,
  block,
  not,
  spring,
  abs,
  multiply,
  divide,
  sub,
  useCode,
  call,
  neq,
  diff,
  pow,
  min,
  Extrapolate, interpolate,
  Transition,
  Transitioning,
  TransitioningView
} = Animated;

const grey = "rgb(186, 187, 199)";
const primary = "rgb(56, 132, 225)";
const size = 48;

const marginTop = 32;
const CONTAINER_HEIGHT = 100;
const THRESHOLD = CONTAINER_HEIGHT + marginTop;

const onPull = ()=> console.log("show Now")
const friction = (ratio) =>
  multiply(0.52, pow(sub(1, ratio), 2));


// const transition = (
//  <Transition.Together>
//    <Transition.In type="scale" durationMs={400} />
//    <Transition.Out type="scale" durationMs={400} />
//  </Transition.Together>
// );

const Search = (({ translateY }) => {
 const chevronTranslateY = translateY;
 const searchTranslateY = clamp(chevronTranslateY, 0, THRESHOLD);
 const backgroundColor = interpolateColor(translateY, {
   inputRange: [CONTAINER_HEIGHT, THRESHOLD],
   outputRange: [grey, primary]
 }) ;
 const opacity = interpolate(translateY, {
   inputRange: [CONTAINER_HEIGHT, THRESHOLD],
   outputRange: [1, 0],
   extrapolate: Extrapolate.CLAMP
 });
 const oppositeOpacity = sub(1, opacity);
 return (
   <View style={styles.container}>
     <Animated.View
       style={[
         styles.search,
         {
           backgroundColor,
           transform: [{ translateY: searchTranslateY }]
         }
       ]}
     >
       <Icon name="search" size={32} color="white" />
     </Animated.View>
     <Animated.View style={{ transform: [{ translateY: chevronTranslateY }] }}>
       <Animated.View style={{ opacity }}>
         <Icon name="chevron-down" size={32} color="#babbc7" />
       </Animated.View>
       <Animated.View
         style={{ ...StyleSheet.absoluteFillObject, opacity: oppositeOpacity }}
       >
         <Icon
           name="chevron-down"
           size={32}
           color={StyleGuide.palette.primary}
         />
       </Animated.View>
     </Animated.View>
   </View>
 );
});


const withScroll = ({
 translationY,
 velocityY,
 state: gestureState,
 containerHeight,
 contentHeight
}) => {
 const clock = new Clock();
 const delta = new Value(0);
 const isSpringing = new Value(0);
 const state = {
   time: new Value(0),
   position: new Value(0),
   velocity: new Value(0),
   finished: new Value(0)
 };
 const upperBound = 0;
 const lowerBound = -100
 const isInBound = and(
   lessOrEq(state.position, upperBound),
   greaterOrEq(state.position, lowerBound)
 );
 const config = {
   ...SpringUtils.makeDefaultConfig(),
   toValue: new Value(0)
 };
 const overscroll = sub(
   state.position,
   cond(greaterOrEq(state.position, 0), upperBound, lowerBound)
 );
 return block([
   startClock(clock),
   set(delta, diff(translationY)),
   cond(
     eq(gestureState, State.ACTIVE),
     [
       set(isSpringing, 0),
       set(
         state.position,
         add(
           state.position,
           cond(
             isInBound,
             delta,
             multiply(
               delta,
               friction(min(divide(abs(overscroll), containerHeight), 1))
             )
           )
         )
       ),
       set(state.velocity, velocityY),
       set(state.time, 0)
     ],
     [
       set(translationY, 0),
       cond(
         and(isInBound, not(isSpringing)),
         [decay(clock, state, { deceleration: 0.997 })],
         [
           set(isSpringing, 1),
           set(
             config.toValue,
             snapPoint(state.position, state.velocity, [
               lowerBound,
               upperBound
             ])
           ),
           spring(clock, state, config)
         ]
       )
     ]
   ),
   state.position
 ]);
};


const Header = ({ translateY }) => {
 const [containerHeight, setContainerHeight] = React.useState(0);
 const [contentHeight, setContentHeight] = React.useState(0);

 const { gestureHandler, translationY, velocityY, state } = useMemoOne(
   () => verticalPanGestureHandler(),
   []
 );
 useCode(
  () =>
    block([
      set(
        translateY,
        withScroll({
          translationY,
          velocityY,
          state,
          containerHeight,
          contentHeight
        })
      ),
      cond(
        and(greaterOrEq(translateY, THRESHOLD), neq(state, State.ACTIVE)),
        call([], onPull)
        )
    ]),
  [
    containerHeight,
    contentHeight,
    state,
    translateY,
    translationY,
    velocityY
  ]
);

  return (
   <View
      style={styles.container}
      onLayout={({
        nativeEvent: {
          layout: { height }
        }
      }) => setContainerHeight(300)}
    >
    <PanGestureHandler {...gestureHandler}>
      <Animated.View 
        onLayout={({
         nativeEvent: {
           layout: { height }
         }
       }) => setContentHeight(200)}
       style={{ height: contentHeight, transform: [{ translateY }] }}
      >
        <LinearGradient
          colors={["#8301FF", "#30ACFF"]}
          start={{ x: 0.0, y: 1.0 }}
          end={{ x: 1.0, y: 1.0 }}
          style={{
            height: '100%',
            width: width,
            borderBottomLeftRadius: 16,
            borderBottomRightRadius: 16,
            paddingBottom: 8
          }}
        >
          <StatusBar
            backgroundColor="#00000000"
            barStyle="default"
            translucent={true}
          />
          <View
            style={{
              paddingTop: 24,
              width: "100%",
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "space-between"
            }}
          >
            <TouchableOpacity
              onPress={() => {
                this.hide();
                // this.setState(height: 50)
                //   this.props.navigation.goBack(null);
              }}
            >
              <Image source={ic_action_back} resizeMode="center" />
            </TouchableOpacity>
            <Text
              style={{
                textAlign: "center",
                paddingLeft: 20,
                paddingRight: 20,
                color: "#FFFFFF"
              }}
            >
              SEE ALL
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: "flex-end",
              padding: 10,
              alignItems: "flex-start"
            }}
          >
            <Text
              style={{
                textAlign: "center",
                color: "#FFFFFF",
                opacity: 0.6
              }}
            >
              Restaurants
            </Text>
            <Text
              style={{
                textAlign: "center",
                fontSize: 30,
                fontFamily: "Roboto",
                color: "#FFFFFF"
              }}
            >
              Brooklyn
            </Text>
            <Text
              style={{
                textAlign: "center",
                color: "#FFFFFF",
                opacity: 0.6
              }}
            >
              3164, Anthony Avenue
            </Text>
          </View>
        </LinearGradient>
      </Animated.View>
    </PanGestureHandler>
   </View>
  );
}

export default () => {
 const ref = useRef(null);
 const [search, setSearch] = useState(false);
 const translateY = useMemoOne(() => new Value(0), []);
 const showSearchBox = () => {
   if (!search && ref.current) {
     ref.current.animateNextTransition();
     setSearch(true);
   }
 };
 return (
   <Transitioning.View style={styles.container} {...{ transition, ref }}>
     <Search {...{ translateY }} />
     <Header onPull={showSearchBox} {...{ translateY }}/>
     {/* <SearchBox visible={search} onRequestClose={() => setSearch(false)} /> */}
   </Transitioning.View>
 );
};