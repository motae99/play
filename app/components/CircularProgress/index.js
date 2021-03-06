import React from "react";
import Animated from "react-native-reanimated";
import { timing } from "react-native-redash";
import { StyleSheet, View } from "react-native";

import CircularProgress from "./CircularProgress";
import CircularG from "./CircularG";
import { COLOR_BG, COLOR_FG, RADIUS, STROKE_WIDTH } from "./Constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "gray"
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center"
  }
});

const { Value, set, useCode } = Animated;

export default () => {
  const progress = new Value(0);
  useCode(() => set( progress, timing({ duration: 10000 }) ), [progress]); 
  return (
    <View style={styles.container}>
      <View style={styles.overlay}>
        {/* <CircularG  {...{ progress }} /> */}
        <CircularProgress bg={COLOR_BG} fg={COLOR_FG} {...{ progress }} />
      </View>
      <View style={styles.overlay}>
        <View
          style={{
            width: RADIUS * 2 - STROKE_WIDTH,
            height: RADIUS * 2 - STROKE_WIDTH,
            borderRadius: RADIUS - STROKE_WIDTH / 8,
            backgroundColor: COLOR_BG
          }}
        />
      </View>
    </View>
  );
};
