

// import React from 'react';
// import {
//     StyleSheet,
//     View,
//     Dimensions,
//     Text,
//     Image,
//     TouchableOpacity,
//     Platform,
//     ScrollView, StatusBar
// } from 'react-native';

// import LinearGradient from 'react-native-linear-gradient';
// import * as geolib from 'geolib';

// import MapView, {
//     MAP_TYPES,
//     ProviderPropType,
//     Polyline,
//     Marker,
//     Polygon,
//     Overlay,
//     Circle,
//     AnimatedRegion
// } from 'react-native-maps';
// import MapViewDirections from 'react-native-maps-directions';
// // import LinearGradient from 'react-native-linear-gradient';

// // import {Platform, StyleSheet,FlatList, Text, TouchableOpacity, View, Button, TextInput, Image, Alert, AlertIOS} from 'react-native';

// const ic_action_back = require('../../../../images/ic_action_back.png');
// const direction_start = require('../../../../images/direction_start.png');
// const {width, height} = Dimensions.get('window');

// const ASPECT_RATIO = width / height;
// // 40.6341651,-73.964645
// const LATITUDE = 40.6341651;
// const LONGITUDE = -73.964645;
// const LATITUDE_DELTA = 1.5;
// const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

// //40.657314,-73.98085
// const LATITUDE_DEST1 = 40.657314;
// const LONGITUDE_DEST1 = -73.98085;

// //40.663575,-73.955214
// const LATITUDE_DEST2 = 40.663575;
// const LONGITUDE_DEST2 = -73.955214;

// // start:  40.663842,-73.959943
// //
// // end1: 40.6677813,-73.955665
// // end2: 40.665991,-73.94749

// const customStyle = [
//     {
//         "featureType": "all",
//         "elementType": "labels.text.fill",
//         "stylers": [
//             {
//                 "saturation": 36
//             },
//             {
//                 "color": "#000000"
//             },
//             {
//                 "lightness": 40
//             }
//         ]
//     },
//     {
//         "featureType": "all",
//         "elementType": "labels.text.stroke",
//         "stylers": [
//             {
//                 "visibility": "on"
//             },
//             {
//                 "color": "#000000"
//             },
//             {
//                 "lightness": 16
//             }
//         ]
//     },
//     {
//         "featureType": "all",
//         "elementType": "labels.icon",
//         "stylers": [
//             {
//                 "visibility": "off"
//             }
//         ]
//     },
//     {
//         "featureType": "administrative",
//         "elementType": "geometry.fill",
//         "stylers": [
//             {
//                 "color": "#000000"
//             },
//             {
//                 "lightness": 20
//             }
//         ]
//     },
//     {
//         "featureType": "administrative",
//         "elementType": "geometry.stroke",
//         "stylers": [
//             {
//                 "color": "#000000"
//             },
//             {
//                 "lightness": 17
//             },
//             {
//                 "weight": 1.2
//             }
//         ]
//     },
//     {
//         "featureType": "administrative",
//         "elementType": "labels",
//         "stylers": [
//             {
//                 "visibility": "on"
//             }
//         ]
//     },
//     {
//         "featureType": "administrative.country",
//         "elementType": "all",
//         "stylers": [
//             {
//                 "visibility": "simplified"
//             }
//         ]
//     },
//     {
//         "featureType": "administrative.country",
//         "elementType": "geometry",
//         "stylers": [
//             {
//                 "visibility": "simplified"
//             }
//         ]
//     },
//     {
//         "featureType": "administrative.country",
//         "elementType": "labels.text",
//         "stylers": [
//             {
//                 "visibility": "simplified"
//             }
//         ]
//     },
//     {
//         "featureType": "administrative.province",
//         "elementType": "all",
//         "stylers": [
//             {
//                 "visibility": "off"
//             }
//         ]
//     },
//     {
//         "featureType": "administrative.locality",
//         "elementType": "all",
//         "stylers": [
//             {
//                 "visibility": "simplified"
//             },
//             {
//                 "saturation": "-100"
//             },
//             {
//                 "lightness": "30"
//             }
//         ]
//     },
//     {
//         "featureType": "administrative.neighborhood",
//         "elementType": "all",
//         "stylers": [
//             {
//                 "visibility": "off"
//             }
//         ]
//     },
//     {
//         "featureType": "administrative.land_parcel",
//         "elementType": "all",
//         "stylers": [
//             {
//                 "visibility": "off"
//             }
//         ]
//     },
//     {
//         "featureType": "landscape",
//         "elementType": "all",
//         "stylers": [
//             {
//                 "visibility": "simplified"
//             },
//             {
//                 "gamma": "0.00"
//             },
//             {
//                 "lightness": "74"
//             }
//         ]
//     },
//     {
//         "featureType": "landscape",
//         "elementType": "geometry",
//         "stylers": [
//             {
//                 "color": "#34334f"
//             },
//             {
//                 "lightness": "-37"
//             }
//         ]
//     },
//     {
//         "featureType": "landscape.man_made",
//         "elementType": "all",
//         "stylers": [
//             {
//                 "lightness": "3"
//             }
//         ]
//     },
//     {
//         "featureType": "poi",
//         "elementType": "all",
//         "stylers": [
//             {
//                 "visibility": "off"
//             }
//         ]
//     },
//     {
//         "featureType": "poi",
//         "elementType": "geometry",
//         "stylers": [
//             {
//                 "color": "#000000"
//             },
//             {
//                 "lightness": 21
//             }
//         ]
//     },
//     {
//         "featureType": "road",
//         "elementType": "geometry",
//         "stylers": [
//             {
//                 "visibility": "simplified"
//             }
//         ]
//     },
//     {
//         "featureType": "road.highway",
//         "elementType": "geometry.fill",
//         "stylers": [
//             {
//                 "color": "#2d2c45"
//             },
//             {
//                 "lightness": "0"
//             }
//         ]
//     },
//     {
//         "featureType": "road.highway",
//         "elementType": "geometry.stroke",
//         "stylers": [
//             {
//                 "color": "#000000"
//             },
//             {
//                 "lightness": 29
//             },
//             {
//                 "weight": 0.2
//             }
//         ]
//     },
//     {
//         "featureType": "road.highway",
//         "elementType": "labels.text.fill",
//         "stylers": [
//             {
//                 "color": "#7d7c9b"
//             },
//             {
//                 "lightness": "43"
//             }
//         ]
//     },
//     {
//         "featureType": "road.highway",
//         "elementType": "labels.text.stroke",
//         "stylers": [
//             {
//                 "visibility": "off"
//             }
//         ]
//     },
//     {
//         "featureType": "road.arterial",
//         "elementType": "geometry",
//         "stylers": [
//             {
//                 "color": "#2d2c45"
//             },
//             {
//                 "lightness": "1"
//             }
//         ]
//     },
//     {
//         "featureType": "road.arterial",
//         "elementType": "labels.text",
//         "stylers": [
//             {
//                 "visibility": "on"
//             }
//         ]
//     },
//     {
//         "featureType": "road.arterial",
//         "elementType": "labels.text.fill",
//         "stylers": [
//             {
//                 "color": "#7d7c9b"
//             }
//         ]
//     },
//     {
//         "featureType": "road.arterial",
//         "elementType": "labels.text.stroke",
//         "stylers": [
//             {
//                 "visibility": "off"
//             }
//         ]
//     },
//     {
//         "featureType": "road.local",
//         "elementType": "geometry",
//         "stylers": [
//             {
//                 "color": "#2d2c45"
//             },
//             {
//                 "lightness": "-1"
//             },
//             {
//                 "gamma": "1"
//             }
//         ]
//     },
//     {
//         "featureType": "road.local",
//         "elementType": "labels.text",
//         "stylers": [
//             {
//                 "visibility": "on"
//             },
//             {
//                 "hue": "#ff0000"
//             }
//         ]
//     },
//     {
//         "featureType": "road.local",
//         "elementType": "labels.text.fill",
//         "stylers": [
//             {
//                 "color": "#7d7c9b"
//             },
//             {
//                 "lightness": "-31"
//             }
//         ]
//     },
//     {
//         "featureType": "road.local",
//         "elementType": "labels.text.stroke",
//         "stylers": [
//             {
//                 "visibility": "off"
//             }
//         ]
//     },
//     {
//         "featureType": "transit",
//         "elementType": "geometry",
//         "stylers": [
//             {
//                 "color": "#2d2c45"
//             },
//             {
//                 "lightness": "-36"
//             }
//         ]
//     },
//     {
//         "featureType": "water",
//         "elementType": "geometry",
//         "stylers": [
//             {
//                 "color": "#2d2c45"
//             },
//             {
//                 "lightness": "0"
//             },
//             {
//                 "gamma": "1"
//             }
//         ]
//     },
//     {
//         "featureType": "water",
//         "elementType": "labels.text.stroke",
//         "stylers": [
//             {
//                 "visibility": "off"
//             }
//         ]
//     }
// ];

