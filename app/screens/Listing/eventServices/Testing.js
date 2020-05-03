// // import React, {Component} from 'react';
// // import {View, TextInput, Button, StyleSheet} from 'react-native';

// // class MyClass extends Component {
// //   constructor(props) {
// //     super(props);
// //     this.state = {
// //       textInput: [],
// //       inputData: [],
// //     };
// //   }

// //   //function to add TextInput dynamically
// //   addTextInput = index => {
// //     let textInput = this.state.textInput;
// //     textInput.push(
// //       <TextInput
// //         style={styles.textInput}
// //         onChangeText={text => this.addValues(text, index)}
// //       />,
// //     );
// //     this.setState({textInput});
// //   };

// //   //function to remove TextInput dynamically
// //   removeTextInput = () => {
// //     let textInput = this.state.textInput;
// //     let inputData = this.state.inputData;
// //     textInput.pop();
// //     inputData.pop();
// //     this.setState({textInput, inputData});
// //   };

// //   //function to add text from TextInputs into single array
// //   addValues = (text, index) => {
// //     let dataArray = this.state.inputData;
// //     let checkBool = false;
// //     if (dataArray.length !== 0) {
// //       dataArray.forEach(element => {
// //         if (element.index === index) {
// //           element.text = text;
// //           checkBool = true;
// //         }
// //       });
// //     }
// //     if (checkBool) {
// //       this.setState({
// //         inputData: dataArray,
// //       });
// //     } else {
// //       dataArray.push({text: text, index: index});
// //       this.setState({
// //         inputData: dataArray,
// //       });
// //     }
// //   };

// //   //function to console the output
// //   getValues = () => {
// //     console.log('Data', this.state.inputData);
// //   };

// //   render() {
// //     return (
// //       <View>
// //         <View style={styles.row}>
// //           <View style={{margin: 10}}>
// //             <Button
// //               title="Add"
// //               onPress={() => this.addTextInput(this.state.textInput.length)}
// //             />
// //           </View>
// //           <View style={{margin: 10}}>
// //             <Button title="Remove" onPress={() => this.removeTextInput()} />
// //           </View>
// //         </View>
// //         {this.state.textInput.map(value => {
// //           return value;
// //         })}
// //         <Button title="Get Values" onPress={() => this.getValues()} />
// //       </View>
// //     );
// //   }
// // }

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //     backgroundColor: 'white',
// //   },
// //   buttonView: {
// //     flexDirection: 'row',
// //   },
// //   textInput: {
// //     height: 40,
// //     borderColor: 'black',
// //     borderWidth: 1,
// //     margin: 20,
// //   },
// //   row: {
// //     flexDirection: 'row',
// //     justifyContent: 'center',
// //   },
// // });

// // export default MyClass;

// // import React, {useContext, useRef, useState} from 'react';
// // import {Input, Button} from 'react-native-elements';
// // import Feather from 'react-native-vector-icons/Feather';
// // import {
// //   StyleSheet,
// //   Text,
// //   View,
// //   ScrollView,
// //   Image,
// //   Dimensions,
// //   TouchableOpacity,
// //   TouchableWithoutFeedback,
// //   StatusBar,
// //   Platform,
// //   FlatList,
// // } from 'react-native';

// // import Animated from 'react-native-reanimated';

// // const Field = props => {
// //   const [name, setNatme] = useState(null);
// //   return (
// //     <Input
// //       // placeholder={placeholder}
// //       onChangeText={text => setNatme(text)}
// //       value={name}
// //       {...props}
// //     />
// //   );
// // };
// // const styles = StyleSheet.create({});
// // export default function() {
// //   const [sub, addSub] = useState(0);
// //   console.log(sub);
// //   return (
// //     <View>
// //       <View style={{flexDirection: 'row', alignContent: 'space-between'}}>
// //         <View style={{width: 300, margin: 10}}>
// //           <Field placeholder={'Category Name'} />
// //         </View>
// //         <TouchableOpacity
// //           onPress={() => addSub(sub + 1)}
// //           style={{justifyContent: 'center'}}>
// //           <Feather name="plus-square" size={36} color="black" />
// //         </TouchableOpacity>
// //       </View>
// //       <View style={{margin: 30}}>
// //         <Field placeholder={'Sub Category 1'} />
// //         <Field placeholder={'Sub Category 2'} />
// //         <Field placeholder={'Sub Category 3'} />
// //         <Field placeholder={'Sub Category 4'} />
// //         <Field placeholder={'Sub Category 5'} />
// //         <Field placeholder={'Sub Category 6'} />
// //       </View>
// //       <View style={{margin: 15}}>
// //         <Button title="Save" type="outline" />
// //       </View>
// //     </View>
// //   );
// // }

