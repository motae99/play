import { tabs } from "./components/Tab";

export { default } from "./components/Chrome";

export const assets = tabs.map(tab => tab.thumbnail);


// import React from 'react';
// import { StyleSheet, View, StatusBar, ScrollView, Animated} from 'react-native';
// import MaskedView from '@react-native-community/masked-view';
// import {TabBar, TABBAR_HEIGHT, TABBAR_WIDTH, TAB_WIDTH} from "./components";

// export default class Files extends React.Component  {

//   state = {
//     x: new Animated.Value(0)
//   };

//   render() {
//     const {x} = this.state;
//     const translateX = x.interpolate({
//       inputRange: [0, TABBAR_WIDTH],
//       outputRange: [TABBAR_WIDTH - TAB_WIDTH, 0]
//     });
//     return (
//       <View style={styles.root}>
//         <StatusBar barStyle="light-content" />
//         <View style={styles.container}>
//         <TabBar color="#f8f9fa" backgroundColor="#828384" borderColor="#505152" />
//           <MaskedView
//             style={StyleSheet.absoluteFill}
//             maskElement={<Animated.View style={[styles.activeTab, { transform: [{ translateX }] } ]} />}
//           >
//             <TabBar color="#3b4043" backgroundColor="#f8f9fa" borderColor="#f8f9fa" />
//           </MaskedView>
//           <Animated.ScrollView
//             style={StyleSheet.absoluteFill}
//             contentContainerStyle={{ width: TABBAR_WIDTH * 2 }}
//             showsHorizontalScrollIndicator={false}
//             scrollEventThrottle={16}
//             onScroll={Animated.event([ {nativeEvent: {contentOffset: { x }}}], { useNativeDriver: true })}
//             bounces={false}
//             snapToInterval={TAB_WIDTH + TAB_WIDTH / 2}
//             horizontal
//           />
//         </View>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   root: {
//     flex: 1,
//     alignItems: "center",
//     backgroundColor: "#212223"
//   },
//   activeTab: {
//     backgroundColor: "black",
//     width: TAB_WIDTH,
//     height: TABBAR_HEIGHT
//   },
//   container: {
//     width: TABBAR_WIDTH,
//     height: TABBAR_HEIGHT
//   }
// });