// const GOOGLE_MAPS_APIKEY = 'AIzaSyCx60-3gx-i-UgRKTSErDhX7ZEmvb_yo5c';

// let mapStyle = null;

// class MapStyle extends React.Component {
//     constructor(props) {
//         super(props);

//         mapStyle = this;
//         this.state = {
//             region: {
//                 latitude: LATITUDE,
//                 longitude: LONGITUDE,
//                 latitudeDelta: LATITUDE_DELTA,
//                 longitudeDelta: LONGITUDE_DELTA,
//             },
//             coordinate: new AnimatedRegion({
//                 latitude: LATITUDE_DEST1,
//                 longitude: LONGITUDE_DEST1,
//             }),
//             latitudeDestination: LATITUDE_DEST1,
//             longitudeDestination: LONGITUDE_DEST1,
//         };
//     }

//     onRegionChange(region) {
//         this.setState({region});
//     }

//     animateToRandomBearing() {
//         this.map.animateToBearing(this.getBearingFromLocation(), 700);
//     }

//     getBearingFromLocation() {

//         if (this.state.latitudeDestination !== LATITUDE_DEST1) {
//             this.setState({

//                 latitudeDestination: LATITUDE_DEST1,
//                 longitudeDestination: LONGITUDE_DEST1
//             })
//         }
//         else {
//             this.setState({

//                 latitudeDestination: LATITUDE_DEST2,
//                 longitudeDestination: LONGITUDE_DEST2
//             })
//         }

//         let bearing = geolib.getBearing(
//             {latitude: LATITUDE, longitude: LONGITUDE},
//             {latitude: this.state.latitudeDestination, longitude: this.state.longitudeDestination}
//         );

//         this.animate();

//         return bearing;
//     }

//     animate() {
//         const {coordinate} = this.state;
//         const newCoordinate = {
//             // latitude: LATITUDE + ((Math.random() - 0.5) * (LATITUDE_DELTA / 2)),
//             // longitude: LONGITUDE + ((Math.random() - 0.5) * (LONGITUDE_DELTA / 2)),
//             latitude: ((mapStyle.state.latitudeDestination)),
//             longitude: ((mapStyle.state.longitudeDestination)),
//         };

//         if (Platform.OS === 'android') {
//             if (this.marker) {
//                 this.marker._component.animateMarkerToCoordinate(newCoordinate, 500);
//             }
//         } else {
//             coordinate.timing(newCoordinate).start();
//         }
//     }

//     render() {
//         return (
//             <View style={styles.container}>
//                 <MapView

//                     ref={ref => {
//                         this.map = ref;
//                     }}
//                     provider={this.props.provider}
//                     style={styles.map}
//                     followsUserLocation={false}
//                     loadingEnabled={true}
//                     showsIndoorLevelPicker={false}
//                     initialRegion={{
//                         latitude: LATITUDE,
//                         longitude: LONGITUDE,
//                         latitudeDelta: LATITUDE_DELTA,
//                         longitudeDelta: LONGITUDE_DELTA,
//                     }}
//                     customMapStyle={customStyle}
//                     onRegionChange={region => this.onRegionChange(region)}
//                 >