// // import React, {useContext, useRef, useState} from 'react';
// // import {
// //   StyleSheet,
// //   Text,
// //   View,
// //   ScrollView,
// //   Image,
// //   Dimensions,
// //   TouchableOpacity,
// //   TouchableWithoutFeedback,
// //   StatusBar,
// //   Platform,
// //   FlatList,
// // } from 'react-native';

// // import Animated from 'react-native-reanimated';

// // import MapView, {
// //   MAP_TYPES,
// //   ProviderPropType,
// //   Polyline,
// //   Marker,
// //   Polygon,
// //   Overlay,
// //   Circle,
// //   AnimatedRegion,
// // } from 'react-native-maps';

// // import Card from '../components/EventMapCard';
// // // import {ListingContext} from '../../../context/ListingContext';

// // const {
// //   Value,
// //   cond,
// //   greaterOrEq,
// //   lessOrEq,
// //   set,
// //   block,
// //   call,
// //   Extrapolate,
// //   interpolate,
// //   useCode,
// //   floor,
// //   divide,
// //   add,
// //   sub,
// //   multiply,
// // } = Animated;
// // const {width, height} = Dimensions.get('window');

// // const CARD_HEIGHT = height / 3;
// // const CARD_WIDTH = width - 40;

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //   },
// //   scrollView: {
// //     position: 'absolute',
// //     bottom: 30,
// //     left: 0,
// //     right: 0,
// //     paddingVertical: 10,
// //   },
// //   endPadding: {
// //     paddingRight: width - CARD_WIDTH,
// //   },
// //   markerWrap: {
// //     alignItems: 'center',
// //     justifyContent: 'center',
// //     height: 50,
// //     width: 50,
// //   },
// //   marker: {
// //     position: 'absolute', // <-- moved from ring
// //     width: 8,
// //     height: 8,
// //     borderRadius: 4,
// //     backgroundColor: 'rgba(130,4,150, 0.9)',
// //   },
// //   ring: {
// //     width: 24,
// //     height: 24,
// //     borderRadius: 12,
// //     backgroundColor: 'rgba(130,4,150, 0.3)',
// //     borderWidth: 1,
// //     borderColor: 'rgba(130,4,150, 0.5)',
// //   },
// //   contentContainer: {
// //     paddingVertical: 20,
// //   },
// //   Header: {
// //     left: 0,
// //     right: 0,
// //     bottom: 0,
// //     height: 10,
// //     flexDirection: 'column',
// //     justifyContent: 'center',
// //   },
// //   BottomContainer: {
// //     marginLeft: 20,
// //     marginRight: 20,
// //     marginBottom: 20,
// //     width: 350,
// //     height: '15%',
// //     flexDirection: 'column',
// //     backgroundColor: 'rgba(255,255,255,0.9)',
// //     borderRadius: 20,
// //   },

// //   container: {
// //     ...StyleSheet.absoluteFillObject,
// //     height: '100%',
// //     width: '100%',
// //     justifyContent: 'flex-start',
// //     alignItems: 'center',
// //   },
// //   map: {
// //     ...StyleSheet.absoluteFillObject,

