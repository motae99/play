import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  ToolbarAndroid,
  TouchableOpacity
} from "react-native";

import FastImage from "react-native-fast-image";

import Swiper from "react-native-swiper";

const styles = StyleSheet.create({
  wrapper: {
    height: 650
  },
  dots:{
   backgroundColor: "rgba(255,255,255,.3)",
   width: 8,
   height: 8,
   borderRadius: 7,
   marginLeft: 7,
   marginRight: 7
 },
 activeDot: {
  backgroundColor: "#fff",
  width: 8,
  height: 8,
  borderRadius: 7,
  marginLeft: 7,
  marginRight: 7
},
  slide: {
    flex: 1,
    backgroundColor: "transparent"
  },
  image: {
    width: "100%",
    height: "100%"
  },
  heart: {
   textAlign: "center",
   position: "absolute",
   top: 50,
   right: 50,
   fontSize: 50
 },
});

export default function Swipe({swipeData, autoPlay}) {
 const data = swipeData;

  return (
    <Swiper
      style={styles.wrapper}
      dot={
        <View
          style={styles.dots }
        />
      }
      activeDot={
        <View
          style={styles.activeDot}
        />
      }
      paginationStyle={{
        bottom: 20
      }}
      loop={true}
      autoplay={autoPlay}
    >
      {data.files.map((image, key) => (
        <View key={key} style={styles.slide}>
          <FastImage
            style={styles.image}
            source={{
              uri: image.uri,
              priority: FastImage.priority.normal,
              cashe: FastImage.cacheControl.immutable
            }}
            resizeMode={FastImage.resizeMode.cover}
          />
          
          
        </View>
      ))}
    </Swiper>
  );
}