//                       <Polyline
//                         coordinates={[
//                             { latitude:LATITUDE, longitude: LONGITUDE },
//                             // { latitude: 37.7896386, longitude: -122.421646 },
//                             { latitude: this.state.latitudeDestination, longitude: this.state.longitudeDestination },
//                         ]}
//                         strokeColor="#FC2681" // fallback for when `strokeColors` is not supported by the map-provider
//                         strokeColors={[
//                             '#00AEFB',
//                             '#FC2681'
//                         ]}
//                         strokeWidth={3}
//                         lineCap={"round"}
//                         lineJoin={"round"}
//                         geodesic={true}
//                     />

//                     {/* <Circle
//                         center={{latitude: 37.8025259, longitude: -122.4351431}}
//                         radius={120}
//                         strokeWidth={5}
//                         lineCap="square"
//                         strokeColor="#00AEFB"
//                         fillColor="#00AEFB"
//                         zIndex={5}
//                     /> */}

//                     {/* <Circle
//                         center={{latitude: 37.7665248, longitude: -122.4161628}}
//                         radius={120}

//                         strokeColor="#ffff"
//                         fillColor="#ffff"
//                     /> */}

//                     <MapViewDirections
//                         origin={{latitude: LATITUDE, longitude: LONGITUDE}}
//                         destination={{
//                             latitude: this.state.latitudeDestination,
//                             longitude: this.state.longitudeDestination
//                         }}
//                         apikey={GOOGLE_MAPS_APIKEY}
//                         strokeWidth={3}
//                         strokeColor="#FC2681"

//                         onStart={(params) => {
//                             console.log(`Started routing between "${params.origin}" and "${params.destination}"`);
//                         }}
//                         onReady={(result) => {
//                             this.map.fitToCoordinates(result.coordinates, {
//                                 edgePadding: {
//                                     right: 160,
//                                     bottom: 500,
//                                     left: 160,
//                                     top: 900,
//                                 }
//                             });
//                         }}
//                         onError={(errorMessage) => {
//                             console.log('GOT AN ERROR' + errorMessage);
//                         }}
//                     />

//                       {/* <Marker
//                         coordinate={ { latitude: 37.8025259, longitude: -122.4351431 }}
//                         image={direction_start}
//                     /> */}

//                        {/* <Marker.Animated
//                         ref={marker => { this.marker = marker; }}
//                         coordinate={this.state.coordinate}
//                         image={direction_start}
//                     /> */}

//                 </MapView>

//                 <View style={{
//                     flex: 1,
//                     width: '100%',
//                     height: '100%',
//                     justifyContent: 'space-between',
//                 }}>

//                     <MapHeader/>

//                     <TouchableOpacity
//                         onPress={() => this.animateToRandomBearing()
//                         }
//                         style={styles.BottomContainer}

//                     >

//                         <Text style={{color: '#000000'}}> (Bearing)</Text>

//                     </TouchableOpacity>

//                 </View>

//             </View>
//         );
//     }
// }

// class MapHeader extends React.Component {

//     constructor(props) {
//         super(props);
//     }

//     render() {
//         return (
//             <LinearGradient colors={['#8301FF', '#30ACFF']}
//                             start={{x: 0.0, y: 1.0}} end={{x: 1.0, y: 1.0}}
//                             style={{
//                                 height: 200, width: '100%',
//                                 borderBottomLeftRadius: 16,
//                                 borderBottomRightRadius: 16,
//                                 paddingBottom: 8
//                             }}
//             >
//                 <StatusBar
//                     backgroundColor="#00000000"
//                     barStyle="default"
//                     translucent={true}
//                 />
//                 <View style={{
//                     paddingTop: 24,
//                     width: '100%',
//                     alignItems: 'center',
//                     flexDirection: 'row',
//                     justifyContent: 'space-between',
//                 }}>

//                     <Image source={ic_action_back}
//                            resizeMode='center'
//                     />

//                     <Text style={{
//                         textAlign: 'center',
//                         paddingLeft: 20,
//                         paddingRight: 20,
//                         color: '#FFFFFF'
//                     }}>SEE ALL</Text>

//                 </View>
//                 <View style={{
//                     flex: 1,
//                     justifyContent: 'flex-end',
//                     padding: 10,
//                     alignItems: 'flex-start',
//                 }}>
//                     <Text style={{
//                         textAlign: 'center',
//                         color: '#FFFFFF',
//                         opacity: 0.6
//                     }}>Restaurants</Text>
//                     <Text style={{
//                         textAlign: 'center',
//                         fontSize: 30,
//                         fontFamily: 'Roboto',
//                         color: '#FFFFFF'
//                     }}>Brooklyn</Text>
//                     <Text style={{
//                         textAlign: 'center',
//                         color: '#FFFFFF',
//                         opacity: 0.6
//                     }}>3164, Anthony Avenue</Text>
//                 </View>

//             </LinearGradient>

//         )
//     }

// }

// MapStyle.propTypes = {
//     provider: ProviderPropType,
// };

// const styles = StyleSheet.create({
//     contentContainer: {
//         paddingVertical: 20
//     },
//     Header: {
//         left: 0,
//         right: 0,
//         bottom: 0,
//         height: 10,
//         flexDirection: 'column',
//         justifyContent: 'center',
//     },
//     BottomContainer: {
//         marginLeft: 20,
//         marginRight: 20,
//         marginBottom: 20,
//         width: 350,
//         height: '15%',
//         flexDirection: 'column',
//         backgroundColor: 'rgba(255,255,255,0.9)',
//         borderRadius: 20,
//     },

//     container: {
//         ...StyleSheet.absoluteFillObject,
//         height: '100%',
//         width: '100%',
//         justifyContent: 'flex-start',
//         alignItems: 'center',
//     },
//     map: {
//         ...StyleSheet.absoluteFillObject,

