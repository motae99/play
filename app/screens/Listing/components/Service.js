import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Image,
  Animated,
  FlatList,
  TextInput,
  StatusBar,
  ScrollView,
  StyleSheet,
  Dimensions,
  ToolbarAndroid,
  TouchableOpacity
} from "react-native";

import firestore from "@react-native-firebase/firestore";

const { width, height } = Dimensions.get("window");

const DEFAULT = width;

export default function DetailView({ navigation }) {
  const { width, height } = Dimensions.get("window");
  const dataSource = navigation.state.params.data;
  const [services, setServices] = useState([]);
  const [serviceLoading, setServiceLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection("partyHalls")
      .doc("9Cg4qvaHKvaWNolba8F9XrU3Wxx1")
      .collection("services")
      .onSnapshot(querySnapshot => {
        const serverData = querySnapshot.docs.map(documentSnapshot => {
          // console.log("=========================");
          // console.log(documentSnapshot.data());
          // console.log("==========================");
          return {
            ...documentSnapshot.data(),
            key: documentSnapshot.id // required for FlatList
          };
        });

        // Update state with the users array
        setServices(serverData);
        // console.log(serverData)

        // As this can trigger multiple times, only update loading after the first update
        if (serviceLoading) {
          setServiceLoading(false);
        }
      });

    return () => unsubscribe(); // Stop listening for updates whenever the component unmounts
  }, []);


  cateringChecked = index => {
    this.setState({ checked: index });
    var meal = this.state.catering[index];
    // console.log(meal)
    let choice = [...this.state.choice];
    choice["catering"] = meal;
    console.log(choice);
  };

  renderCatering = () => {
    const items = this.state.catering;
    const length = items.length;
    if (length === 1) {
      var wi = DEFAULT - 20;
    }
    if (length === 2) {
      var wi = DEFAULT / length - 10;
    }
    if (length > 2) {
      var wi = DEFAULT / 3 - 10;
    }
   return (
      <View>
        <Text> header of catering </Text>
        <ScrollView
          key={"catering"}
          horizontal={true}
          style={styles.serviceScroll}
        >
          {items.map((item, i) => {
            return (
              <View key={i}>
                {this.state.checked == i ? (
                  <TouchableOpacity style={[styles.checked, { width: wi }]}>
                    <Text>{item.price}</Text>
                    <Text>{item.desc}</Text>
                    <Text>{item.icon}</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={() => {
                      this.cateringChecked(i);
                    }}
                    style={[styles.unchecked, , { width: wi }]}
                  >
                    <Text>{item.price}</Text>
                    <Text>{item.desc}</Text>
                    <Text>{item.icon}</Text>
                  </TouchableOpacity>
                )}
              </View>
            );
          })}
        </ScrollView>
        <Text> footer of catering </Text>
      </View>
    );
  };

  renderweddingStage = () => {
    const items = this.state.weddingStage;
    const length = items.length;
    if (length === 1) {
      var wi = DEFAULT - 20;
    }
    if (length === 2) {
      var wi = DEFAULT / length - 10;
    }
    if (length > 2) {
      var wi = DEFAULT / 3 - 10;
    }

    return (
      <View>
        <Text> header of weddingStage </Text>
        <ScrollView
          key={"weddingStage"}
          horizontal={true}
          style={styles.serviceScroll}
        >
          {items.map((item, i) => {
            return (
              <View key={i}>
                {this.state.wChecked == i ? (
                  <TouchableOpacity style={[styles.checked, { width: wi }]}>
                    <Text>{item.price}</Text>
                    <Text>{item.desc}</Text>
                    <Text>{item.icon}</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({ wChecked: i });
                    }}
                    style={[styles.unchecked, , { width: wi }]}
                  >
                    <Text>{item.price}</Text>
                    <Text>{item.desc}</Text>
                    <Text>{item.icon}</Text>
                  </TouchableOpacity>
                )}
              </View>
            );
          })}
        </ScrollView>
        <Text> footer of weddingStage </Text>
      </View>
    );
  };

  rendervideoShooting = () => {
    const items = this.state.videoShooting;
    const length = items.length;
    if (length === 1) {
      var wi = DEFAULT - 20;
    }
    if (length === 2) {
      var wi = DEFAULT / length - 10;
    }
    if (length > 2) {
      var wi = DEFAULT / 3 - 10;
    }
    return (
      <View>
        <Text> header of videoShooting </Text>
        <ScrollView
          key={"videoShooting"}
          horizontal={true}
          style={styles.serviceScroll}
        >
          {items.map((item, i) => {
            return (
              <View key={i}>
                {this.state.vChecked == i ? (
                  <TouchableOpacity style={[styles.checked, { width: wi }]}>
                    <Text>{item.price}</Text>
                    <Text>{item.desc}</Text>
                    <Text>{item.icon}</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({ vChecked: i });
                    }}
                    style={[styles.unchecked, , { width: wi }]}
                  >
                    <Text>{item.price}</Text>
                    <Text>{item.desc}</Text>
                    <Text>{item.icon}</Text>
                  </TouchableOpacity>
                )}
              </View>
            );
          })}
        </ScrollView>
        <Text> footer of catering </Text>
      </View>
    );
  };

  renderchoice = () => {
    if (this.state.checked) {
    }
    return <Text>user has selected some data</Text>;
  };

  selectCatering = (item, index) => {
    item.isSelected = !item.isSelected;
    item.selectedClass = item.isSelected ? styles.selected : styles.list;

    let filteredArray = this.state.catering.filter(x => x.isSelected);
    var i = this.state.catering.indexOf(filteredArray);
    filteredArray.isSelected = !filteredArray.isSelected;
    filteredArray.selectedClass = styles.list;

    this.state.catering[index] = item;
    this.state.catering[i] = filteredArray;

    this.setState({
      catering: this.state.catering
    });

    console.log(this.state.catering);

    if (item.isSelected) {
      this.setState(prevState => ({
        choice: [...prevState.choice, item]
        // choice: [...prevState.choice, { catering: item }]
      }));
    }
  };

  selectWeddingStage = (item, index) => {
    item.isSelected = !item.isSelected;
    item.selectedClass = item.isSelected ? styles.selected : styles.list;
    this.state.weddingStage[index] = item;
    this.setState({
      weddingStage: this.state.weddingStage
    });
  };

  selectvideoShooting = (item, index) => {
    item.isSelected = !item.isSelected;
    item.selectedClass = item.isSelected ? styles.selected : styles.list;
    this.state.videoShooting[index] = item;
    this.setState({
      videoShooting: this.state.videoShooting
    });
  };

 

  return (
    <View>
      {this.state.catering ? this.renderCatering() : null}
      {this.state.weddingStage ? this.renderweddingStage() : null}
      {this.state.videoShooting ? this.rendervideoShooting() : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
