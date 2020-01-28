import React, { useState, useEffect }from 'react';
import {
  Text,
  View,
  Image,
  Animated,
  FlatList,
  TextInput,
  StatusBar,
  ScrollView,
  StyleSheet,
  Dimensions,
  ToolbarAndroid,
  TouchableOpacity,
} from 'react-native';

import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/Ionicons'
import firestore from '@react-native-firebase/firestore';

import Swiper from 'react-native-swiper'
import * as Animatable from 'react-native-animatable';


import MapView, { Marker, ProviderPropType } from 'react-native-maps';
import Services from './Services'

export default function DetailView({navigation}) {
    const { width, height } = Dimensions.get('window')
    const dataSource = navigation.state.params.data;
    const ASPECT_RATIO = width / height;
    const LATITUDE_DELTA = 0.0522;
    const region ={
        latitude: dataSource.coordinate.latitude,
        longitude: dataSource.coordinate.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LATITUDE_DELTA * ASPECT_RATIO,
    };

    const fadeIn = {
      from: {
        opacity: 0,
      },
      to: {
        opacity: 1,
      },
    };

    const [ services, setServices] = useState([]); 
    const [serviceLoading, setServiceLoading] = useState(true);

      useEffect(() => {
        const unsubscribe = firestore()
            .collection('partyHalls')
            .doc('9Cg4qvaHKvaWNolba8F9XrU3Wxx1')
            .collection('services')
            .onSnapshot((querySnapshot) => {
            const serverData = querySnapshot.docs.map((documentSnapshot) => {
              // console.log("=========================");
              // console.log(documentSnapshot.data());
              // console.log("==========================");
                return {
                ...documentSnapshot.data(),
                key: documentSnapshot.id, // required for FlatList
                };
            });

            // Update state with the users array
            setServices(serverData);
            // console.log(serverData)

            // As this can trigger multiple times, only update loading after the first update
            if (serviceLoading) {
                setServiceLoading(false);
            }
            });
    
            return () => unsubscribe(); // Stop listening for updates whenever the component unmounts
      }, []);

      

    return (
    <View style={styles.container}> 
      <ScrollView >
        <StatusBar translucent backgroundColor='transparent' />
            <Swiper style={styles.wrapper}
                dot={<View style={{backgroundColor: 'rgba(255,255,255,.3)', width: 8, height: 8, borderRadius: 7, marginLeft: 7, marginRight: 7}} />}
                activeDot={<View style={{backgroundColor: '#fff', width: 8, height: 8, borderRadius: 7, marginLeft: 7, marginRight: 7}} />}
                paginationStyle={{
                  bottom: 20
                }}
                loop={true}
                autoplay={true}
                >
                {dataSource.files.map((image, key) => (
                    <View key={key} style={styles.slide}>
                        <FastImage 
                            style={styles.image} 
                            source={{
                                uri: image.uri,
                                priority: FastImage.priority.normal,
                                cashe: FastImage.cacheControl.immutable
                            }}
                            resizeMode={FastImage.resizeMode.cover}
                            
                        />
                    <Animatable.Text animation="pulse" easing="ease-out" iterationCount="infinite" style={{ textAlign: 'center', position: "absolute",top: 50, right: 50, color: "white", fontSize: 50 }}>❤️ </Animatable.Text>

                    </View>
                ))}
            </Swiper>
            <View style={{height: 300}}>
            <Animatable.Text animation="slideInDown" iterationCount={5} direction="alternate">Up and down you go</Animatable.Text>
            <Animatable.Text animation="pulse" easing="ease-out" iterationCount="infinite" style={{ textAlign: 'center', fontSize: 50 }}>some ❤️ some </Animatable.Text>
            
            </View>

            <MapView
                style={styles.map}
                scrollEnabled={false}
                zoomEnabled={false}
                pitchEnabled={false}
                rotateEnabled={false}
                initialRegion={region}
            >
                <Marker
                    title={dataSource.partyHallName}
                    description={dataSource.address}
                    coordinate={region}
                />
            </MapView>
            <View style={{height: 900}}>
            { serviceLoading ? <Text> loading Services</Text> :  <Services data={services}/> }
            </View>
            
        </ScrollView>
        <View style = {styles.footer}>
            {/* <Text style= {styles.footerText}> Text </Text> */}
         <TouchableOpacity 
           onPress={ () => navigation.navigate('Availability')}
           style= {styles.bottomButtons}
           >
        
           <Text> navigate to calendar</Text>
         </TouchableOpacity>
        </View>
    </View>
    );
  }