//         backgroundColor: '#000000',
//     },
//     linearGradient: {
//         width: '100%',
//         height: '25%',
//         borderBottomLeftRadius: 16,
//         borderBottomRightRadius: 16,
//     },
//     buttonText: {
//         fontSize: 18,
//         fontFamily: 'Gill Sans',
//         fontWeight: 'normal',
//         textAlign: 'center',
//         margin: 10,
//         color: '#ffffff',
//         backgroundColor: 'transparent',
//     },
//     bubble: {
//         flex: 1,
//         backgroundColor: 'rgba(255,255,255,0.7)',
//         paddingHorizontal: 18,
//         paddingVertical: 12,
//         borderRadius: 20,
//     },
//     latlng: {
//         width: 200,
//         alignItems: 'stretch',
//     },
//     button: {
//         width: 80,
//         paddingHorizontal: 12,
//         alignItems: 'center',
//         marginHorizontal: 10,
//     },
//     buttonContainer: {
//         flexDirection: 'row',
//         marginVertical: 20,
//         backgroundColor: 'transparent',
//     },
// });

// export default MapStyle;



// import React, { Component } from "react";
// import {
//   ScrollView,
//   Animated,
//   Dimensions,
//   TouchableWithoutFeedback
//   Platform, 
//   StyleSheet,
//   FlatList, 
//   Text, 
//   TouchableOpacity, 
//   View, 
//   Button, 
//   TextInput, 
//   Image, 
//   Alert, 
//   AlertIOS
// } from "react-native";

// import FastImage from "react-native-fast-image";
// import LinearGradient from 'react-native-linear-gradient';



// import MapViewDirections from 'react-native-maps-directions';
// import MapView, {
//       MAP_TYPES,
//       ProviderPropType,
//       Polyline,
//       Marker,
//       Polygon,
//       Overlay,
//       Circle,
//       AnimatedRegion
//   }  from "react-native-maps";
// import * as geolib from 'geolib';


// const { width, height } = Dimensions.get("window");

// const ic_action_back = require('../../../../images/ic_action_back.png');
// const direction_start = require('../../../../images/direction_start.png');

// const CARD_HEIGHT = height / 3;
// const CARD_WIDTH = width - 40;

// let mapStyle = null;

// const customStyle = [
//     {
//         "featureType": "all",
//         "elementType": "labels.text.fill",
//         "stylers": [
//             {
//                 "saturation": 36
//             },
//             {
//                 "color": "#000000"
//             },
//             {
//                 "lightness": 40
//             }
//         ]
//     },
//     {
//         "featureType": "all",
//         "elementType": "labels.text.stroke",
//         "stylers": [
//             {
//                 "visibility": "on"
//             },
//             {
//                 "color": "#000000"
//             },
//             {
//                 "lightness": 16
//             }
//         ]
//     },
//     {
//         "featureType": "all",
//         "elementType": "labels.icon",
//         "stylers": [
//             {
//                 "visibility": "off"
//             }
//         ]
//     },
//     {
//         "featureType": "administrative",
//         "elementType": "geometry.fill",
//         "stylers": [
//             {
//                 "color": "#000000"
//             },
//             {
//                 "lightness": 20
//             }
//         ]
//     },
//     {
//         "featureType": "administrative",
//         "elementType": "geometry.stroke",
//         "stylers": [
//             {
//                 "color": "#000000"
//             },
//             {
//                 "lightness": 17
//             },
//             {
//                 "weight": 1.2
//             }
//         ]
//     },
//     {
//         "featureType": "administrative",
//         "elementType": "labels",
//         "stylers": [
//             {
//                 "visibility": "on"
//             }
//         ]
//     },
//     {
//         "featureType": "administrative.country",
//         "elementType": "all",
//         "stylers": [
//             {
//                 "visibility": "simplified"
//             }
//         ]
//     },
//     {
//         "featureType": "administrative.country",
//         "elementType": "geometry",
//         "stylers": [
//             {
//                 "visibility": "simplified"
//             }
//         ]
//     },
//     {
//         "featureType": "administrative.country",
//         "elementType": "labels.text",
//         "stylers": [
//             {
//                 "visibility": "simplified"
//             }
//         ]
//     },
//     {
//         "featureType": "administrative.province",
//         "elementType": "all",
//         "stylers": [
//             {
//                 "visibility": "off"
//             }
//         ]
//     },
//     {
//         "featureType": "administrative.locality",
//         "elementType": "all",
//         "stylers": [
//             {
//                 "visibility": "simplified"
//             },
//             {
//                 "saturation": "-100"
//             },
//             {
//                 "lightness": "30"
//             }
//         ]
//     },
//     {
//         "featureType": "administrative.neighborhood",
//         "elementType": "all",
//         "stylers": [
//             {
//                 "visibility": "off"
//             }
//         ]
//     },
//     {
//         "featureType": "administrative.land_parcel",
//         "elementType": "all",
//         "stylers": [
//             {
//                 "visibility": "off"
//             }
//         ]
//     },
//     {
//         "featureType": "landscape",
//         "elementType": "all",
//         "stylers": [
//             {
//                 "visibility": "simplified"
//             },
//             {
//                 "gamma": "0.00"
//             },
//             {
//                 "lightness": "74"
//             }
//         ]
//     },
//     {
//         "featureType": "landscape",
//         "elementType": "geometry",
//         "stylers": [
//             {
//                 "color": "#34334f"
//             },
//             {
//                 "lightness": "-37"
//             }
//         ]
//     },
//     {
//         "featureType": "landscape.man_made",
//         "elementType": "all",
//         "stylers": [
//             {
//                 "lightness": "3"
//             }
//         ]
//     },
//     {
//         "featureType": "poi",
//         "elementType": "all",
//         "stylers": [
//             {
//                 "visibility": "off"
//             }
//         ]
//     },
//     {
//         "featureType": "poi",
//         "elementType": "geometry",
//         "stylers": [
//             {
//                 "color": "#000000"
//             },
//             {
//                 "lightness": 21
//             }
//         ]
//     },
//     {
//         "featureType": "road",
//         "elementType": "geometry",
//         "stylers": [
//             {
//                 "visibility": "simplified"
//             }
//         ]
//     },
//     {
//         "featureType": "road.highway",
//         "elementType": "geometry.fill",
//         "stylers": [
//             {
//                 "color": "#2d2c45"
//             },
//             {
//                 "lightness": "0"
//             }
//         ]
//     },
//     {
//         "featureType": "road.highway",
//         "elementType": "geometry.stroke",
//         "stylers": [
//             {
//                 "color": "#000000"
//             },
//             {
//                 "lightness": 29
//             },
//             {
//                 "weight": 0.2
//             }
//         ]
//     },
//     {
//         "featureType": "road.highway",
//         "elementType": "labels.text.fill",
//         "stylers": [
//             {
//                 "color": "#7d7c9b"
//             },
//             {
//                 "lightness": "43"
//             }
//         ]
//     },
//     {
//         "featureType": "road.highway",
//         "elementType": "labels.text.stroke",
//         "stylers": [
//             {
//                 "visibility": "off"
//             }
//         ]
//     },
//     {
//         "featureType": "road.arterial",
//         "elementType": "geometry",
//         "stylers": [
//             {
//                 "color": "#2d2c45"
//             },
//             {
//                 "lightness": "1"
//             }
//         ]
//     },
//     {
//         "featureType": "road.arterial",
//         "elementType": "labels.text",
//         "stylers": [
//             {
//                 "visibility": "on"
//             }
//         ]
//     },
//     {
//         "featureType": "road.arterial",
//         "elementType": "labels.text.fill",
//         "stylers": [
//             {
//                 "color": "#7d7c9b"
//             }
//         ]
//     },
//     {
//         "featureType": "road.arterial",
//         "elementType": "labels.text.stroke",
//         "stylers": [
//             {
//                 "visibility": "off"
//             }
//         ]
//     },
//     {
//         "featureType": "road.local",
//         "elementType": "geometry",
//         "stylers": [
//             {
//                 "color": "#2d2c45"
//             },
//             {
//                 "lightness": "-1"
//             },
//             {
//                 "gamma": "1"
//             }
//         ]
//     },
//     {
//         "featureType": "road.local",
//         "elementType": "labels.text",
//         "stylers": [
//             {
//                 "visibility": "on"
//             },
//             {
//                 "hue": "#ff0000"
//             }
//         ]
//     },
//     {
//         "featureType": "road.local",
//         "elementType": "labels.text.fill",
//         "stylers": [
//             {
//                 "color": "#7d7c9b"
//             },
//             {
//                 "lightness": "-31"
//             }
//         ]
//     },
//     {
//         "featureType": "road.local",
//         "elementType": "labels.text.stroke",
//         "stylers": [
//             {
//                 "visibility": "off"
//             }
//         ]
//     },
//     {
//         "featureType": "transit",
//         "elementType": "geometry",
//         "stylers": [
//             {
//                 "color": "#2d2c45"
//             },
//             {
//                 "lightness": "-36"
//             }
//         ]
//     },
//     {
//         "featureType": "water",
//         "elementType": "geometry",
//         "stylers": [
//             {
//                 "color": "#2d2c45"
//             },
//             {
//                 "lightness": "0"
//             },
//             {
//                 "gamma": "1"
//             }
//         ]
//     },
//     {
//         "featureType": "water",
//         "elementType": "labels.text.stroke",
//         "stylers": [
//             {
//                 "visibility": "off"
//             }
//         ]
//     }
// ];


