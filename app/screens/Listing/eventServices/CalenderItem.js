import React, { memo } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView
} from "react-native";


const styles = StyleSheet.create({
  row: {
    backgroundColor: "white",
    flexDirection: "row",
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17
  },
  date: {
    marginBottom: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.20)',
    // borderColor: "gray",
    // borderWidth: 1,
    borderRadius: 5,
    marginHorizontal: 20
  }
});


export default memo(({data, parentCallback}) => {

  sendData = (date, time) => {
    // console.log(date, time);
    parentCallback(date, time);
  }


    const date = data.date;
    const schedule = data.schedule;
    return (
      <ScrollView key={data.key} style={styles.date}>
        {data.schedule.map((time, i) => {
          return (
            <TouchableOpacity
              key={i}
              onPress={() => {
                sendData(date, time)
              }}
            >
              <View style={styles.row}>
                <Text> {time}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    );
})