// //     backgroundColor: '#000000',
// //   },
// //   linearGradient: {
// //     width: '100%',
// //     height: '25%',
// //     borderBottomLeftRadius: 16,
// //     borderBottomRightRadius: 16,
// //   },
// //   buttonText: {
// //     fontSize: 18,
// //     fontFamily: 'Gill Sans',
// //     fontWeight: 'normal',
// //     textAlign: 'center',
// //     margin: 10,
// //     color: '#ffffff',
// //     backgroundColor: 'transparent',
// //   },
// //   bubble: {
// //     flex: 1,
// //     backgroundColor: 'rgba(255,255,255,0.7)',
// //     paddingHorizontal: 18,
// //     paddingVertical: 12,
// //     borderRadius: 20,
// //   },
// //   latlng: {
// //     width: 200,
// //     alignItems: 'stretch',
// //   },
// //   button: {
// //     width: 80,
// //     paddingHorizontal: 12,
// //     alignItems: 'center',
// //     marginHorizontal: 10,
// //   },
// //   buttonContainer: {
// //     flexDirection: 'row',
// //     marginVertical: 20,
// //     backgroundColor: 'transparent',
// //   },
// // });

// // const documentData = [
// //   {
// //     CateringPrice: '',
// //     address:
// //       '11-3-193, Bazar Ghat, New Mallepally, Hyderabad, Telangana 500001, India',
// //     cabacity: '690',
// //     contactNo: '999099133',
// //     coordinate: {latitude: 17.3940636, longitude: 78.4565447},
// //     coords: {_latitude: 17.3940636, _longitude: 78.4565447},
// //     day: true,
// //     email: 'era@gmail.com',
// //     files: [
// //       {
// //         mime: 'image/png',
// //         uri:
// //           'https://firebasestorage.googleapis.com/v0/b/kanta-ddb2c.appspot.com/o/photos%2Fuo33uo1cEffWFP01lSTDWD6froh2%2F1587613634091.png?alt=media&token=35c0c115-5c6b-4406-8d8b-2525dbcda255',
// //         height: 1920,
// //         width: 1080,
// //       },
// //     ],
// //     geohash: 'tepfcq6rc',
// //     hallRenting: '700',
// //     isHearted: false,
// //     key: 'uo33uo1cEffWFP01lSTDWD6froh2',
// //     night: true,
// //     ownerId: 'uo33uo1cEffWFP01lSTDWD6froh2',
// //     partyHallName: 'Another new mo',
// //     photographing: '',
// //     timestamp: 1587613645557,
// //     videoShooting: '',
// //     weddingStage: '',
// //   },
// //   {
// //     CateringPrice: '',
// //     address:
// //       '11-3-193, Bazar Ghat, New Mallepally, Hyderabad, Telangana 500001, India',
// //     cabacity: '780',
// //     contactNo: '999099164',
// //     coordinate: {latitude: 17.3940636, longitude: 78.4565447},
// //     coords: {_latitude: 17.3940636, _longitude: 78.4565447},
// //     day: true,
// //     email: 'tra@gmail.com',
// //     files: [
// //       {
// //         mime: 'image/png',
// //         uri:
// //           'https://firebasestorage.googleapis.com/v0/b/kanta-ddb2c.appspot.com/o/photos%2FzB0qmD0Ae3hVkx7I27OltbjdxCR2%2F1587613540066.png?alt=media&token=d5a41c0c-faa0-4df1-bcd5-2bbf8ab83e03',
// //         height: 495,
// //         width: 1080,
// //       },
// //     ],
// //     geohash: 'tepfcq6rc',
// //     hallRenting: '706',
// //     isHearted: false,
// //     key: 'zB0qmD0Ae3hVkx7I27OltbjdxCR2',
// //     night: true,
// //     ownerId: 'zB0qmD0Ae3hVkx7I27OltbjdxCR2',
// //     partyHallName: 'Another new',
// //     photographing: '',
// //     timestamp: 1587613548589,
// //     videoShooting: '',
// //     weddingStage: '',
// //   },
// //   {
// //     CateringPrice: '',
// //     address:
// //       '11-3-193, Bazar Ghat, New Mallepally, Hyderabad, Telangana 500001, India',
// //     cabacity: '790',
// //     contactNo: '999099133',
// //     coordinate: {latitude: 17.3940636, longitude: 78.4565447},
// //     coords: {_latitude: 17.3940636, _longitude: 78.4565447},
// //     day: true,
// //     email: 'tray@gmail.com',
// //     files: [
// //       {
// //         mime: 'image/png',
// //         uri:
// //           'https://firebasestorage.googleapis.com/v0/b/kanta-ddb2c.appspot.com/o/photos%2F3xqDMIkCfWOL3cQhzhBL3be6LGn2%2F1587613250635.png?alt=media&token=9e588953-0230-4e38-8029-1d26064a58a0',
// //         height: 1920,
// //         width: 1080,
// //       },
// //     ],
// //     geohash: 'tepfcq6rc',
// //     hallRenting: '700',
// //     isHearted: false,
// //     key: '3xqDMIkCfWOL3cQhzhBL3be6LGn2',
// //     night: true,
// //     ownerId: '3xqDMIkCfWOL3cQhzhBL3be6LGn2',
// //     partyHallName: 'Another',
// //     photographing: '',
// //     timestamp: 1587613260528,
// //     videoShooting: '',
// //     weddingStage: '',
// //   },
// //   {
// //     CateringPrice: '',
// //     address:
// //       '11-3-944/1, Laxmi Nagar, Vijaynagar Colony, SBH Colony, Vijaya Nagar Colony, Hyderabad, Telangana 500057, India',
// //     cabacity: '600',
// //     contactNo: '199885654',
// //     coordinate: {latitude: 17.3940636, longitude: 78.4565447},
// //     coords: {_latitude: 17.3940636, _longitude: 78.4565447},
// //     day: true,
// //     email: 'test@testmail.com',
// //     files: [
// //       {
// //         mime: 'image/png',
// //         uri:
// //           'https://firebasestorage.googleapis.com/v0/b/kanta-ddb2c.appspot.com/o/photos%2F14QydYUAGBTszA1UqeZ5wxf16V12%2F1587594205794.png?alt=media&token=c0c4cfb8-d19c-4a37-881f-04317d79e0f0',
// //         height: 788,
// //         width: 1080,
// //       },
// //     ],
// //     geohash: 'tepfcq6rc',
// //     hallRenting: '999',
// //     isHearted: false,
// //     key: '14QydYUAGBTszA1UqeZ5wxf16V12',
// //     night: true,
// //     ownerId: '14QydYUAGBTszA1UqeZ5wxf16V12',
// //     partyHallName: 'Capital O 2523 N R Residency',
// //     photographing: '',
// //     timestamp: 1587594224331,
// //     videoShooting: '',
// //     weddingStage: '',
// //   },
// // ];