// const ASPECT_RATIO = width / height;
// const GOOGLE_MAPS_APIKEY = 'AIzaSyCx60-3gx-i-UgRKTSErDhX7ZEmvb_yo5c';

// export default class MapViewScreen extends Component {

//   constructor(props) {
//     super(props);

//     mapStyle = this;
//     this.state = {
//     serverData: this.props.navigation.state.params.data,

//         region: {
//           latitude: 17.4126274,
//           longitude: 78.2679583,
//           latitudeDelta: 1.5,
//           longitudeDelta: 1.5 * ASPECT_RATIO
//         },
//         coordinate: new AnimatedRegion({
//             latitude: this.props.navigation.state.params.data[0].coordinate.latitude,
//             longitude: this.props.navigation.state.params.data[0].coordinate.longitude,
//         }),
//         latitudeDestination: this.props.navigation.state.params.data[0].coordinate.latitude,
//         longitudeDestination: this.props.navigation.state.params.data[0].coordinate.longitude,
//     };
// }

//   UNSAFE_componentWillMount() {
//     this.index = 0;
//     this.animation = new Animated.Value(0);
//   }

//   componentDidMount() {
//     // We should detect when scrolling has stopped then animate
//     // We should just debounce the event listener here
//     // console.log(this.props.navigation.state.params.data[1].coordinate)

//     const {coordinate} = this.state;
//     const newCoordinate = {
//       latitude: ((mapStyle.state.latitudeDestination)),
//       longitude: ((mapStyle.state.longitudeDestination)),
//   };

//       if (Platform.OS === 'android') {
//         if (this.marker) {
//             this.marker._component.animateMarkerToCoordinate(newCoordinate, 500);
//         }
//         } else {
//             coordinate.timing(newCoordinate).start();
//         }

//     this.animation.addListener(({ value }) => {
//       let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
//       if (index >= this.state.serverData.length) {
//         index = this.state.serverData.length - 1;
//       }
//       if (index <= 0) {
//         index = 0;
//       }

//       clearTimeout(this.regionTimeout);
//       this.regionTimeout = setTimeout(() => {
//         if (this.index !== index) {
//           this.index = index;
//           const { coordinate } = this.state.serverData[index];
//           this.map.animateToRegion(
//             {
//               ...coordinate,
//               latitudeDelta: this.state.region.latitudeDelta,
//               longitudeDelta: this.state.region.longitudeDelta
//             },
//             350
//           );
//         }
//       }, 10);
//     });
//   }


//   onRegionChange(region) {
//     this.setState({region});
//   }

// // animateToRandomBearing() {
// //     this.map.animateToBearing(this.getBearingFromLocation(), 700);
// // }

// // getBearingFromLocation() {

// //     // if (this.state.latitudeDestination !== LATITUDE_DEST1) {
// //     //     this.setState({

// //     //         latitudeDestination: LATITUDE_DEST1,
// //     //         longitudeDestination: LONGITUDE_DEST1
// //     //     })
// //     // }
// //     // else {
// //     //     this.setState({

// //     //         latitudeDestination: LATITUDE_DEST2,
// //     //         longitudeDestination: LONGITUDE_DEST2
// //     //     })
// //     // }