// StaticMap.propTypes = {
//   provider: ProviderPropType,
// };

const styles = StyleSheet.create({
  container: {
    // height: height - HEADER_HEIGHT,
    flex: 1
  },
  image: {
    // position: 'absolute',
    // backgroundColor: '#000',
    // opacity: 0.65,
    width: '100%',
    height: '100%',
  },
    wrapper: {
        height: 650 
    },
    slide: {
        flex: 1,
        backgroundColor: 'transparent'
    },
    map: {
        width: '100%',
        height: 250,
    },
    footer: {
        position: 'absolute',
        flex:0.1,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor:'gray',
        flexDirection:'row',
        height:50,
        alignItems:'center',
    },
    bottomButtons: {
      alignItems:'center',
      justifyContent: 'center',
      flex:1,
    },

});


// // import React, { Component } from 'react';
// // import {
// //   Animated,
// //   Dimensions,
// //   Platform,
// //   ScrollView,
// //   StyleSheet,
// //   Text,
// //   View,
// //   ToolbarAndroid
// // } from 'react-native';
// // // import str from './content';

// // const HEADER_EXPANDED_HEIGHT = 300;
// // const HEADER_COLLAPSED_HEIGHT = 60;

// // const { width: SCREEN_WIDTH } = Dimensions.get("screen")

// // export default class App extends Component {
// //   constructor() {
// //     super();

// //     this.state = {
// //       scrollY: new Animated.Value(0)
// //     }
// //   }

// //   render() {
// //     const headerHeight = this.state.scrollY.interpolate({
// //       inputRange: [0, HEADER_EXPANDED_HEIGHT-HEADER_COLLAPSED_HEIGHT],
// //       outputRange: [HEADER_EXPANDED_HEIGHT, HEADER_COLLAPSED_HEIGHT],
// //       extrapolate: 'clamp'
// //     });
// //     const headerTitleOpacity = this.state.scrollY.interpolate({
// //       inputRange: [0, HEADER_EXPANDED_HEIGHT-HEADER_COLLAPSED_HEIGHT],
// //       outputRange: [0, 1],
// //       extrapolate: 'clamp'
// //     });
// //     const heroTitleOpacity = this.state.scrollY.interpolate({
// //       inputRange: [0, HEADER_EXPANDED_HEIGHT-HEADER_COLLAPSED_HEIGHT],
// //       outputRange: [1, 0],
// //       extrapolate: 'clamp'
// //     });

// //     const headerTitle = 'HEADER'