// // export default function() {
// //   // const {documentData, loading} = useContext(ListingContext);

// //   const [current, setCurrent] = useState(documentData[0]);

// //   const {coordinate} = documentData[0];
// //   const currentRegion = {
// //     ...coordinate,
// //     latitudeDelta: 0.00864195044303443,
// //     longitudeDelta: 0.000142817690068,
// //   };

// //   // const [initialRegion, setIntialRegion] = useState({currentRegion});

// //   // if (loading) {
// //   //   return (
// //   //     <View>
// //   //       <Text>Show Loading Indicator</Text>
// //   //     </View>
// //   //   );
// //   // }
// //   const map = useRef();
// //   const animation = new Value(0);
// //   const index = new Value(0);

// //   // setTimeout(index => {
// //   //   // if (currentIndex !== index) {
// //   //   // const currentIndex = Math.floor(index);
// //   //   const {coordinate} = documentData[0];
// //   //   map.animateToRegion(
// //   //     {
// //   //       ...coordinate,
// //   //       latitudeDelta: 0.00864195044303443,
// //   //       longitudeDelta: 0.000142817690068,
// //   //     },
// //   //     350,
// //   //   );
// //   //   // }
// //   // }, 10);

// //   useCode(
// //     () =>
// //       block([
// //         set(index, floor(divide(animation, CARD_WIDTH))),
// //         cond(
// //           greaterOrEq(index, documentData.length),
// //           set(index, documentData.length - 1),
// //         ),
// //         cond(lessOrEq(index, 0), set(index, 0)),
// //         call(
// //           [index],
// //           index => (index != current ? setCurrent(documentData[index]) : null),