// //     let bearing = geolib.getBearing(
// //         {latitude: LATITUDE, longitude: LONGITUDE},
// //         {latitude: this.state.latitudeDestination, longitude: this.state.longitudeDestination}
// //     );

// //     this.animate();

// //     return bearing;
// // }

// // animate() {
// //     const {coordinate} = this.state;
// //     const newCoordinate = {
// //         // latitude: LATITUDE + ((Math.random() - 0.5) * (LATITUDE_DELTA / 2)),
// //         // longitude: LONGITUDE + ((Math.random() - 0.5) * (LONGITUDE_DELTA / 2)),
// //         latitude: ((mapStyle.state.latitudeDestination)),
// //         longitude: ((mapStyle.state.longitudeDestination)),
// //     };

// //     if (Platform.OS === 'android') {
// //         if (this.marker) {
// //             this.marker._component.animateMarkerToCoordinate(newCoordinate, 500);
// //         }
// //     } else {
// //         coordinate.timing(newCoordinate).start();
// //     }
// // }

//   //Marker Opacity 
//   _interpolateMarker = () => {
//     const interpolations = this.state.serverData.map((marker, index) => {
//       const inputRange = [
//         (index - 1) * CARD_WIDTH,
//         index * CARD_WIDTH,
//         ((index + 1) * CARD_WIDTH),
//       ];
//       const scale = this.animation.interpolate({
//         inputRange,
//         outputRange: [1, 2.5, 1],
//         extrapolate: "clamp",
//       });
//       const opacity = this.animation.interpolate({
//         inputRange,
//         outputRange: [0.35, 1, 0.35],
//         extrapolate: "clamp",
//       });
//       return { scale, opacity };
//     });
//   };

//   render() {
//     const interpolateMarker = this._interpolateMarker();
    

//     return (
//       <View style={styles.container}>
//         <MapView
//           ref={map => (this.map = map)}
//           initialRegion={this.state.region}
//           style={styles.container}
//         >
//           {this.state.serverData.map((marker, index) => {
//             const scaleStyle = {
//               transform: [
//                 {
//                   scale: interpolations[index].scale
//                 }
//               ]
//             };
//             const opacityStyle = {
//               opacity: interpolations[index].opacity
//             };
//             return (
//               <MapView.Marker key={index} coordinate={marker.coordinate}>
//                 <Animated.View style={[styles.markerWrap, opacityStyle]}>
//                   <Animated.View style={[styles.ring, scaleStyle]} />
//                   <View style={styles.marker} />
//                 </Animated.View>
//               </MapView.Marker>
//             );
//           })}
//         </MapView>
//         <Animated.ScrollView
//           horizontal
//           scrollEventThrottle={1}
//           showsHorizontalScrollIndicator={false}
//           snapToInterval={CARD_WIDTH}
//           onScroll={Animated.event(
//             [
//               {
//                 nativeEvent: {
//                   contentOffset: {
//                     x: this.animation
//                   }
//                 }
//               }
//             ],
//             { useNativeDriver: true }
//           )}
//           style={styles.scrollView}
//           contentContainerStyle={styles.endPadding}
//         >
//           {this.state.serverData.map((data, index) => (
//             <View style={styles.card} key={index}>
//               <FastImage
//                 style={styles.cardImage}
//                 source={{
//                   uri: data.files[0].uri,
//                   priority: FastImage.priority.normal,
//                   cashe: FastImage.cacheControl.immutable
//                 }}
//                 resizeMode={FastImage.resizeMode.cover}
//                 // onProgress={e => console.log('progress :',e.nativeEvent.loaded / e.nativeEvent.total)}
//                 // onLoad={e => console.log('loaded: ', e.nativeEvent.width, e.nativeEvent.height)}
//                 // onError={error => console.log('error loading: ', error)}
//                 // onLoadEnd={console.log('finished loading')}
//                 // fallback= {true}
//               />
//               <TouchableWithoutFeedback
//                 onPress={() =>
//                   this.props.navigation.navigate("Details", { data: data })
//                 }
//               >
//                 <View style={styles.textContent}>
//                   <Text numberOfLines={1} style={styles.cardtitle}>
//                     {data.partyHallName}
//                   </Text>
//                   <Text numberOfLines={1} style={styles.cardDescription}>
//                     {data.address}
//                   </Text>
//                 </View>
//               </TouchableWithoutFeedback>
//             </View>
//           ))}
//         </Animated.ScrollView>
//       </View>
//     );
//   }
// }

// class MapHeader extends React.Component {

//   constructor(props) {
//       super(props);
//   }

//   render() {
//       return (
//           <LinearGradient colors={['#8301FF', '#30ACFF']}
//                           start={{x: 0.0, y: 1.0}} end={{x: 1.0, y: 1.0}}
//                           style={{
//                               height: 200, width: '100%',
//                               borderBottomLeftRadius: 16,
//                               borderBottomRightRadius: 16,
//                               paddingBottom: 8
//                           }}
//           >
//               <StatusBar
//                   backgroundColor="#00000000"
//                   barStyle="default"
//                   translucent={true}
//               />
//               <View style={{
//                   paddingTop: 24,
//                   width: '100%',
//                   alignItems: 'center',
//                   flexDirection: 'row',
//                   justifyContent: 'space-between',
//               }}>

//                   <Image source={ic_action_back}
//                          resizeMode='center'
//                   />

//                   <Text style={{
//                       textAlign: 'center',
//                       paddingLeft: 20,
//                       paddingRight: 20,
//                       color: '#FFFFFF'
//                   }}>SEE ALL</Text>

//               </View>
//               <View style={{
//                   flex: 1,
//                   justifyContent: 'flex-end',
//                   padding: 10,
//                   alignItems: 'flex-start',
//               }}>
//                   <Text style={{
//                       textAlign: 'center',
//                       color: '#FFFFFF',
//                       opacity: 0.6
//                   }}>Restaurants</Text>
//                   <Text style={{
//                       textAlign: 'center',
//                       fontSize: 30,
//                       fontFamily: 'Roboto',
//                       color: '#FFFFFF'
//                   }}>Brooklyn</Text>
//                   <Text style={{
//                       textAlign: 'center',
//                       color: '#FFFFFF',
//                       opacity: 0.6
//                   }}>3164, Anthony Avenue</Text>
//               </View>

