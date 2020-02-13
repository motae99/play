import React, { Component } from 'react';
import { StackNavigator, createAppContainer } from 'react-navigation';
import { createStackNavigator } from "react-navigation-stack";

import List from './List';
import MapListing from './MapView';
import ListView from './ListView';
import infinit from './infinit';
import Comments from './Comments';
import Details from './Details';
import Availability from './Availability';
import Provider from './Provider';
import ProviderHome from './ProviderHome';


import Main from './Main';
import EventServices from './eventServices/Index';

const Navigator = createStackNavigator({
    Main: { screen: Main },
    Events: { screen: EventServices },
    List: { screen: List },
    Infinit: { screen: infinit },
    MapListing: { screen: MapListing },
    ListView: { screen: ListView },
    Comments: { screen: Comments },
    Availability: { screen: Availability },
    Details: { screen: Details },
    Provider: { screen: Provider },
    ProviderHome: { screen: ProviderHome },
},


  {
    initialRouteName: 'Main',
    // defaultNavigationOptions: {
    //   headerStyle: {
    //     backgroundColor: '#f4511e',
    //   },
    //   headerTintColor: '#fff',
    //   headerTitleStyle: {
    //     fontWeight: 'bold',
    //   },
    // },
    // defaultNavigationOptions: {
    //   gesturesEnabled: true,
    // },
    headerMode: 'none'
  }
);

const AppContainer = createAppContainer(Navigator)

export default class Nav extends Component {
  render() {
    return <AppContainer />;
  }
} 



// // // import React from "react";
// // // import { View, TouchableHighlight, Text, TouchableOpacity} from "react-native";
// // // import LottieView from "lottie-react-native";
// // // import { Animated, Easing } from "react-native";

// // // const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

// // // export default class BasicExample extends React.Component {
// // //   constructor(props) {
// // //     super(props);
// // //     this.state = {
// // //       progress: new Animated.Value(0),
// // //       selected: false
// // //     };
// // //   }

// // //   runAnimation() {
// // //     console.log(this.state.progress)
// // //     //this.animation.play();
// // //     // Or set a specific startFrame and endFrame with:
// // //     // this.setState{!this.state.selected}
// // //     // if(!this.state.selected){
// // //       if(this.state.progress === 0){
// // //         Animated.timing(this.state.progress, {
// // //           toValue: 1,
// // //           duration: 1200,
// // //           easing: Easing.linear
// // //         }).start();

// // //         // this.setState({progress: new Animated.Value(1)})
// // //       }
      
// // //       // else{
        
// // //       //   Animated.timing(this.state.progress, {
// // //       //     toValue: 0,
// // //       //     duration: 1200,
// // //       //     easing: Easing.linear
// // //       //   }).start();
// // //       //   this.setState({progress: new Animated.Value(0)})

// // //       // }
      
// // //     // }
// // //     // else{
// // //     //   Animated.timing(this.state.progress, {
// // //     //     toValue: 1,
// // //     //     duration: 3000,
// // //     //     easing: Easing.linear
// // //     //   }).start();
// // //     // }
    

// // //     //this.setState({progress: new Animated.Value(0)});
// // //   }

// // //   render() {
// // //     return (
// // //       <View style={{flex:1, backgroundColor: '#f1f1f1'}}>
// // //       <View style={{ flex: 3, flexDirection: "row" }}>      
// // //         <View style={{ flex: 2 }}>
// // //           <AnimatedTouchable 
// // //             onPress={() => this.runAnimation()}
// // //             style={{ flex: 1 }}
// // //             >
// // //               <View style={{ flex: 1 }}>
// // //                 <LottieView
// // //                   resizeMode={'cover'}
// // //                   // key={2}
// // //                   source={require("../../images/heart.json")}
// // //                   progress={this.state.progress}
// // //                   loop
// // //                   // autoPlay
// // //                 />
// // //               </View>
               
// // //           </AnimatedTouchable>
                 
// // //         </View>
// // //         <View style={{ flex: 2 }}>
// // //           <LottieView
// // //             source={require("../../images/loading.json")}
// // //             autoPlay
// // //             loop
// // //           />
// // //         </View>    
      
// // //       </View>
// // //       {/* <View style={{flex: 2}}>
// // //       <View style={{ alignItems:'center' }}>
// // //           <TouchableHighlight 
// // //           onPress={() => this.runAnimation()}
// // //           style={{backgroundColor: "#181888", padding: 10, borderRadius: 3  }}
// // //           >
// // //             <Text style={{color: '#ffffff', fontSize: 20}}>Me gusta</Text>
// // //           </TouchableHighlight>
// // //         </View>


// // //       </View> */}

// // //        <View style={{flex: 2, alignItems: 'center'}}>
// // //        <Text style={{color: '#f22323'}}>@yoandypv</Text>
// // //        </View>
// // //       </View>
// // //     );
// // //   }
// // // }


