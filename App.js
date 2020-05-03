import React, {Fragment} from 'react';
// import {View, Text } from 'react-native';
import AppContainer from './app/navigations/index';
import NavigationService from './app/services/NavigationService';
import PushController from './app/services/PushNotification';
import DynamicLinks from './app/services/DynamicLinks';
import codePush from 'react-native-code-push';
import analytics from '@react-native-firebase/analytics';

// codePush({ checkFrequency: codePush.CheckFrequency.ON_APP_RESUME, installMode: codePush.InstallMode.ON_NEXT_RESUME })(MyApp);

// checkFrequency are MANUAL, ON_APP_RESUME, default to ON_APP_START
// installMode ON_NEXT_RESTART, IMMEDIATE, ON_NEXT_RESUME, ON_NEXT_SUSPEND
const codePushOptions = {
  updateDialog: true,
  checkFrequency: codePush.CheckFrequency.MANUAL,
  installMode: codePush.InstallMode.IMMEDIATE,
};

const App = () => {
  // not working Try Again
  // codePushStatusDidChange(status) {
  //   switch(status) {
  //       case codePush.SyncStatus.CHECKING_FOR_UPDATE:
  //           console.log("Checking for updates.");
  //           break;
  //       case codePush.SyncStatus.DOWNLOADING_PACKAGE:
  //           console.log("Downloading package.");
  //           break;
  //       case codePush.SyncStatus.INSTALLING_UPDATE:
  //           console.log("Installing update.");
  //           break;
  //       case codePush.SyncStatus.UP_TO_DATE:
  //           console.log("Up-to-date.");
  //           break;
  //       case codePush.SyncStatus.UPDATE_INSTALLED:
  //           console.log("Update installed.");
  //           break;
  //     }
  // }

  // codePushDownloadDidProgress(progress) {
  //     console.log(progress.receivedBytes + " of " + progress.totalBytes + " received.");
  // }

  return (
    <Fragment>
      <AppContainer
        ref={navigatorRef => {
          NavigationService.setTopLevelNavigator(navigatorRef);
        }}
        onNavigationStateChange={(prevState, currentState, action) => {
          const currentRouteName = NavigationService.getActiveRouteName(
            currentState,
          );
          const previousRouteName = NavigationService.getActiveRouteName(
            prevState,
          );

          if (previousRouteName !== currentRouteName) {
            analytics().setCurrentScreen(currentRouteName, currentRouteName);
          }
        }}
      />
      <PushController />
      <DynamicLinks />
    </Fragment>
  );
};

export default codePush(codePushOptions)(App);

// import * as React from "react";
// import {
//   View, Image, StyleSheet, ImageSourcePropType, Dimensions, Platform, Text,
// } from "react-native";
// import Animated from "react-native-reanimated";
// import { timing } from "react-native-redash";
// import { transform } from "@babel/core";

// const {
//   Value, concat, interpolate, cond, and, greaterOrEq, lessThan,  set, useCode
// } = Animated;

// const { width } = Dimensions.get("window");
// const perspective = Platform.OS === "ios" ? 1000 : undefined;

// const styles = StyleSheet.create({
//   container: {
//     width: 306,
//     height: 434,
//   },
//   image: {
//     ...StyleSheet.absoluteFillObject,
//     width: undefined,
//     height: undefined,
//   },
// });

// export default () => {

//     return (
//       <View style={styles.container}>
//         <View style={{
//                 backgroundColor: "red" ,
//                 transform: [
//                   {rotateY: "180deg"}
//                 ]
//               }}

//         />
//      </View>
//     );

//     // <View style={styles.container}>

//     {/* <Animated.View style={{
//       ...StyleSheet.absoluteFillObject,
//       justifyContent: "center",
//       alignItems: "center",
//       opacity: backOpacity,
//       backfaceVisibility: "hidden",
//       transform: [
//         { perspective },
//         { rotateY: "180deg" },
//         { rotateY },
//       ],
//     }}
//     >
//       <Image source={back} style={styles.image} />
//       <View  style={styles.image, {backgroundColor: 'red'}} />
//       <Text style={{ color: "white", fontSize: 72 }}>Hello</Text>
//     </Animated.View>

//     <Animated.View style={{
//       ...StyleSheet.absoluteFillObject,
//       opacity,
//       backfaceVisibility: "hidden",
//       transform: [
//         { perspective },
//         { rotateY },
//       ],
//     }}
//     >
//        <Image source={front} style={styles.image} />
//       <View  style={styles.image, {backgroundColor: 'blue'}} />
//     </Animated.View>  */}
//   // </View>
// }

// import React from "react";
// import { StyleSheet, View, Alert, Text } from "react-native";
// import { State, TapGestureHandler } from "react-native-gesture-handler";
// import Animated from "react-native-reanimated";

// import {
//   bInterpolate,
//   onGestureEvent,
//   withTransition,
//   useTimingTransition
// } from "react-native-redash";
// import Button from "./Button";

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#E8EDFF"
//   }
// });

// const { Value, cond, eq, useCode, call } = Animated
// export default () => {

//   const state = new Value(State.UNDETERMINED);
//   const gestureHandler = onGestureEvent({ state });
//   const isActive = eq(state, State.BEGAN);
//   const duration = cond(isActive, 400, 100);
//   const progress = withTransition(isActive, { duration });
//   const scale = bInterpolate(progress, 1, 1.2);

//   return (
//     <View style={styles.container}>
//       <TapGestureHandler {...gestureHandler}>
//         <Animated.View style={{ transform: [{ scale }] }}>
//           <Button {...{ progress }} />
//         </Animated.View>
//       </TapGestureHandler>
//     </View>
//   );
// };

// export default () => (
//   <AppContainer
//     onNavigationStateChange={(prevState, currentState, action) => {
//       const currentRouteName = getActiveRouteName(currentState);
//       const previousRouteName = getActiveRouteName(prevState);

//       if (previousRouteName !== currentRouteName) {
//         // the line below uses the @react-native-firebase/analytics tracker
//         // change the tracker here to use other Mobile analytics SDK.
//         analytics().setCurrentScreen(currentRouteName, currentRouteName);
//       }
//     }}
//   />
// );

