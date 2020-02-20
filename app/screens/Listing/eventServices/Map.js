import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Animated,
  Image,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StatusBar
} from "react-native";

import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';

import MapView, {
  MAP_TYPES,
  ProviderPropType,
  Polyline,
  Marker,
  Polygon,
  Overlay,
  Circle,
  AnimatedRegion
} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

const ic_action_back = require('../../../../images/ic_action_back.png');
const direction_start = require('../../../../images/direction_start.png');
const { width, height } = Dimensions.get("window");

const CARD_HEIGHT = height / 3;
const CARD_WIDTH = width - 20;

const customStyle = [
  {
      "featureType": "all",
      "elementType": "labels.text.fill",
      "stylers": [
          {
              "saturation": 36
          },
          {
              "color": "#000000"
          },
          {
              "lightness": 40
          }
      ]
  },
  {
      "featureType": "all",
      "elementType": "labels.text.stroke",
      "stylers": [
          {
              "visibility": "on"
          },
          {
              "color": "#000000"
          },
          {
              "lightness": 16
          }
      ]
  },
  {
      "featureType": "all",
      "elementType": "labels.icon",
      "stylers": [
          {
              "visibility": "off"
          }
      ]
  },
  {
      "featureType": "administrative",
      "elementType": "geometry.fill",
      "stylers": [
          {
              "color": "#000000"
          },
          {
              "lightness": 20
          }
      ]
  },
  {
      "featureType": "administrative",
      "elementType": "geometry.stroke",
      "stylers": [
          {
              "color": "#000000"
          },
          {
              "lightness": 17
          },
          {
              "weight": 1.2
          }
      ]
  },
  {
      "featureType": "administrative",
      "elementType": "labels",
      "stylers": [
          {
              "visibility": "on"
          }
      ]
  },
  {
      "featureType": "administrative.country",
      "elementType": "all",
      "stylers": [
          {
              "visibility": "simplified"
          }
      ]
  },
  {
      "featureType": "administrative.country",
      "elementType": "geometry",
      "stylers": [
          {
              "visibility": "simplified"
          }
      ]
  },
  {
      "featureType": "administrative.country",
      "elementType": "labels.text",
      "stylers": [
          {
              "visibility": "simplified"
          }
      ]
  },
  {
      "featureType": "administrative.province",
      "elementType": "all",
      "stylers": [
          {
              "visibility": "off"
          }
      ]
  },
  {
      "featureType": "administrative.locality",
      "elementType": "all",
      "stylers": [
          {
              "visibility": "simplified"
          },
          {
              "saturation": "-100"
          },
          {
              "lightness": "30"
          }
      ]
  },
  {
      "featureType": "administrative.neighborhood",
      "elementType": "all",
      "stylers": [
          {
              "visibility": "off"
          }
      ]
  },
  {
      "featureType": "administrative.land_parcel",
      "elementType": "all",
      "stylers": [
          {
              "visibility": "off"
          }
      ]
  },
  {
      "featureType": "landscape",
      "elementType": "all",
      "stylers": [
          {
              "visibility": "simplified"
          },
          {
              "gamma": "0.00"
          },
          {
              "lightness": "74"
          }
      ]
  },
  {
      "featureType": "landscape",
      "elementType": "geometry",
      "stylers": [
          {
              "color": "#34334f"
          },
          {
              "lightness": "-37"
          }
      ]
  },
  {
      "featureType": "landscape.man_made",
      "elementType": "all",
      "stylers": [
          {
              "lightness": "3"
          }
      ]
  },
  {
      "featureType": "poi",
      "elementType": "all",
      "stylers": [
          {
              "visibility": "off"
          }
      ]
  },
  {
      "featureType": "poi",
      "elementType": "geometry",
      "stylers": [
          {
              "color": "#000000"
          },
          {
              "lightness": 21
          }
      ]
  },
  {
      "featureType": "road",
      "elementType": "geometry",
      "stylers": [
          {
              "visibility": "simplified"
          }
      ]
  },
  {
      "featureType": "road.highway",
      "elementType": "geometry.fill",
      "stylers": [
          {
              "color": "#2d2c45"
          },
          {
              "lightness": "0"
          }
      ]
  },
  {
      "featureType": "road.highway",
      "elementType": "geometry.stroke",
      "stylers": [
          {
              "color": "#000000"
          },
          {
              "lightness": 29
          },
          {
              "weight": 0.2
          }
      ]
  },
  {
      "featureType": "road.highway",
      "elementType": "labels.text.fill",
      "stylers": [
          {
              "color": "#7d7c9b"
          },
          {
              "lightness": "43"
          }
      ]
  },
  {
      "featureType": "road.highway",
      "elementType": "labels.text.stroke",
      "stylers": [
          {
              "visibility": "off"
          }
      ]
  },
  {
      "featureType": "road.arterial",
      "elementType": "geometry",
      "stylers": [
          {
              "color": "#2d2c45"
          },
          {
              "lightness": "1"
          }
      ]
  },
  {
      "featureType": "road.arterial",
      "elementType": "labels.text",
      "stylers": [
          {
              "visibility": "on"
          }
      ]
  },
  {
      "featureType": "road.arterial",
      "elementType": "labels.text.fill",
      "stylers": [
          {
              "color": "#7d7c9b"
          }
      ]
  },
  {
      "featureType": "road.arterial",
      "elementType": "labels.text.stroke",
      "stylers": [
          {
              "visibility": "off"
          }
      ]
  },
  {
      "featureType": "road.local",
      "elementType": "geometry",
      "stylers": [
          {
              "color": "#2d2c45"
          },
          {
              "lightness": "-1"
          },
          {
              "gamma": "1"
          }
      ]
  },
  {
      "featureType": "road.local",
      "elementType": "labels.text",
      "stylers": [
          {
              "visibility": "on"
          },
          {
              "hue": "#ff0000"
          }
      ]
  },
  {
      "featureType": "road.local",
      "elementType": "labels.text.fill",
      "stylers": [
          {
              "color": "#7d7c9b"
          },
          {
              "lightness": "-31"
          }
      ]
  },
  {
      "featureType": "road.local",
      "elementType": "labels.text.stroke",
      "stylers": [
          {
              "visibility": "off"
          }
      ]
  },
  {
      "featureType": "transit",
      "elementType": "geometry",
      "stylers": [
          {
              "color": "#2d2c45"
          },
          {
              "lightness": "-36"
          }
      ]
  },
  {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [
          {
              "color": "#2d2c45"
          },
          {
              "lightness": "0"
          },
          {
              "gamma": "1"
          }
      ]
  },
  {
      "featureType": "water",
      "elementType": "labels.text.stroke",
      "stylers": [
          {
              "visibility": "off"
          }
      ]
  }
];

