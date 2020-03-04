// // componentDidMount(){
// //     this.updateToken();
// // }

// // updateToken = async () => {
// //     await messaging().registerForRemoteNotifications();
// //     const fcmToken = await messaging().getToken();
// //     console.log(fcmToken);

// //     // Update backend (e.g. Firestore) with our scoped token for the user
// //     const uid = auth().currentUser.uid;
// //     // await firestore().doc(`users/${uid}`)
// //     // .update({
// //     //     fcmTokens: firestore.FieldValues.arrayUnion(fcmToken),
// //     // });

// //     await analytics().logEvent('screen_view', {
// //         id: '123456789',
// //         color: 'red',
// //         via: 'ProductCatalog',
// //     });
// // }

import React, { Component } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar
} from "react-native";
import firestore from "@react-native-firebase/firestore";
import Icon from "react-native-vector-icons/Ionicons";
import Font from "react-native-vector-icons/FontAwesome";
// import SkeletonContent from "react-native-skeleton-content";
import {CirclesLoader, PulseLoader, TextLoader, DotsLoader} from 'react-native-indicator';

import Swiber from "../components/Swiber";


import * as Animatable from "react-native-animatable";

const { width } = Dimensions.get("window");
const height = width * 0.5;

// Screen Dimensions
// Screen: Infinite Scroll
export default class Listing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      documentData: [],
      limit: 3,
      lastVisible: null,
      loading: false,
      refreshing: false
    };
  }
  // Component Did Mount
  componentDidMount = () => {
    try {
      // Cloud Firestore: Initial Query
      this.retrieveData();
    } catch (error) {
      console.log(error);
    }
    console.log(StatusBar.currentHeight)
  };
  // Retrieve Data
  retrieveData = async () => {
    try {
      // Set State: Loading
      this.setState({
        loading: true
      });
      // console.log('Retrieving Data');
      // Cloud Firestore: Query
      let initialQuery = await firestore()
        .collection("partyHalls")
        .orderBy("timestamp", "asc")
        .limit(4);
      // Cloud Firestore: Query Snapshot
      let documentSnapshots = await initialQuery.get();
      // Cloud Firestore: Document Data
      let documentData = documentSnapshots.docs.map(document => {
        // console.log("this is ID   : ",document.id)

        return {
          ...document.data(),
          key: document.id,
          isHearted: false
        };
      });
      // Cloud Firestore: Last Visible Document (Document ID To Start From For Proceeding Queries)
      let lastVisible = documentData[documentData.length - 1].timestamp;

      console.log("Last Visable ==== :", lastVisible);

      // Set State
      this.setState({
        documentData: documentData,
        lastVisible: lastVisible,
        loading: false
      });
    } catch (error) {
      console.log(error);
    }
  };
  // Retrieve More
  retrieveMore = async () => {
    var { lastVisible } = this.state;
    try {
      // Set State: Refreshing
      this.setState({
        refreshing: true
      });
      console.log(
        "Retrieving additional Data lastVisible",
        this.state.lastVisible
      );
      // Cloud Firestore: Query (Additional Query)
      let additionalQuery = await firestore()
        .collection("partyHalls")
        .orderBy("timestamp", "asc")
        .startAfter(lastVisible)
        .limit(2);
      // Cloud Firestore: Query Snapshot
      let documentSnapshots = await additionalQuery.get();
      // Cloud Firestore: Document Data
      let documentData = documentSnapshots.docs.map(document => {
        // console.log("this is ID   : ",document.id)
        return {
          ...document.data(),
          key: document.id,
          isHearted: false
        };
      });
      // Cloud Firestore: Last Visible Document (Document ID To Start From For Proceeding Queries)
      if (documentData) {
        // console.log("we Have more data ==== :",documentData);

        let lastVisible = documentData[documentData.length - 1].timestamp;
        // console.log("Last Visable ==== :",lastVisible);
        // Set State
        if (lastVisible !== this.state.lastVisible) {
          this.setState({
            documentData: [...this.state.documentData, ...documentData],
            lastVisible: lastVisible
            // refreshing: false,
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  // Render Header
  renderHeader = () => {
    try {
      return <Text style={styles.headerText}>Items</Text>;
    } catch (error) {
      console.log(error);
    }
  };
  // Render Footer

  renderFooter = () => {
    try {
      // Check If Loading
      if (this.state.refreshing) {
        return(
          <View style={{flex:1, alignItems: "center", justifyContent: "center" }}>
              <CirclesLoader />
              <TextLoader text="Loading" />
          </View>
        ); 
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
    }
  };

  goMap = () => {
    this.props.navigation.navigate("EventMap", { data: documentData });
  };

  toggleHeart = data => {
    // data.item.isSelect = !data.item.isSelect;
    // data.item.selectedClass = data.item.isSelect
    //   ? styles.selected
    //   : styles.list;
    // const index = this.state.dataSource.findIndex(
    //   item => data.item.id === item.id
    // );
    // this.state.dataSource[index] = data.item;
    // this.setState({
    //   dataSource: this.state.dataSource
    // });
    // console.log("My heart is completely with you")
    // console.log("Heart", data.isHearted)
    data.isHearted = !data.isHearted;

    // console.log("toggled", data.isHearted)

    const index = this.state.documentData.findIndex(
      item => data.id === item.id
    );
    // console.log("index", index)
    // console.log("this.state.documentData[index]", this.state.documentData[index])
    // console.log("data", data)

    this.state.documentData[index] = data;
    this.setState({ documentData: this.state.documentData });
  };

  Item = item => {
    // console.log(item.key)
    return (
      // <Animatable.View
      //   animation="slideInUp"
      //   // delay={2000}
      //   // duration={2000}
      //   onAnimationEnd={() =>
      //     console.log("this footer animation ended")
      //   }
      // >
      <View key={item.key} style={styles.item}>
        <Swiber swipeData={item} minimal={true}/>

        <TouchableOpacity
          style={styles.moreButton}
          onPress={() =>
            this.props.navigation.navigate("EventDetail", { data: item })
          }
        >
          <Icon name="ios-more" size={35} color={"#ffff"} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.heartButton}
          onPress={() => this.toggleHeart(item)}
        >
          {item.isHearted ? (
            <Animatable.View
              animation="bounceIn"
              easing="ease-in"
              // iterationCount="infinite"
              style={styles.heart}
            >
              <Icon name="ios-heart" size={35} color={"red"} />
            </Animatable.View>
          ) : (
            <Animatable.View
              animation="pulse"
              easing="ease-out"
              iterationCount="infinite"
              style={styles.heart}
            >
              <Icon name="ios-heart-empty" size={35} color={"#ffff"} />
            </Animatable.View>
          )}
        </TouchableOpacity>
        <Animatable.Text
          animation="bounceInRight"
          style={styles.providerName}
        >
          {item.partyHallName}
        </Animatable.Text>
      </View>
      // </Animatable.View>
    );
  };

  render() {
    const { loading, documentData, refreshing } = this.state;
    if (loading) {
      return(
        <View style={{flex:1, alignItems: "center", justifyContent: "center" }}>
            <CirclesLoader />
            <TextLoader text="Loading" />
        </View>
      ); 
    }

    if (documentData && documentData.length > 0) {
      return (
        <View style={styles.container}>
          <FlatList
            data={documentData}
            renderItem={({ item }) => this.Item(item)}
            keyExtractor={item => String(item.key)}
            // Header (Title)
            ListHeaderComponent={this.renderHeader}
            // // Footer (Activity Indicator)
            ListFooterComponent={this.renderFooter}
            // // On End this.ached (Takes a function)
            onEndReached={this.retrieveMore}
            // // How Close To The End Of List Until Next Data Request Is Made
            onEndReachedThreshold={0.1}
            // // Refreshing (Set To True When End Reached)
            refreshing={refreshing}

            // Performance settings
            // removeClippedSubviews={true} // Unmount components when outside of window 
            // initialNumToRender={2} // Reduce initial render amount
            // maxToRenderPerBatch={1} // Reduce number in each render batch
            // updateCellsBatchingPeriod={100} // Increase time between renders
            // windowSize={7} // Reduce the window size
          />

          <TouchableOpacity
            style={styles.mapButton}
            onPress={() =>
              this.props.navigation.navigate("EventMap", {
                data: documentData
              })
            }
          >
            <Icon name="ios-map" size={35} color={"#ffff"} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.filterButton}
            onPress={() =>
              this.props.navigation.navigate("EventFilter", {
                data: documentData
              })
            }
          >
            <Icon name="ios-map" size={35} color={"#ffff"} />
          </TouchableOpacity>
        </View>
      );
    }

    return null;
  }
}

Listing.navigationOptions = {
  tabBarIcon: ({ tintColor, focused }) => (
    <Icon name={focused ? "ios-home" : "md-home"} color={tintColor} size={25} />
  )
  // tabBarVisible: false
};
// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  wrapper: {},
  item: {
    backgroundColor: "#f9c2ff",
    flex: 1,
    margin: 10,
    height: height + 5
  },
  slide: {
    flex: 1,
    backgroundColor: "transparent"
  },
  imgBackground: {
    width,
    height,
    backgroundColor: "transparent",
    position: "absolute"
  },
  image: {
    width,
    height,
    resizeMode: "cover"
  },

  title: {
    position: "absolute",
    paddingHorizontal: 15,
    backgroundColor: "transparent",
    color: "rgba(255, 255, 255, 0.9)",
    fontSize: 20,
    bottom: 30,
    fontWeight: "bold"
    // textAlign: 'center'
  },
  discription: {
    position: "absolute",
    bottom: 25,
    marginTop: 5,
    paddingHorizontal: 15,
    backgroundColor: "transparent",
    color: "rgba(255, 255, 255, 0.75)",
    fontSize: 15,
    fontStyle: "italic"
    // textAlign: 'center'
  },
  rating: {
    position: "absolute",
    top: 15,
    right: 5
  },
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
  heartButton: {
    position: "absolute",
    top: 10,
    right: 10,
    opacity: 5,
    backgroundColor: "rgba(255, 255, 255, 0.10)",
    borderRadius: 20
    // textAlignVertical:"center", alignContent:"center", alignItems:"center", alignSelf:"center"
  },
  providerName: {
    position: "absolute",
    bottom: 15,
    color: "white",
  },
  moreButton: {
    position: "absolute",
    top: 10,
    left: 10,
    opacity: 5,
    backgroundColor: "rgba(255, 255, 255, 0.10)",
    borderRadius: 20
    // textAlignVertical:"center", alignContent:"center", alignItems:"center", alignSelf:"center"
  },
  heart: { textAlign: "center", color: "white", fontSize: 28 }
});
// import React from "react";
// import ListView from "./ListView";
// import { withNavigation } from "react-navigation";
// import firestore from "@react-native-firebase/firestore";
// import auth from "@react-native-firebase/auth";
// import messaging from "@react-native-firebase/messaging";
// import analytics from "@react-native-firebase/analytics";
// import dynamicLinks from "@react-native-firebase/dynamic-links";

// import {
//   ActivityIndicator,
//   Dimensions,
//   FlatList,
//   StyleSheet,
//   Text,
//   View,
//   TouchableOpacity,
//   Alert
// } from "react-native";

// import Swiber from "./components/Swiber";
// import Icon from "react-native-vector-icons/Ionicons";
// import Font from "react-native-vector-icons/FontAwesome";

// import * as Animatable from 'react-native-animatable';

// const { width, } = Dimensions.get('window');
// const height = width * 0.5;
// const windowHight = Dimensions.get('window').height;

// export default class List extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       documentData: [],
//       limit: 9,
//       lastVisible: null,
//       loading: false,
//       refreshing: false
//     };
//   }
//   // Component Did Mount
//   componentDidMount = () => {
//     try {
//       // Cloud Firestore: Initial Query
//       this.retrieveData();
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   // Retrieve Data
//   retrieveData = async () => {
//     try {
//       // Set State: Loading
//       this.setState({
//         loading: true
//       });
//       console.log("Retrieving Data");
//       // Cloud Firestore: Query
//       let initialQuery = await firestore()
//         .collection("partyHalls")
//         .orderBy("cabacity", "desc")
//         .limit(3);
//       // Cloud Firestore: Query Snapshot
//       let documentSnapshots = await initialQuery.get();
//       // Cloud Firestore: Document Data
//       let documentData = documentSnapshots.docs.map((document) => {
//         return {
//           id: document.id,
//           ...document.data(),
//           isHearted: false
//         };
//         });
//       // Cloud Firestore: Last Visible Document (Document ID To Start From For Proceeding Queries)
//       let lastVisible = documentData[documentData.length - 1].id;
//       // Set State
//       this.setState({
//         documentData: documentData,
//         lastVisible: lastVisible,
//         loading: false
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   // Retrieve More
//   retrieveMore = async () => {
//     console.log("Retrieving additional Data");
//     this.setState({
//             refreshing: true
//           });

//     // try {
//     //   // Set State: Refreshing
//     //   this.setState({
//     //     refreshing: true
//     //   });
//     //   console.log("Retrieving additional Data");
//     //   // Cloud Firestore: Query (Additional Query)
//     //   let additionalQuery = await firestore()
//     //     .collection("partyHalls")
//     //     .orderBy("cabacity", "desc")
//     //     .startAfter(this.state.lastVisible)
//     //     .limit(2);
//     //   // Cloud Firestore: Query Snapshot
//     //   let documentSnapshots = await additionalQuery.get();
//     //   // Cloud Firestore: Document Data
//     //   let documentData = documentSnapshots.docs.map((document) => {
//     //     return {
//     //       id: document.id,
//     //       ...document.data(),
//     //       isHearted: false
//     //     };
//     //     })
//     //   // Cloud Firestore: Last Visible Document (Document ID To Start From For Proceeding Queries)
//     //   let lastVisible = documentData[documentData.length - 1].id;
//     //   // Set State
//     //   this.setState({
//     //     documentData: [...this.state.documentData, ...documentData],
//     //     lastVisible: lastVisible,
//     //     refreshing: false
//     //   });
//     // } catch (error) {
//     //   console.log(error);
//     // }
//   };
//   // Render Header
//   renderHeader = () => {
//     try {
//       return <Text style={styles.headerText}>Items</Text>;
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   // Render Footer

//   renderFooter = () => {
//     try {
//       // Check If Loading
//       if (this.state.loading) {
//         return <ActivityIndicator />;
//       } else {
//         return null;
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   handlerClick = () => {
//     //handler for Long Click
//     Alert.alert(" Button Pressed");
//   };

//   goMap = () => {
//     this.props.navigation.navigate("MapListing", { data: serverData });
//   };

//   Item = item => {
//     // console.log(item.key)
//     return (
//       <View key={item.key} style={styles.item}>
//         <Swiber swipeData={item} autoPlay={false} />

//         <TouchableOpacity style={styles.heartButton}>
//           <Animatable.View
//             animation="pulse"
//             easing="ease-out"
//             iterationCount="infinite"
//             style={styles.heart}
//           >
//             <Icon name="ios-heart-empty" size={35} color={"#ffff"} />
//           </Animatable.View>
//         </TouchableOpacity>
//       </View>
//     );
//   };

//   render() {
//     // this.updateToken();
//     const { loading, documentData, refreshing } = this.state;
//     if (loading) {
//       return <Text>loading</Text>;
//     }

//     if (documentData && documentData.length) {
//       // console.log(serverData)
//       return (
//         <View style={styles.container}>
//           <FlatList
//             data={documentData}
//             renderItem={({ item }) => this.Item(item)}

//             keyExtractor={(item, index) => String(index)}
//             // Header (Title)
//             ListHeaderComponent={this.renderHeader()}
//             // Footer (Activity Indicator)
//             ListFooterComponent={this.renderFooter()}
//             // On End Reached (Takes a function)
//             onEndReached={this.retrieveMore()} //
//             // How Close To The End Of List Until Next Data Request Is Made
//             onEndReachedThreshold={0}
//             // Refreshing (Set To True When End Reached)
//             refreshing={refreshing}
//           />

//           <TouchableOpacity style={styles.mapButton} onPress={() => goMap()}>
//             <Font name="map" size={40} color={"#ffff"} />
//           </TouchableOpacity>
//         </View>
//       );
//     }
//     return null;
//   }
// }

// const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//     },
//     wrapper: {

//     },
//     item: {
//       backgroundColor: '#f9c2ff',
//       flex: 1,
//       margin: 10,
//       height: height+5,
//     },
//     slide: {
//       flex: 1,
//       backgroundColor: 'transparent'
//     },
//     imgBackground: {
//       width,
//       height,
//       backgroundColor: 'transparent',
//       position: 'absolute'
//     },
//     image: {
//       width,
//       height,
//       resizeMode: 'cover'
//     },

//     title: {
//       position: "absolute",
//       paddingHorizontal: 15,
//       backgroundColor: 'transparent',
//       color: 'rgba(255, 255, 255, 0.9)',
//       fontSize: 20,
//       bottom: 30,
//       fontWeight: 'bold',
//       // textAlign: 'center'
//     },
//     discription: {
//       position: "absolute",
//       bottom: 25,
//       marginTop: 5,
//       paddingHorizontal: 15,
//       backgroundColor: 'transparent',
//       color: 'rgba(255, 255, 255, 0.75)',
//       fontSize: 15,
//       fontStyle: 'italic',
//       // textAlign: 'center'
//     },
//     rating: {
//       position: "absolute",
//       top: 15,
//       right: 5,
//     },
//     mapButton: {
//       position: "absolute",
//       bottom: 30,
//       right: 30,
//       backgroundColor: 'transparent',
//       color: 'rgba(255, 255, 255, 0.75)',
//       zIndex: 1
//     },
//     heartButton: {
//       position: "absolute",
//       top: 10,
//       right: 10,
//       opacity: 5,
//       backgroundColor: 'rgba(255, 255, 255, 0.10)',
//       borderRadius: 20,
//       // textAlignVertical:"center", alignContent:"center", alignItems:"center", alignSelf:"center"
//     },
//     heart: { textAlign: 'center',  color: "white", fontSize: 28 }

//   });