// // // import React, { Component } from 'react';
// // // import { StackNavigator, createAppContainer } from 'react-navigation';
// // // import { createStackNavigator } from "react-navigation-stack";

// // // import EventListing from './app/screens/Listing/eventServices/List';
// // // import EventMap from './app/screens/Listing/eventServices/Map';
// // // import EventDetail from './app/screens/Listing/eventServices/Detail';
// // // import EventFilter from './app/screens/Listing/eventServices/Filter';
// // // import EventAvailability from './app/screens/Listing/eventServices/Availability';

// // // import List from './app/screens/Listing/List';
// // // import MapListing from './app/screens/Listing/MapView';
// // // import ListView from './app/screens/Listing/ListView';
// // // import infinit from './app/screens/Listing/infinit';
// // // import Comments from './app/screens/Listing/Comments';
// // // import Details from './app/screens/Listing/Details';
// // // import Availability from './app/screens/Listing/Availability';
// // // import Provider from './app/screens/Listing/Provider';
// // // import ProviderHome from './app/screens/Listing/ProviderHome';

// // // import Airbnb from './Airbnb/index';
// // // import Snapchat from './snapchat';
// // // import Insta from './insta';
// // // import Uber from './UberEats';
// // // import Day from './appoftheday';
// // // import PanHandler from './PanHandler';
// // // // import Thing from './Things';

// // // import Main from './app/screens/Listing/Main';
// // // // import EventServices from './app/screens/Listing/eventServices/Index';

// // // const Navigator = createStackNavigator({
// // //     Main: { screen: Main },
// // //     Insta: { screen: Insta },
// // //     Airbnb: { screen: Airbnb },
// // //     Snapchat: { screen: Snapchat },
// // //     // Thing: { screen: Thing },
// // //     PanHandler: { screen: PanHandler },
// // //     Day: { screen: Day },
// // //     Uber: { screen: Uber },
// // //     EventListing: { screen: EventListing },
// // //     EventMap: { screen: EventMap },
// // //     EventDetail: { screen: EventDetail },
// // //     EventFilter: { screen: EventFilter },
// // //     EventAvailability: { screen: EventAvailability },

// // //     List: { screen: List },
// // //     Infinit: { screen: infinit },
// // //     // MapListing: { screen: MapListing },
// // //     ListView: { screen: ListView },
// // //     Comments: { screen: Comments },
// // //     Availability: { screen: Availability },
// // //     Details: { screen: Details },
// // //     Provider: { screen: Provider },
// // //     ProviderHome: { screen: ProviderHome },
// // // },

// // //   {
// // //     initialRouteName: 'EventListing',
// // //     // defaultNavigationOptions: {
// // //     //   headerStyle: {
// // //     //     backgroundColor: '#f4511e',
// // //     //   },
// // //     //   headerTintColor: '#fff',
// // //     //   headerTitleStyle: {
// // //     //     fontWeight: 'bold',
// // //     //   },
// // //     // },
// // //     // defaultNavigationOptions: {
// // //     //   gesturesEnabled: true,
// // //     // },
// // //     headerMode: 'none'
// // //   }
// // // );

// // // const AppContainer = createAppContainer(Navigator)

// // // export default class Nav extends Component {
// // //   render() {
// // //     return <AppContainer />;
// // //   }
// // // }

// // // // // // // // import React from "react";
// // // // // // // // import { View, TouchableHighlight, Text, TouchableOpacity} from "react-native";
// // // // // // // // import LottieView from "lottie-react-native";
// // // // // // // // import { Animated, Easing } from "react-native";

// // // // // // // // const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

// // // // // // // // export default class BasicExample extends React.Component {
// // // // // // // //   constructor(props) {
// // // // // // // //     super(props);
// // // // // // // //     this.state = {
// // // // // // // //       progress: new Animated.Value(0),
// // // // // // // //       selected: false
// // // // // // // //     };
// // // // // // // //   }

// // // // // // // //   runAnimation() {
// // // // // // // //     console.log(this.state.progress)
// // // // // // // //     //this.animation.play();
// // // // // // // //     // Or set a specific startFrame and endFrame with:
// // // // // // // //     // this.setState{!this.state.selected}
// // // // // // // //     // if(!this.state.selected){
// // // // // // // //       if(this.state.progress === 0){
// // // // // // // //         Animated.timing(this.state.progress, {
// // // // // // // //           toValue: 1,
// // // // // // // //           duration: 1200,
// // // // // // // //           easing: Easing.linear
// // // // // // // //         }).start();

// // // // // // // //         // this.setState({progress: new Animated.Value(1)})
// // // // // // // //       }

// // // // // // // //       // else{

// // // // // // // //       //   Animated.timing(this.state.progress, {
// // // // // // // //       //     toValue: 0,
// // // // // // // //       //     duration: 1200,
// // // // // // // //       //     easing: Easing.linear
// // // // // // // //       //   }).start();
// // // // // // // //       //   this.setState({progress: new Animated.Value(0)})

// // // // // // // //       // }

// // // // // // // //     // }
// // // // // // // //     // else{
// // // // // // // //     //   Animated.timing(this.state.progress, {
// // // // // // // //     //     toValue: 1,
// // // // // // // //     //     duration: 3000,
// // // // // // // //     //     easing: Easing.linear
// // // // // // // //     //   }).start();
// // // // // // // //     // }

// // // // // // // //     //this.setState({progress: new Animated.Value(0)});
// // // // // // // //   }

// // // // // // // //   render() {
// // // // // // // //     return (
// // // // // // // //       <View style={{flex:1, backgroundColor: '#f1f1f1'}}>
// // // // // // // //       <View style={{ flex: 3, flexDirection: "row" }}>
// // // // // // // //         <View style={{ flex: 2 }}>
// // // // // // // //           <AnimatedTouchable
// // // // // // // //             onPress={() => this.runAnimation()}
// // // // // // // //             style={{ flex: 1 }}
// // // // // // // //             >
// // // // // // // //               <View style={{ flex: 1 }}>
// // // // // // // //                 <LottieView
// // // // // // // //                   resizeMode={'cover'}
// // // // // // // //                   // key={2}
// // // // // // // //                   source={require("../../images/heart.json")}
// // // // // // // //                   progress={this.state.progress}
// // // // // // // //                   loop
// // // // // // // //                   // autoPlay
// // // // // // // //                 />
// // // // // // // //               </View>