//           </LinearGradient>

//       )
//   }

// }


// MapStyle.propTypes = {
//   provider: ProviderPropType,
// };

// const styles = StyleSheet.create({
//   contentContainer: {
//     paddingVertical: 20
//   },
//   Header: {
//       left: 0,
//       right: 0,
//       bottom: 0,
//       height: 10,
//       flexDirection: 'column',
//       justifyContent: 'center',
//   },
//   BottomContainer: {
//       marginLeft: 20,
//       marginRight: 20,
//       marginBottom: 20,
//       width: 350,
//       height: '15%',
//       flexDirection: 'column',
//       backgroundColor: 'rgba(255,255,255,0.9)',
//       borderRadius: 20,
//   },

//   container: {
//       ...StyleSheet.absoluteFillObject,
//       height: '100%',
//       width: '100%',
//       justifyContent: 'flex-start',
//       alignItems: 'center',
//   },
//   map: {
//       ...StyleSheet.absoluteFillObject,

//       backgroundColor: '#000000',
//   },
//   linearGradient: {
//       width: '100%',
//       height: '25%',
//       borderBottomLeftRadius: 16,
//       borderBottomRightRadius: 16,
//   },
//   buttonText: {
//       fontSize: 18,
//       fontFamily: 'Gill Sans',
//       fontWeight: 'normal',
//       textAlign: 'center',
//       margin: 10,
//       color: '#ffffff',
//       backgroundColor: 'transparent',
//   },
//   bubble: {
//       flex: 1,
//       backgroundColor: 'rgba(255,255,255,0.7)',
//       paddingHorizontal: 18,
//       paddingVertical: 12,
//       borderRadius: 20,
//   },
//   latlng: {
//       width: 200,
//       alignItems: 'stretch',
//   },
//   button: {
//       width: 80,
//       paddingHorizontal: 12,
//       alignItems: 'center',
//       marginHorizontal: 10,
//   },
//   buttonContainer: {
//       flexDirection: 'row',
//       marginVertical: 20,
//       backgroundColor: 'transparent',
//   },
//   container: {
//     flex: 1
//   },
//   scrollView: {
//     position: "absolute",
//     bottom: 30,
//     left: 0,
//     right: 0,
//     paddingVertical: 10
//   },
//   endPadding: {
//     paddingRight: width - CARD_WIDTH
//   },
//   card: {
//     padding: 10,
//     elevation: 2,
//     backgroundColor: "#FFF",
//     marginHorizontal: 10,
//     shadowColor: "#000",
//     shadowRadius: 5,
//     shadowOpacity: 0.3,
//     shadowOffset: { x: 2, y: -2 },
//     height: CARD_HEIGHT,
//     width: CARD_WIDTH,
//     overflow: "hidden"
//   },
//   cardImage: {
//     flex: 1,
//     width: "100%",
//     height: "100%",
//     alignSelf: "center"
//   },
//   textContent: {
//     // flex: 4,
//     position: "absolute",
//     bottom: 30,
//     paddingHorizontal: 25
//   },
//   cardtitle: {
//     fontSize: 20,
//     marginTop: 5,
//     fontWeight: "bold",
//     color: "white",
//     fontStyle: "italic"
//   },
//   cardDescription: {
//     fontSize: 15,
//     color: "white"
//   },
//   markerWrap: {
//     alignItems: "center",
//     justifyContent: "center",
//     height: 50,
//     width: 50
//   },
//   marker: {
//     position: "absolute", // <-- moved from ring
//     width: 8,
//     height: 8,
//     borderRadius: 4,
//     backgroundColor: "rgba(130,4,150, 0.9)"
//   },
//   ring: {
//     width: 24,
//     height: 24,
//     borderRadius: 12,
//     backgroundColor: "rgba(130,4,150, 0.3)",
//     borderWidth: 1,
//     borderColor: "rgba(130,4,150, 0.5)"
//   }
// });


// // import React, { Component } from "react";
// // import {
// //   StyleSheet,
// //   Text,
// //   View,
// //   ScrollView,
// //   Animated,
// //   Image,
// //   Dimensions,
// //   TouchableOpacity,
// //   TouchableWithoutFeedback
// // } from "react-native";

// // import FastImage from 'react-native-fast-image';

// // import MapView from "react-native-maps";

// // const { width, height } = Dimensions.get("window");

// // const CARD_HEIGHT = height / 3;
// // const CARD_WIDTH = width - 40;

// // export default class MapViewScreen extends Component {
// //   state = {
// //    serverData: this.props.navigation.state.params.data,
// //     // markers: [
// //     //   {
// //     //     coordinate: {
// //     //       latitude: 45.524548,
// //     //       longitude: -122.6749817,
// //     //     },
// //     //     title: "Best Place",
// //     //     description: "This is the best place in Portland",
// //     //     image: Images[0],
// //     //   },
// //     //   {
// //     //     coordinate: {
// //     //       latitude: 45.524698,
// //     //       longitude: -122.6655507,
// //     //     },
// //     //     title: "Second Best Place",
// //     //     description: "This is the second best place in Portland",
// //     //     image: Images[1],
// //     //   },
// //     //   {
// //     //     coordinate: {
// //     //       latitude: 45.5230786,
// //     //       longitude: -122.6701034,
// //     //     },
// //     //     title: "Third Best Place",
// //     //     description: "This is the third best place in Portland",
// //     //     image: Images[2],
// //     //   },
// //     //   {
// //     //     coordinate: {
// //     //       latitude: 45.521016,
// //     //       longitude: -122.6561917,
// //     //     },
// //     //     title: "Fourth Best Place",
// //     //     description: "This is the fourth best place in Portland",
// //     //     image: Images[3],
// //     //   },
// //     // ],
// //     region: { 
// //       latitude: 17.4126274,
// //       longitude: 78.2679583,
// //       latitudeDelta: 0.04864195044303443,
// //       longitudeDelta: 0.040142817690068,
// //     },
// //   };

