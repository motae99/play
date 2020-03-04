import React, { useContext } from "react";
import {
  Text,
  View,
  StatusBar,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Animated,
  Modal
} from "react-native";

import FastImage from "react-native-fast-image";
import Icon from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";
import Font from "react-native-vector-icons/FontAwesome";
import Swiper from "react-native-swiper";
import * as Animatable from "react-native-animatable";
import MapView, { Marker } from "react-native-maps";
import { ThemeUtils, Color } from "../../../constants/index";

import styles from "../styles/Detail.style";
// import { UserContext } from '../../../context/UserContext';

import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import analytics from '@react-native-firebase/analytics';


import Services from "../components/serviceSingular";
import Availability from "./Availability";
import Swiber from "../components/Swiber";

const { width, height } = Dimensions.get("window");

async function trackScreenView(screen) {
  // Set & override the MainActivity screen name
  await analytics().setCurrentScreen(screen, screen);
}

export default class Details extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: this.props.navigation.state.params.data,
      selected: this.props.navigation.state.params.selected,
      // data: this.props.navigation.state.params.data,
      modal: false,
      scrollY: new Animated.Value(0)
    };
  }


  componentDidMount(){
    trackScreenView(this.state.data.partyHallName);
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

  handleSelected = data => {
    console.log(data);
    this.setState({ selected: data });
  };

  // availability(data) {
  //   this.setState({selected: data});
  // }
  renderModal() {
    return (
      <Modal
        animationType={"slide"}
        transparent={false}
        visible={this.state.modal}
        onRequestClose={() => this.setState({ modal: false })}
      >
        <Availability
          closeModal={() => this.setState({ modal: false })}
          onTimeSelected={this.handleSelected}
        />
      </Modal>
    );
  }

  async confirmBooking(){
    const {data, selected} = this.state;
    const user =  await auth().currentUser ;
      
    const saveData = {
      eventProviderID: data.key,
      eventProviderName: data.partyHallName,
      eventProviderImage: data.files[0].uri,
      date: selected.date,
      time: selected.time,
      timeStamp: Date.now(),
      status: 'booked'
      // userId: auth().currentUser.uid,
      // userName: auth().currentUser.displayName,
      // userPhoto: auth().currentUser.photoURL,
    }
    // console.log(user)
    // await firestore()
    //   .collection("Booking")
    //   .add(saveData);
    // BookEvent(data, selected)
  }

  handleChoices= data => {
    console.log(data);
    // this.setState({ selected: data });
  };
  

  render() {
    const { data, selected } = this.state;
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
          // style={{ height: 80 }}
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
          {/* <View Style={styles.headerImageStyle}> */}
          <Swiber swipeData={data} autoPlay={true} />
          {/* </View> */}
          {/* <TouchableOpacity onPress={console.log("pressed")}> */}
          
          {/* </TouchableOpacity> */}
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
            <Feather
              name="arrow-left"
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
                    <Feather name="heart" size={35} color={"red"} />
                  </Animatable.View>
                ) : (
                  <Animatable.View
                    animation="pulse"
                    easing="ease-out"
                    iterationCount="infinite"
                    style={styles.heart}
                  >
                    <Feather name="heart" size={35} color={"#ffff"} />
                  </Animatable.View>
                )}
              </Animatable.View>
            </TouchableOpacity>
          </View>

          <View style={styles.headerSecondRightIcon}>
            <TouchableOpacity onPress={() => console.log("share")}>
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
                  <Feather name="share-2" size={35} color={"white"} />
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
              <Services providerData={data} choosen={this.handleChoices}/>
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
          {this.renderModal()}
          {selected ? (
            <View>
              <TouchableOpacity onPress={() => this.setState({ modal: true })}>
                <Text>
                  {this.state.selected.date} at {this.state.selected.time}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.confirmBooking() }
                style={styles.bottomButtons}
              >
                <Animatable.Text
                  animation="bounceIn"
                  delay={2000}
                  useNativeDriver={true}
                  style={{ textAlign: "center", fontSize: 20 }}
                >
                  Book
                </Animatable.Text>
              </TouchableOpacity>
            </View>
          ) : null}
          {!selected ? (
            <TouchableOpacity
              onPress={() => this.setState({ modal: true })}
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
          ) : null}
        </Animatable.View>
      </View>
    );
  }
}