// // // // // // // //           </AnimatedTouchable>

// // // // // // // //         </View>
// // // // // // // //         <View style={{ flex: 2 }}>
// // // // // // // //           <LottieView
// // // // // // // //             source={require("../../images/loading.json")}
// // // // // // // //             autoPlay
// // // // // // // //             loop
// // // // // // // //           />
// // // // // // // //         </View>

// // // // // // // //       </View>
// // // // // // // //       {/* <View style={{flex: 2}}>
// // // // // // // //       <View style={{ alignItems:'center' }}>
// // // // // // // //           <TouchableHighlight
// // // // // // // //           onPress={() => this.runAnimation()}
// // // // // // // //           style={{backgroundColor: "#181888", padding: 10, borderRadius: 3  }}
// // // // // // // //           >
// // // // // // // //             <Text style={{color: '#ffffff', fontSize: 20}}>Me gusta</Text>
// // // // // // // //           </TouchableHighlight>
// // // // // // // //         </View>

// // // // // // // //       </View> */}

// // // // // // // //        <View style={{flex: 2, alignItems: 'center'}}>
// // // // // // // //        <Text style={{color: '#f22323'}}>@yoandypv</Text>
// // // // // // // //        </View>
// // // // // // // //       </View>
// // // // // // // //     );
// // // // // // // //   }
// // // // // // // // }

// // // // // // // /* eslint-disable global-require */
// // // // // // // // import React from 'react';
// // // // // // // // import {
// // // // // // // //   View,
// // // // // // // //   Animated,
// // // // // // // //   Easing,
// // // // // // // //   StyleSheet,
// // // // // // // //   Slider,
// // // // // // // //   Switch,
// // // // // // // //   Image,
// // // // // // // //   Text,
// // // // // // // //   TouchableOpacity,
// // // // // // // // } from 'react-native';
// // // // // // // // import LottieView from 'lottie-react-native';
// // // // // // // // import ExamplePicker from './ExamplePicker';

// // // // // // // // const AnimatedSlider = Animated.createAnimatedComponent(Slider);

// // // // // // // // const playIcon = require('./images/play.png');
// // // // // // // // const pauseIcon = require('./images/pause.png');
// // // // // // // // const loopIcon = require('./images/loop.png');
// // // // // // // // const inverseIcon = require('./images/inverse.png');

// // // // // // // // const makeExample = (name, getJson, width) => ({ name, getJson, width });
// // // // // // // // const EXAMPLES = [
// // // // // // // //   makeExample('Hamburger Arrow', () => require('./animations/HamburgerArrow.json')),
// // // // // // // //   makeExample('Hamburger Arrow (200 px)', () => require('./animations/HamburgerArrow.json'), 200),
// // // // // // // //   makeExample('Line Animation', () => require('./animations/LineAnimation.json')),
// // // // // // // //   makeExample('Lottie Logo 1', () => require('./animations/LottieLogo1.json')),
// // // // // // // //   makeExample('Lottie Logo 2', () => require('./animations/LottieLogo2.json')),
// // // // // // // //   makeExample('Lottie Walkthrough', () => require('./animations/LottieWalkthrough.json')),
// // // // // // // //   makeExample('Pin Jump', () => require('./animations/PinJump.json')),
// // // // // // // //   makeExample('Twitter Heart', () => require('./animations/TwitterHeart.json')),
// // // // // // // //   makeExample('Watermelon', () => require('./animations/Watermelon.json')),
// // // // // // // //   makeExample('Motion Corpse', () => require('./animations/MotionCorpse-Jrcanest.json')),
// // // // // // // // ];

// // // // // // // // export default class LottieAnimatedExample extends React.Component {
// // // // // // // //   state = {
// // // // // // // //     example: EXAMPLES[0],
// // // // // // // //     duration: 3000,
// // // // // // // //     isPlaying: true,
// // // // // // // //     isInverse: false,
// // // // // // // //     loop: false,
// // // // // // // //   };

// // // // // // // //   manageAnimation = shouldPlay => {
// // // // // // // //     if (!this.state.progress) {
// // // // // // // //       if (shouldPlay) {
// // // // // // // //         this.anim.play();
// // // // // // // //       } else {
// // // // // // // //         this.anim.reset();
// // // // // // // //       }
// // // // // // // //     } else {
// // // // // // // //       this.state.progress.setValue(0);

// // // // // // // //       if (shouldPlay) {
// // // // // // // //         Animated.timing(this.state.progress, {
// // // // // // // //           toValue: 1,
// // // // // // // //           duration: this.state.duration,
// // // // // // // //           easing: Easing.linear,
// // // // // // // //           useNativeDriver: true,
// // // // // // // //         }).start(() => {
// // // // // // // //           this.setState({ isPlaying: false });
// // // // // // // //         });
// // // // // // // //       }
// // // // // // // //     }

// // // // // // // //     this.setState({ isPlaying: shouldPlay });
// // // // // // // //   };

// // // // // // // //   onPlayPress = () => this.manageAnimation(!this.state.isPlaying);
// // // // // // // //   stopAnimation = () => this.manageAnimation(false);

// // // // // // // //   onInversePress = () => this.setState(state => ({ isInverse: !state.isInverse }));
// // // // // // // //   onProgressChange = progress => this.state.progress.setValue(progress);
// // // // // // // //   onDurationChange = duration => this.setState({ duration });

// // // // // // // //   setAnim = anim => {
// // // // // // // //     this.anim = anim;
// // // // // // // //   };

// // // // // // // //   render() {
// // // // // // // //     const { duration, isPlaying, isInverse, progress, loop, example } = this.state;
// // // // // // // //     return (