// //     return (
// //       <View style={styles.container}>
// //         <ToolbarAndroid
// //             style={styles.toolbar}
// //             title="Movies"
// //             // navIcon={require("../../ic_launcher.png")}
// //             // onActionSelected={this.onActionSelected}
// //             titleColor= "000"
// //             actions = {[
// //               {title: "Log out", show: "never"}
// //             ]}
// //             />
// //         <Animated.View style={[styles.header, { height: headerHeight }]}>
// //           <Animated.Text style={{textAlign: 'center', fontSize: 18, color: 'black', marginTop: 28, opacity: headerTitleOpacity}}>{headerTitle}</Animated.Text>
// //           <Animated.Text style={{textAlign: 'center', fontSize: 32, color: 'black', position: 'absolute', bottom: 16, left: 16, opacity: heroTitleOpacity}}>{headerTitle}</Animated.Text>
// //         </Animated.View>
// //         <ScrollView
// //           contentContainerStyle={styles.scrollContainer}
// //           onScroll={Animated.event(
// //             [{ nativeEvent: {
// //                 contentOffset: {
// //                   y: this.state.scrollY
// //                 }
// //               }
// //             }])
// //           }
// //           scrollEventThrottle={16}>
// //           <Text style={styles.title}>This is Title</Text>
// //           <Text style={styles.content}>kLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel ultrices ante. Duis vulputate lorem non tortor pharetra, aliquet aliquet leo efficitur. Ut sed rutrum nisi. Pellentesque facilisis erat sit amet mi ornare, et dapibus tortor congue. Integer vulputate magna a vehicula accumsan. Cras nec nunc consequat, volutpat felis vitae, pulvinar nibh. Vestibulum lacinia in tortor vel maximus. Suspendisse semper dolor ligula. Praesent pellentesque suscipit enim, at dictum nisl pellentesque non. Phasellus nec consectetur magna. Interdum et malesuada fames ac ante ipsum primis in faucibus. Sed condimentum porttitor elit ut dignissim. Nunc nec libero a orci porttitor accumsan eget sed diam. Cras dignissim, nulla sed laoreet accumsan, mi quam egestas mauris, id posuere purus lorem sagittis purus. Duis sollicitudin neque ac aliquet sollicitudin.
// // In eros est, sollicitudin sit amet risus eget, porttitor pulvinar ipsum. Nulla eget quam arcu. Mauris vel odio cursus, hendrerit augue et, ultricies massa. Phasellus pharetra et libero id semper. Sed sollicitudin commodo mi, nec efficitur sem congue vitae. Ut pellentesque augue ut lacus finibus sollicitudin. Donec a auctor augue. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nullam vitae convallis nulla. Maecenas venenatis lorem at mi commodo pharetra. Mauris finibus hendrerit magna, sit amet ultrices turpis aliquet nec. Proin et diam suscipit, sollicitudin risus ac, porta nibh.
// // Aliquam pretium, elit maximus vehicula lobortis, neque dolor tempor nisl, sit amet interdum erat turpis eu metus. Sed semper libero ac diam finibus, ac interdum orci placerat. Donec nec erat ac erat rhoncus blandit. Nunc felis dui, semper eu porttitor in, porttitor vitae eros. In vel mattis est, vel molestie dui. Nulla semper nisl tempor scelerisque egestas. Duis faucibus, elit id accumsan aliquet, turpis felis scelerisque felis, quis tincidunt felis massa nec eros. Vivamus pellentesque congue velit finibus porttitor. Pellentesque eu mi lacinia sapien fermentum tincidunt sit amet eu nisl. Suspendisse pharetra ex in magna molestie venenatis.
// // Suspendisse non gravida tortor. Donec tristique ipsum eget arcu aliquet molestie. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nam cursus purus eget accumsan maximus. Duis eu iaculis arcu. Donec iaculis, sem vel condimentum maximus, lectus nisl pellentesque dolor, non ullamcorper sapien lectus sed enim. Aenean et leo nisi. Nulla viverra magna id luctus fermentum. Donec et mauris placerat, mollis elit lacinia, cursus lacus. Donec aliquet libero arcu, non consectetur elit maximus sit amet. Quisque lacinia, libero et fermentum rutrum, lorem arcu tincidunt ante, sed iaculis velit tortor non lacus.
// // Sed accumsan lectus laoreet mollis cursus. Phasellus sagittis vulputate erat, non tempus dui pellentesque vel. Fusce imperdiet nulla vitae mauris facilisis bibendum. Fusce vestibulum fringilla orci, sit amet euismod nunc eleifend id. Curabitur mattis dolor at odio maximus lacinia. Vivamus ornare lorem sed augue faucibus, vel volutpat lacus elementum. Suspendisse potenti.sdfjlkasjf aklsdfjlkasjf asdklfjalskfdjfkals fklasjflskldfjakls; fdlkasjdfklasjfdlksajf sdfkjasklfdjklsfjdklasjf safkajsfdlkjaslkfjslkafjlksjdfklsajf askjflksajf safjklsajfdlksajfdlksjdf lkasjdflkasfjlksa dfjklsdjflkasfjklasfjd </Text>
// //         </ScrollView>
// //       </View>
// //     );
// //   }
// // }

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: '#eaeaea',
// //   },
// //   scrollContainer: {
// //     padding: 16,
// //     paddingTop: HEADER_EXPANDED_HEIGHT
// //   },
// //   header: {
// //     backgroundColor: 'lightblue',
// //     position: 'absolute',
// //     width: SCREEN_WIDTH,
// //     top: 0,
// //     left: 0,
// //     zIndex: 9999
// //   },
// //   title: {
// //     marginVertical: 16,
// //     color: "black",
// //     fontWeight: "bold",
// //     fontSize: 24
// //   }
// // });

