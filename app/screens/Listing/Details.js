import React, {useContext} from "react";
import {
  Text,
  View,
  StatusBar,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity
} from "react-native";

import FastImage from "react-native-fast-image";
import Icon from "react-native-vector-icons/Ionicons";
import Font from "react-native-vector-icons/FontAwesome";
import Swiper from "react-native-swiper";
import * as Animatable from "react-native-animatable";
import MapView, { Marker } from "react-native-maps";


import Services from './Services';
import Swiber from "./components/Swiber";

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  map: {
    width: "100%",
    height: 250
  },
  footer: {
    position: "absolute",
    flex: 0.1,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "gray",
    flexDirection: "row",
    height: 50,
    alignItems: "center"
  },
  bottomButtons: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1
  },
  heartButton: {  
    position: "absolute",
    top: 20, 
    right: 15, 
    opacity: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.10)',
    borderRadius: 20,
    zIndex: 10
    // textAlignVertical:"center", alignContent:"center", alignItems:"center", alignSelf:"center"
  },
  heart: { textAlign: 'center',  color: "white", fontSize: 28 }

});

const { width, height } = Dimensions.get("window");

export default class Details extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.navigation.state.params.data
    };
  }

  toggleHeart = (data) => {
    console.log("My heart is completely with you")
    console.log("Heart", data.isHearted)

    data.isHearted = !data.isHearted;
    console.log("toggled", data.isHearted)
    this.setState({data: data})

  }

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

    return (
      <View style={styles.container}>
        <StatusBar translucent backgroundColor="transparent" />
        {/* <Text>Do Header here and Take care of positioning</Text> */}
        <TouchableOpacity  style={styles.heartButton} onPress={() => this.toggleHeart(data)}>
            {
              (data.isHearted) ? 
              <Animatable.View animation="pulse" easing="ease-in" iterationCount="infinite" style={styles.heart }>
                <Icon name="ios-heart" size={35} color={"red"} />
              </Animatable.View>
              : 
              <Animatable.View animation="pulse" easing="ease-out" iterationCount="infinite" style={styles.heart }>
                <Icon name="ios-heart-empty" size={35} color={"#ffff"} />
              </Animatable.View>

            }
            
          </TouchableOpacity>
        <ScrollView>
          <Swiber swipeData={data} autoPlay={true}/>
          

          <View style={{ height: 300 }}>
            <Text> Show Comments and Reviews</Text>
            <Text> Show Services Lottie Files Here </Text>
            <Animatable.Text
              animation="slideInDown"
              iterationCount={5}
              direction="alternate"
            >
              Up and down you go
            </Animatable.Text>
            <Animatable.Text
              animation="pulse"
              easing="ease-out"
              iterationCount="infinite"
              style={{ textAlign: "center", fontSize: 50 }}
            >
              some ❤️ some{" "}
            </Animatable.Text>
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
              title={data.partyHallName}
              description={data.address}
              coordinate={region}
            />
          </MapView>
          <View style={{ height: 900 }}>
            <Text>rendering services </Text>
            <Services providerData={data}/>
          </View>
        </ScrollView>
        <View style={styles.footer}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Availability")}
            style={styles.bottomButtons}
          >
            <Text> navigate to calendar</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