// // // // // // // //         <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
// // // // // // // //         <TouchableOpacity style={styles.playButton} onPress={this.onPlayPress}>
// // // // // // // //           <LottieView
// // // // // // // //               ref={this.setAnim}
// // // // // // // //               autoPlay={!progress}
// // // // // // // //               // style={[example.width && { width: example.width }, isInverse && styles.lottieViewInvse]}
// // // // // // // //               style={{flex: 1, width: '100%', height: '100%',  alignItems: 'center', justifyContent: 'center', isInverse: styles.lottieViewInvse }}
// // // // // // // //               // source={example.getJson()}
// // // // // // // //               source={require("../../images/heart.json")}
// // // // // // // //               progress={progress}
// // // // // // // //               loop={loop}
// // // // // // // //               enableMergePathsAndroidForKitKatAndAbove
// // // // // // // //             />
// // // // // // // //         </TouchableOpacity>

// // // // // // // //         </View>
// // // // // // // //     );
// // // // // // // //   }
// // // // // // // // }

// // // // // // // // const PLAY_BUTTON_SIZE = 60;
// // // // // // // // const styles = StyleSheet.create({
// // // // // // // //   controlsRow: {
// // // // // // // //     flexDirection: 'row',
// // // // // // // //     justifyContent: 'space-around',
// // // // // // // //     alignItems: 'center',
// // // // // // // //   },
// // // // // // // //   playButton: {
// // // // // // // //     width: 100,
// // // // // // // //     // width: PLAY_BUTTON_SIZE,
// // // // // // // //     height: 100,
// // // // // // // //     flex: 1,
// // // // // // // //     // height: PLAY_BUTTON_SIZE,
// // // // // // // //     // borderRadius: PLAY_BUTTON_SIZE / 2,
// // // // // // // //     // backgroundColor: '#1d8bf1',
// // // // // // // //     justifyContent: 'center',
// // // // // // // //     alignItems: 'center',
// // // // // // // //   },
// // // // // // // //   playButtonIcon: {
// // // // // // // //     width: 40,
// // // // // // // //     height: 40,
// // // // // // // //   },
// // // // // // // //   controlsIcon: {
// // // // // // // //     width: 24,
// // // // // // // //     height: 24,
// // // // // // // //     padding: 8,
// // // // // // // //   },
// // // // // // // //   controlsIconEnabled: {
// // // // // // // //     tintColor: '#1d8bf1',
// // // // // // // //   },
// // // // // // // //   controlsIconDisabled: {
// // // // // // // //     tintColor: '#aaa',
// // // // // // // //   },
// // // // // // // //   lottieView: {
// // // // // // // //     flex: 1,
// // // // // // // //   },
// // // // // // // //   lottieViewInvse: {
// // // // // // // //     backgroundColor: 'black',
// // // // // // // //   },
// // // // // // // // });

// // // // // // import React from "react";
// // // // // // import {
// // // // // //   StyleSheet,
// // // // // //   View,
// // // // // //   ActivityIndicator,
// // // // // //   FlatList,
// // // // // //   Text,
// // // // // //   TouchableOpacity,
// // // // // //   Image
// // // // // // } from "react-native";
// // // // // // import { Icon } from "react-native-elements";

// // // // // // // import { enText } from "../lang/en";
// // // // // // export default class Store extends React.Component {
// // // // // //   constructor(props) {
// // // // // //     super(props);
// // // // // //     this.state = {
// // // // // //       loading: false,
// // // // // //       dataSource: []
// // // // // //     };
// // // // // //   }
// // // // // //   componentDidMount() {
// // // // // //     this.fetchData();
// // // // // //   }
// // // // // //   fetchData = () => {
// // // // // //     this.setState({ loading: true });
// // // // // //     fetch("https://jsonplaceholder.typicode.com/photos")
// // // // // //       .then(response => response.json())
// // // // // //       .then(responseJson => {
// // // // // //         responseJson = responseJson.map(item => {
// // // // // //           item.isSelect = false;
// // // // // //           item.selectedClass = styles.list;
// // // // // //           return item;
// // // // // //         });
// // // // // //         this.setState({
// // // // // //           loading: false,
// // // // // //           dataSource: responseJson
// // // // // //         });
// // // // // //       })
// // // // // //       .catch(error => {
// // // // // //         this.setState({ loading: false });
// // // // // //       });
// // // // // //   };
// // // // // //   FlatListItemSeparator = () => <View style={styles.line} />;

