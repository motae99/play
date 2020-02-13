import React, { useState, useEffect } from 'react';
import { View, Image, ScrollView, Alert, StyleSheet, Dimensions, Text, Modal, ActivityIndicator, TouchableWithoutFeedback, FlatList, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';
import firestore from '@react-native-firebase/firestore';
import Icon from "react-native-vector-icons/Ionicons";
import Font from "react-native-vector-icons/FontAwesome";
import Swiber from "./components/Swiber";

import * as Animatable from 'react-native-animatable';

const { width, } = Dimensions.get('window');
const height = width * 0.5;
const windowHight = Dimensions.get('window').height;
// const Image = createImageProgress(FastImage);
const intial = firestore().collection('partyHalls').orderBy("id", "desc").limit(4);

export default function Listing({navigation}){

  const [ serverData, setData] = useState([]); // Initial empty array of users
  const [ intialQuery, setQuery] = useState(intial); // Initial empty array of users
  const [loading, setLoading] = useState(true); // Set loading to true on component mount
  const [lastVisible, setLastVisible] = useState(null); // Set loading to true on component mount
  const [refreshing, setRefreshing] = useState(false); // Set loading to true on component mount

  


    useEffect(() => {
      const unsubscribe = intialQuery
        .onSnapshot((querySnapshot) => {
          // Add users into an array
          const Data = querySnapshot.docs.map((documentSnapshot) => {
            return {
              ...documentSnapshot.data(),
              id: documentSnapshot.id, // required for FlatList
              isHearted: false,
              // selectedClass = styles.list,
            };
          });
          
          let last = Data[Data.length - 1];
          let lastId = last.id;
          // console.log('last',last)
          console.log('lastId',lastId)
          setLastVisible(lastId)
          console.log('before  ',serverData)
          if(serverData.length > 0){
            setData(...Data);
          }
          else{
            setData(Data)
          }
          // setData(Data);
          console.log('server data after speread', serverData)
  
          // As this can trigger multiple times, only update loading after the first update
          if (loading) {
            setLoading(false);
          }
          if (refreshing) {
            setRefreshing(false);
          }
        });
  
        return () => unsubscribe(); // Stop listening for updates whenever the component unmounts
    }, [intialQuery]);

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
      if (refreshing) {
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

  requestMore = () => {
    //handler for Long Click
    setRefreshing(true);
    // console.log('tis is the Intial Query',intialQuery)
    // console.log(lastVisible)
    let query = firestore().collection('partyHalls').orderBy("id", "desc").startAfter(lastVisible).limit(2);
    setQuery(query);
  }


  handlerClick = () => {
    //handler for Long Click
    Alert.alert(' Button Pressed');
  };

  goMap = () =>{
    navigation.navigate('MapListing', {data: serverData});
  };

  Item = (item) => {
    // console.log(item.key)
    return (
      <View key={item.key} style={styles.item}>
        
        <Swiber swipeData={item} autoPlay={false} />

        <TouchableOpacity  style={styles.heartButton }>
          <Animatable.View animation="pulse" easing="ease-out" iterationCount="infinite" style={styles.heart }>
            <Icon name="ios-heart-empty" size={35} color={"#ffff"} />
          </Animatable.View>
        </TouchableOpacity>
        
       
      </View>
    );
  };

  
  
    if(loading){
      return <Text>loading</Text>;
    }

    if (serverData && serverData.length) {
      // console.log(serverData)
      return (
        <View style={styles.container}>
          <FlatList
              data={serverData}
              renderItem={({ item }) => ( Item(item))}

              keyExtractor={item => String(item.id)}
              // Header (Title)
              ListHeaderComponent={renderHeader}
              // // Footer (Activity Indicator)
              ListFooterComponent={renderFooter}
              // // On End Reached (Takes a function)
              onEndReached={ requestMore }
              // // How Close To The End Of List Until Next Data Request Is Made
              onEndReachedThreshold={0.1}
              // // Refreshing (Set To True When End Reached)
              refreshing={refreshing}
          />

          
          <TouchableOpacity 
            style={styles.mapButton}
            onPress={() => goMap()}
            >
            <Font name="map" size={40} color={"#ffff"} />
          </TouchableOpacity>
        </View>
        
      );
    }
    return null;

}

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


// import React, { useState, useEffect } from 'react';
// import { View, Image, ScrollView, Alert, StyleSheet, Dimensions, Text, Modal, ActivityIndicator, TouchableWithoutFeedback, FlatList, TouchableOpacity } from 'react-native';
// import FastImage from 'react-native-fast-image';
// import firestore from '@react-native-firebase/firestore';
// import Icon from "react-native-vector-icons/Ionicons";
// import Font from "react-native-vector-icons/FontAwesome";
// import Swiber from "./components/Swiber";

// // import { Rating, AirbnbRating } from 'react-native-elements';
// import Swiper from 'react-native-swiper'
// import { Transition } from 'react-navigation-fluid-transitions';
// // import Image from 'react-native-image-progress';
// // import Progress from 'react-native-progress';
// import * as Animatable from 'react-native-animatable';

// const { width, } = Dimensions.get('window');
// const height = width * 0.5;
// const windowHight = Dimensions.get('window').height;
// // const Image = createImageProgress(FastImage);

// export default function Listing({navigation}){

//   const [ serverData, setData] = useState([]); // Initial empty array of users
//   const [loading, setLoading] = useState(true); // Set loading to true on component mount
//   const [lastVisible, setLastVisible] = useState(null); // Set loading to true on component mount
//   const [refreshing, setRefreshing] = useState(false); // Set loading to true on component mount

//     // On load, fetch our users and subscribe to updates
//     // retrieveData = async () => {
//     //   try {
//     //     // Set State: Loading
//     //     setLoading(true)
//     //     console.log('Retrieving Data');
//     //     // Cloud Firestore: Query
//     //     let initialQuery = await firestore()
//     //       .collection('partyHalls')
//     //       // .orderBy('id')
//     //       .limit(3)
//     //     // Cloud Firestore: Query Snapshot
//     //     let documentSnapshots = await initialQuery.get();
//     //     // Cloud Firestore: Document Data
//     //     let documentData = documentSnapshots.docs.map((document) => {
//     //       return {
//     //         // id: document.id,
//     //         ...document.data(),
//     //         isHearted: false
//     //       };
//     //       })
//     //     // Cloud Firestore: Last Visible Document (Document ID To Start From For Proceeding Queries)
//     //     let last = documentData[documentData.length - 1];
//     //     // console.log(last)
//     //     // console.log("---- ")

       
//     //     // var lastVisible = firestore().collection("partyHalls").doc(last);
//     //     // console.log(lastVisible)
//     //     // console.log("lastVisible ===")
//     //     // Set State
//     //     setData(documentData);
//     //     // setLastVisible(last);
//     //     setLoading(false);
//     //   }
//     //   catch (error) {
//     //     console.log(error);
//     //   }
//     // };

//     retrieveMore = async () => {
//       setRefreshing(true)
      
//       // try {
//       //   // Set State: Refreshing
//       //   setRefreshing(true)
        
//       //   console.log('Retrieving additional Data');
//       //   // Cloud Firestore: Query (Additional Query)
//       //   let additionalQuery = await firestore()
//       //     .collection('partyHalls')
//       //     .orderBy('id')
//       //     .limit(2)
//       //     .startAfter({id: lastVisible})
//       //   // Cloud Firestore: Query Snapshot
//       //   let documentSnapshots = await additionalQuery.get();
//       //   // Cloud Firestore: Document Data
//       //   let documentData = documentSnapshots.docs.map((document) => {
//       //     return {
//       //       id: document.id,
//       //       ...document.data(),
//       //       isHearted: false
//       //     };
//       //     })
  
//       //     // let last = documentData[documentData.length - 1].id;
//       //     // console.log(last)
//       //     // console.log("---- ")
  
//       //     // var lastVisible = firestore().collection("partyHalls").doc(last);
//       //     // console.log(lastVisible)
//       //     // console.log("lastVisible ===")
//       //   // Set State
//       //     setData(documentData);
//       //     // setLastVisible(last);
//       //     setRefreshing(false);
  
//       // }
//       // catch (error) {
//       //   console.log(error);
//       // }
//     };

//     useEffect(() => {
//       // retrieveData()
//       const unsubscribe = firestore()
//         .collection('partyHalls')
//         .orderBy('id')
//         .limit(3)
//         .onSnapshot((querySnapshot) => {
//           // Add users into an array
//           const serverData = querySnapshot.docs.map((documentSnapshot) => {
//             return {
//               ...documentSnapshot.data(),
//               key: documentSnapshot.id, // required for FlatList
//               isHearted: false,
//               // selectedClass = styles.list,
//             };
//           });
  
//           // // Update state with the users array
//           // let lastVisible = serverData[serverData.length];
//           // // let lastVisible = serverData[serverData.length].key;
//           // console.log(lastVisible)

//           // setLastVisible(lastVisible);
//           setData(serverData);
  
//           // As this can trigger multiple times, only update loading after the first update
//           if (loading) {
//             setLoading(false);
//           }
//         });
  
//         return () => unsubscribe(); // Stop listening for updates whenever the component unmounts
//     }, []);


//   // renderModel(images){
//   //   // console.log(images);
//   //   return (
//   //     <View
//   //       // style={{
//   //       //   padding: 10
//   //       // }}
//   //     >
//   //       <Modal
//   //         visible={this.state.modalVisible}
//   //         transparent={true}
//   //         onRequestClose={() => this.setState({ modalVisible: false })}
//   //       >
//   //         <ImageViewer
//   //            style={{
//   //               height: 500
//   //             }}
//   //           imageUrls={images}
//   //           index={this.state.index}
//   //           onSwipeDown={() => {
//   //             console.log(images);
//   //             // () => this.setState({ modalVisible: false })
//   //           }}
//   //           renderFooter = {() => { return (<Text> footer dfhaskjdfh jashfkjhkjs </Text>) }}
//   //           loadingRender = {() => { <Text> loading ! </Text> }}
//   //           // backgroundColor= '#F5FCFF'
//   //           enableSwipeDown= {true}
//   //           // renderImage={(images) => { return ( console.log(this.images))}}
//   //           // onMove={data => console.log(data)}
//   //           // enableSwipeDown={true}
//   //         />
//   //       </Modal>
//   //     </View>
//   //   );
//   // }

//   // handlerLongClick = (images) => {
//   //   //handler for Long Click
//   //   // Alert.alert(' Button Long Pressed');
//   //   // console.log(images);
//   //   // render() {
//   //     // this.setState({ modalVisible: true })
      
//   //   // }
//   //   this.renderModel(images);
//   // };

//   // Render Header
//   renderHeader = () => {
//     try {
//       return (
//         <Text style={styles.headerText}>Items</Text>
//       )
//     }
//     catch (error) {
//       console.log(error);
//     }
//   };
//   // Render Footer
  
//   renderFooter = () => {
//     try {
//       // Check If Loading
//       if (refreshing) {
//         return (
//           <ActivityIndicator />
//         )
//       }
//       else {
//         return null;
//       }
//     }
//     catch (error) {
//       console.log(error);
//     }
//   };


//   handlerClick = () => {
//     //handler for Long Click
//     Alert.alert(' Button Pressed');
//   };

//   goMap = () =>{
//     navigation.navigate('MapListing', {data: serverData});
//   };

//   Item = (item) => {
//     // console.log(item.key)
//     return (
//       <View key={item.key} style={styles.item}>
        
//         <Swiber swipeData={item} autoPlay={false} />

//         <TouchableOpacity  style={styles.heartButton }>
//           <Animatable.View animation="pulse" easing="ease-out" iterationCount="infinite" style={styles.heart }>
//             <Icon name="ios-heart-empty" size={35} color={"#ffff"} />
//           </Animatable.View>
//         </TouchableOpacity>
        
       
//       </View>
//     );
//   };

  

//   // onScroll = (event) => {
//   //   const e = event.nativeEvent;
//   //   const l_height = e.contentSize.height;
//   //   const offset = e.contentOffset.y;


//   //   if(offset > this.offsetY) {
//   //       if(!(offset < 32)) {
//   //           this.refs.buttonBar.hide();
//   //       }

//   //       if(!(offset < 56)) {
//   //           this.refs.searchBar.hide();
//   //       }
//   //   } else {
//   //       this.refs.buttonBar.show();
//   //       setTimeout(() => {this.refs.searchBar.show();}, 150);
//   //   }

//   //   this.offsetY = offset;


//   //   if(offset + this.content_height >= l_height) {
//   //       // console.log('end');
//   //       this.loadMore();
//   //   }

//   //   // console.log(e);
//   // }
  
//     if(loading){
//       return <Text>loading</Text>;
//     }

//     if (serverData && serverData.length) {
//       // console.log(serverData)
//       return (
//         <View style={styles.container}>
//           <FlatList
//               data={serverData}
//               renderItem={({ item }) => (
//               Item(item)
//               )}
//               keyExtractor={item => String(item.key)}
//               // Header (Title)
//               ListHeaderComponent={renderHeader}
//               // // Footer (Activity Indicator)
//               ListFooterComponent={renderFooter}
//               // // On End Reached (Takes a function)
//               onEndReached={retrieveMore()}
//               // // How Close To The End Of List Until Next Data Request Is Made
//               onEndReachedThreshold={0}
//               // // Refreshing (Set To True When End Reached)
//               refreshing={refreshing}
//           />

          
//           <TouchableOpacity 
//             style={styles.mapButton}
//             onPress={() => goMap()}
//             >
//             <Font name="map" size={40} color={"#ffff"} />
//           </TouchableOpacity>
//         </View>
        
//       );
//     }
//     return null;

// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   wrapper: {
    
//   },
//   item: {
//     backgroundColor: '#f9c2ff',
//     flex: 1,
//     margin: 10,
//     height: height+5,
//   },
//   slide: {
//     flex: 1,
//     backgroundColor: 'transparent'
//   },
//   imgBackground: {
//     width,
//     height,
//     backgroundColor: 'transparent',
//     position: 'absolute'
//   },
//   image: {
//     width,
//     height,
//     resizeMode: 'cover'
//   },

//   title: {
//     position: "absolute",
//     paddingHorizontal: 15,
//     backgroundColor: 'transparent',
//     color: 'rgba(255, 255, 255, 0.9)',
//     fontSize: 20,
//     bottom: 30,
//     fontWeight: 'bold',
//     // textAlign: 'center'
//   },
//   discription: {
//     position: "absolute",
//     bottom: 25,
//     marginTop: 5,
//     paddingHorizontal: 15,
//     backgroundColor: 'transparent',
//     color: 'rgba(255, 255, 255, 0.75)',
//     fontSize: 15,
//     fontStyle: 'italic',
//     // textAlign: 'center'
//   },
//   rating: {
//     position: "absolute",
//     top: 15,
//     right: 5,
//   },
//   mapButton: {
//     position: "absolute",
//     bottom: 30,
//     right: 30,
//     backgroundColor: 'transparent',
//     color: 'rgba(255, 255, 255, 0.75)',
//     zIndex: 1
//   },
//   heartButton: {  
//     position: "absolute",
//     top: 10, 
//     right: 10, 
//     opacity: 5,
//     backgroundColor: 'rgba(255, 255, 255, 0.10)',
//     borderRadius: 20,
//     // textAlignVertical:"center", alignContent:"center", alignItems:"center", alignSelf:"center"
//   },
//   heart: { textAlign: 'center',  color: "white", fontSize: 28 }

  
// });

