import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";

import FastImage from "react-native-fast-image";

import Swiper from "react-native-swiper";

const styles = StyleSheet.create({
  wrapper: {
    // flex: 1,
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

export default function Swipe({swipeData, autoPlay=false, minimal=false}) {
 const data = swipeData;
  return (
    <View> 
      <FastImage
        style={styles.image}
        source={{
          uri: data.files[0].uri,
          priority: FastImage.priority.normal,
          cashe: FastImage.cacheControl.immutable
        }}
        resizeMode={FastImage.resizeMode.stretch}
      />
    </View>
    // <Swiper
    //   style={styles.wrapper}
    //   dot={
    //     <View
    //       style={styles.dots }
    //     />
    //   }
    //   activeDot={
    //     <View
    //       style={styles.activeDot}
    //     />
    //   }
    //   paginationStyle={{
    //     bottom: 20
    //   }}
    //   loop={true}
    //   autoplay={autoPlay}
    //   loadMinimal={minimal}
    //   // loadMinimalLoader= {()=> <ActivityIndicator/>}
    // >
    //   {data.files.map((image, key) => (
    //     <View key={key} style={styles.slide}>
    //       <FastImage
    //         style={styles.image}
    //         source={{
    //           uri: image.uri,
    //           priority: FastImage.priority.normal,
    //           cashe: FastImage.cacheControl.immutable
    //         }}
    //         resizeMode={FastImage.resizeMode.stretch}
    //       />
          
          
    //     </View>
    //   ))}
    // </Swiper>
  );
}