// // // // // //   selectItem = data => {
// // // // // //     data.item.isSelect = !data.item.isSelect;
// // // // // //     data.item.selectedClass = data.item.isSelect
// // // // // //       ? styles.selected
// // // // // //       : styles.list;
// // // // // //     const index = this.state.dataSource.findIndex(
// // // // // //       item => data.item.id === item.id
// // // // // //     );
// // // // // //     this.state.dataSource[index] = data.item;
// // // // // //     this.setState({
// // // // // //       dataSource: this.state.dataSource
// // // // // //     });
// // // // // //   };
// // // // // //   goToStore = () =>
// // // // // //     this.props.navigation.navigate("Expenses", {
// // // // // //       selected: this.state.selected
// // // // // //     });
// // // // // //   renderItem = data => (
// // // // // //     <TouchableOpacity
// // // // // //       style={[styles.list, data.item.selectedClass]}
// // // // // //       onPress={() => this.selectItem(data)}
// // // // // //     >
// // // // // //       <Image
// // // // // //         source={{ uri: data.item.thumbnailUrl }}
// // // // // //         style={{ width: 40, height: 40, margin: 6 }}
// // // // // //       />
// // // // // //       <Text style={styles.lightText}>
// // // // // //         {" "}
// // // // // //         {data.item.title.charAt(0).toUpperCase() +
// // // // // //           data.item.title.slice(1)}{" "}
// // // // // //       </Text>
// // // // // //     </TouchableOpacity>
// // // // // //   );
// // // // // //   render() {
// // // // // //     const itemNumber = this.state.dataSource.filter(item => item.isSelect)
// // // // // //       .length;
// // // // // //     if (this.state.loading) {
// // // // // //       return (
// // // // // //         <View style={styles.loader}>
// // // // // //           <ActivityIndicator size="large" color="purple" />
// // // // // //         </View>
// // // // // //       );
// // // // // //     }
// // // // // //     return (
// // // // // //       <View style={styles.container}>
// // // // // //         <Text style={styles.title}></Text>
// // // // // //         <FlatList
// // // // // //           data={this.state.dataSource}
// // // // // //           ItemSeparatorComponent={this.FlatListItemSeparator}
// // // // // //           renderItem={item => this.renderItem(item)}
// // // // // //           keyExtractor={item => item.id.toString()}
// // // // // //           extraData={this.state}
// // // // // //         />
// // // // // //         <View style={styles.numberBox}>
// // // // // //           <Text style={styles.number}>{itemNumber}</Text>
// // // // // //         </View>
// // // // // //         <TouchableOpacity style={styles.icon}>
// // // // // //           <View>
// // // // // //             <Icon
// // // // // //               raised
// // // // // //               name="shopping-cart"
// // // // // //               type="font-awesome"
// // // // // //               color="#e3e3e3"
// // // // // //               size={30}
// // // // // //               onPress={() => this.goToStore()}
// // // // // //               containerStyle={{ backgroundColor: "#FA7B5F" }}
// // // // // //             />
// // // // // //           </View>
// // // // // //         </TouchableOpacity>
// // // // // //       </View>
// // // // // //     );
// // // // // //   }
// // // // // // }
// // // // // // const styles = StyleSheet.create({
// // // // // //   container: {
// // // // // //     flex: 1,
// // // // // //     backgroundColor: "#192338",
// // // // // //     paddingVertical: 50,
// // // // // //     position: "relative"
// // // // // //   },
// // // // // //   title: {
// // // // // //     fontSize: 20,
// // // // // //     color: "#fff",
// // // // // //     textAlign: "center",
// // // // // //     marginBottom: 10
// // // // // //   },
// // // // // //   loader: {
// // // // // //     flex: 1,
// // // // // //     justifyContent: "center",
// // // // // //     alignItems: "center",
// // // // // //     backgroundColor: "#fff"
// // // // // //   },
// // // // // //   list: {
// // // // // //     paddingVertical: 5,
// // // // // //     margin: 3,
// // // // // //     flexDirection: "row",
// // // // // //     backgroundColor: "#192338",
// // // // // //     justifyContent: "flex-start",
// // // // // //     alignItems: "center",
// // // // // //     zIndex: -1
// // // // // //   },
// // // // // //   lightText: {
// // // // // //     color: "#f7f7f7",
// // // // // //     width: 200,
// // // // // //     paddingLeft: 15,
// // // // // //     fontSize: 12
// // // // // //   },
// // // // // //   line: {
// // // // // //     height: 0.5,
// // // // // //     width: "100%",
// // // // // //     backgroundColor: "rgba(255,255,255,0.5)"
// // // // // //   },
// // // // // //   icon: {
// // // // // //     position: "absolute",
// // // // // //     bottom: 20,
// // // // // //     width: "100%",
// // // // // //     left: 290,
// // // // // //     zIndex: 1
// // // // // //   },
// // // // // //   numberBox: {
// // // // // //     position: "absolute",
// // // // // //     bottom: 75,
// // // // // //     width: 30,
// // // // // //     height: 30,
// // // // // //     borderRadius: 15,
// // // // // //     left: 330,
// // // // // //     zIndex: 3,
// // // // // //     backgroundColor: "#e3e3e3",
// // // // // //     justifyContent: "center",
// // // // // //     alignItems: "center"
// // // // // //   },
// // // // // //   number: { fontSize: 14, color: "#000" },
// // // // // //   selected: { backgroundColor: "#FA7B5F" }
// // // // // // });

// // // // import React, { useEffect } from 'react';
// // // // import AppContainer from './app/navigations'
// // // // // import Notification from './Notification'
// // // // import UserContextProvider from './app/context/UserContext';
// // // // import notifee from '@notifee/react-native';

// // // // // import Firebase, { FirebaseProvider } from './config/Firebase'
// // // // import auth from '@react-native-firebase/auth';
// // // // import messaging from '@react-native-firebase/messaging';
// // // // import firestore from "@react-native-firebase/firestore";
// // // // import { AsyncStorage } from 'react-native'; // had been removed replace with community async Storage
// // // // // import AsyncStorage from '@react-native-community/async-storage';

// // // // export default function App() {

// // // //     // const unsubscribe = messaging().onMessage(async (remoteMessage) => {
// // // //     //   console.log('FCM Message Data:', remoteMessage.data);

// // // //     //    // Update a users messages list using AsyncStorage
// // // //     //    const currentMessages = await AsyncStorage.getItem('messages');
// // // //     //    const messageArray = JSON.parse(currentMessages);
// // // //     //    messageArray.push(remoteMessage.data);
// // // //     //    await AsyncStorage.setItem('messages', JSON.stringify(messageArray));

// // // //     //    if(message.data.notifee){
// // // //     //     notifee.displayNotification(JSON.parse(message.data.notifee));
// // // //     //    }else{
// // // //     //      // construct it yourself
// // // //     //     onMessageReceived(message)
// // // //     //    }
// // // //     // });

// // // //     // const unsubscribeToken = messaging().onTokenRefresh(async (fcmToken) => {
// // // //     //   console.log('New FCM Token:', fcmToken);

// // // //     //   // Append the database with the users new FCM token (e.g. with Firestore)
// // // //     //   const uid = auth().currentUser.uid;
// // // //     //   await firestore().doc(`users/${uid}`)
// // // //     //     .update({
// // // //     //       fcmTokens: firestore.FieldValues.arrayUnion(fcmToken),
// // // //     //     });
// // // //     // });

// // // //     // function onMessageReceived(message) {
// // // //     //   console.log('message not ready shipped for testing')
// // // //     //   // const { type, timestamp } = message.data;
// // // //     //   notifee.displayNotification({
// // // //     //     title: 'Your order has been shipped',
// // // //     //     // body: `Your order was shipped at ${new Date(Number(timestamp)).toString()}!`,
// // // //     //     android: {
// // // //     //       channelId: 'default',
// // // //     //     },
// // // //     //   });