const DATA = [{"CateringPrice": "30", "address": "Address and lication", "cabacity": "400", "contactNo": "0922066609", "coordinate": {"latitude": 17.411549, "longitude": 78.494381}, "day": true, "email": "me@yahoo.com", "files": [[Object], [Object], [Object]], "hallRenting": "5000", "id": "3", "isHearted": false, "key": "NzE0afBtUOfYLg5krWrbVSPoCcB3", "night": true, "ownerId": "NzE0afBtUOfYLg5krWrbVSPoCcB3", "partyHallName": "Spark city", "photographing": "400", "timestamp": 1579602565368, "videoShooting": "100", "weddingStage": "300"}, {"CateringPrice": "", "address": "Hshygg jhaggg adress", "cabacity": "100", "contactNo": "09764323678", "coordinate": {"latitude": 17.411249, "longitude": 78.189381}, "day": true, "email": "mo@hotmail.com", "files": [[Object], [Object], [Object], [Object]], "hallRenting": "3000", "id": "2", "isHearted": false, "key": "SZit9ewC3fYpx05WvI4PzU2GzQE3", "night": true, "ownerId": "SZit9ewC3fYpx05WvI4PzU2GzQE3", "partyHallName": "Spark", "photographing": "", "timestamp": 1579602940830, "videoShooting": "", "weddingStage": ""}, {"address": "Address of u ou ", "cabacity": "100", "contactNo": "09864333567", "coordinate": {"latitude": 17.426646, "longitude": 78.42827}, "email": "mo@tail.com", "files": [[Object], [Object], [Object], [Object]], "hallRenting": "5788", "id": "5", "isHearted": false, "key": "9Cg4qvaHKvaWNolba8F9XrU3Wxx1", "ownerId": "9Cg4qvaHKvaWNolba8F9XrU3Wxx1", "partyHallName": "Test try", "timestamp": 1579603373833}, {"CateringPrice": "", "address": "Adress should be my current location", "cabacity": "400", "contactNo": "09876554332", "coordinate": {"latitude": 17.441549, "longitude": 78.489381}, "coords": {"_latitude": 17.3929717, "_longitude": 78.4565447}, "day": true, "email": "test@yahoo.com", "files": [[Object], [Object], [Object], [Object]], "hallRenting": "9000", "id": "4", "isHearted": false, "key": "LOQ3NBuIaIeAwVObUh2L7cLoXNE2", "night": true, "ownerId": "LOQ3NBuIaIeAwVObUh2L7cLoXNE2", "partyHallName": "With geo location", "photographing": "", "timestamp": 1579662790561, "videoShooting": "", "weddingStage": ""}]

