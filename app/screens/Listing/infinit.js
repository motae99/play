import React, { Component } from 'react';
import { ActivityIndicator, Dimensions, FlatList, SafeAreaView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Icon from "react-native-vector-icons/Ionicons";
import Font from "react-native-vector-icons/FontAwesome";
import Swiber from "./components/Swiber";

import * as Animatable from 'react-native-animatable';

const { width, } = Dimensions.get('window');
const height = width * 0.5;

// Screen Dimensions
// Screen: Infinite Scroll
export default class InfiniteScroll extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      documentData: [],
      limit: 3,
      lastVisible: null,
      loading: false,
      refreshing: false,
    };
  }
  // Component Did Mount
  componentDidMount = () => {
    try {
      // Cloud Firestore: Initial Query
      this.retrieveData();
    }
    catch (error) {
      console.log(error);
    }
  };
  // Retrieve Data
  retrieveData = async () => {
    try {
      // Set State: Loading
      this.setState({
        loading: true,
      });
      console.log('Retrieving Data');
      // Cloud Firestore: Query
      let initialQuery = await firestore()
        .collection('partyHalls')
        .orderBy('timestamp', 'asc')
        .limit(3)
      // Cloud Firestore: Query Snapshot
      let documentSnapshots = await initialQuery.get();
      // Cloud Firestore: Document Data
      let documentData = documentSnapshots.docs.map((document) => {
        console.log("this is ID   : ",document.id)

        return {
          ...document.data(),
          key: document.id,
          isHearted: false
        }
      });
      // Cloud Firestore: Last Visible Document (Document ID To Start From For Proceeding Queries)
      let lastVisible = documentData[documentData.length - 1].timestamp;

      console.log("Last Visable ==== :",lastVisible);

      // Set State
      this.setState({
        documentData: documentData,
        lastVisible: lastVisible,
        loading: false,
      });
    }
    catch (error) {
      console.log(error);
    }
  };
  // Retrieve More
  retrieveMore = async () => {
    var {lastVisible} = this.state
    try {
      // Set State: Refreshing
      this.setState({
        refreshing: true,
      });
      console.log('Retrieving additional Data lastVisible', this.state.lastVisible);
      // Cloud Firestore: Query (Additional Query)
      let additionalQuery = await firestore()
        .collection('partyHalls')
        .orderBy('timestamp', 'asc')
        .startAfter(lastVisible)
        .limit(2)
      // Cloud Firestore: Query Snapshot
      let documentSnapshots = await additionalQuery.get();
      // Cloud Firestore: Document Data
      let documentData = documentSnapshots.docs.map((document) => {
        console.log("this is ID   : ",document.id)
        return {
          ...document.data(),
          key: document.id,
          isHearted: false
        }
      });
      // Cloud Firestore: Last Visible Document (Document ID To Start From For Proceeding Queries)
      if(documentData){
        // console.log("we Have more data ==== :",documentData);

        let lastVisible = documentData[documentData.length - 1].timestamp;
        console.log("Last Visable ==== :",lastVisible);
        // Set State
        this.setState({
          documentData: [...this.state.documentData, ...documentData],
          lastVisible: lastVisible,
          refreshing: false,
        });
      }
      
    }
    catch (error) {
      console.log(error);
    }
  };
  // Render Header
  renderHeader = () => {
    try {
      return (
        <Text style={styles.headerText}>Items</Text>
      )
    }
    catch (error) {
      console.log(error);
    }
  };
  // Render Footer
  
  renderFooter = () => {
    try {
      // Check If Loading
      if (this.state.refreshing) {
        return (
          <ActivityIndicator />
        )
      }
      else {
        return null;
      }
    }
    catch (error) {
      console.log(error);
    }
  };

  goMap = () =>{
    this.props.navigation.navigate('MapListing', {data: documentData});
  };

  Item = (item) => {
    // console.log(item.key)
    return (
      <View key={item.key} style={styles.item}>
        
        <Swiber swipeData={item} autoPlay={false} />

        <TouchableOpacity  style={styles.heartButton }>
          {
            (item.isHearted) ? 
            <Animatable.View animation="pulse" easing="ease-in" iterationCount="infinite" style={styles.heart }>
              <Icon name="ios-heart" size={35} color={"red"} />
            </Animatable.View>
            : 
            <Animatable.View animation="pulse" easing="ease-out" iterationCount="infinite" style={styles.heart }>
              <Icon name="ios-heart-empty" size={35} color={"#ffff"} />
            </Animatable.View>

          }
          
        </TouchableOpacity>
        
       
      </View>
    );
  };


  render() {
    const {loading, documentData, refreshing} = this.state
    if(loading){
      return(
        // <Text>Loading</Text>
        <ActivityIndicator />
      )
    }

    if(documentData && documentData.length > 0){
      return (
        <View style={styles.container}>
            <FlatList
                data={documentData}
                renderItem={({ item }) => ( this.Item(item))}
  
                keyExtractor={item => String(item.key)}
                // Header (Title)
                ListHeaderComponent={this.renderHeader}
                // // Footer (Activity Indicator)
                ListFooterComponent={this.renderFooter}
                // // On End this.ached (Takes a function)
                onEndReached={ this.retrieveMore }
                // // How Close To The End Of List Until Next Data Request Is Made
                onEndReachedThreshold={0.1}
                // // Refreshing (Set To True When End Reached)
                refreshing={refreshing}
            />
  
            
            <TouchableOpacity 
              style={styles.mapButton}
              onPress={() => this.props.navigation.navigate('MapListing', {data: documentData})}
              >
              <Icon name="ios-map" size={35} color={"#ffff"} />
            </TouchableOpacity>
          </View>
      )
    }

    return null;
    
  }
}
// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    
  },
  item: {
    backgroundColor: '#f9c2ff',
    flex: 1,
    margin: 10,
    height: height+5,
  },
  slide: {
    flex: 1,
    backgroundColor: 'transparent'
  },
  imgBackground: {
    width,
    height,
    backgroundColor: 'transparent',
    position: 'absolute'
  },
  image: {
    width,
    height,
    resizeMode: 'cover'
  },

  title: {
    position: "absolute",
    paddingHorizontal: 15,
    backgroundColor: 'transparent',
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 20,
    bottom: 30,
    fontWeight: 'bold',
    // textAlign: 'center'
  },
  discription: {
    position: "absolute",
    bottom: 25,
    marginTop: 5,
    paddingHorizontal: 15,
    backgroundColor: 'transparent',
    color: 'rgba(255, 255, 255, 0.75)',
    fontSize: 15,
    fontStyle: 'italic',
    // textAlign: 'center'
  },
  rating: {
    position: "absolute",
    top: 15,
    right: 5,
  },
  mapButton: {
    position: "absolute",
    bottom: 30,
    right: 30,
    backgroundColor: 'transparent',
    color: 'rgba(255, 255, 255, 0.75)',
    zIndex: 1
  },
  heartButton: {  
    position: "absolute",
    top: 10, 
    right: 10, 
    opacity: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.10)',
    borderRadius: 20,
    // textAlignVertical:"center", alignContent:"center", alignItems:"center", alignSelf:"center"
  },
  heart: { textAlign: 'center',  color: "white", fontSize: 28 }

  
});