// // // //     //   // if (type === 'order_shipped') {
// // // //     //   //   notifee.displayNotification({
// // // //     //   //     title: 'Your order has been shipped',
// // // //     //   //     // body: `Your order was shipped at ${new Date(Number(timestamp)).toString()}!`,
// // // //     //   //     android: {
// // // //     //   //       channelId: 'default',
// // // //     //   //     },
// // // //     //   //   });
// // // //     //   // }
// // // //     // }

// // // //     // function BackgroundMessageHandler(){
// // // //     //   console.log('its running')
// // // //     //   messaging().setBackgroundMessageHandler(async (remoteMessage) => {
// // // //     //     // Update a users messages list using AsyncStorage
// // // //     //     console.log('FCM Message Data:', remoteMessage.data);

// // // //     //     const currentMessages = await AsyncStorage.getItem('messages');
// // // //     //     const messageArray = JSON.parse(currentMessages);
// // // //     //     messageArray.push(remoteMessage.data);
// // // //     //     await AsyncStorage.setItem('messages', JSON.stringify(messageArray));
// // // //     //  });

// // // //     // }

// // // //     // useEffect(() => {
// // // //     //   const unsubscribe = messaging().onMessage(async (remoteMessage) => {
// // // //     //     console.log('FCM Message Data:', remoteMessage.data);

// // // //     //      // Update a users messages list using AsyncStorage
// // // //     //     //  const currentMessages = await AsyncStorage.getItem('messages');
// // // //     //     //  const messageArray = JSON.parse(currentMessages);
// // // //     //     //  messageArray.push(remoteMessage.data);
// // // //     //     //  await AsyncStorage.setItem('messages', JSON.stringify(messageArray));

// // // //     //      if(remoteMessage.data.notifee){
// // // //     //       notifee.displayNotification(JSON.parse(remoteMessage.data.notifee));
// // // //     //      }else{
// // // //     //        // construct it yourself
// // // //     //       onMessageReceived(remoteMessage)
// // // //     //      }
// // // //     //   });

// // // //     //   return () => { unsubscribe(), BackgroundMessageHandler()} ;
// // // //     // }, []);

// // // //     //  unsubscribe();
// // // //     //  unsubscribeToken();

// // // //     return (
// // // //       // <FirebaseProvider value={Firebase}>
// // // //       <UserContextProvider>
// // // //         <AppContainer />
// // // //         {/* <Notification /> */}
// // // //       </UserContextProvider>
// // // //       // </FirebaseProvider>
// // // //     )

// // // // }

// // // // // import React from 'react';
// // // // // import { View, Button } from 'react-native';
// // // // // import notifee, {AndroidBadgeIconType, AndroidImportance, AndroidColor, AndroidStyle} from '@notifee/react-native';

// // // // // export default function Screen() {
// // // // //   async function onDisplayNotification() {
// // // // //     // Create a channel
// // // // //     const channelId = await notifee.createChannel({
// // // // //       id: 'default',
// // // // //       name: 'Default Channel',
// // // // //       // importance: AndroidImportance.HIGH,
// // // // //     });

// // // // //     const badge = await notifee.createChannel({
// // // // //       id: 'messages',
// // // // //       name: 'Private Messages',
// // // // //       badge: true, // disable in badges
// // // // //     });

// // // // //     // Display a notification
// // // // //     // await notifee.displayNotification({
// // // // //     //   title: 'Notification Title',
// // // // //     //   body: 'Main body content of the notification',
// // // // //     //   android: {
// // // // //     //     channelId,
// // // // //     //   },
// // // // //     // });

// // // // //     // await notifee.displayNotification({
// // // // //     //   title: '<p style="color: #4caf50;"><b>Styled HTMLTitle</span></p></b></p> &#128576;',
// // // // //     //   subtitle: '&#129395;',
// // // // //     //   body:
// // // // //     //     'The <p style="text-decoration: line-through">body can</p> also be <p style="color: #ffffff; background-color: #9c27b0"><i>styled too</i></p> &#127881;!',
// // // // //     //   android: {
// // // // //     //     channelId,
// // // // //     //     color: '#4caf50',
// // // // //     //     actions: [
// // // // //     //       {
// // // // //     //         title: '<b>Dance</b> &#128111;',
// // // // //     //         pressAction: { id: 'dance' },
// // // // //     //       },
// // // // //     //       {
// // // // //     //         title: '<p style="color: #f44336;"><b>Cry</b> &#128557;</p>',
// // // // //     //         pressAction: { id: 'cry' },
// // // // //     //       },
// // // // //     //     ],
// // // // //     //   },
// // // // //     // });

// // // // //     // await notifee.displayNotification({
// // // // //     //   title: 'Chat with Joe Bloggs',
// // // // //     //   body: 'A new message has been received from a user.',
// // // // //     //   android: {
// // // // //     //     channelId,
// // // // //     //     // Remote image
// // // // //     //     // largeIcon: 'https://my-cdn.com/users/123456.png',

// // // // //     //     // Local image
// // // // //     //     largeIcon: require('./images/nona1.png'),

// // // // //     //     // Android resource (mipmap or drawable)
// // // // //     //     // largeIcon: 'large_icon',
// // // // //     //   },
// // // // //     // });

// // // // //     await notifee.displayNotification({
// // // // //       title: 'Chat with Joe Bloggs',
// // // // //       body: 'Notification using small icon in badged mode',
// // // // //       android: {
// // // // //         channelId, // channel with badges enabled
// // // // //         // largeIcon: 'https://my-cdn.com/users/123456.png',
// // // // //         // badgeIconType: AndroidBadgeIconType.SMALL,
// // // // //         importance: AndroidImportance.HIGH,
// // // // //         color: AndroidColor.RED,
// // // // //         // or
// // // // //         // color: '#E8210C', // red
// // // // //       },
// // // // //       // title: 'Message from Sarah Lane',
// // // // //       // body: 'Tap to view your unread message from Sarah.',
// // // // //       // subtitle: 'Messages',
// // // // //       // android: {
// // // // //       //   channelId,
// // // // //       //   largeIcon: 'https://my-cdn/users/123.png',
// // // // //       //   timestamp: Date.now() - 480000, // 8 minutes ago
// // // // //       //   showTimestamp: true,
// // // // //       // },
// // // // //     });