export default class MapViewScreen extends Component {

  // constructor(props) {
  //   super(props);

    // MapViewScreen = this;
    state = {
        // serverData: this.props.navigation.state.params.data,
        serverData: DATA,
        region: { 
          latitude: 17.4126274,
          longitude: 78.2679583,
          latitudeDelta: 0.04864195044303443,
          longitudeDelta: 0.040142817690068,
        },
        index: 0,
        scrollX: new Animated.Value(0),
        scrollY: new Animated.Value(0)
        // coordinate: new AnimatedRegion({
        //     latitude: LATITUDE_DEST1,
        //     longitude: LONGITUDE_DEST1,
        // }),
        // latitudeDestination: LATITUDE_DEST1,
        // longitudeDestination: LONGITUDE_DEST1,
    };
// }

  // UNSAFE_componentWillMount() {
  //   this.state.index = 0;
  //   // this.state.scrollX = new Animated.Value(0);
  // }
  componentDidMount() {
    // We should detect when scrolling has stopped then animate
    // We should just debounce the event listener here
    // console.log(this.props.navigation.state.params.data[1].coordinate)
    const { scrollX } = this.state;
    scrollX.addListener(({ value }) => {
      let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
      if (index >= this.state.serverData.length) {
        index = this.state.serverData.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }

      clearTimeout(this.regionTimeout);
      this.regionTimeout = setTimeout(() => {
        if (this.state.index !== index) {
          this.state.index = index;
          const { coordinate } = this.state.serverData[index];
          this.map.animateToRegion(
            {
              ...coordinate,
              latitudeDelta: this.state.region.latitudeDelta,
              longitudeDelta: this.state.region.longitudeDelta,
            },
            350
          );
        }
      }, 10);
    });
  }

  //Song list container position from top
  _interpolateMarker = () => {
    this.state.serverData.map((marker, index) => {
      const inputRange = [
        (index - 1) * CARD_WIDTH,
        index * CARD_WIDTH,
        ((index + 1) * CARD_WIDTH),
      ];
      const scale = scrollX.interpolate({
        inputRange,
        outputRange: [1, 2.5, 1],
        extrapolate: "clamp",
      });
      const opacity = this.state.scrollX.interpolate({
        inputRange,
        outputRange: [0.35, 1, 0.35],
        extrapolate: "clamp",
      });
      return { scale, opacity };
    });
  };


    


  render() {


    const interpolations =  this.state.serverData.map((marker, index) => {
        const inputRange = [
          (index - 1) * CARD_WIDTH,
          index * CARD_WIDTH,
          ((index + 1) * CARD_WIDTH),
        ];
        const scale = this.state.scrollX.interpolate({
          inputRange,
          outputRange: [1, 2.5, 1],
          extrapolate: "clamp",
        });
        const opacity = this.state.scrollX.interpolate({
          inputRange,
          outputRange: [0.35, 1, 0.35],
          extrapolate: "clamp",
        });

        return { scale, opacity };
    });

    // const interpolations = this._interpolateMarker();
    
  

    

    return (
      <View style={styles.container}>
        <MapView
          ref={map => this.map = map}
          initialRegion={this.state.region}
          style={styles.container}
          customMapStyle={customStyle}
        >
          {this.state.serverData.map((marker, index) => {
            const scaleStyle = {
              transform: [
                {
                  scale: interpolations[index].scale,
                },
              ],
            };
            const opacityStyle = {
              opacity: interpolations[index].opacity,
            };
            return (
              <MapView.Marker key={index} coordinate={marker.coordinate}>
                <Animated.View style={[styles.markerWrap, opacityStyle]}>
                  <Animated.View style={[styles.ring, scaleStyle]} />
                  <View style={styles.marker} />
                </Animated.View>
              </MapView.Marker>
            );
          })}
        </MapView>
        <MapHeader/>
        <Animated.ScrollView
          horizontal
          scrollEventThrottle={1}
          showsHorizontalScrollIndicator={false}
          snapToInterval={CARD_WIDTH}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    x: this.state.scrollX,
                    y: this.state.scrollY
                  },
                },
              },
            ],
            { useNativeDriver: true }
          )}
          style={styles.scrollView}
          contentContainerStyle={styles.endPadding}
        >
          {this.state.serverData.map((data, index) => (
            <View style={styles.card} key={index}>
                  <FastImage 
                      style={styles.cardImage}

                      source={{
                        uri: data.files[0].uri,
                          priority: FastImage.priority.normal,
                          cashe: FastImage.cacheControl.immutable,
                      }}
                        resizeMode={FastImage.resizeMode.cover}
                      // onProgress={e => console.log('progress :',e.nativeEvent.loaded / e.nativeEvent.total)}
                      // onLoad={e => console.log('loaded: ', e.nativeEvent.width, e.nativeEvent.height)}
                      // onError={error => console.log('error loading: ', error)}
                      // onLoadEnd={console.log('finished loading')}
                      // fallback= {true}
                    />
              <TouchableWithoutFeedback onPress={ () => this.props.navigation.navigate('Details', {data: data})}>
                <View style={styles.textContent}>
                  <Text numberOfLines={1} style={styles.cardtitle}>{data.partyHallName}</Text>
                  <Text numberOfLines={1} style={styles.cardDescription}>
                    {data.address}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
              
            </View>
          ))}
        </Animated.ScrollView>
      </View>
    );
  }
}