// import React, { Component } from 'react';

// import {
//   Text,
//   View,
//   Image,
//   Animated,
//   FlatList,
//   TextInput,
//   StatusBar,
//   ScrollView,
//   StyleSheet,
//   Dimensions,
//   TouchableWithoutFeedback
// } from 'react-native';

// import FastImage from 'react-native-fast-image';
// import { Transition } from 'react-navigation-fluid-transitions';
// import Icon from 'react-native-vector-icons/Ionicons'
// import Swiper from 'react-native-swiper'

// var GoogleStaticMap = require('react-native-google-static-map');


// const Header_Maximum_Height = 400;

// const Header_Minimum_Height = 50;

// const { width, height } = Dimensions.get('window')

 
// export default class Mynewproject extends Component{
//     constructor()
//     {
//         super();
 
//         this.AnimatedHeaderValue = new Animated.Value(0);
//         this.state = {
//           // scrollY: new Animated.Value(0),
//           // dataSource: props.navigation.state.params.data,
//         };
 
//     }
//     componentDidMount(){
//       // console.log(this.props.navigation.state.params.data)
//       // const dataSource = this.props.navigation.state.params.data;

//     }
 
//     render()
//     {
 
//         const AnimateHeaderBackgroundColor = this.AnimatedHeaderValue.interpolate(
//         {
//             inputRange: [ 0, ( Header_Maximum_Height - Header_Minimum_Height )  ],

//             outputRange: [ '#00BCD4', '#00BCD4' ],

//             extrapolate: 'clamp'
//         });

//         const AnimateHeaderHeight = this.AnimatedHeaderValue.interpolate(
//             {
//                 inputRange: [ 0, ( Header_Maximum_Height - Header_Minimum_Height ) ],
    
//                 outputRange: [ Header_Maximum_Height, Header_Minimum_Height ],
    
//                 extrapolate: 'clamp'
//             });
 
//         return(
//             <View style = { styles.MainContainer }>

//                 <ScrollView 

//                     scrollEventThrottle = { 16 }

//                     contentContainerStyle = {{ paddingTop: Header_Maximum_Height }}

//                     onScroll = { Animated.event(
//                       [{ nativeEvent: { contentOffset: { y: this.AnimatedHeaderValue }}}]
//                 )}>
                
//                     {/* Put all your Component here inside the ScrollView */}

//                     <Text style={styles. TextViewStyle}>Sample Text 1</Text>

//                     <GoogleStaticMap
//                         style={styles.map} 
//                         // {...locationProps}
//                         latitude={'32.064171'}
//                         longitude={'34.7748068'}
//                         zoom={13}
//                         size={{ width: 300, height: 550 }}
//                         // apiKey={'YOUR-KEY-HERE'}
//                     />

//                     <Text style={styles. TextViewStyle}>Sample Text 3</Text>

//                     <Text style={styles. TextViewStyle}>Sample Text 4</Text>

//                     <Text style={styles. TextViewStyle}>Sample Text 5</Text>

//                     <Text style={styles. TextViewStyle}>Sample Text 6</Text>

//                     <Text style={styles. TextViewStyle}>Sample Text 7</Text>

//                     <Text style={styles. TextViewStyle}>Sample Text 8</Text>

//                     <Text style={styles. TextViewStyle}>Sample Text 9</Text>

//                     <Text style={styles. TextViewStyle}>Sample Text 10</Text>

//                     <Text style={styles. TextViewStyle}>Sample Text 11</Text>

//                     <Text style={styles. TextViewStyle}>Sample Text 12</Text>

//                     <Text style={styles. TextViewStyle}>Sample Text 13</Text>

//                     <Text style={styles. TextViewStyle}>Sample Text 14</Text>

//                     <Text style={styles. TextViewStyle}>Sample Text 15</Text>

//                     <Text style={styles. TextViewStyle}>Sample Text 16</Text>

//                     <Text style={styles. TextViewStyle}>Sample Text 17</Text>

