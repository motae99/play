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
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
    marginTop: 17
  },
  date: {
    // marginBottom: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.20)',
    // borderColor: "gray",
    // borderWidth: 1,
    borderRadius: 5,
    marginHorizontal: 20
  }
});


export default memo(({item, parentCallback}) => {

  // sendData = (date, time) => {
  //   // console.log(date, time);
  //   parentCallback(date, time);
  // }

    // console.log(item)
    // item.forEach(element => {
    //  console.log(element.data.date)
    // });
return <View style={styles.date}>
  <Text style={styles.row}>{item.data.date}  
  
  {item.data.key}</Text>
  </View>

    // return (
    //   <ScrollView key={item.key} style={styles.date}>
    //     {item.map((item, i) => {
    //       return (
    //         <TouchableOpacity
    //           key={i}
    //           onPress={() => {
    //             // sendData(date, item)
    //           }}
    //         >
    //           <View style={styles.row}>
    //             <Text> {item.userId}</Text>
    //           </View>
    //         </TouchableOpacity>
    //       );
    //     })}
    //   </ScrollView>
    // );
    
})
