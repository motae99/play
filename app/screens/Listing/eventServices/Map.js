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
  StatusBar,
  Platform,
  FlatList
} from "react-native";

import LinearGradient from "react-native-linear-gradient";
import {
  getLocation,
  geocodeLocationByName,
  getGeoLocation,
  getGeohashRange
} from "../../../services/location-service";

import MapView, {
  MAP_TYPES,
  ProviderPropType,
  Polyline,
  Marker,
  Polygon,
  Overlay,
  Circle,
  AnimatedRegion
} from "react-native-maps";

import MapViewDirections from "react-native-maps-directions";
import MapInput from "../components/MapInput";
import Card from "../components/EventMapCard";
import firestore from "@react-native-firebase/firestore";
import customStyle from "../components/MapStyle";
import Sorting from "../components/BottomSheet";
const { width, height } = Dimensions.get("window");

const CARD_HEIGHT = height / 3;
const CARD_WIDTH = width - 20;

const DATA = [
  {
    CateringPrice: "30",
    address: "Address and lication",
    cabacity: "400",
    contactNo: "0922066609",
    coordinate: { latitude: 17.411549, longitude: 78.494381 },
    day: true,
    email: "me@yahoo.com",
    files: [[Object], [Object], [Object]],
    hallRenting: "5000",
    id: "3",
    isHearted: false,
    key: "NzE0afBtUOfYLg5krWrbVSPoCcB3",
    night: true,
    ownerId: "NzE0afBtUOfYLg5krWrbVSPoCcB3",
    partyHallName: "Spark city",
    photographing: "400",
    timestamp: 1579602565368,
    videoShooting: "100",
    weddingStage: "300"
  },
  {
    CateringPrice: "",
    address: "Hshygg jhaggg adress",
    cabacity: "100",
    contactNo: "09764323678",
    coordinate: { latitude: 17.411249, longitude: 78.189381 },
    day: true,
    email: "mo@hotmail.com",
    files: [[Object], [Object], [Object], [Object]],
    hallRenting: "3000",
    id: "2",
    isHearted: false,
    key: "SZit9ewC3fYpx05WvI4PzU2GzQE3",
    night: true,
    ownerId: "SZit9ewC3fYpx05WvI4PzU2GzQE3",
    partyHallName: "Spark",
    photographing: "",
    timestamp: 1579602940830,
    videoShooting: "",
    weddingStage: ""
  },
  {
    address: "Address of u ou ",
    cabacity: "100",
    contactNo: "09864333567",
    coordinate: { latitude: 17.426646, longitude: 78.42827 },
    email: "mo@tail.com",
    files: [[Object], [Object], [Object], [Object]],
    hallRenting: "5788",
    id: "5",
    isHearted: false,
    key: "9Cg4qvaHKvaWNolba8F9XrU3Wxx1",
    ownerId: "9Cg4qvaHKvaWNolba8F9XrU3Wxx1",
    partyHallName: "Test try",
    timestamp: 1579603373833
  },
  {
    CateringPrice: "",
    address: "Adress should be my current location",
    cabacity: "400",
    contactNo: "09876554332",
    coordinate: { latitude: 17.441549, longitude: 78.489381 },
    coords: { _latitude: 17.3929717, _longitude: 78.4565447 },
    day: true,
    email: "test@yahoo.com",
    files: [[Object], [Object], [Object], [Object]],
    hallRenting: "9000",
    id: "4",
    isHearted: false,
    key: "LOQ3NBuIaIeAwVObUh2L7cLoXNE2",
    night: true,
    ownerId: "LOQ3NBuIaIeAwVObUh2L7cLoXNE2",
    partyHallName: "With geo location",
    photographing: "",
    timestamp: 1579662790561,
    videoShooting: "",
    weddingStage: ""
  }
];

export default class MapViewScreen extends Component {
  // constructor(props) {
  //   super(props);

