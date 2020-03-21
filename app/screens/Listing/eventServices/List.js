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
import Card from "../components/EventListCard";
import LottieView from 'lottie-react-native'; 
import FastImage from "react-native-fast-image";

import { SharedElement } from 'react-navigation-shared-element';

// import SkeletonContent from "react-native-skeleton-content";
import {CirclesLoader, PulseLoader, TextLoader, DotsLoader} from 'react-native-indicator';

import { useNavigation, useNavigationParam} from 'react-navigation-hooks'


const intial  = firestore().collection('partyHalls').orderBy("timestamp", "desc");

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

export default function  Listing(){
  const { navigate } = useNavigation();

  const [ documentData, setDocumentData] = useState([]); 
  const [ limit, setLimit] = useState(3); 
  const [ reseting, reset] = useState(false); 
  const [ lastVisible, setLastVisible] = useState(null); 
  const [ fetching, reFetching] = useState(false); 
  const [ refreshing, setRfreshing] = useState(false); 
  const [ loading, setLoading] = useState(true); 
  const [ query, setQuery] = useState(intial); 

  useEffect(() => {
    try{ 
      const unsubscribe = query.limit(limit).onSnapshot((querySnapshot) => {
        if(querySnapshot){ 
          const documentData = querySnapshot.docs.map((documentSnapshot) => {
            return {
              ...documentSnapshot.data(),
              key: documentSnapshot.id, 
              isHearted: false
            };
          });
          if(documentData && documentData.length > 0){
            // console.log('lenght :', documentData.length)
            // // console.log('last :', documentData[documentData.length -1])
            // console.log('start after key :', documentData[documentData.length - 1].key)
            // console.log('start after timestamp :', documentData[documentData.length - 1].timestamp)
            let last = documentData[documentData.length - 1].timestamp;
            if(last){
              setLastVisible(last)
              setDocumentData(documentData);
            }
          }

          if (loading) {
            setLoading(false);
          }
          if (refreshing) {
            setRfreshing(false);
          }
          
         }
         });
        return () => unsubscribe(); 
      }catch (error) {
        console.log(error);
      }
   }, [query]);

   useEffect(() => {
      const unsubscribe = query.startAfter(lastVisible).limit(2).onSnapshot((querySnapshot) => {
        if(querySnapshot){ 
          const moreData = querySnapshot.docs.map((documentSnapshot) => {
            return {
              ...documentSnapshot.data(),
              key: documentSnapshot.id, 
              isHearted: false
            };
          });
          if(moreData && moreData.length > 0){
            // console.log('lenght more load:', moreData.length)
            // // console.log('last :', moreData[moreData.length -1])
            // console.log('start after key :', moreData[moreData.length - 1].key)
            // console.log('start after timestamp :', moreData[moreData.length - 1].timestamp)
            let last = moreData[moreData.length - 1].timestamp;
            if(last){
              setLastVisible(last)
              setDocumentData([...documentData, ...moreData]);
            }
          }

          // if (kantaOffersLoading) {
          //   setKantaOffersLoading(false);
          // }
          if (fetching) {
            reFetching(false);
          }
         }
         });
        return () => unsubscribe(); 
   }, [fetching]);

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
