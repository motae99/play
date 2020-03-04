import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Dimensions
} from "react-native";
import FastImage from "react-native-fast-image";
// import na from '@react-navigation/'
const { width, height } = Dimensions.get("window");

const CARD_HEIGHT = height / 3;
const CARD_WIDTH = width - 20;

function MapCard({ data }) {
  return (
    <View style={styles.card} key={data.key}>
      <FastImage
        style={styles.cardImage}
        source={{
          uri: data.files[0].uri,
          priority: FastImage.priority.normal,
          cashe: FastImage.cacheControl.immutable
        }}
        resizeMode={FastImage.resizeMode.cover}
      />
      <TouchableWithoutFeedback
        onPress={
          () => console.log("go Detail")
          // this.props.navigation.navigate("EventDetail", { data: data })
        }
      >
        <View style={styles.textContent}>
          <Text numberOfLines={1} style={styles.cardtitle}>
            {data.partyHallName}
          </Text>
          <Text numberOfLines={1} style={styles.cardDescription}>
            {data.address}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}


const styles = StyleSheet.create({
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
   overflow: "hidden"
 },
 cardImage: {
   flex: 1,
   width: "100%",
   height: "100%",
   alignSelf: "center"
 },
 textContent: {
   // flex: 4,
   position: "absolute",
   bottom: 30,
   paddingHorizontal: 25
 },
 cardtitle: {
   fontSize: 20,
   marginTop: 5,
   fontWeight: "bold",
   color: "white",
   fontStyle: "italic"
 },
 cardDescription: {
   fontSize: 15,
   color: "white"
 },
});

export default MapCard;