  // MapViewScreen = this;
  state = {
    serverData: this.props.navigation.state.params.data,
    // serverData: DATA,
    region: {
      latitude: 17.4126274,
      longitude: 78.2679583,
      latitudeDelta: 0.04864195044303443,
      longitudeDelta: 0.040142817690068
    },
  };

  UNSAFE_componentWillMount() {
    this.index = 0;
    this.animation = new Animated.Value(0);
  }

  componentDidMount() {
    this.animation.addListener(({ value }) => {
      let index = Math.floor(value / CARD_WIDTH ); // animate 30% away from landing on the next item
      if (index >= this.state.serverData.length) {
        index = this.state.serverData.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }

      clearTimeout(this.regionTimeout);
      this.regionTimeout = setTimeout(() => {
        if (this.index !== index) {
          this.index = index;
          const { coordinate } = this.state.serverData[index];
          this.map.animateToRegion(
            {
              ...coordinate,
              latitudeDelta: 0.00864195044303443,
              longitudeDelta: 0.000142817690068
            },
            350
          );
        }
      }, 10);
    });
  }

  async getInitialState() {
    const hasLocationPermission = await this.hasLocationPermission();
    if (hasLocationPermission) {
      getGeoLocation()
        .then(data => {
          console.log(data);
          this.setState({
            deviceRegion: {
              latitude: data.latitude,
              longitude: data.longitude,
              latitudeDelta: 0.003,
              longitudeDelta: 0.003
            }
          });
        })
        .catch(error => console.log("error", error));
    }
  }

  retrieveData = async range => {
    try {
      this.setState({
        loading: true
      });
      let initialQuery = await firestore()
        .collection("partyHalls")
        .where("geohash", ">=", range.lower)
        .where("geohash", "<=", range.upper)
        // .orderBy("geohash", "asc");
      .limit(1);
      let documentSnapshots = await initialQuery.get();
      let documentData = documentSnapshots.docs.map(document => {
        console.log("proof working", document.data());
        return {
          ...document.data(),
          key: document.id
          // isHearted: false
        };
      });
      let lastVisible = documentData[documentData.length - 1].timestamp;
      console.log("Last Visable ==== :", lastVisible);
      this.setState({
        serverData: documentData,
        lastVisible: lastVisible,
        loading: false
      });
    } catch (error) {
      console.log(error);
    }
  };

