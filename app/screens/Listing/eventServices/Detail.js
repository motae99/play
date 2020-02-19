import React, { useContext } from "react";
import {
  Text,
  View,
  StatusBar,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Animated
} from "react-native";

import FastImage from "react-native-fast-image";
import Icon from "react-native-vector-icons/Ionicons";
import Font from "react-native-vector-icons/FontAwesome";
import Swiper from "react-native-swiper";
import * as Animatable from "react-native-animatable";
import MapView, { Marker } from "react-native-maps";
import { ThemeUtils, Color } from "../../../constants/index";

import styles from "../styles/Detail.style";

import Services from "../Services";
import Swiber from "../components/Swiber";

const { width, height } = Dimensions.get("window");

export default class Details extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.navigation.state.params.data,
      scrollY: new Animated.Value(0)
    };
  }

  toggleHeart = data => {
    console.log("My heart is completely with you");
    console.log("Heart", data.isHearted);

    data.isHearted = !data.isHearted;
    console.log("toggled", data.isHearted);
    this.setState({ data: data });
  };

  //For header background color from transparent to header color
  _getHeaderBackgroundColor = () => {
    const { scrollY } = this.state;

    return scrollY.interpolate({
      inputRange: [0, 140],
      outputRange: ["rgba(0,0,0,0.0)", Color.HEADER_COLOR],
      extrapolate: "clamp",
      useNativeDriver: true
    });
  };

  //For header image opacity
  _getHeaderImageOpacity = () => {
    const { scrollY } = this.state;

    return scrollY.interpolate({
      inputRange: [0, 140],
      outputRange: [1, 0],
      extrapolate: "clamp",
      useNativeDriver: true
    });
  };

  //Song list container position from top
  _getListViewTopPosition = () => {
    const { scrollY } = this.state;

    return scrollY.interpolate({
      inputRange: [0, 250],
      outputRange: [
        ThemeUtils.relativeWidth(100) - ThemeUtils.APPBAR_HEIGHT - 10,
        0
      ],
      extrapolate: "clamp",
      useNativeDriver: true
    });
  };

  //header title opacity
  _getHeaderTitleOpacity = () => {
    const { scrollY } = this.state;

    return scrollY.interpolate({
      inputRange: [0, 20, 50],
      outputRange: [0, 0.5, 1],
      extrapolate: "clamp",
      useNativeDriver: true
    });
  };

  //artist name opacity
  _getNormalTitleOpacity = () => {
    const { scrollY } = this.state;

    return scrollY.interpolate({
      inputRange: [0, 20, 50],
      outputRange: [1, 0.5, 0],
      extrapolate: "clamp",
      useNativeDriver: true
    });
  };

  render() {
    const { data } = this.state;
    const ASPECT_RATIO = width / height;
    const LATITUDE_DELTA = 0.0522;
    const region = {
      latitude: data.coordinate.latitude,
      longitude: data.coordinate.longitude,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LATITUDE_DELTA * ASPECT_RATIO
    };

    const headerBackgroundColor = this._getHeaderBackgroundColor();

    const headerImageOpacity = this._getHeaderImageOpacity();
    const headerTitleOpacity = this._getHeaderTitleOpacity();
    const normalTitleOpacity = this._getNormalTitleOpacity();

    const listViewTop = this._getListViewTopPosition();

    return (
      <View style={styles.container}>
        <StatusBar
          translucent
          backgroundColor="transparent"
          style={{ height: 80 }}
        />
        {/* <StatusBar barStyle={'light-content'} backgroundColor={Color.STATUSBAR_COLOR}/> */}

        {/* <Text>Do Header here and Take care of positioning</Text> */}

        <Animated.View
          style={[
            styles.headerImageStyle,
            {
              opacity: headerImageOpacity
            }
          ]}
        >
          <Swiber swipeData={data} autoPlay={true}/>
          {/* <FastImage source={{
                uri: data.files[0].uri,
                priority: FastImage.priority.normal,
                cashe: FastImage.cacheControl.immutable
                }}
            /> */}
        </Animated.View>

        <Animated.View
          style={[
            styles.headerStyle,
            {
              backgroundColor: headerBackgroundColor
            }
          ]}
        >
          <View style={styles.headerLeftIcon}>
            <Icon
              name="ios-heart"
              size={25}
              color={Color.HEADER_BACK_ICON_COLOR}
            />
          </View>

          <View style={styles.headerRightIcon}>
            <TouchableOpacity onPress={() => this.toggleHeart(data)}>
              <Animatable.View
                animation="slideInDown"
                // delay={500}
                // duration={2000}
                // onAnimationEnd={() =>
                //   console.log("this footer animation ended")
                // }
              >
                {data.isHearted ? (
                  <Animatable.View
                    animation="bounceIn"
                    direction="alternate"
                    delay={2000}

                    style={styles.heart}
                  >
                    <Icon name="ios-heart" size={35} color={"red"} />
                  </Animatable.View>
                ) : (
                  <Animatable.View
                    animation="pulse"
                    easing="ease-out"
                    iterationCount="infinite"
                    style={styles.heart}
                  >
                    <Icon name="ios-heart-empty" size={35} color={"#ffff"} />
                  </Animatable.View>
                )}
              </Animatable.View>
            </TouchableOpacity>
          </View>

          <View style={styles.headerSecondRightIcon}>
            <TouchableOpacity onPress={() => console.log('share')}>
              <Animatable.View
                animation="slideInDown"
                // delay={500}
                // duration={2000}
                useNativeDriver={true}
                // onAnimationEnd={() =>
                //   console.log("this footer animation ended")
                // }
              >
                  <Animatable.View
                    animation="bounceIn"
                    direction="alternate"
                    // duration={2000}
                    // delay={2000}
                  >
                    <Icon name="ios-share" size={35} color={"white"} />
                  </Animatable.View>
                
              </Animatable.View>
            </TouchableOpacity>
          </View>

          <Animated.Text
            style={[
              styles.headerTitle,
              {
                opacity: headerTitleOpacity
              }
            ]}
          >
            {/* {ARTIST_NAME} */}
            Detail View Name
          </Animated.Text>
        </Animated.View>

        <Animated.ScrollView
          overScrollMode={"never"}
          style={{ zIndex: 10 }}
          scrollEventThrottle={16}
          onScroll={Animated.event([
            {
              nativeEvent: { contentOffset: { y: this.state.scrollY } }
            }
          ])}
        >
          <Animated.View
            style={{
              transform: [
                {
                  translateY: listViewTop
                }
              ]
            }}
          >
            <MapView
              style={styles.map}
              scrollEnabled={false}
              zoomEnabled={false}
              pitchEnabled={false}
              rotateEnabled={false}
              initialRegion={region}
            >
              <Marker
                title={data.partyHallName}
                description={data.address}
                coordinate={region}
              />
            </MapView>
            <View style={{ height: 900 }}>
              <Text>rendering services </Text>
              <Services providerData={data} />
            </View>
          </Animated.View>
        </Animated.ScrollView>

        <Animatable.View
          animation="fadeInUpBig"
          // delay={500}
        //   duration={2000}
          style={styles.footer}
          useNativeDriver={true}
        //   onAnimationEnd={() => console.log("this footer animation ended")}
        >
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("EventAvailability")}
            style={styles.bottomButtons}
          >
            <Animatable.Text
              animation="bounceIn"
              delay={2000}
              useNativeDriver={true}
              style={{ textAlign: "center", fontSize: 20 }}
            >
              Check Availability
            </Animatable.Text>
          </TouchableOpacity>
        </Animatable.View>
      </View>
    );
  }
}
