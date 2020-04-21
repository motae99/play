import React, { useContext } from "react";
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
import Card from "../components/EventListCard";
import LottieView from 'lottie-react-native'; 
import FastImage from "react-native-fast-image";

import { SharedElement } from 'react-navigation-shared-element';

// import SkeletonContent from "react-native-skeleton-content";
import {CirclesLoader, PulseLoader, TextLoader, DotsLoader} from 'react-native-indicator';

import { useNavigation, useNavigationParam} from 'react-navigation-hooks'
import { ListingContext } from '../../../context/ListingContext';

import { UserContext } from '../../../context/UserContext';

const intial  = firestore().collection('partyHalls').orderBy("timestamp", "asc");

const { width, height } = Dimensions.get("window");

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  wrapper: {},
  mapButton: {
    position: "absolute",
    bottom: 30,
    right: 30,
    backgroundColor: "transparent",
    color: "rgba(255, 255, 255, 0.75)",
    zIndex: 1
  },
  filterButton: {
    position: "absolute",
    bottom: 0,
    right: 150,
    backgroundColor: "transparent",
    color: "rgba(255, 255, 255, 0.75)",
    zIndex: 1
  },

});

const Listing = () => {
  const { navigate } = useNavigation();
  const {
    documentData,
    loading,
    refreshing,
    setRfreshing, 
    setLoading,
    setQuery
  } = useContext(ListingContext);

  // const User = useContext(UserContext);

  const renderHeader = () => {
    try {
      return <Text style={styles.headerText}>Items</Text>;
    } catch (error) {
      console.log(error);
    }
  };

  const renderFooter = () => {
    if (fetching) {
      return(
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <LottieView source={require('../../../../images/weedingStage.json')} autoPlay loop />
        </View>
      ); 
    } else {
      return null;
    }
    
  };              

  const toggleHeart = item => {
    // console.log(item)
    item.isHearted = !item.isHearted;
    // console.log(item)
    // // data.item.selectedClass = data.item.isSelect
    // //   ? styles.selected
    // //   : styles.list;
    // // const index = this.state.dataSource.findIndex(
    // //   item => data.item.id === item.id
    // // );
    // // this.state.dataSource[index] = data.item;
    // // this.setState({
    // //   dataSource: this.state.dataSource
    // // });
    // // console.log("My heart is completely with you")
    // // console.log("Heart", data.isHearted)
    // data.isHearted = !data.isHearted;

    // // console.log("toggled", data.isHearted)

    // const index = documentData.findIndex(
    //   item => data.id === item.id
    // );
    // // console.log("index", index)
    // // console.log("documentData[index]", documentData[index])
    // // console.log("data", data)

    // documentData[index] = data;
    // setDocumentData({ documentData: documentData });
  };

  const handelRefresh = () => {
    setRfreshing(true)
    console.log('Refreshing')
    setQuery(firestore().collection('partyHalls').orderBy("timestamp", "desc"))
    
  }


    if (loading || refreshing) {
      return(
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <LottieView source={require('../../../../images/videoShooting.json')} autoPlay loop />
        </View>
      ); 
    }

    if (documentData && documentData.length > 0) {
      return (
        <View style={styles.container}>
          <FlatList
            data={documentData}
            renderItem={({ item }) =><Card item={item} toggleHeart={toggleHeart}/>}
            keyExtractor={item => String(item.key)}
            ListHeaderComponent={() => renderHeader() }
            ListFooterComponent={() => renderFooter() }
            onEndReached={() => reFetching(true)}
            onEndReachedThreshold={0.1}
            refreshing={refreshing}
            onRefresh={() => handelRefresh()}
          />

          {/* <TouchableOpacity
            style={styles.mapButton}
            // onPress={() => setQuery }
            onPress={() => navigate("EventMap", { data: documentData }) }
          >
            <Feather name="map-pin" size={35} color={"#ffff"} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.filterButton}
            onPress={() => navigate("EventFilter", { data: documentData }) }
          >
            <Feather name="filter" size={35} color={"#ffff"} />
          </TouchableOpacity> */}
        </View>
      );
    }

    return null;
  
}

export default function (){
  return (
    <ListingContext.Provider value={
      documentData,
      loading,
      refreshing,
      setRfreshing, 
      setLoading,
      setQuery
    } >
      <Listing />
    </ListingContext.Provider>
  );
}