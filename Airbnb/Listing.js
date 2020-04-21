import React from "react";
import { Dimensions, Image, StyleSheet, View, ScrollView } from "react-native";
import { SharedElement } from "react-navigation-shared-element";
import { useNavigation } from "react-navigation-hooks";
import Animated from "react-native-reanimated";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import {
  onGestureEvent,
  snapPoint,
  timing,
  useValues
} from "react-native-redash";
import { useMemoOne } from "use-memo-one";
import Feather from "react-native-vector-icons/Feather";

import { SafeAreaView } from "react-native-safe-area-context";

import { Description } from "./components";
// import { Listing as ListingModel } from "./components/Listing";
const  {
  Extrapolate,
  and,
  block,
  call,
  cond,
  eq,
  interpolate,
  set,
  useCode
} = Animated;

const { width, height } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  image: {
    width,
    height: width
  },
  thumbnailOverlay: {
    ...StyleSheet.absoluteFillObject,
    padding: 16
  }
});
const Listing = () => {
  const { goBack, getParam } = useNavigation();
  const listing = getParam("listing");
  const [
    translationX,
    translationY,
    velocityY,
    translateX,
    translateY,
    snapBack,
    state
  ] = useValues([0, 0, 0, 0, 0, 0, State.UNDETERMINED], []);
  const snapTo = snapPoint(translationY, velocityY, [0, height]);
  const scale = interpolate(translateY, {
    inputRange: [0, height / 2],
    outputRange: [1, 0.75],
    extrapolate: Extrapolate.CLAMP
  });
  const gestureHandler = useMemoOne(
    () => onGestureEvent({ translationX, translationY, velocityY, state }),
    [state, translationX, translationY, velocityY]
  );
  useCode(
    () =>
      block([
        cond(
          and(eq(state, State.END), eq(snapTo, height), eq(snapBack, 0)),
          set(snapBack, 1)
        ),
        cond(
          snapBack,
          call([], () => goBack()),
          cond(
            eq(state, State.END),
            [
              set(
                translateX,
                timing({ from: translationX, to: 0, duration: 250 })
              ),
              set(
                translateY,
                timing({ from: translationY, to: 0, duration: 250 })
              )
            ],
            [set(translateX, translationX), set(translateY, translationY)]
          )
        )
      ]),
    // we disable the deps because we don't want the identity change on
    // snapPoint to trigger a side effect
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  return (
    <ScrollView style={styles.container}>
      {/* <PanGestureHandler {...gestureHandler}> */}
        <Animated.View
          style={{
            flex: 1,
            backgroundColor: "white",
            transform: [{ translateX }, { translateY }, { scale }]
          }}
        >
          <SafeAreaView>
            <SharedElement id={listing.id}>
              <Image
                style={styles.image}
                resizeMode="cover"
                source={listing.picture}
              />
            </SharedElement>
            <View style={styles.thumbnailOverlay}>
              <Feather.Button
                name="x"
                backgroundColor="transparent"
                underlayColor="transparent"
                onPress={() => goBack()}
              />
            </View>
          </SafeAreaView>
          <Description />
        </Animated.View>
      {/* </PanGestureHandler> */}
    </ScrollView>
  );
};

Listing.sharedElements = (navigation) => {
  const listing = navigation.getParam("listing");
  const id = listing.id
  return [listing.id]; 
};

// Listing.sharedElements = (navigation: ReturnType<typeof useNavigation>) => {
//   const listing = navigation.getParam("listing");
//   return [listing.id];
// };
// DetailScreen.sharedElements = (navigation, otherNavigation, showing) => {
//   const item = navigation.getParam('item');
//   return [`item.${item.id}.photo`];
// };
export default Listing;
