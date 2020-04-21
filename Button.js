import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import Animated from "react-native-reanimated";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { bInterpolate } from "react-native-redash";
import CircularProgress from "./app/components/CircularProgress/CircularProgress";
import StyleGuide from "./app/components/StyleGuide";
const AnimatedMaterialIcons = Animated.createAnimatedComponent(MaterialIcons);
const SIZE = 150;
const STROKE_WIDTH = 10;
const ICON_SIZE = 96;
const CONTENT_SIZE = SIZE - STROKE_WIDTH * 2;
const { call, cond, eq, useCode } = Animated;
const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: STROKE_WIDTH,
    left: STROKE_WIDTH,
    right: STROKE_WIDTH,
    bottom: STROKE_WIDTH,
    backgroundColor: "white",
    borderRadius: CONTENT_SIZE / 2,
    zIndex: 100
  },
  icon: {
    top: (CONTENT_SIZE - ICON_SIZE) / 2,
    left: (CONTENT_SIZE - ICON_SIZE) / 2
  },
  activeIcon: {
    position: "absolute",
    top: (CONTENT_SIZE - ICON_SIZE) / 2,
    left: (CONTENT_SIZE - ICON_SIZE) / 2
  }
});

// interface ButtonProps {
//   progress: Animated.Node<number>;
// }

// export default ({ progress }) => {
//  // export default ({ progress }: ButtonProps) => {
//    console.log('state of progress', progress)
//   const [active, setActive] = useState(false);
//   const height = bInterpolate(progress, 0, ICON_SIZE);

//   useCode(
//     () =>
//       cond(
//         eq(progress, 1),
//         call([], () => setActive(true))
//       ),
//     [progress]
//   );

//   return (
//     <View>
//       <CircularProgress
//         radius={SIZE / 2}
//         bg="white"
//         fg={StyleGuide.palette.primary}
//         {...{ progress }}
//       />
//       <View style={styles.container}>
//         <MaterialIcons
//           name={active ? "check-circle" : "fingerprint"}
//           size={ICON_SIZE}
//           color={
//             active ? StyleGuide.palette.primary : StyleGuide.palette.background
//           }
//           style={styles.icon}
//         />
//         <Animated.View
//           style={[styles.activeIcon, { height, opacity: active ? 0 : 1 }]}
//         >
//           <MaterialIcons
//             name="fingerprint"
//             size={ICON_SIZE}
//             color={StyleGuide.palette.primary}
//           />
//         </Animated.View>
//       </View>
//     </View>
//   );
// };

export default ({ progress }) => {
  const [active, setActive] = useState(false);
  const height = bInterpolate(progress, 0, ICON_SIZE);
  useCode(
    () =>
      cond(
        eq(progress, 1),
        call([], () => setActive(!active))
      ),
    [progress]
  );
  return (
    <View>
      <View
        
      >
        {/* <CircularProgress
         radius={SIZE / 2}
         bg={StyleGuide.palette.background}
         fg={StyleGuide.palette.primary}
         {...{ progress }}
       /> */}
      </View>
        <View style={styles.container}>
          <MaterialIcons
            name={active ? "check-circle" : "fingerprint"}
            size={ICON_SIZE}
            color={
              active
                ? StyleGuide.palette.primary
                : StyleGuide.palette.background
            }
            style={styles.icon}
          />

          <AnimatedMaterialIcons
            style={[styles.activeIcon, { height, opacity: active ? 0 : 1 }]}
            name="fingerprint"
            size={ICON_SIZE}
            color={StyleGuide.palette.primary}
          />
        </View>
    </View>
  );
};