//                     <Text style={styles. TextViewStyle}>Sample Text 18</Text>

//                     <Text style={styles. TextViewStyle}>Sample Text 19</Text>

//                     <Text style={styles. TextViewStyle}>Sample Text 20</Text>

//                     {/* Put all your Component here inside the ScrollView */}

//                 </ScrollView>


//                 <Animated.View style = {[ styles.HeaderStyle, { height: AnimateHeaderHeight, backgroundColor: AnimateHeaderBackgroundColor} ]}>

//                     {/* <Text style={styles.HeaderInsideTextStyle}> Collapsible Expandable Header </Text> */}
//                     <Swiper style={styles.wrapper}
//                         dot={<View style={{backgroundColor: '#0000', width: 8, height: 8, borderRadius: 7, marginLeft: 7, marginRight: 7}} />}
//                         activeDot={<View style={{backgroundColor: '#000', width: 8, height: 8, borderRadius: 7, marginLeft: 7, marginRight: 7}} />}
//                         paginationStyle={{
//                             bottom: 20
//                         }}
//                         loop={true}
//                      >
//                        {console.log(this.props.navigation.state.params.data)}
//                         {this.props.navigation.state.params.data.files.map((image, key) => (
//                             <View key={key} style={styles.slide}>
//                                 <FastImage 
//                                     style={styles.image} 
//                                     source={{
//                                       uri: image.uri,
//                                       priority: FastImage.priority.normal,
//                                       cashe: FastImage.cacheControl.immutable
//                                     }}
//                                     resizeMode={FastImage.resizeMode.cover}
//                                     onProgress={e => console.log('progress :',e.nativeEvent.loaded / e.nativeEvent.total)}
//                                     onLoad={e => console.log('loaded: ', e.nativeEvent.width, e.nativeEvent.height)}
//                                     onError={error => console.log('error loading: ', error)}
//                                     onLoadEnd={console.log('finished loading')}
//                                     fallback= {true}
                                    
//                                 />
//                             </View>
//                         ))}
//                       </Swiper>
                  
//                 </Animated.View>

//                 <View style = {styles.footer}>
//                   <Text style= {styles.footerText}> Text </Text>
//                   <TouchableWithoutFeedback 
//                     onPress={ () => this.props.navigation.navigate('Availability')}
//                     style= {styles.bottomButtons}>
//                     >
//                     <Text> navigate to calendar</Text>
//                   </TouchableWithoutFeedback>
//                 </View>

 
//             </View>
//         );
//     }
// }
 
// const styles = StyleSheet.create(
// {
//     MainContainer:
//     {
//         flex: 1,
//         paddingTop: (Platform.OS == 'ios') ? 20 : 0
//     },
 
//     HeaderStyle:
//     {
//         justifyContent: 'center',
//         alignItems: 'center',
//         position: 'absolute',
//         left: 0,
//         right: 0,
//         top: (Platform.OS == 'ios') ? 20 : 0,
//     },
//     wrapper: {
    
//     },
//     slide: {
//       flex: 1,
//       backgroundColor: 'transparent'
//     },
//     image: {
//       width,
//       // height: AnimateHeaderHeight,
//       position: 'absolute',
//       backgroundColor: '#000',
//       opacity: 0.65,
//     },
 
//     HeaderInsideTextStyle:
//     {
//         color: "#fff",
//         fontSize: 18,
//         textAlign: 'center'
//     },
 
//     TextViewStyle:
//     {
//         textAlign: 'center',
//         color: "#000",
//         fontSize: 18,
//         margin: 5,
//         padding: 7,
//         backgroundColor: "#ECEFF1"
//     },
//     footer: {
//       position: 'absolute',
//       flex:0.1,
//       left: 0,
//       right: 0,
//       bottom: 0,
//       backgroundColor:'green',
//       flexDirection:'row',
//       height:50,
//       alignItems:'center',
//     },
//     bottomButtons: {
//       alignItems:'center',
//       justifyContent: 'center',
//       flex:1,
//     },
//     footerText: {
//       color:'white',
//       fontWeight:'bold',
//       alignItems:'center',
//       fontSize:18,
//     },
//     textStyle: {
//       alignSelf: 'center',
//       color: 'orange'
//     },

// });