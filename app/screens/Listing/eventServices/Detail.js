import React, { useEffect, useState, useContext } from "react";
import {
  Text,
  View,
  StatusBar,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Modal,
  Button
} from "react-native";
import moment from "moment";

import Services from "../components/serviceSingular";
import Availability from "./Availability";
import { ThemeUtils, Color } from "../../../constants/index";
import styles from "../styles/Detail.style";
import Swiber from "../components/Swiber";
import LottieView from "lottie-react-native";

import { SharedElement } from "react-navigation-shared-element";
import Feather from "react-native-vector-icons/Feather";
import * as Animatable from "react-native-animatable";
import MapView, { Marker } from "react-native-maps";

import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import analytics from "@react-native-firebase/analytics";

import { useNavigation } from "react-navigation-hooks";

import Animated from "react-native-reanimated";
import { onScroll, useValues, interpolateColor } from "react-native-redash";
import DateTimePicker from "@react-native-community/datetimepicker";

const { width, height } = Dimensions.get("window");
const { Extrapolate, interpolate, color } = Animated;

const Details = () => {

  const { goBack, getParam, navigate } = useNavigation();
  
  // const data = getParam("data");
  // const userContext = useContext(UserContext);
  // console.log('user context', userContext)
  const [selected, select] = useState(false);
  const [booking, setBooking] = useState(false);
  const [choices, setChoices] = useState(null);
  const [modal, setModal] = useState(false);
  const [data, setData] = useState(getParam("data"));

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const ASPECT_RATIO = width / height;
  const LATITUDE_DELTA = 0.0522;
  const region = {
    latitude: data.coordinate.latitude,
    longitude: data.coordinate.longitude,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LATITUDE_DELTA * ASPECT_RATIO
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);

    console.log(new Date() );
    // console.log(currentDate)
    // var formated_date = new Date(currentDate).toLocaleDateString();
    // var formated_time = new Date(currentDate).toLocaleTimeString();
    var date =
      currentDate.getFullYear() +
      "-" +
      currentDate.getMonth() +
      "-" +
      currentDate.getDate();
    // var date = currentDate.getFullYear()+'-'+(currentDate.getMonth()+1)+'-'+currentDate.getDate();
    var time =
      currentDate.getHours() +
      ":" +
      currentDate.getMinutes() +
      ":" +
      currentDate.getSeconds();
    // var day = formated_data.get
    // console.log(date)
    // console.log(time)

    select({ date: date, time: time });
  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  ///Animation
  const [y] = useValues([0], []);

  const headerBackgroundColor = interpolateColor(y, {
    inputRange: [0, 140],
    outputRange: ["rgba(0,0,0,0.0)", Color.HEADER_COLOR]
  });
  //For header image opacity
  const headerImageOpacity = interpolate(y, {
    inputRange: [0, 140],
    outputRange: [1, 0],
    extrapolate: Extrapolate.CLAMP
  });

  //Song list container position from top
  const ListViewTopPosition = interpolate(y, {
    inputRange: [0, 250],
    outputRange: [
      ThemeUtils.relativeWidth(100) - ThemeUtils.APPBAR_HEIGHT - 10,
      0
    ],
    extrapolate: Extrapolate.CLAMP
  });

  //header title opacity
  const headerTitleOpacity = interpolate(y, {
    inputRange: [0, 20, 50],
    outputRange: [0, 0.5, 1],
    extrapolate: Extrapolate.CLAMP
  });

  /// Animation

  const handleSelected = data => {
    console.log(data);
    select(data);
  };

  const renderModal = () => {
    return (
      <Modal
        animationType={"slide"}
        transparent={false}
        visible={modal}
        onRequestClose={() => setModal(false)}
      >
        <Availability
          closeModal={() => setModal(false)}
          onTimeSelected={handleSelected}
        />
      </Modal>
    );
  };

  const confirmBooking = async () => {
    setBooking(true);
    const user = await auth().currentUser;
    // console.log(user)
    const saveData = {
      eventProviderID: data.key,
      eventProviderName: data.partyHallName,
      eventProviderImage: data.files[0].uri,
      date: selected.date,
      time: selected.time,
      timeStamp: Date.now(),
      status: "booked",
      services: choices,
      userId: user.uid,
      userName: user.displayName,
      userPhoto: user.photoURL
    };
    // console.log(user)
    await firestore()
      .collection("Booking")
      .add(saveData);
    // BookEvent(data, selected)
    // navigate('')
    goBack();
  };

  const handleChoices = data => {
    // console.log('from parent', data);
    setChoices(data);
    // this.setState({ selected: data });
  };

  const toggleHeart = data => {
    console.log("My heart is completely with you");
    console.log("Heart", data.isHearted);

    data.isHearted = !data.isHearted;
    console.log("toggled", data.isHearted);
    setData(data);
  };

  if (booking) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <LottieView
          source={require("../../../../images/videoShooting.json")}
          autoPlay
          loop
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />

      <Animated.View
        style={[
          styles.headerImageStyle,
          {
            opacity: headerImageOpacity
          }
        ]}
      >
        <View Style={styles.headerImageStyle}>
          <TouchableOpacity onPress={() => console.log("pressed")}>
            <SharedElement id={`item.${data.key}.photo`}>
              <Swiber swipeData={data} autoPlay={false} />
            </SharedElement>
          </TouchableOpacity>
        </View>
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
          <TouchableOpacity onPress={() => goBack()}>
            <Feather
              name="arrow-left"
              size={25}
              color={Color.HEADER_BACK_ICON_COLOR}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.headerRightIcon}>
          <TouchableOpacity onPress={() => toggleHeart(data)}>
            <Animatable.View animation="slideInDown">
              <Animatable.View
                animation={data.isHearted ? "bounceIn" : "pulse"}
                direction={data.isHearted ? "alternate" : null}
                delay={data.isHearted ? 2000 : null}
                iterationCount={!data.isHearted ? "infinite" : null}
                easing={!data.isHearted ? "ease-out" : null}
                style={styles.heart}
              >
                <Feather
                  name="heart"
                  size={35}
                  color={data.isHearted ? "red" : "#ffff"}
                />
              </Animatable.View>
            </Animatable.View>
          </TouchableOpacity>
        </View>

        <View style={styles.headerSecondRightIcon}>
          <TouchableOpacity onPress={() => console.log("share")}>
            <Animatable.View animation="slideInDown" useNativeDriver={true}>
              <Animatable.View animation="bounceIn" direction="alternate">
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
          {data.partyHallName}
        </Animated.Text>
      </Animated.View>

      <Animated.ScrollView
        overScrollMode={"never"}
        style={{ zIndex: 10 }}
        scrollEventThrottle={16}
        onScroll={onScroll({ y })}
      >
        <Animated.View
          style={{
            transform: [
              {
                translateY: ListViewTopPosition
              }
            ]
          }}
        >
          <View style={{height: 200}}><Text>Rating Comments Section</Text></View>
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
            <Services providerData={data} choosen={handleChoices} />
            <View>
              <View>
                <Button onPress={showDatepicker} title="Show date picker!" />
              </View>
              <View>
                <Button onPress={showTimepicker} title="Show time picker!" />
              </View>
              {show && (
                <DateTimePicker
                  testID="dateTimePicker"
                  timeZoneOffsetInMinutes={0}
                  value={date}
                  mode={mode}
                  is24Hour={true}
                  display="default"
                  onChange={onChange}
                  // locale="es-ES"
                  // minimumDate={moment().format("YYYY/MM/DD")}
                  // minimumDate={new Date().toLocaleDateString()}
                  // maximumDate={addMonths(new Date().format('m-d-Y'),2)}
                />
              )}
            </View>
          </View>
        </Animated.View>
      </Animated.ScrollView>

      <Animatable.View
        animation="fadeInUpBig"
        style={styles.footer}
        useNativeDriver={true}
      >
        {renderModal()}
        {selected ? (
          <View>
            <TouchableOpacity onPress={() => setModal(true)}>
              <Text>
                {selected.date} at {selected.time}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={confirmBooking}
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
            onPress={() => setModal(true)}
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
};

Details.sharedElements = navigation => {
  data = navigation.getParam("data");
  // console.log(navigation)
  console.log("data ", data);
  // return [`item.${data.key}.photo`];
  return [
    {
      id: `item.${data.key}.photo`
      // animation: 'fade',
      // resize: 'stretch',
      // align: 'center-top'
    }
  ];
};

export default Details;