  retrieveMore = async () => {
    var { lastVisible } = this.state;
    try {
      this.setState({
        refreshing: true
      });
      let additionalQuery = await firestore()
        .collection("partyHalls")
        .orderBy("timestamp", "asc")
        .startAfter(lastVisible)
        .limit(2);
      let documentSnapshots = await additionalQuery.get();
      let documentData = documentSnapshots.docs.map(document => {
        return {
          ...document.data(),
          key: document.id,
          isHearted: false
        };
      });
      if (documentData) {
        let lastVisible = documentData[documentData.length - 1].timestamp;
        if (lastVisible !== this.state.lastVisible) {
          this.setState({
            documentData: [...this.state.documentData, ...documentData],
            lastVisible: lastVisible
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  getCoordsFromName(loc) {
    console.log(loc);
    let range = getGeohashRange(loc.lat, loc.lng, 900);
    console.log(range);

    this.retrieveData(range);
  }

  onMapRegionChange(region) {
    this.setState({ region });
  }

  getScaleStyle = index => {
    const inputRange = [
      (index - 1) * CARD_WIDTH,
      index * CARD_WIDTH,
      (index + 1) * CARD_WIDTH
    ];
    const scale = this.animation.interpolate({
      inputRange,
      outputRange: [1, 2.5, 1],
      extrapolate: "clamp"
    });
    return scale;
  };

  getObacityStyle = index => {
    const inputRange = [
      (index - 1) * CARD_WIDTH,
      index * CARD_WIDTH,
      (index + 1) * CARD_WIDTH
    ];
    const opacity = this.animation.interpolate({
      inputRange,
      outputRange: [0.35, 1, 0.35],
      extrapolate: "clamp"
    });

    return opacity;
  };

  render() {
    return (
      <View style={styles.container}>
        <MapView
          ref={map => (this.map = map)}
          initialRegion={this.state.region}
          style={styles.container}
          customMapStyle={customStyle}
        >
          {this.state.serverData.map((marker, index) => {
            const scaleStyle = {
              transform: [
                {
                  scale: this.getScaleStyle(index)
                }
              ]
            };

            return (
              <MapView.Marker key={index} coordinate={marker.coordinate}>
                <Animated.View
                  style={[
                    styles.markerWrap,
                    { opacity: this.getObacityStyle(index) }
                  ]}
                >
                  <Animated.View style={[styles.ring, scaleStyle]} />
                  <View style={styles.marker} />
                </Animated.View>
              </MapView.Marker>
            );
          })}
        </MapView>
        <MapInput notifyChange={loc => this.getCoordsFromName(loc)} />

        <Animated.FlatList
          data={this.state.serverData}
          renderItem={({ item }) => <Card data={item}  navigation={this.props.navigation}/> }
          keyExtractor={item => String(item.key)}
          horizontal
          scrollEventThrottle={1}
          showsHorizontalScrollIndicator={false}
          snapToInterval={CARD_WIDTH + 20}
          onScroll={
            Animated.event(
              [
                {
                  nativeEvent: {
                    contentOffset: {
                      x: this.animation,
                    }
                  }
                }
              ],
              { useNativeDriver: true }
            )
          }
          style={styles.scrollView}
          contentContainerStyle={styles.endPadding}
        >
        </Animated.FlatList>
        <Sorting />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scrollView: {
    position: "absolute",
    bottom: 30,
    left: 0,
    right: 0,
    paddingVertical: 10
  },
  endPadding: {
    paddingRight: width - CARD_WIDTH
  },
  markerWrap: {
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    width: 50
  },
  marker: {
    position: "absolute", // <-- moved from ring
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(130,4,150, 0.9)"
  },
  ring: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "rgba(130,4,150, 0.3)",
    borderWidth: 1,
    borderColor: "rgba(130,4,150, 0.5)"
  },
  contentContainer: {
    paddingVertical: 20
  },
  Header: {
    left: 0,
    right: 0,
    bottom: 0,
    height: 10,
    flexDirection: "column",
    justifyContent: "center"
  },
  BottomContainer: {
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
    width: 350,
    height: "15%",
    flexDirection: "column",
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: 20
  },

  container: {
    ...StyleSheet.absoluteFillObject,
    height: "100%",
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  map: {
    ...StyleSheet.absoluteFillObject,

    backgroundColor: "#000000"
  },
  linearGradient: {
    width: "100%",
    height: "25%",
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16
  },
  buttonText: {
    fontSize: 18,
    fontFamily: "Gill Sans",
    fontWeight: "normal",
    textAlign: "center",
    margin: 10,
    color: "#ffffff",
    backgroundColor: "transparent"
  },
  bubble: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.7)",
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20
  },
  latlng: {
    width: 200,
    alignItems: "stretch"
  },
  button: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: "center",
    marginHorizontal: 10
  },
  buttonContainer: {
    flexDirection: "row",
    marginVertical: 20,
    backgroundColor: "transparent"
  }
});

// import React, { useRef, useState, useEffect } from "react";
// import {
//   StyleSheet,
//   View,
//   Dimensions,
//   FlatList
// } from "react-native";


// import Animated from "react-native-reanimated";
// import { onScroll, useValues } from "react-native-redash";

// import LinearGradient from "react-native-linear-gradient";
// import {
//   getLocation,
//   geocodeLocationByName,
//   getGeoLocation,
//   getGeohashRange
// } from "../../../services/location-service";

// import MapView, {
//   MAP_TYPES,
//   ProviderPropType,
//   Polyline,
//   Marker,
//   Polygon,
//   Overlay,
//   Circle,
//   AnimatedRegion
// } from "react-native-maps";

// import MapViewDirections from "react-native-maps-directions";
// import MapInput from "../components/MapInput";
// import Card from "../components/EventMapCard";
// import firestore from "@react-native-firebase/firestore";
// import customStyle from "../components/MapStyle";
// import Sorting from "../components/BottomSheet";

// const { width, height } = Dimensions.get("window");
// const CARD_HEIGHT = height / 3;
// const CARD_WIDTH = width - 20;

// const { Extrapolate, interpolate, color } = Animated;

// const DATA = [
//   {
//     CateringPrice: "30",
//     address: "Address and lication",
//     cabacity: "400",
//     contactNo: "0922066609",
//     coordinate: { latitude: 17.411549, longitude: 78.494381 },
//     day: true,
//     email: "me@yahoo.com",
//     files: [[Object], [Object], [Object]],
//     hallRenting: "5000",
//     id: "3",
//     isHearted: false,
//     key: "NzE0afBtUOfYLg5krWrbVSPoCcB3",
//     night: true,
//     ownerId: "NzE0afBtUOfYLg5krWrbVSPoCcB3",
//     partyHallName: "Spark city",
//     photographing: "400",
//     timestamp: 1579602565368,
//     videoShooting: "100",
//     weddingStage: "300"
//   },
//   {
//     CateringPrice: "",
//     address: "Hshygg jhaggg adress",
//     cabacity: "100",
//     contactNo: "09764323678",
//     coordinate: { latitude: 17.411249, longitude: 78.189381 },
//     day: true,
//     email: "mo@hotmail.com",
//     files: [[Object], [Object], [Object], [Object]],
//     hallRenting: "3000",
//     id: "2",
//     isHearted: false,
//     key: "SZit9ewC3fYpx05WvI4PzU2GzQE3",
//     night: true,
//     ownerId: "SZit9ewC3fYpx05WvI4PzU2GzQE3",
//     partyHallName: "Spark",
//     photographing: "",
//     timestamp: 1579602940830,
//     videoShooting: "",
//     weddingStage: ""
//   },
//   {
//     address: "Address of u ou ",
//     cabacity: "100",
//     contactNo: "09864333567",
//     coordinate: { latitude: 17.426646, longitude: 78.42827 },
//     email: "mo@tail.com",
//     files: [[Object], [Object], [Object], [Object]],
//     hallRenting: "5788",
//     id: "5",
//     isHearted: false,
//     key: "9Cg4qvaHKvaWNolba8F9XrU3Wxx1",
//     ownerId: "9Cg4qvaHKvaWNolba8F9XrU3Wxx1",
//     partyHallName: "Test try",
//     timestamp: 1579603373833
//   },
//   {
//     CateringPrice: "",
//     address: "Adress should be my current location",
//     cabacity: "400",
//     contactNo: "09876554332",
//     coordinate: { latitude: 17.441549, longitude: 78.489381 },
//     coords: { _latitude: 17.3929717, _longitude: 78.4565447 },
//     day: true,
//     email: "test@yahoo.com",
//     files: [[Object], [Object], [Object], [Object]],
//     hallRenting: "9000",
//     id: "4",
//     isHearted: false,
//     key: "LOQ3NBuIaIeAwVObUh2L7cLoXNE2",
//     night: true,
//     ownerId: "LOQ3NBuIaIeAwVObUh2L7cLoXNE2",
//     partyHallName: "With geo location",
//     photographing: "",
//     timestamp: 1579662790561,
//     videoShooting: "",
//     weddingStage: ""
//   }
// ];

// const region = {
//   latitude: 17.4126274,
//   longitude: 78.2679583,
//   latitudeDelta: 0.04864195044303443,
//   longitudeDelta: 0.040142817690068
// };
// const styles = StyleSheet.create({
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
//   },
//   contentContainer: {
//     paddingVertical: 20
//   },
//   Header: {
//     left: 0,
//     right: 0,
//     bottom: 0,
//     height: 10,
//     flexDirection: "column",
//     justifyContent: "center"
//   },
//   BottomContainer: {
//     marginLeft: 20,
//     marginRight: 20,
//     marginBottom: 20,
//     width: 350,
//     height: "15%",
//     flexDirection: "column",
//     backgroundColor: "rgba(255,255,255,0.9)",
//     borderRadius: 20
//   },

//   container: {
//     ...StyleSheet.absoluteFillObject,
//     height: "100%",
//     width: "100%",
//     justifyContent: "flex-start",
//     alignItems: "center"
//   },
//   map: {
//     ...StyleSheet.absoluteFillObject,

//     backgroundColor: "#000000"
//   },
//   linearGradient: {
//     width: "100%",
//     height: "25%",
//     borderBottomLeftRadius: 16,
//     borderBottomRightRadius: 16
//   },
//   buttonText: {
//     fontSize: 18,
//     fontFamily: "Gill Sans",
//     fontWeight: "normal",
//     textAlign: "center",
//     margin: 10,
//     color: "#ffffff",
//     backgroundColor: "transparent"
//   },
//   bubble: {
//     flex: 1,
//     backgroundColor: "rgba(255,255,255,0.7)",
//     paddingHorizontal: 18,
//     paddingVertical: 12,
//     borderRadius: 20
//   },
//   latlng: {
//     width: 200,
//     alignItems: "stretch"
//   },
//   button: {
//     width: 80,
//     paddingHorizontal: 12,
//     alignItems: "center",
//     marginHorizontal: 10
//   },
//   buttonContainer: {
//     flexDirection: "row",
//     marginVertical: 20,
//     backgroundColor: "transparent"
//   }
// });

// const MapListing =  () => {

//   const [y, x] = useValues([0], [0], []);
//   const map = useRef(null);

//   const [currentIndex, setIndex] = useState(0);
//   const [serverData, setData] = useState(DATA);


//   // componentDidMount() {
//   //   x.addListener(({ value }) => {
//   //     let index = Math.floor(value / CARD_WIDTH ); // animate 30% away from landing on the next item
//   //     if (index >= serverData.length) {
//   //       index = serverData.length - 1;
//   //     }
//   //     if (index <= 0) {
//   //       index = 0;
//   //     }

//   //     clearTimeout(regionTimeout);

//   //     regionTimeout = setTimeout(() => {
//   //       if (currentIndex !== index) {
//   //         setIndex(index)
//   //         const { coordinate } = serverData[currentIndex];
//   //         map.animateToRegion(
//   //           {
//   //             ...coordinate,
//   //             latitudeDelta: 0.00864195044303443,
//   //             longitudeDelta: 0.000142817690068
//   //           },
//   //           350
//   //         );
//   //       }
//   //     }, 10);
//   //   });
//   // }

//   // async getInitialState() {
//   //   const hasLocationPermission = await this.hasLocationPermission();
//   //   if (hasLocationPermission) {
//   //     getGeoLocation()
//   //       .then(data => {
//   //         console.log(data);
//   //         this.setState({
//   //           deviceRegion: {
//   //             latitude: data.latitude,
//   //             longitude: data.longitude,
//   //             latitudeDelta: 0.003,
//   //             longitudeDelta: 0.003
//   //           }
//   //         });
//   //       })
//   //       .catch(error => console.log("error", error));
//   //   }
//   // }

//   retrieveData = async range => {
//     try {
//       this.setState({
//         loading: true
//       });
//       let initialQuery = await firestore()
//         .collection("partyHalls")
//         .where("geohash", ">=", range.lower)
//         .where("geohash", "<=", range.upper)
//         // .orderBy("geohash", "asc");
//       .limit(1);
//       let documentSnapshots = await initialQuery.get();
//       let documentData = documentSnapshots.docs.map(document => {
//         console.log("proof working", document.data());
//         return {
//           ...document.data(),
//           key: document.id
//           // isHearted: false
//         };
//       });
//       let lastVisible = documentData[documentData.length - 1].timestamp;
//       console.log("Last Visable ==== :", lastVisible);
//       this.setState({
//         serverData: documentData,
//         lastVisible: lastVisible,
//         loading: false
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   retrieveMore = async () => {
//     var { lastVisible } = this.state;
//     try {
//       this.setState({
//         refreshing: true
//       });
//       let additionalQuery = await firestore()
//         .collection("partyHalls")
//         .orderBy("timestamp", "asc")
//         .startAfter(lastVisible)
//         .limit(2);
//       let documentSnapshots = await additionalQuery.get();
//       let documentData = documentSnapshots.docs.map(document => {
//         return {
//           ...document.data(),
//           key: document.id,
//           isHearted: false
//         };
//       });
//       if (documentData) {
//         let lastVisible = documentData[documentData.length - 1].timestamp;
//         if (lastVisible !== this.state.lastVisible) {
//           this.setState({
//             documentData: [...this.state.documentData, ...documentData],
//             lastVisible: lastVisible
//           });
//         }
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   getCoordsFromName = (loc) => {
//     console.log(loc);
//     let range = getGeohashRange(loc.lat, loc.lng, 900);
//     console.log(range);

//     this.retrieveData(range);
//   }

//   onMapRegionChange= (region) => {
//     // this.setState({ region });
//   }

//   const getScaleStyle = index => {
//     const inputRange = [
//       (index - 1) * CARD_WIDTH,
//       index * CARD_WIDTH,
//       (index + 1) * CARD_WIDTH
//     ];

//     const scale = interpolate(x, {
//       inputRange,
//       outputRange: [1, 2.5, 1],
//       extrapolate: Extrapolate.CLAMP
//     });

//     return scale;
//   };

//   const getObacityStyle = index => {
//     const inputRange = [
//       (index - 1) * CARD_WIDTH,
//       index * CARD_WIDTH,
//       (index + 1) * CARD_WIDTH
//     ];
//     const opacity = interpolate(x, {
//       inputRange,
//       outputRange: [0.35, 1, 0.35],
//       extrapolate: Extrapolate.CLAMP
//     });
//     return opacity;
//   };

//     return (
//       <View style={styles.container}>
//         <MapView
//           ref={map}
//           initialRegion={region}
//           style={styles.container}
//           customMapStyle={customStyle}
//         >
//           {serverData.map((marker, index) => {
//             const scaleStyle = {
//               transform: [
//                 {
//                   scale: getScaleStyle(index)
//                 }
//               ]
//             };

//             return (
//               <MapView.Marker key={index} coordinate={marker.coordinate}>
//                 <Animated.View
//                   style={[
//                     styles.markerWrap,
//                     { opacity: getObacityStyle(index) }
//                   ]}
//                 >
//                   <Animated.View style={[styles.ring, scaleStyle]} />
//                   <View style={styles.marker} />
//                 </Animated.View>
//               </MapView.Marker>
//             );
//           })}
//         </MapView>
//         <MapInput notifyChange={loc => getCoordsFromName(loc)} />

//         <Animated.FlatList
//           data={serverData}
//           renderItem={({ item }) => <Card data={item} /> }
//           keyExtractor={item => String(item.key)}
//           horizontal
//           scrollEventThrottle={1}
//           showsHorizontalScrollIndicator={false}
//           snapToInterval={CARD_WIDTH + 20}
//           onScroll={ onScroll({ x }) }
//           style={styles.scrollView}
//           contentContainerStyle={styles.endPadding}
//         >
//         </Animated.FlatList>
//         <Sorting />
//       </View>
//     );
// }
// export default  MapListing;