// //   UNSAFE_componentWillMount() {
// //     this.index = 0;
// //     this.animation = new Animated.Value(0);
// //   }
// //   componentDidMount() {
// //     // We should detect when scrolling has stopped then animate
// //     // We should just debounce the event listener here
// //     // console.log(this.props.navigation.state.params.data[1].coordinate)
// //     this.animation.addListener(({ value }) => {
// //       let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
// //       if (index >= this.state.serverData.length) {
// //         index = this.state.serverData.length - 1;
// //       }
// //       if (index <= 0) {
// //         index = 0;
// //       }

// //       clearTimeout(this.regionTimeout);
// //       this.regionTimeout = setTimeout(() => {
// //         if (this.index !== index) {
// //           this.index = index;
// //           const { coordinate } = this.state.serverData[index];
// //           this.map.animateToRegion(
// //             {
// //               ...coordinate,
// //               latitudeDelta: this.state.region.latitudeDelta,
// //               longitudeDelta: this.state.region.longitudeDelta,
// //             },
// //             350
// //           );
// //         }
// //       }, 10);
// //     });
// //   }

// //     //Song list container position from top
// //     _interpolateMarker = () => {
// //       const interpolations = this.state.serverData.map((marker, index) => {
// //         const inputRange = [
// //           (index - 1) * CARD_WIDTH,
// //           index * CARD_WIDTH,
// //           ((index + 1) * CARD_WIDTH),
// //         ];
// //         const scale = this.animation.interpolate({
// //           inputRange,
// //           outputRange: [1, 2.5, 1],
// //           extrapolate: "clamp",
// //         });
// //         const opacity = this.animation.interpolate({
// //           inputRange,
// //           outputRange: [0.35, 1, 0.35],
// //           extrapolate: "clamp",
// //         });
// //         return { scale, opacity };
// //       });
// //     };


// //   render() {

// //     const interpolateMarker = this._interpolateMarker();

    

// //     return (
// //       <View style={styles.container}>
// //         <MapView
// //           ref={map => this.map = map}
// //           initialRegion={this.state.region}
// //           style={styles.container}
// //         >
// //           {this.state.serverData.map((marker, index) => {
// //             const scaleStyle = {
// //               transform: [
// //                 {
// //                   scale: interpolations[index].scale,
// //                 },
// //               ],
// //             };
// //             const opacityStyle = {
// //               opacity: interpolations[index].opacity,
// //             };
// //             return (
// //               <MapView.Marker key={index} coordinate={marker.coordinate}>
// //                 <Animated.View style={[styles.markerWrap, opacityStyle]}>
// //                   <Animated.View style={[styles.ring, scaleStyle]} />
// //                   <View style={styles.marker} />
// //                 </Animated.View>
// //               </MapView.Marker>
// //             );
// //           })}
// //         </MapView>
// //         <Animated.ScrollView
// //           horizontal
// //           scrollEventThrottle={1}
// //           showsHorizontalScrollIndicator={false}
// //           snapToInterval={CARD_WIDTH}
// //           onScroll={Animated.event(
// //             [
// //               {
// //                 nativeEvent: {
// //                   contentOffset: {
// //                     x: this.animation,
// //                   },
// //                 },
// //               },
// //             ],
// //             { useNativeDriver: true }
// //           )}
// //           style={styles.scrollView}
// //           contentContainerStyle={styles.endPadding}
// //         >
// //           {this.state.serverData.map((data, index) => (
// //             <View style={styles.card} key={index}>
// //                   <FastImage 
// //                       style={styles.cardImage}

// //                       source={{
// //                         uri: data.files[0].uri,
// //                           priority: FastImage.priority.normal,
// //                           cashe: FastImage.cacheControl.immutable,
// //                       }}
// //                         resizeMode={FastImage.resizeMode.cover}
// //                       // onProgress={e => console.log('progress :',e.nativeEvent.loaded / e.nativeEvent.total)}
// //                       // onLoad={e => console.log('loaded: ', e.nativeEvent.width, e.nativeEvent.height)}
// //                       // onError={error => console.log('error loading: ', error)}
// //                       // onLoadEnd={console.log('finished loading')}
// //                       // fallback= {true}
// //                     />
// //               <TouchableWithoutFeedback onPress={ () => this.props.navigation.navigate('Details', {data: data})}>
// //                 <View style={styles.textContent}>
// //                   <Text numberOfLines={1} style={styles.cardtitle}>{data.partyHallName}</Text>
// //                   <Text numberOfLines={1} style={styles.cardDescription}>
// //                     {data.address}
// //                   </Text>
// //                 </View>
// //               </TouchableWithoutFeedback>
              
// //             </View>
// //           ))}
// //         </Animated.ScrollView>
// //       </View>
// //     );
// //   }
// // }

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //   },
// //   scrollView: {
// //     position: "absolute",
// //     bottom: 30,
// //     left: 0,
// //     right: 0,
// //     paddingVertical: 10,
// //   },
// //   endPadding: {
// //     paddingRight: width - CARD_WIDTH,
// //   },
// //   card: {
// //     padding: 10,
// //     elevation: 2,
// //     backgroundColor: "#FFF",
// //     marginHorizontal: 10,
// //     shadowColor: "#000",
// //     shadowRadius: 5,
// //     shadowOpacity: 0.3,
// //     shadowOffset: { x: 2, y: -2 },
// //     height: CARD_HEIGHT,
// //     width: CARD_WIDTH,
// //     overflow: "hidden",
// //   },
// //   cardImage: {
// //     flex: 1,
// //     width: "100%",
// //     height: "100%",
// //     alignSelf: "center",
// //   },
// //   textContent: {
// //     // flex: 4,
// //     position: "absolute",
// //     bottom: 30,
// //     paddingHorizontal: 25,
  
// //   },
// //   cardtitle: {
// //     fontSize: 20,
// //     marginTop: 5,
// //     fontWeight: "bold",
// //     color: "white",
// //     fontStyle: 'italic'
// //   },
// //   cardDescription: {
// //     fontSize: 15,
// //     color: "white",
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
// // });