class MapHeader extends React.Component {

  constructor(props) {
      super(props);
  }

  render() {
      return (
          <LinearGradient colors={['#8301FF', '#30ACFF']}
                          start={{x: 0.0, y: 1.0}} end={{x: 1.0, y: 1.0}}
                          style={{
                              height: 200, width: '100%',
                              borderBottomLeftRadius: 16,
                              borderBottomRightRadius: 16,
                              paddingBottom: 8
                          }}
          >
              <StatusBar
                  backgroundColor="#00000000"
                  barStyle="default"
                  translucent={true}
              />
              <View style={{
                  paddingTop: 24,
                  width: '100%',
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
              }}>
                <TouchableOpacity onPress={() => { this.props.navigation.goBack(null); }}>
                  <Image source={ic_action_back}
                         resizeMode='center'
                  />
                </TouchableOpacity>
                  <Text style={{
                      textAlign: 'center',
                      paddingLeft: 20,
                      paddingRight: 20,
                      color: '#FFFFFF'
                  }}>SEE ALL</Text>

              </View>
              <View style={{
                  flex: 1,
                  justifyContent: 'flex-end',
                  padding: 10,
                  alignItems: 'flex-start',
              }}>
                  <Text style={{
                      textAlign: 'center',
                      color: '#FFFFFF',
                      opacity: 0.6
                  }}>Restaurants</Text>
                  <Text style={{
                      textAlign: 'center',
                      fontSize: 30,
                      fontFamily: 'Roboto',
                      color: '#FFFFFF'
                  }}>Brooklyn</Text>
                  <Text style={{
                      textAlign: 'center',
                      color: '#FFFFFF',
                      opacity: 0.6
                  }}>3164, Anthony Avenue</Text>
              </View>

          </LinearGradient>

      )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    position: "absolute",
    bottom: 30,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
  endPadding: {
    paddingRight: width - CARD_WIDTH,
  },
  card: {
    padding: 10,
    elevation: 2,
    backgroundColor: "#FFF",
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: "hidden",
  },
  cardImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    alignSelf: "center",
  },
  textContent: {
    // flex: 4,
    position: "absolute",
    bottom: 30,
    paddingHorizontal: 25,
  
  },
  cardtitle: {
    fontSize: 20,
    marginTop: 5,
    fontWeight: "bold",
    color: "white",
    fontStyle: 'italic'
  },
  cardDescription: {
    fontSize: 15,
    color: "white",
  },
  markerWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    width: 50,
  },
  marker: {
    position: 'absolute', // <-- moved from ring
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(130,4,150, 0.9)',
  },
  ring: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(130,4,150, 0.3)',
    borderWidth: 1,
    borderColor: 'rgba(130,4,150, 0.5)',
  },
  contentContainer: {
    paddingVertical: 20
},
Header: {
    left: 0,
    right: 0,
    bottom: 0,
    height: 10,
    flexDirection: 'column',
    justifyContent: 'center',
},
BottomContainer: {
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
    width: 350,
    height: '15%',
    flexDirection: 'column',
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 20,
},

container: {
    ...StyleSheet.absoluteFillObject,
    height: '100%',
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
},
map: {
    ...StyleSheet.absoluteFillObject,

    backgroundColor: '#000000',
},
linearGradient: {
    width: '100%',
    height: '25%',
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
},
buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    fontWeight: 'normal',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
},
bubble: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
},
latlng: {
    width: 200,
    alignItems: 'stretch',
},
button: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginHorizontal: 10,
},
buttonContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    backgroundColor: 'transparent',
},
});

