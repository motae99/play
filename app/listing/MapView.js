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
  TouchableWithoutFeedback
} from "react-native";

import FastImage from 'react-native-fast-image';


import { Transition } from 'react-navigation-fluid-transitions';

import MapView from "react-native-maps";

const { width, height } = Dimensions.get("window");

const CARD_HEIGHT = height / 3;
const CARD_WIDTH = width - 40;

export default class MapViewScreen extends Component {
  state = {
   serverData: this.props.navigation.state.params.data,
    // markers: [
    //   {
    //     coordinate: {
    //       latitude: 45.524548,
    //       longitude: -122.6749817,
    //     },
    //     title: "Best Place",
    //     description: "This is the best place in Portland",
    //     image: Images[0],
    //   },
    //   {
    //     coordinate: {
    //       latitude: 45.524698,
    //       longitude: -122.6655507,
    //     },
    //     title: "Second Best Place",
    //     description: "This is the second best place in Portland",
    //     image: Images[1],
    //   },
    //   {
    //     coordinate: {
    //       latitude: 45.5230786,
    //       longitude: -122.6701034,
    //     },
    //     title: "Third Best Place",
    //     description: "This is the third best place in Portland",
    //     image: Images[2],
    //   },
    //   {
    //     coordinate: {
    //       latitude: 45.521016,
    //       longitude: -122.6561917,
    //     },
    //     title: "Fourth Best Place",
    //     description: "This is the fourth best place in Portland",
    //     image: Images[3],
    //   },
    // ],
    region: { 
      latitude: 17.4126274,
      longitude: 78.2679583,
      latitudeDelta: 0.04864195044303443,
      longitudeDelta: 0.040142817690068,
    },
  };

  UNSAFE_componentWillMount() {
    this.index = 0;
    this.animation = new Animated.Value(0);
  }
  componentDidMount() {
    // We should detect when scrolling has stopped then animate
    // We should just debounce the event listener here
    // console.log(this.props.navigation.state.params.data[1].coordinate)
    this.animation.addListener(({ value }) => {
      let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
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
              latitudeDelta: this.state.region.latitudeDelta,
              longitudeDelta: this.state.region.longitudeDelta,
            },
            350
          );
        }
      }, 10);
    });
  }

  render() {
    const interpolations = this.state.serverData.map((marker, index) => {
      const inputRange = [
        (index - 1) * CARD_WIDTH,
        index * CARD_WIDTH,
        ((index + 1) * CARD_WIDTH),
      ];
      const scale = this.animation.interpolate({
        inputRange,
        outputRange: [1, 2.5, 1],
        extrapolate: "clamp",
      });
      const opacity = this.animation.interpolate({
        inputRange,
        outputRange: [0.35, 1, 0.35],
        extrapolate: "clamp",
      });
      return { scale, opacity };
    });

    return (
      <View style={styles.container}>
        <MapView
          ref={map => this.map = map}
          initialRegion={this.state.region}
          style={styles.container}
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
                    x: this.animation,
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
                <Transition appear='bottom' disappear='scale'>
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
                </Transition>
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
});

