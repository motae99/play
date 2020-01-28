import React, { useState, useEffect } from 'react';
import { View, Image, ScrollView, Alert, StyleSheet, Dimensions, Text, Modal, TouchableWithoutFeedback, FlatList, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';
import firestore from '@react-native-firebase/firestore';
import Icon from "react-native-vector-icons/FontAwesome";

// import { Rating, AirbnbRating } from 'react-native-elements';
import Swiper from 'react-native-swiper'
import { Transition } from 'react-navigation-fluid-transitions';
// import Image from 'react-native-image-progress';
// import Progress from 'react-native-progress';
import * as Animatable from 'react-native-animatable';

const { width, } = Dimensions.get('window');
const height = width * 0.5;
const windowHight = Dimensions.get('window').height;
// const Image = createImageProgress(FastImage);

export default function Listing({navigation}){

  const [ serverData, setData] = useState([]); // Initial empty array of users
  const [loading, setLoading] = useState(true); // Set loading to true on component mount
 
    // On load, fetch our users and subscribe to updates
    useEffect(() => {
      const unsubscribe = firestore()
        .collection('partyHalls')
        .onSnapshot((querySnapshot) => {
          // Add users into an array
          const serverData = querySnapshot.docs.map((documentSnapshot) => {
          //  console.log(documentSnapshot);
            return {
              ...documentSnapshot.data(),
              key: documentSnapshot.id, // required for FlatList
              isHearted: false,
              // selectedClass = styles.list,
            };
          });
  
          // Update state with the users array
          // console.log(serverData)
          setData(serverData);
  
          // As this can trigger multiple times, only update loading after the first update
          if (loading) {
            setLoading(false);
          }
        });
  
        return () => unsubscribe(); // Stop listening for updates whenever the component unmounts
    }, []);


  // renderModel(images){
  //   // console.log(images);
  //   return (
  //     <View
  //       // style={{
  //       //   padding: 10
  //       // }}
  //     >
  //       <Modal
  //         visible={this.state.modalVisible}
  //         transparent={true}
  //         onRequestClose={() => this.setState({ modalVisible: false })}
  //       >
  //         <ImageViewer
  //            style={{
  //               height: 500
  //             }}
  //           imageUrls={images}
  //           index={this.state.index}
  //           onSwipeDown={() => {
  //             console.log(images);
  //             // () => this.setState({ modalVisible: false })
  //           }}
  //           renderFooter = {() => { return (<Text> footer dfhaskjdfh jashfkjhkjs </Text>) }}
  //           loadingRender = {() => { <Text> loading ! </Text> }}
  //           // backgroundColor= '#F5FCFF'
  //           enableSwipeDown= {true}
  //           // renderImage={(images) => { return ( console.log(this.images))}}
  //           // onMove={data => console.log(data)}
  //           // enableSwipeDown={true}
  //         />
  //       </Modal>
  //     </View>
  //   );
  // }

  // handlerLongClick = (images) => {
  //   //handler for Long Click
  //   // Alert.alert(' Button Long Pressed');
  //   // console.log(images);
  //   // render() {
  //     // this.setState({ modalVisible: true })
      
  //   // }
  //   this.renderModel(images);
  // };


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
        <Swiper style={styles.wrapper}
          dot={<View style={{backgroundColor: 'rgba(255,255,255,.3)', width: 8, height: 8, borderRadius: 7, marginLeft: 7, marginRight: 7}} />}
          activeDot={<View style={{backgroundColor: '#fff', width: 8, height: 8, borderRadius: 7, marginLeft: 7, marginRight: 7}} />}
          paginationStyle={{
            bottom: 20
          }}
          loop={false}
        >
         {item.files.map((image, key) => (
            <View key={item.key+key} style={styles.slide}>
              {/* <Transition shared='common-name' delay> */}
              <TouchableWithoutFeedback 
                // onLongPress={ () => this.setState({modalVisible: true}) }
                onPress={ () => navigation.navigate('Details', {data: item})}
              >
                <View> 
                  <FastImage 
                    style={styles.image} 
                    source={{
                        uri: image.uri,
                        // priority: FastImage.priority.normal,
                        cashe: FastImage.cacheControl.immutable
                    }}
                    // resizeMode={FastImage.resizeMode.contain}
                    // onProgress={e => console.log('progress :',e.nativeEvent.loaded / e.nativeEvent.total)}
                    // onLoad={e => console.log('loaded: ', e.nativeEvent.width, e.nativeEvent.height)}
                    // onError={error => console.log('error loading: ', error)}
                    // onLoadEnd={console.log('finished loading')}
                    // fallback= {true}
                  />
                  <Text style={styles.item}> {item.partyHallName}</Text>
                  <Text style={styles.discription}> {item.address}</Text>
                  </View>
              </TouchableWithoutFeedback>
              {/* </Transition> */}
              <TouchableOpacity  style={styles.heartButton }>
                {/* <Animatable.View ref={this.handleViewRef} style={styles.bounce} animation="bounce"> */}
                  {/* <Text>Bounce me!</Text> */}
                {/* </Animatable.View> */}
                <Animatable.Text animation="pulse" easing="ease-out" iterationCount="infinite" style={styles.heart }>❤️ </Animatable.Text>
              </TouchableOpacity>


              </View>
          ))}
            {/* {this.renderModel(item.images)} */}
        </Swiper>
      </View>
    );
  };
  
    if(loading){
      return <Text>loading</Text>;
    }

    if (serverData && serverData.length) {
      return (
        <View style={styles.container}>
          <FlatList
              data={serverData}
              renderItem={({ item }) => (
              Item(item)
              )}
              keyExtractor={item => item.id}
          />

          
          <TouchableOpacity 
            style={styles.mapButton}
            onPress={() => goMap()}
            >
            <Icon name={"map"} size={50} color={"#ffff"} family={"FontAwesome"} />
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

