import React, { RefObject, useState } from "react";
import { StyleSheet, View, Text } from "react-native";



const styles = StyleSheet.create({
  text: {
    fontFamily: "UberMoveRegular",
    fontSize: 14
  },

  info: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8
  },

  title: {
    fontFamily: "UberMoveMedium",
    fontSize: 16,
    marginBottom: 8
  },

});



export default ({ onDateAncher }) => {
  return (
    <View >
      <Text style={styles.title}>some date</Text>
      <View
        style={styles.info}
        onLayout={({
          nativeEvent: {
            layout: { y: anchor }
          }
        }) => onDateAncher(anchor + 142)

        }
      >
        <Text style={styles.text}>38/68/9020 at 11:30 AM</Text>
      </View>
    </View>
  )
}
