import React, {memo} from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions
} from "react-native";
import Swiber from "../components/Swiber";
import Feather from "react-native-vector-icons/Feather";
import * as Animatable from "react-native-animatable";
import { SharedElement } from 'react-navigation-shared-element';
import { useNavigation} from 'react-navigation-hooks'
const { width } = Dimensions.get("window");
const height = width * 0.5;

const styles = StyleSheet.create({
  item: {
   backgroundColor: "#f9c2ff",
   flex: 1,
   margin: 10,
   height: height + 5,
 },
 heartButton: {
   position: "absolute",
   top: 10,
   right: 10,
   opacity: 5,
   backgroundColor: "rgba(255, 255, 255, 0.10)",
   borderRadius: 20
   // textAlignVertical:"center", alignContent:"center", alignItems:"center", alignSelf:"center"
 },
 providerName: {
   position: "absolute",
   bottom: 15,
   color: "white",
 },
 moreButton: {
   position: "absolute",
   top: 10,
   left: 10,
   opacity: 5,
   backgroundColor: "rgba(255, 255, 255, 0.10)",
   borderRadius: 20
 },
 heart: { textAlign: "center", color: "white", fontSize: 28 }
 });

export default memo( ({ item, toggleHeart }) => {
  const { navigate } = useNavigation();

  return (
    <View key={item.key} style={styles.item}>
       <SharedElement id={`item.${item.key}.photo`}> 
          <Swiber swipeData={item} minimal={true}/>
        </SharedElement>
      <TouchableOpacity
        style={styles.moreButton}
        onPress={ () => {
          navigate("EventDetail", { data: item });
        } }
      >
        <Feather name="more-horizontal" size={35} color={"#ffff"} />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.heartButton}
        onPress={ ()=> toggleHeart(item)} 
        > 
        {item.isHearted ? (
          <Animatable.View
            animation="bounceIn"
            easing="ease-in"
            // iterationCount="infinite"
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
      </TouchableOpacity>
      <Animatable.Text
        animation="bounceInRight"
        style={styles.providerName}
      >
        {item.partyHallName}
      </Animatable.Text>
    </View>
  );
});