// // // // //     // await notifee.displayNotification({
// // // // //     //   title: 'Messages list',
// // // // //     //   android: {
// // // // //     //     channelId,
// // // // //     //     style: {
// // // // //     //       type: AndroidStyle.INBOX,
// // // // //     //       lines: ['First Message', 'Second Message', 'Third Message', 'Forth Message'],
// // // // //     //     },
// // // // //     //   },
// // // // //     // });

// // // // //   }

// // // // //   return (
// // // // //     <View>
// // // // //       <Button
// // // // //         title="Display Notification"
// // // // //         onPress={() => onDisplayNotification()}
// // // // //       />
// // // // //     </View>
// // // // //   );
// // // // // }

// // // // // // short link
// // // // // // const link = await firebase.dynamicLinks().buildShortLink(
// // // // // //   {
// // // // // //     link: 'https://invertase.io',
// // // // // //     domainUriPrefix: 'https://xyz.page.link',
// // // // // //     analytics: {
// // // // // //       campaign: 'banner',
// // // // // //     }
// // // // // //   },
// // // // // //   firebase.dynamicLinks.ShortLinkType.UNGUESSABLE,
// // // // // //  );

// // // // // import React, {useState} from 'react';
// // // // // import {
// // // // //   Alert,
// // // // //   Button,
// // // // //   Platform,
// // // // //   TextInput,
// // // // //   StyleSheet,
// // // // //   Text,
// // // // //   View,
// // // // //   // Share
// // // // // } from 'react-native';

// // // // // import { firebase } from '@react-native-firebase/dynamic-links';

// // // // // import Share from 'react-native-share';

// // // // // import images from './imagesBase64';

// // // // // const App = () => {
// // // // //   const [packageSearch, setPackageSearch] = useState('');
// // // // //   const [result, setResult] = useState('');

// // // // //   const checkIfPackageIsInstalled = async () => {
// // // // //     const {isInstalled} = await Share.isPackageInstalled(packageSearch);

// // // // //     Alert.alert(
// // // // //       `Package: ${packageSearch}`,
// // // // //       `${isInstalled ? 'Installed' : 'Not Installed'}`,
// // // // //     );
// // // // //   };

// // // // //   function getErrorString(error, defaultValue) {
// // // // //     let e = defaultValue || 'Something went wrong. Please try again';
// // // // //     if (typeof error === 'string') {
// // // // //       e = error;
// // // // //     } else if (error && error.message) {
// // // // //       e = error.message;
// // // // //     } else if (error && error.props) {
// // // // //       e = error.props;
// // // // //     }
// // // // //     return e;
// // // // //   }

// // // // //   const shareMultipleImages = async () => {
// // // // //     const shareOptions = {
// // // // //       title: 'Share file',
// // // // //       failOnCancel: false,
// // // // //       urls: [images.image1, images.image2],
// // // // //     };

// // // // //     try {
// // // // //       const ShareResponse = await Share.open(shareOptions);
// // // // //       setResult(JSON.stringify(ShareResponse, null, 2));
// // // // //     } catch (error) {
// // // // //       console.log('Error =>', error);
// // // // //       setResult('error: '.concat(getErrorString(error)));
// // // // //     }
// // // // //   };

// // // // //   const shareEmailImage = async () => {
// // // // //     const shareOptions = {
// // // // //       title: 'Share file',
// // // // //       email: 'email@example.com',
// // // // //       social: Share.Social.EMAIL,
// // // // //       failOnCancel: false,
// // // // //       urls: [images.image1, images.image2],
// // // // //     };

// // // // //     try {
// // // // //       const ShareResponse = await Share.open(shareOptions);
// // // // //       setResult(JSON.stringify(ShareResponse, null, 2));
// // // // //     } catch (error) {
// // // // //       console.log('Error =>', error);
// // // // //       setResult('error: '.concat(getErrorString(error)));
// // // // //     }
// // // // //   };

// // // // //   const shareSingleImage = async () => {

// // // // //     const sharedUrl = await firebase.dynamicLinks().buildShortLink({
// // // // //       link: 'https://www.example.com/?curPage=1', //use any Domanin name or ur domain name ? curPage=1 leads to homepage
// // // // //       domainUriPrefix: 'https://kanta.page.link',
// // // // //       analytics: {
// // // // //         campaign: 'offer',
// // // // //       },
// // // // //       social: {
// // // // //         title: 'Social Application',
// // // // //         descriptionText: 'A Social Application',
// // // // //         imageUrl: 'https://storage.cloud.google.com/kanta-ddb2c.appspot.com/photos/9Cg4qvaHKvaWNolba8F9XrU3Wxx1/1579603334678.png',
// // // // //       },
// // // // //       android: {
// // // // //         packageName: 'com.kanta',
// // // // //       },
// // // // //     },
// // // // //     firebase.dynamicLinks.ShortLinkType);

// // // // //     console.log('built link with dynamic Link', sharedUrl)

// // // // //     const shareOptions = {
// // // // //       // title: 'Share Contents',
// // // // //       failOnCancel: false,
// // // // //       url: sharedUrl,
// // // // //     };

// // // // //     console.log('shareOptions   : =>',shareOptions)
// // // // //     try {
// // // // //       const ShareResponse = await Share.open(shareOptions);
// // // // //       console.log('ShareResponse   : =>',ShareResponse);

// // // // //       setResult(JSON.stringify(ShareResponse, null, 2));
// // // // //     } catch (error) {
// // // // //       console.log('Error =>', error);
// // // // //       setResult('error: '.concat(getErrorString(error)));
// // // // //     }
// // // // //   };

// // // // //   const shareToFiles = async () => {
// // // // //     const shareOptions = {
// // // // //       title: 'Share file',
// // // // //       failOnCancel: false,
// // // // //       saveToFiles: true,
// // // // //       urls: [images.image1, images.pdf1], // base64 with mimeType or path to local file
// // // // //     };

