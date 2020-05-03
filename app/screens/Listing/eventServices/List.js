import React, { useContext } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from "react-native";
import firestore from "@react-native-firebase/firestore";
import Feather from 'react-native-vector-icons/Feather'
import Card from "../components/EventListCard";
import LottieView from 'lottie-react-native'; 

import { useNavigation, useNavigationParam} from 'react-navigation-hooks'
import { ListingContext } from '../../../context/ListingContext';

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

export default Listing = () => {
  const { navigate } = useNavigation();
  const {
    documentData,
    loading,
    refreshing,
    setRfreshing, 
    setLoading,
    setQuery,
    fetching,
    reFetching
  } = useContext(ListingContext);


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
            renderItem={({ item }) =><Card item={item} />}
            keyExtractor={item => String(item.key)}
            ListHeaderComponent={() => renderHeader() }
            ListFooterComponent={() => renderFooter() }
            onEndReached={() => reFetching(true)}
            onEndReachedThreshold={0.1}
            refreshing={refreshing}
            onRefresh={() => handelRefresh()}
          />

          <TouchableOpacity
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
          </TouchableOpacity>
        </View>
      );
    }

    return null;
  
}