// // /* eslint-disable global-require */
// // // import React from 'react';
// // // import {
// // //   View,
// // //   Animated,
// // //   Easing,
// // //   StyleSheet,
// // //   Slider,
// // //   Switch,
// // //   Image,
// // //   Text,
// // //   TouchableOpacity,
// // // } from 'react-native';
// // // import LottieView from 'lottie-react-native';
// // // import ExamplePicker from './ExamplePicker';

// // // const AnimatedSlider = Animated.createAnimatedComponent(Slider);

// // // const playIcon = require('./images/play.png');
// // // const pauseIcon = require('./images/pause.png');
// // // const loopIcon = require('./images/loop.png');
// // // const inverseIcon = require('./images/inverse.png');

// // // const makeExample = (name, getJson, width) => ({ name, getJson, width });
// // // const EXAMPLES = [
// // //   makeExample('Hamburger Arrow', () => require('./animations/HamburgerArrow.json')),
// // //   makeExample('Hamburger Arrow (200 px)', () => require('./animations/HamburgerArrow.json'), 200),
// // //   makeExample('Line Animation', () => require('./animations/LineAnimation.json')),
// // //   makeExample('Lottie Logo 1', () => require('./animations/LottieLogo1.json')),
// // //   makeExample('Lottie Logo 2', () => require('./animations/LottieLogo2.json')),
// // //   makeExample('Lottie Walkthrough', () => require('./animations/LottieWalkthrough.json')),
// // //   makeExample('Pin Jump', () => require('./animations/PinJump.json')),
// // //   makeExample('Twitter Heart', () => require('./animations/TwitterHeart.json')),
// // //   makeExample('Watermelon', () => require('./animations/Watermelon.json')),
// // //   makeExample('Motion Corpse', () => require('./animations/MotionCorpse-Jrcanest.json')),
// // // ];

// // // export default class LottieAnimatedExample extends React.Component {
// // //   state = {
// // //     example: EXAMPLES[0],
// // //     duration: 3000,
// // //     isPlaying: true,
// // //     isInverse: false,
// // //     loop: false,
// // //   };

// // //   manageAnimation = shouldPlay => {
// // //     if (!this.state.progress) {
// // //       if (shouldPlay) {
// // //         this.anim.play();
// // //       } else {
// // //         this.anim.reset();
// // //       }
// // //     } else {
// // //       this.state.progress.setValue(0);

// // //       if (shouldPlay) {
// // //         Animated.timing(this.state.progress, {
// // //           toValue: 1,
// // //           duration: this.state.duration,
// // //           easing: Easing.linear,
// // //           useNativeDriver: true,
// // //         }).start(() => {
// // //           this.setState({ isPlaying: false });
// // //         });
// // //       }
// // //     }

// // //     this.setState({ isPlaying: shouldPlay });
// // //   };

// // //   onPlayPress = () => this.manageAnimation(!this.state.isPlaying);
// // //   stopAnimation = () => this.manageAnimation(false);

// // //   onInversePress = () => this.setState(state => ({ isInverse: !state.isInverse }));
// // //   onProgressChange = progress => this.state.progress.setValue(progress);
// // //   onDurationChange = duration => this.setState({ duration });

// // //   setAnim = anim => {
// // //     this.anim = anim;
// // //   };

// // //   render() {
// // //     const { duration, isPlaying, isInverse, progress, loop, example } = this.state;
// // //     return (
      
// // //         <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
// // //         <TouchableOpacity style={styles.playButton} onPress={this.onPlayPress}>
// // //           <LottieView
// // //               ref={this.setAnim}
// // //               autoPlay={!progress}
// // //               // style={[example.width && { width: example.width }, isInverse && styles.lottieViewInvse]}
// // //               style={{flex: 1, width: '100%', height: '100%',  alignItems: 'center', justifyContent: 'center', isInverse: styles.lottieViewInvse }}
// // //               // source={example.getJson()}
// // //               source={require("../../images/heart.json")}
// // //               progress={progress}
// // //               loop={loop}
// // //               enableMergePathsAndroidForKitKatAndAbove
// // //             />
// // //         </TouchableOpacity>
          
// // //         </View>
// // //     );
// // //   }
// // // }

// // // const PLAY_BUTTON_SIZE = 60;
// // // const styles = StyleSheet.create({
// // //   controlsRow: {
// // //     flexDirection: 'row',
// // //     justifyContent: 'space-around',
// // //     alignItems: 'center',
// // //   },
// // //   playButton: {
// // //     width: 100,
// // //     // width: PLAY_BUTTON_SIZE,
// // //     height: 100,
// // //     flex: 1,
// // //     // height: PLAY_BUTTON_SIZE,
// // //     // borderRadius: PLAY_BUTTON_SIZE / 2,
// // //     // backgroundColor: '#1d8bf1',
// // //     justifyContent: 'center',
// // //     alignItems: 'center',
// // //   },
// // //   playButtonIcon: {
// // //     width: 40,
// // //     height: 40,
// // //   },
// // //   controlsIcon: {
// // //     width: 24,
// // //     height: 24,
// // //     padding: 8,
// // //   },
// // //   controlsIconEnabled: {
// // //     tintColor: '#1d8bf1',
// // //   },
// // //   controlsIconDisabled: {
// // //     tintColor: '#aaa',
// // //   },
// // //   lottieView: {
// // //     flex: 1,
// // //   },
// // //   lottieViewInvse: {
// // //     backgroundColor: 'black',
// // //   },
// // // });




