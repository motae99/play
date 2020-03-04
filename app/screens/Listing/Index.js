import React, { Component } from 'react';
import { StackNavigator, createAppContainer } from 'react-navigation';
import { createStackNavigator } from "react-navigation-stack";

import EventListing from './eventServices/List';
import EventMap from './eventServices/Map';
import EventDetail from './eventServices/Detail';
import EventFilter from './eventServices/Filter';
import EventAvailability from './eventServices/Availability';


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
// import EventServices from './app/screens/Listing/eventServices/Index';

const Navigator = createStackNavigator({
    Main: { screen: Main },
    // Insta: { screen: Insta },
    // Airbnb: { screen: Airbnb },
    // Snapchat: { screen: Snapchat },
    // // Thing: { screen: Thing },
    // PanHandler: { screen: PanHandler },
    // Day: { screen: Day },
    // Uber: { screen: Uber },
    EventListing: { screen: EventListing },
    EventMap: { screen: EventMap, navigationOptions: { tabBarVisible: false } },
    EventDetail: { screen: EventDetail, navigationOptions: { tabBarVisible: false } },
    EventFilter: { screen: EventFilter },
    EventAvailability: { screen: EventAvailability },
    

    List: { screen: List },
    Infinit: { screen: infinit },
    // MapListing: { screen: MapListing },
    ListView: { screen: ListView },
    Comments: { screen: Comments },
    Availability: { screen: Availability },
    Details: { screen: Details },
    Provider: { screen: Provider },
    ProviderHome: { screen: ProviderHome },
},


  {
    initialRouteName: 'ProviderHome',
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


// import React, {Component} from 'react';
// import {
//     View,
//     Text,
//     StyleSheet,
//     Dimensions,
//     FlatList,
//     TouchableOpacity,
//     TouchableWithoutFeedback,
//     ScrollView,
//     TextInput,
//     Image,
//     Button,
//     SafeAreaView,
//     StatusBar
// } from 'react-native';
// import {FluidNavigator, Transition} from 'react-navigation-fluid-transitions';
// import { Header } from 'react-navigation-stack';

// let screenWidth = Dimensions.get('window').width;
// let screenHeight = Dimensions.get('window').height;
// let arrTapBar = [{"key": "Dish types"}, {"key": "Ingredients"}, {"key": "Cooking time"}, {"key": "Low calories"}, {"key": "Popular"}]


// export class HomeScreen extends Component {

//     // static router = Navigator.router;


//     static navigationOptions = {
//         title: 'Home',
//         headerTintColor: '#ffffff',
//         headerStyle: {
//             backgroundColor: '#2F95D6',
//             borderBottomColor: '#ffffff',
//             borderBottomWidth: 3,
//         },
//         headerTitleStyle: {
//             fontSize: 18,
//         },
//     };


//     constructor(props) {
//         super(props);
//         this.state = {
//             selectedTapBarIndex: 0,
//         };


//     }

//     render() {
//         return (
//             <SafeAreaView style={styles.mainContainer}>
//                 <View style={styles.navigationHeaderContainer}>
//                     <Image style={{bottom: 15, position: 'absolute', left: 15,height:20,width:20,}}
//                            source={require('../../../images/nona5.png')}/>
//                     <Text style={{bottom: 15, position: 'absolute', right: 15,color: '#3842B0',}}>+ Create</Text>
//                 </View>


//                 <ScrollView style={styles.mainContainer}>

//                 {/* Top Container ........ */}
//                 <View style={styles.topContainer}>

//                     {/*<View style={styles.navigationHeaderContainer}>*/}
//                         {/*<Image style={{bottom: 15, position: 'absolute', left: 15,height:20,width:20,}}*/}
//                                {/*source={require('../../../images/nona5.png')}/>*/}
//                         {/*<Text style={{bottom: 15, position: 'absolute', right: 15,color: '#3842B0',}}>+ Create</Text>*/}
//                     {/*</View>*/}


//                     {/* User Image ........ */}
//                     <Image style={styles.userImageContainer}
//                            source={require('../../../images/nona1.png')}/>

//                     <Text style={{marginLeft: 15, marginTop: 8, color: '#6471F4'}}>
//                         Hello,{"\n"}Dance Montgomery
//                     </Text>

//                     <Text style={{
//                         marginLeft: 15,
//                         marginRight: 15,
//                         marginTop: 30,
//                         color: '#3842B0',
//                         fontSize: 40,
//                         fontWeight: 'bold'
//                     }}>
//                         What you want to cook today?
//                     </Text>


//                     {/* Search View Container ........ */}
//                     <View style={styles.topSearchContainer}>
//                         <Image style={{
//                             marginLeft: 5,
//                             width: scaleToDimension(40),
//                             backgroundColor: 'transparent',
//                             height: scaleToDimension(40),
//                             resizeMode: 'center'
//                         }}
//                                source={require('../../../images/nona2.png')}/>
//                         <TextInput style={{flex: 1, marginLeft: 5, marginRight: 10, color : "#3842B0"}} placeholder={'Search'} placeholderTextColor='#3842B0' />
//                     </View>


//                 </View>

//                 {/* Bottom Container ........ */}
//                 <View style={styles.bottomContainer}>

//                     {/* Tab bar View........ */}
//                     <View style={styles.bottomTabBarContainer}>
//                         <FlatList
//                             showsHorizontalScrollIndicator={false}
//                             horizontal={true}
//                             data={arrTapBar}
//                             extraData={this.state}
//                             renderItem={({item, index}) => this.renderTapBarItem(item, index)}
//                         />
//                     </View>

//                     {/* Grid View........ */}
//                     <View style={styles.bottomGridContainer}>
//                         <FlatList
//                             showsHorizontalScrollIndicator={false}
//                             onPress
//                             horizontal={true}
//                             data={arrTapBar}
//                             renderItem={({item, index}) => this.renderGridItem(item, index)}
//                         />
//                     </View>


//                 </View>

//             </ScrollView>
//             </SafeAreaView>
//         );
//     }

//     renderTapBarItem(item, index) {

//         return (
//             <TouchableWithoutFeedback
//                 onPress={() => {
//                     this.setState(previousIndex => {
//                         return {selectedTapBarIndex: index};
//                     });
//                 }}>
//                 <View style={{justifyContent: 'center', flex: 1}}>
//                     <Text style={
//                         {
//                             marginLeft: 10,
//                             marginRight: 10,
//                             color: '#6471F4',
//                             fontSize: 15, //this.state.selectedTapBarIndex == index ? 20 : 15,
//                             fontWeight: this.state.selectedTapBarIndex == index ? 'bold' : 'normal',
//                         }}>
//                         {item['key']}
//                     </Text>

//                 </View>
//             </TouchableWithoutFeedback>
//         );
//     }

//     renderGridItem(item, index) {
//         return (
//             <TouchableOpacity
//                 activeOpacity = {1}
//                 onPress={(event) => {
//                     this.props.navigation.navigate('homeDetails', {item: item['key']})
//                 }}>

//                 <Transition shared={item['key']}>
//                     <View style={styles.bottomGridItemContainer}>
//                         <Text style={{
//                             marginLeft: 15,
//                             marginRight: 10,
//                             position: 'absolute',
//                             bottom: 20,
//                             color: 'white',
//                             fontWeight: 'bold',
//                             fontSize: 35,
//                         }}>{item['key']}</Text>
//                     </View>
//                 </Transition>
//             </TouchableOpacity>
//         );
//     }

// }


// class DetailsScreen extends React.Component {

//     render() {
//         const {navigation} = this.props;
//         const item = navigation.getParam('item', '');

//         return (


//             <SafeAreaView style={styles.DetailMainContainer}>
//                 <Transition shared={item}>
//                     <View style={styles.detailTopContainer}>
//                         <View style={styles.navigationHeaderContainer}>

//                             <TouchableOpacity style={{bottom: 15, position: 'absolute', left: 15,height:20,width:20,}}
//                                 onPress={(event) => {
//                                     navigation.goBack()
//                                 }}>

//                             <Image style={{height:20,width:20,}}
//                                    source={require('../../../images/nona3.png')}/>
//                             </TouchableOpacity>

//                             <Image style={{bottom: 15, position: 'absolute', right: 15,height:20,width:20,}}
//                                    source={require('../../../images/nona4.png')}/>

//                         </View>

//                         <View style={styles.detailTopBottomSubContainer}>
//                             <Text style={{
//                                 color: 'white',
//                                 fontWeight: 'bold',
//                                 fontSize: scaleToDimension(35),
//                             }}>{item}</Text>
//                             <Text style={{color: 'white', fontSize: scaleToDimension(15),}}>87 recipes available</Text>
//                         </View>
//                     </View>
//                 </Transition>


//                 <FlatList
//                     showsVerticalScrollIndicator={false}
//                     data={arrTapBar}
//                     renderItem={({item, index}) => this.renderDetailListCell(item, index)}
//                 />


//             </SafeAreaView>
//         );
//     }


//     renderDetailListCell(item, index) {


//         return (
//             <TouchableOpacity
//                 activeOpacity = {1}
//             >
//         <View style={styles.detailListCellContainer}>
//                     <View style={index == arrTapBar.length - 1 ? styles.detailListCellLastIndexContentViewContainer : styles.detailListCellContentViewContainer}>

//                         <View style={styles.detailListCellContentViewBottomContainer}>
//                             <Text style={{
//                                 color: '#2540a9',
//                                 marginLeft: 15,
//                                 marginTop: 15,
//                                 fontSize: 18,
//                                 fontWeight: 'bold'
//                             }}>Turkey Risotto</Text>

//                             <View style={{
//                                 backgroundColor: 'transparent',
//                                 flexDirection: 'row',
//                                 marginLeft: 15,
//                                 marginTop: 12
//                             }}>
//                                 <Text style={{color: '#2540a9', fontSize: 15}}>40 min</Text>
//                                 <Text style={{color: '#2540a9', marginLeft: 20, fontSize: 15}}>450 cal</Text>
//                             </View>
//                         </View>
//                     </View>
//                 </View>
//             </TouchableOpacity>
//         );
//     }

// }


// const Navigator = FluidNavigator({

//         home: {screen: HomeScreen},
//         homeDetails: {screen: DetailsScreen},
// },
// );


// class HomeTransitions extends React.Component {
//     static router = Navigator.router;


//     render() {
//         const {navigation} = this.props;

//         return (
//             <Navigator navigation={navigation}/>
//         );
//     }
// }


// const scaleToDimension = (size) => {
//     return screenWidth * size / 375
// };


// // All Styles related to design...
// const styles = StyleSheet.create({

//     mainContainer: {
//         flex: 1,
//         backgroundColor: 'white'
//     },

//     topContainer: {
//         backgroundColor: 'white'

//     },

//     navigationHeaderContainer: {
//         height: Header.HEIGHT,
//         width: screenWidth,
//         color: "blue",
//         justifyContent: 'center'
//     },


//     userImageContainer: {
//         marginLeft: 15,
//         marginTop: 5,
//         height: screenWidth * 50 / 375,
//         width: screenWidth * 50 / 375,
//         backgroundColor: 'lightgrey',
//         borderRadius: (screenWidth * 50 / 375) / 2,
//     },


//     topSearchContainer: {
//         height: screenWidth * 40 / 375,
//         marginLeft: 15,
//         marginTop: 15,
//         marginBottom: 10,
//         width: screenWidth - 30,
//         backgroundColor: '#D2D7F3',
//         flexDirection: 'row',
//         borderRadius: 3,
//     },

//     bottomContainer: {
//         alignItems: 'center',
//         // height: screenHeight/2,
//         backgroundColor: 'transparent'
//     },


//     bottomTabBarContainer: {
//         height: 50.0,
//         width: screenWidth,
//         backgroundColor: 'transparent',
//         flexDirection: 'column'
//     },

//     bottomGridContainer: {
//         marginLeft: 5,
//         width: screenWidth,
//         height: screenHeight / 2 - 50,
//         backgroundColor: 'transparent',
//         flexDirection: 'column',
//         justifyContent: 'center'
//     },


//     bottomGridItemContainer: {
//         marginLeft: 5,
//         marginRight: 5,
//         marginTop: 10,
//         marginBottom: 10,
//         width: screenWidth * 300 / 375,
//         height: screenHeight / 2 - 70,
//         backgroundColor: '#5677f1',
//         flexDirection: 'column',
//         justifyContent: 'center',
//         borderRadius: 15
//     },


//     detailsHeader: {
//         height: 160,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: '#0000FA',
//     },

//     DetailMainContainer: {
//         flex: 1,
//     },


//     detailTopContainer: {
//         height: scaleToDimension(250),
//         width: screenWidth,
//         backgroundColor: '#5677f1',
//     },

//     detailTopBottomSubContainer: {
//         width: screenWidth - 30,
//         backgroundColor: 'transparent',
//         position: 'absolute',
//         bottom: 15,
//         left: 15,
//         right: 15,
//     },


//     detailListCellContainer: {
//         flex: 0,
//         width: screenWidth,
//         height: screenWidth,
//         backgroundColor: 'transparent',
//         paddingTop: 10,
//         paddingBottom: 10,
//     },


//     detailListCellContentViewContainer: {
//         width: screenWidth - 20,
//         height: screenWidth - 10,
//         backgroundColor: '#5677f1',
//         borderRadius: 10,
//         marginRight: 10,
//         marginLeft: 10,
//     },

//     detailListCellLastIndexContentViewContainer: {
//         width: screenWidth - 20,
//         height: screenWidth - 20,
//         backgroundColor: '#5677f1',
//         borderRadius: 10,
//         marginRight: 10,
//         marginLeft: 10,

//     },


//     detailListCellContentViewBottomContainer: {
//         width: screenWidth - 22,
//         minHeight: scaleToDimension(70),
//         backgroundColor: 'white',
//         position: 'absolute',
//         paddingBottom: 15,
//         bottom: 1,
//         marginLeft: 1,
//         marginRight: 1,
//         borderBottomLeftRadius: 10,
//         borderBottomRightRadius: 10,
//     },

// });


// export default HomeTransitions;

// import React, { Component } from 'react';
// import { StackNavigator, createAppContainer } from 'react-navigation';
// import { createStackNavigator } from "react-navigation-stack";

// import List from './List';
// import MapListing from './MapView';
// import ListView from './ListView';
// import infinit from './infinit';
// import Comments from './Comments';
// import Details from './Details';
// import Availability from './Availability';
// import Provider from './Provider';
// import ProviderHome from './ProviderHome';


// import Main from './Main';
// import EventServices from './eventServices/Index';

// const Navigator = createStackNavigator({
//     Main: { screen: Main },
//     Events: { screen: EventServices },
//     List: { screen: List },
//     Infinit: { screen: infinit },
//     MapListing: { screen: MapListing },
//     ListView: { screen: ListView },
//     Comments: { screen: Comments },
//     Availability: { screen: Availability },
//     Details: { screen: Details },
//     Provider: { screen: Provider },
//     ProviderHome: { screen: ProviderHome },
// },


//   {
//     initialRouteName: 'Main',
//     // defaultNavigationOptions: {
//     //   headerStyle: {
//     //     backgroundColor: '#f4511e',
//     //   },
//     //   headerTintColor: '#fff',
//     //   headerTitleStyle: {
//     //     fontWeight: 'bold',
//     //   },
//     // },
//     // defaultNavigationOptions: {
//     //   gesturesEnabled: true,
//     // },
//     headerMode: 'none'
//   }
// );

// const AppContainer = createAppContainer(Navigator)

// export default class Nav extends Component {
//   render() {
//     return <AppContainer />;
//   }
// } 



// // // // // import React from "react";
// // // // // import { View, TouchableHighlight, Text, TouchableOpacity} from "react-native";
// // // // // import LottieView from "lottie-react-native";
// // // // // import { Animated, Easing } from "react-native";

// // // // // const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

// // // // // export default class BasicExample extends React.Component {
// // // // //   constructor(props) {
// // // // //     super(props);
// // // // //     this.state = {
// // // // //       progress: new Animated.Value(0),
// // // // //       selected: false
// // // // //     };
// // // // //   }

// // // // //   runAnimation() {
// // // // //     console.log(this.state.progress)
// // // // //     //this.animation.play();
// // // // //     // Or set a specific startFrame and endFrame with:
// // // // //     // this.setState{!this.state.selected}
// // // // //     // if(!this.state.selected){
// // // // //       if(this.state.progress === 0){
// // // // //         Animated.timing(this.state.progress, {
// // // // //           toValue: 1,
// // // // //           duration: 1200,
// // // // //           easing: Easing.linear
// // // // //         }).start();

// // // // //         // this.setState({progress: new Animated.Value(1)})
// // // // //       }
      
// // // // //       // else{
        
// // // // //       //   Animated.timing(this.state.progress, {
// // // // //       //     toValue: 0,
// // // // //       //     duration: 1200,
// // // // //       //     easing: Easing.linear
// // // // //       //   }).start();
// // // // //       //   this.setState({progress: new Animated.Value(0)})

// // // // //       // }
      
// // // // //     // }
// // // // //     // else{
// // // // //     //   Animated.timing(this.state.progress, {
// // // // //     //     toValue: 1,
// // // // //     //     duration: 3000,
// // // // //     //     easing: Easing.linear
// // // // //     //   }).start();
// // // // //     // }
    

// // // // //     //this.setState({progress: new Animated.Value(0)});
// // // // //   }

// // // // //   render() {
// // // // //     return (
// // // // //       <View style={{flex:1, backgroundColor: '#f1f1f1'}}>
// // // // //       <View style={{ flex: 3, flexDirection: "row" }}>      
// // // // //         <View style={{ flex: 2 }}>
// // // // //           <AnimatedTouchable 
// // // // //             onPress={() => this.runAnimation()}
// // // // //             style={{ flex: 1 }}
// // // // //             >
// // // // //               <View style={{ flex: 1 }}>
// // // // //                 <LottieView
// // // // //                   resizeMode={'cover'}
// // // // //                   // key={2}
// // // // //                   source={require("../../images/heart.json")}
// // // // //                   progress={this.state.progress}
// // // // //                   loop
// // // // //                   // autoPlay
// // // // //                 />
// // // // //               </View>
               
// // // // //           </AnimatedTouchable>
                 
// // // // //         </View>
// // // // //         <View style={{ flex: 2 }}>
// // // // //           <LottieView
// // // // //             source={require("../../images/loading.json")}
// // // // //             autoPlay
// // // // //             loop
// // // // //           />
// // // // //         </View>    
      
// // // // //       </View>
// // // // //       {/* <View style={{flex: 2}}>
// // // // //       <View style={{ alignItems:'center' }}>
// // // // //           <TouchableHighlight 
// // // // //           onPress={() => this.runAnimation()}
// // // // //           style={{backgroundColor: "#181888", padding: 10, borderRadius: 3  }}
// // // // //           >
// // // // //             <Text style={{color: '#ffffff', fontSize: 20}}>Me gusta</Text>
// // // // //           </TouchableHighlight>
// // // // //         </View>


// // // // //       </View> */}

// // // // //        <View style={{flex: 2, alignItems: 'center'}}>
// // // // //        <Text style={{color: '#f22323'}}>@yoandypv</Text>
// // // // //        </View>
// // // // //       </View>
// // // // //     );
// // // // //   }
// // // // // }


// // // // /* eslint-disable global-require */
// // // // // import React from 'react';
// // // // // import {
// // // // //   View,
// // // // //   Animated,
// // // // //   Easing,
// // // // //   StyleSheet,
// // // // //   Slider,
// // // // //   Switch,
// // // // //   Image,
// // // // //   Text,
// // // // //   TouchableOpacity,
// // // // // } from 'react-native';
// // // // // import LottieView from 'lottie-react-native';
// // // // // import ExamplePicker from './ExamplePicker';

// // // // // const AnimatedSlider = Animated.createAnimatedComponent(Slider);

// // // // // const playIcon = require('./images/play.png');
// // // // // const pauseIcon = require('./images/pause.png');
// // // // // const loopIcon = require('./images/loop.png');
// // // // // const inverseIcon = require('./images/inverse.png');

// // // // // const makeExample = (name, getJson, width) => ({ name, getJson, width });
// // // // // const EXAMPLES = [
// // // // //   makeExample('Hamburger Arrow', () => require('./animations/HamburgerArrow.json')),
// // // // //   makeExample('Hamburger Arrow (200 px)', () => require('./animations/HamburgerArrow.json'), 200),
// // // // //   makeExample('Line Animation', () => require('./animations/LineAnimation.json')),
// // // // //   makeExample('Lottie Logo 1', () => require('./animations/LottieLogo1.json')),
// // // // //   makeExample('Lottie Logo 2', () => require('./animations/LottieLogo2.json')),
// // // // //   makeExample('Lottie Walkthrough', () => require('./animations/LottieWalkthrough.json')),
// // // // //   makeExample('Pin Jump', () => require('./animations/PinJump.json')),
// // // // //   makeExample('Twitter Heart', () => require('./animations/TwitterHeart.json')),
// // // // //   makeExample('Watermelon', () => require('./animations/Watermelon.json')),
// // // // //   makeExample('Motion Corpse', () => require('./animations/MotionCorpse-Jrcanest.json')),
// // // // // ];

// // // // // export default class LottieAnimatedExample extends React.Component {
// // // // //   state = {
// // // // //     example: EXAMPLES[0],
// // // // //     duration: 3000,
// // // // //     isPlaying: true,
// // // // //     isInverse: false,
// // // // //     loop: false,
// // // // //   };

// // // // //   manageAnimation = shouldPlay => {
// // // // //     if (!this.state.progress) {
// // // // //       if (shouldPlay) {
// // // // //         this.anim.play();
// // // // //       } else {
// // // // //         this.anim.reset();
// // // // //       }
// // // // //     } else {
// // // // //       this.state.progress.setValue(0);

// // // // //       if (shouldPlay) {
// // // // //         Animated.timing(this.state.progress, {
// // // // //           toValue: 1,
// // // // //           duration: this.state.duration,
// // // // //           easing: Easing.linear,
// // // // //           useNativeDriver: true,
// // // // //         }).start(() => {
// // // // //           this.setState({ isPlaying: false });
// // // // //         });
// // // // //       }
// // // // //     }

// // // // //     this.setState({ isPlaying: shouldPlay });
// // // // //   };

// // // // //   onPlayPress = () => this.manageAnimation(!this.state.isPlaying);
// // // // //   stopAnimation = () => this.manageAnimation(false);

// // // // //   onInversePress = () => this.setState(state => ({ isInverse: !state.isInverse }));
// // // // //   onProgressChange = progress => this.state.progress.setValue(progress);
// // // // //   onDurationChange = duration => this.setState({ duration });

// // // // //   setAnim = anim => {
// // // // //     this.anim = anim;
// // // // //   };

// // // // //   render() {
// // // // //     const { duration, isPlaying, isInverse, progress, loop, example } = this.state;
// // // // //     return (
      
// // // // //         <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
// // // // //         <TouchableOpacity style={styles.playButton} onPress={this.onPlayPress}>
// // // // //           <LottieView
// // // // //               ref={this.setAnim}
// // // // //               autoPlay={!progress}
// // // // //               // style={[example.width && { width: example.width }, isInverse && styles.lottieViewInvse]}
// // // // //               style={{flex: 1, width: '100%', height: '100%',  alignItems: 'center', justifyContent: 'center', isInverse: styles.lottieViewInvse }}
// // // // //               // source={example.getJson()}
// // // // //               source={require("../../images/heart.json")}
// // // // //               progress={progress}
// // // // //               loop={loop}
// // // // //               enableMergePathsAndroidForKitKatAndAbove
// // // // //             />
// // // // //         </TouchableOpacity>
          
// // // // //         </View>
// // // // //     );
// // // // //   }
// // // // // }

// // // // // const PLAY_BUTTON_SIZE = 60;
// // // // // const styles = StyleSheet.create({
// // // // //   controlsRow: {
// // // // //     flexDirection: 'row',
// // // // //     justifyContent: 'space-around',
// // // // //     alignItems: 'center',
// // // // //   },
// // // // //   playButton: {
// // // // //     width: 100,
// // // // //     // width: PLAY_BUTTON_SIZE,
// // // // //     height: 100,
// // // // //     flex: 1,
// // // // //     // height: PLAY_BUTTON_SIZE,
// // // // //     // borderRadius: PLAY_BUTTON_SIZE / 2,
// // // // //     // backgroundColor: '#1d8bf1',
// // // // //     justifyContent: 'center',
// // // // //     alignItems: 'center',
// // // // //   },
// // // // //   playButtonIcon: {
// // // // //     width: 40,
// // // // //     height: 40,
// // // // //   },
// // // // //   controlsIcon: {
// // // // //     width: 24,
// // // // //     height: 24,
// // // // //     padding: 8,
// // // // //   },
// // // // //   controlsIconEnabled: {
// // // // //     tintColor: '#1d8bf1',
// // // // //   },
// // // // //   controlsIconDisabled: {
// // // // //     tintColor: '#aaa',
// // // // //   },
// // // // //   lottieView: {
// // // // //     flex: 1,
// // // // //   },
// // // // //   lottieViewInvse: {
// // // // //     backgroundColor: 'black',
// // // // //   },
// // // // // });




// // // import React from "react";
// // // import {
// // //   StyleSheet,
// // //   View,
// // //   ActivityIndicator,
// // //   FlatList,
// // //   Text,
// // //   TouchableOpacity,
// // //   Image
// // // } from "react-native";
// // // import { Icon } from "react-native-elements";

// // // // import { enText } from "../lang/en";
// // // export default class Store extends React.Component {
// // //   constructor(props) {
// // //     super(props);
// // //     this.state = {
// // //       loading: false,
// // //       dataSource: []
// // //     };
// // //   }
// // //   componentDidMount() {
// // //     this.fetchData();
// // //   }
// // //   fetchData = () => {
// // //     this.setState({ loading: true });
// // //     fetch("https://jsonplaceholder.typicode.com/photos")
// // //       .then(response => response.json())
// // //       .then(responseJson => {
// // //         responseJson = responseJson.map(item => {
// // //           item.isSelect = false;
// // //           item.selectedClass = styles.list;
// // //           return item;
// // //         });
// // //         this.setState({
// // //           loading: false,
// // //           dataSource: responseJson
// // //         });
// // //       })
// // //       .catch(error => {
// // //         this.setState({ loading: false });
// // //       });
// // //   };
// // //   FlatListItemSeparator = () => <View style={styles.line} />;

// // //   selectItem = data => {
// // //     data.item.isSelect = !data.item.isSelect;
// // //     data.item.selectedClass = data.item.isSelect
// // //       ? styles.selected
// // //       : styles.list;
// // //     const index = this.state.dataSource.findIndex(
// // //       item => data.item.id === item.id
// // //     );
// // //     this.state.dataSource[index] = data.item;
// // //     this.setState({
// // //       dataSource: this.state.dataSource
// // //     });
// // //   };
// // //   goToStore = () =>
// // //     this.props.navigation.navigate("Expenses", {
// // //       selected: this.state.selected
// // //     });
// // //   renderItem = data => (
// // //     <TouchableOpacity
// // //       style={[styles.list, data.item.selectedClass]}
// // //       onPress={() => this.selectItem(data)}
// // //     >
// // //       <Image
// // //         source={{ uri: data.item.thumbnailUrl }}
// // //         style={{ width: 40, height: 40, margin: 6 }}
// // //       />
// // //       <Text style={styles.lightText}>
// // //         {" "}
// // //         {data.item.title.charAt(0).toUpperCase() +
// // //           data.item.title.slice(1)}{" "}
// // //       </Text>
// // //     </TouchableOpacity>
// // //   );
// // //   render() {
// // //     const itemNumber = this.state.dataSource.filter(item => item.isSelect)
// // //       .length;
// // //     if (this.state.loading) {
// // //       return (
// // //         <View style={styles.loader}>
// // //           <ActivityIndicator size="large" color="purple" />
// // //         </View>
// // //       );
// // //     }
// // //     return (
// // //       <View style={styles.container}>
// // //         <Text style={styles.title}></Text>
// // //         <FlatList
// // //           data={this.state.dataSource}
// // //           ItemSeparatorComponent={this.FlatListItemSeparator}
// // //           renderItem={item => this.renderItem(item)}
// // //           keyExtractor={item => item.id.toString()}
// // //           extraData={this.state}
// // //         />
// // //         <View style={styles.numberBox}>
// // //           <Text style={styles.number}>{itemNumber}</Text>
// // //         </View>
// // //         <TouchableOpacity style={styles.icon}>
// // //           <View>
// // //             <Icon
// // //               raised
// // //               name="shopping-cart"
// // //               type="font-awesome"
// // //               color="#e3e3e3"
// // //               size={30}
// // //               onPress={() => this.goToStore()}
// // //               containerStyle={{ backgroundColor: "#FA7B5F" }}
// // //             />
// // //           </View>
// // //         </TouchableOpacity>
// // //       </View>
// // //     );
// // //   }
// // // }
// // // const styles = StyleSheet.create({
// // //   container: {
// // //     flex: 1,
// // //     backgroundColor: "#192338",
// // //     paddingVertical: 50,
// // //     position: "relative"
// // //   },
// // //   title: {
// // //     fontSize: 20,
// // //     color: "#fff",
// // //     textAlign: "center",
// // //     marginBottom: 10
// // //   },
// // //   loader: {
// // //     flex: 1,
// // //     justifyContent: "center",
// // //     alignItems: "center",
// // //     backgroundColor: "#fff"
// // //   },
// // //   list: {
// // //     paddingVertical: 5,
// // //     margin: 3,
// // //     flexDirection: "row",
// // //     backgroundColor: "#192338",
// // //     justifyContent: "flex-start",
// // //     alignItems: "center",
// // //     zIndex: -1
// // //   },
// // //   lightText: {
// // //     color: "#f7f7f7",
// // //     width: 200,
// // //     paddingLeft: 15,
// // //     fontSize: 12
// // //   },
// // //   line: {
// // //     height: 0.5,
// // //     width: "100%",
// // //     backgroundColor: "rgba(255,255,255,0.5)"
// // //   },
// // //   icon: {
// // //     position: "absolute",
// // //     bottom: 20,
// // //     width: "100%",
// // //     left: 290,
// // //     zIndex: 1
// // //   },
// // //   numberBox: {
// // //     position: "absolute",
// // //     bottom: 75,
// // //     width: 30,
// // //     height: 30,
// // //     borderRadius: 15,
// // //     left: 330,
// // //     zIndex: 3,
// // //     backgroundColor: "#e3e3e3",
// // //     justifyContent: "center",
// // //     alignItems: "center"
// // //   },
// // //   number: { fontSize: 14, color: "#000" },
// // //   selected: { backgroundColor: "#FA7B5F" }
// // // });