// // // // //     // If you want, you can use a try catch, to parse
// // // // //     // the share response. If the user cancels, etc.
// // // // //     try {
// // // // //       const ShareResponse = await Share.open(shareOptions);
// // // // //       setResult(JSON.stringify(ShareResponse, null, 2));
// // // // //     } catch (error) {
// // // // //       console.log('Error =>', error);
// // // // //       setResult('error: '.concat(getErrorString(error)));
// // // // //     }
// // // // //   };

// // // // //   const shareToInstagramStory = async () => {
// // // // //     const shareOptions = {
// // // // //       title: 'Share image to instastory',
// // // // //       method: Share.InstagramStories.SHARE_BACKGROUND_IMAGE,
// // // // //       backgroundImage: images.image1,
// // // // //       social: Share.Social.INSTAGRAM_STORIES,
// // // // //     };

// // // // //     try {
// // // // //       const ShareResponse = await Share.shareSingle(shareOptions);
// // // // //       setResult(JSON.stringify(ShareResponse, null, 2));
// // // // //     } catch (error) {
// // // // //       console.log('Error =>', error);
// // // // //       setResult('error: '.concat(getErrorString(error)));
// // // // //     }
// // // // //   };

// // // // //   const onShare = async () => {

// // // // //     try {
// // // // //         const sharedUrl = await firebase.dynamicLinks().buildShortLink({
// // // // //           link: 'https://www.example.com/?curPage=1', // this is the deep link in your App //use any Domanin name or ur domain name ? curPage=1 leads to homepage
// // // // //           domainUriPrefix: 'https://kanta.page.link',
// // // // //           analytics: {
// // // // //             campaign: 'example',
// // // // //           },
// // // // //           social: {
// // // // //             title: 'Social Application',
// // // // //             descriptionText: 'A Social Application',
// // // // //             image: 'https://raw.githubusercontent.com/cdimascio/react-native-share-sheet/master/assets/share-sheet.jpg',
// // // // //           },
// // // // //           android: {
// // // // //             packageName: 'com.kanta',
// // // // //           },
// // // // //         },
// // // // //         firebase.dynamicLinks.ShortLinkType);

// // // // //         console.log(sharedUrl)

// // // // //         const result = await Share.share({
// // // // //             url: sharedUrl,
// // // // //             message: 'Hey found this new great app for ordering ... You should try it as well.',
// // // // //         });

// // // // //         if (result.action === Share.sharedAction) {
// // // // //             if (result.activityType) {
// // // // //                 // shared with activity type of result.activityType
// // // // //             } else {
// // // // //                 // shared
// // // // //             }
// // // // //         } else if (result.action === Share.dismissedAction) {
// // // // //             // dismissed
// // // // //         }
// // // // //     } catch (error) {
// // // // //         Alert.alert('Opps', error.message);
// // // // //     }
// // // // // };

// // // // // onPressTermsCondition = () => {
// // // // //     this.props.navigation.navigate('TermsAndConditions');
// // // // // };

// // // // //   return (
// // // // //     <View style={styles.container}>
// // // // //       <Text style={styles.welcome}>Welcome to React Native Share Example!</Text>
// // // // //       <View style={styles.optionsRow}>
// // // // //         <View style={styles.button}>
// // // // //           <Button onPress={onShare} title="Share Multiple Images" />
// // // // //         </View>
// // // // //         <View style={styles.button}>
// // // // //           <Button onPress={shareSingleImage} title="Share Single Image" />
// // // // //         </View>
// // // // //         <View style={styles.button}>
// // // // //           <Button onPress={shareEmailImage} title="Share Social: Email" />
// // // // //         </View>
// // // // //         <View style={styles.button}>
// // // // //           <Button onPress={shareToInstagramStory} title="Share to IG Story" />
// // // // //         </View>
// // // // //         {Platform.OS === 'ios' && (
// // // // //           <View style={styles.button}>
// // // // //             <Button onPress={shareToFiles} title="Share To Files" />
// // // // //           </View>
// // // // //         )}
// // // // //         {Platform.OS === 'android' && (
// // // // //           <View style={styles.searchPackageContainer}>
// // // // //             <TextInput
// // // // //               placeholder="Search for a Package"
// // // // //               onChangeText={setPackageSearch}
// // // // //               value={packageSearch}
// // // // //               style={styles.textInput}
// // // // //             />
// // // // //             <View>
// // // // //               <Button
// // // // //                 onPress={checkIfPackageIsInstalled}
// // // // //                 title="Check Package"
// // // // //               />
// // // // //             </View>
// // // // //           </View>
// // // // //         )}
// // // // //         <Text style={styles.resultTitle}>Result</Text>
// // // // //         <Text style={styles.result}>{result}</Text>
// // // // //       </View>
// // // // //     </View>
// // // // //   );
// // // // // };

// // // // // const styles = StyleSheet.create({
// // // // //   button: {
// // // // //     marginBottom: 10,
// // // // //   },
// // // // //   container: {
// // // // //     flex: 1,
// // // // //     justifyContent: 'center',
// // // // //     alignItems: 'center',
// // // // //     backgroundColor: '#F5FCFF',
// // // // //   },
// // // // //   textInput: {
// // // // //     borderBottomColor: '#151313',
// // // // //     borderBottomWidth: 1,
// // // // //     marginRight: 10,
// // // // //   },
// // // // //   welcome: {
// // // // //     fontSize: 20,
// // // // //     textAlign: 'center',
// // // // //     margin: 10,
// // // // //   },
// // // // //   resultTitle: {
// // // // //     marginTop: 20,
// // // // //     fontSize: 20,
// // // // //   },
// // // // //   result: {
// // // // //     fontSize: 14,
// // // // //     margin: 10,
// // // // //   },
// // // // //   optionsRow: {
// // // // //     justifyContent: 'space-between',
// // // // //   },
// // // // //   searchPackageContainer: {
// // // // //     alignItems: 'center',
// // // // //     justifyContent: 'center',
// // // // //     flexDirection: 'row',
// // // // //   },
// // // // // });

// // // // // export default App;