// import React from "react";
// import {
//   StyleSheet,
//   View,
//   ActivityIndicator,
//   FlatList,
//   Text,
//   TouchableOpacity,
//   Image
// } from "react-native";
// import { Icon } from "react-native-elements";

// // import { enText } from "../lang/en";
// export default class Store extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       loading: false,
//       dataSource: []
//     };
//   }
//   componentDidMount() {
//     this.fetchData();
//   }
//   fetchData = () => {
//     this.setState({ loading: true });
//     fetch("https://jsonplaceholder.typicode.com/photos")
//       .then(response => response.json())
//       .then(responseJson => {
//         responseJson = responseJson.map(item => {
//           item.isSelect = false;
//           item.selectedClass = styles.list;
//           return item;
//         });
//         this.setState({
//           loading: false,
//           dataSource: responseJson
//         });
//       })
//       .catch(error => {
//         this.setState({ loading: false });
//       });
//   };
//   FlatListItemSeparator = () => <View style={styles.line} />;

//   selectItem = data => {
//     data.item.isSelect = !data.item.isSelect;
//     data.item.selectedClass = data.item.isSelect
//       ? styles.selected
//       : styles.list;
//     const index = this.state.dataSource.findIndex(
//       item => data.item.id === item.id
//     );
//     this.state.dataSource[index] = data.item;
//     this.setState({
//       dataSource: this.state.dataSource
//     });
//   };
//   goToStore = () =>
//     this.props.navigation.navigate("Expenses", {
//       selected: this.state.selected
//     });
//   renderItem = data => (
//     <TouchableOpacity
//       style={[styles.list, data.item.selectedClass]}
//       onPress={() => this.selectItem(data)}
//     >
//       <Image
//         source={{ uri: data.item.thumbnailUrl }}
//         style={{ width: 40, height: 40, margin: 6 }}
//       />
//       <Text style={styles.lightText}>
//         {" "}
//         {data.item.title.charAt(0).toUpperCase() +
//           data.item.title.slice(1)}{" "}
//       </Text>
//     </TouchableOpacity>
//   );
//   render() {
//     const itemNumber = this.state.dataSource.filter(item => item.isSelect)
//       .length;
//     if (this.state.loading) {
//       return (
//         <View style={styles.loader}>
//           <ActivityIndicator size="large" color="purple" />
//         </View>
//       );
//     }
//     return (
//       <View style={styles.container}>
//         <Text style={styles.title}></Text>
//         <FlatList
//           data={this.state.dataSource}
//           ItemSeparatorComponent={this.FlatListItemSeparator}
//           renderItem={item => this.renderItem(item)}
//           keyExtractor={item => item.id.toString()}
//           extraData={this.state}
//         />
//         <View style={styles.numberBox}>
//           <Text style={styles.number}>{itemNumber}</Text>
//         </View>
//         <TouchableOpacity style={styles.icon}>
//           <View>
//             <Icon
//               raised
//               name="shopping-cart"
//               type="font-awesome"
//               color="#e3e3e3"
//               size={30}
//               onPress={() => this.goToStore()}
//               containerStyle={{ backgroundColor: "#FA7B5F" }}
//             />
//           </View>
//         </TouchableOpacity>
//       </View>
//     );
//   }
// }
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#192338",
//     paddingVertical: 50,
//     position: "relative"
//   },
//   title: {
//     fontSize: 20,
//     color: "#fff",
//     textAlign: "center",
//     marginBottom: 10
//   },
//   loader: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#fff"
//   },
//   list: {
//     paddingVertical: 5,
//     margin: 3,
//     flexDirection: "row",
//     backgroundColor: "#192338",
//     justifyContent: "flex-start",
//     alignItems: "center",
//     zIndex: -1
//   },
//   lightText: {
//     color: "#f7f7f7",
//     width: 200,
//     paddingLeft: 15,
//     fontSize: 12
//   },
//   line: {
//     height: 0.5,
//     width: "100%",
//     backgroundColor: "rgba(255,255,255,0.5)"
//   },
//   icon: {
//     position: "absolute",
//     bottom: 20,
//     width: "100%",
//     left: 290,
//     zIndex: 1
//   },
//   numberBox: {
//     position: "absolute",
//     bottom: 75,
//     width: 30,
//     height: 30,
//     borderRadius: 15,
//     left: 330,
//     zIndex: 3,
//     backgroundColor: "#e3e3e3",
//     justifyContent: "center",
//     alignItems: "center"
//   },
//   number: { fontSize: 14, color: "#000" },
//   selected: { backgroundColor: "#FA7B5F" }
// });