// //           // index => console.log('current index', index),
// //           // {
// //           //   // const {coordinate} = documentData[0];
// //           //   const coordinate = {"longitude":66.4565447,"latitude":12.3940636}
// //           //   map.current.animateToRegion(
// //           //     {
// //           //       ...coordinate,
// //           //       latitudeDelta: 0.00864195044303443,
// //           //       longitudeDelta: 0.000142817690068,
// //           //     },
// //           //     350,
// //           //   );
// //           // },
// //           // console.log(
// //           //   'data at Index : ',
// //           //   index,
// //           //   '  => ',
// //           //   JSON.stringify(documentData[index]),
// //           // ),
// //         ),
// //       ]),
// //     [animation, index],
// //   );

// //   const getScaleStyle = index => {
// //     const inputRange = [
// //       (index - 1) * CARD_WIDTH,
// //       index * CARD_WIDTH,
// //       (index + 1) * CARD_WIDTH,
// //     ];
// //     const scale = interpolate(animation, {
// //       inputRange,
// //       outputRange: [1, 2.5, 1],
// //       extrapolate: Extrapolate.CLAMP,
// //     });
// //     return scale;
// //   };

// //   const getObacityStyle = index => {
// //     const inputRange = [
// //       (index - 1) * CARD_WIDTH,
// //       index * CARD_WIDTH,
// //       (index + 1) * CARD_WIDTH,
// //     ];
// //     const opacity = interpolate(animation, {
// //       inputRange,
// //       outputRange: [0.35, 1, 0.35],
// //       extrapolate: Extrapolate.CLAMP,
// //     });

// //     return opacity;
// //   };

// //   return (
// //     <View style={styles.container}>
// //       <MapView
// //         ref={map}
// //         style={styles.container}
// //         initialRegion={currentRegion}
// //         showsUserLocation={true}
// //         zoomEnabled={true}
// //         showsMyLocationButton={true}
// //         showsCompass={true}
// //         showScale={true}
// //         showsIndoors={true}>
// //         {documentData.map((marker, index) => {
// //           const scaleStyle = {
// //             transform: [
// //               {
// //                 scale: getScaleStyle(index),
// //               },
// //             ],
// //           };

// //           return (
// //             <MapView.Marker key={index} coordinate={marker.coordinate}>
// //               <Animated.View
// //                 style={[styles.markerWrap, {opacity: getObacityStyle(index)}]}>
// //                 <Animated.View style={[styles.ring, scaleStyle]} />
// //                 <View style={styles.marker} />
// //               </Animated.View>
// //             </MapView.Marker>
// //           );
// //         })}
// //       </MapView>

// //       <Animated.ScrollView
// //         horizontal
// //         scrollEventThrottle={1}
// //         showsHorizontalScrollIndicator={false}
// //         snapToInterval={width}
// //         onScroll={Animated.event([
// //           {
// //             nativeEvent: {
// //               contentOffset: {
// //                 x: animation,
// //               },
// //             },
// //           },
// //         ])}
// //         style={styles.scrollView}
// //         contentContainerStyle={styles.endPadding}>
// //         {documentData.map((marker, index) => (
// //           <Card key={index} data={marker} />
// //         ))}
// //       </Animated.ScrollView>
// //     </View>
// //   );
// // }

// // // const inputRange = [
// // //   multiply(sub(index, 1), CARD_WIDTH),
// // //   multiply(index, CARD_WIDTH),
// // //   multiply(add(index, 1), CARD_WIDTH),
// // // ];

// // // const opacity = interpolate(index, {
// // //   inputRange,
// // //   outputRange: [0.35, 1, 0.35],
// // //   extrapolate: Extrapolate.CLAMP,
// // // });

// // // const scale = interpolate(index, {
// // //   inputRange,
// // //   outputRange: [1, 2.5, 1],
// // //   extrapolate: Extrapolate.CLAMP,
// // // })
