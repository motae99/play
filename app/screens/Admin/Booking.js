import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  Image
} from "react-native";
import firestore from "@react-native-firebase/firestore";
import Feather from "react-native-vector-icons/Feather";
import BookingCard from "./components/BookingCard";
import LottieView from "lottie-react-native";
import FastImage from "react-native-fast-image";
import auth from "@react-native-firebase/auth";

import { useNavigation, useNavigationParam } from "react-navigation-hooks";


// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  NewBookingButton: {
    position: "absolute",
    bottom: 0,
    right: 150,
    backgroundColor: "transparent",
    color: "rgba(255, 255, 255, 0.75)",
    zIndex: 1
  }
});

export default function Booking() {
  const { navigate } = useNavigation();
  const [user, setUser] = useState(null);

  const [documentData, setDocumentData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    let user = await auth().currentUser;
    setUser(user);

    const unsubscribe = firestore()
      .collection("Booking")
      .where("eventProviderID", "==", user.uid)
      .orderBy("timeStamp", "asc")
      .onSnapshot(querySnapshot => {
        if (querySnapshot) {
          const documentData = querySnapshot.docs.map(documentSnapshot => {
            return {
              ...documentSnapshot.data(),
              key: documentSnapshot.id
            };
          });
          setDocumentData(documentData);

          if (loading) {
            setLoading(false);
          }
        }
      });
    return () => unsubscribe();
  }, []);

  const changeState = item => {
    console.log(item);
    // firestore().collection('Booking').where("providerId","==" ,user.uid).orderBy('timeStamp', 'asc');
  };

  const NewBooking = () => {
    console.log("do New Booking");
  };

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <LottieView
          source={require("../../../images/videoShooting.json")}
          autoPlay
          loop
        />
      </View>
    );
  }

  if (documentData && documentData.length > 0) {
    return (
      <View style={styles.container}>
        <FlatList
          data={documentData}
          renderItem={({ item }) => (
            <BookingCard item={item} changeState={changeState} />
          )}
          keyExtractor={item => String(item.key)}
        />

        <TouchableOpacity style={styles.NewBookingButton} onPress={NewBooking}>
          <Feather name="plus-square" size={35} color={"#ffff"} />
        </TouchableOpacity>
      </View>
    );
  }

  return null;
}
