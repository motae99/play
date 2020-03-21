
// import React, { Component } from 'react'
// import {
//   Platform,
//   StyleSheet,
//   Text,
//   View,
//   Button,
//   DeviceEventEmitter
// } from 'react-native'

// import { AppTour, AppTourSequence, AppTourView } from 'react-native-app-tour'

// import Top from './components/Top'
// import Center from './components/Center'
// import Bottom from './components/Bottom'

// // const instructions = Platform.select({
// //   ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
// //   android:
// //     'Double tap R on your keyboard to reload,\n' +
// //     'Shake or press menu button for dev menu'
// // })

// export default class App extends Component {
//   constructor(props) {
//     super(props)

//     this.appTourTargets = []
//   }

//   componentWillMount() {
//     this.registerSequenceStepEvent()
//     this.registerFinishSequenceEvent()
//   }

//   componentDidMount() {
//     setTimeout(() => {
//       let appTourSequence = new AppTourSequence()
//       this.appTourTargets.forEach(appTourTarget => {
//         appTourSequence.add(appTourTarget)
//       })

//       AppTour.ShowSequence(appTourSequence)
//     }, 1000)
//   }

//   registerSequenceStepEvent = () => {
//     if (this.sequenceStepListener) {
//       this.sequenceStepListener.remove()
//     }
//     this.sequenceStepListener = DeviceEventEmitter.addListener(
//       'onShowSequenceStepEvent',
//       (e) => {
//         console.log(e)
//       }
//     )
//   }

//   registerFinishSequenceEvent = () => {
//     if (this.finishSequenceListener) {
//       this.finishSequenceListener.remove()
//     }
//     this.finishSequenceListener = DeviceEventEmitter.addListener(
//       'onFinishSequenceEvent',
//       (e) => {
//         console.log(e)
//       }
//     )
//   }

//   render() {
//     return (
//       <View style={styles.container}>
//         <Top
//           style={styles.top}
//           addAppTourTarget={appTourTarget => {
//             this.appTourTargets.push(appTourTarget)
//           }}
//         />
//         <Center
//           style={styles.center}
//           addAppTourTarget={appTourTarget => {
//             this.appTourTargets.push(appTourTarget)
//           }}
//         />
//         <Bottom
//           style={styles.bottom}
//           addAppTourTarget={appTourTarget => {
//             this.appTourTargets.push(appTourTarget)
//           }}
//         />
//       </View>
//     )
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     flexDirection: 'column',
//     justifyContent: 'space-between'
//   },
//   top: {
//     flex: 1
//   },
//   center: {
//     flex: 1
//   },
//   bottom: {
//     flex: 1
//   }
// })

import React, { useEffect, useState } from 'react';
import {Text, View, ScrollView, StatusBar, Dimensions, FlatList} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {
  Placeholder,
  PlaceholderMedia,
  PlaceholderLine,
  Fade
} from "rn-placeholder";
import Kantaoffer from './components/KantaOffer'
import Feather from "react-native-vector-icons/Feather";
import {CirclesLoader, PulseLoader, TextLoader, DotsLoader} from 'react-native-indicator';
import { RNFluidicSlider } from 'react-native-fluidic-slider'
import { RNNumberStepper } from 'react-native-number-stepper'
import RNMorphingText from 'react-native-morphing-text';

import FastImage from "react-native-fast-image";
import { TouchableOpacity } from 'react-native-gesture-handler';
const intial  = firestore().collection('partyHalls').orderBy("timestamp", "desc");
const {width, height} = Dimensions.get('window')
//  const providerData = {  
//   timestamp: Date.now(),
//   active: false, 
//   category: 'kanta', 
//   validTill: '2020-03-27', 
//   price: 700, 
//   discount: 300, 
//   image: 'https://cdn.grabon.in/gograbon/images/web-images/uploads/1563948052223/Friendship-day-offers.jpg', 
// };
export default function Offers(){
 const [ kantaOffers, setKantaOffers] = useState([]); 
 const [ query, setQuery] = useState(intial); 
 const [ filter, setFilter] = useState(false); 
 const [ lastVisible, setLastVisible] = useState(null); 
 const [ refreshing, setRefreshing] = useState(false); 
 const [ render, setRender] = useState(false); 
 const [ money, setMoney] = useState(false); 
 const [ price, setPrice] = useState(false); 
 const [ active, setActive] = useState(false); 
 const [ time, setTime] = useState(false); 
 const [ kantaOffersLoading, setKantaOffersLoading] = useState(false);



  useEffect(() => {
    try{ 
      const unsubscribe = query.limit(2).onSnapshot((querySnapshot) => {
        if(querySnapshot){ 
          const kanta = querySnapshot.docs.map((documentSnapshot) => {
            return {
              ...documentSnapshot.data(),
              key: documentSnapshot.id, 
            };
          });
          if(kanta && kanta.length > 0){
            // console.log('lenght :', kanta.length)
            // // console.log('last :', kanta[kanta.length -1])
            // console.log('start after key :', kanta[kanta.length - 1].key)
            // console.log('start after timestamp :', kanta[kanta.length - 1].timestamp)
            let last = kanta[kanta.length - 1].timestamp;
            if(last){
              setLastVisible(last)
              setKantaOffers(kanta);
            }
          }

          if (kantaOffersLoading) {
            setKantaOffersLoading(false);
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
          const kanta = querySnapshot.docs.map((documentSnapshot) => {
            return {
              ...documentSnapshot.data(),
              key: documentSnapshot.id, 
            };
          });
          if(kanta && kanta.length > 0){
            // console.log('lenght more load:', kanta.length)
            // // console.log('last :', kanta[kanta.length -1])
            // console.log('start after key :', kanta[kanta.length - 1].key)
            // console.log('start after timestamp :', kanta[kanta.length - 1].timestamp)
            let last = kanta[kanta.length - 1].timestamp;
            if(last){
              setLastVisible(last)
              setKantaOffers([...kantaOffers, ...kanta]);
            }
          }

          // if (kantaOffersLoading) {
          //   setKantaOffersLoading(false);
          // }
          if (refreshing) {
            setRefreshing(false);
          }
         }
         });
        return () => unsubscribe(); 
   }, [refreshing]);

  const changeQery = ()=>{
    let Q = firestore().collection('partyHalls').where('hallRenting', '<=', 9000).where('hallRenting', '>', 5000).orderBy('hallRenting').orderBy('timestamp')
    setKantaOffersLoading(true)
    setQuery(Q)

    // Similarly, use the array-contains-any operator to combine up to 10 array-contains clauses on the same field with a logical OR. An array-contains-any query returns documents where the given field is an array that contains one or more of the comparison values:
    // citiesRef.where('services', 'array-contains-any',
    // ['services1', 'service2']);
     // first do ur conditions 
    // if(active){
    //   console.log('active', active)
    //   Q = Q.where('day', '==', false)
    // }
    // if(money){
    //   console.log('hallRenting', money)
    //   Q = Q.where('hallRenting', '>=', 200)
    // }

    // // do your orders 
    // if(money){
    //   Q = Q.orderBy('hallRenting', 'asc')
    // }
    // if(active){
    //   Q = Q.orderBy('day', 'asc')
    // }
    // if(time){
    //   Q = Q.orderBy('validTill', 'desc')
    // }
    
    // if( active || money || time || price ){
    //   setKantaOffersLoading(true)
    //   // setFilter(Q)
    //   setQuery(Q)
    // }
      
      // console.log(org)
      // console.log(Q)
    //  }
    //  console.log(Q)
  }

  const renderFooter = () => {
    try {
      // Check If Loading
      if (refreshing) {
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

  const more = () => {
    console.log('End Reached')
    setRefreshing(true)
  }


    if(kantaOffersLoading){
      return (
        <Placeholder
          Animation={Fade}
          Left={PlaceholderMedia}
          Right={PlaceholderMedia}
        >
          <PlaceholderLine width={80} />
          <PlaceholderLine  />
          <PlaceholderLine width={30} />
        </Placeholder>
        )
    }

   


   return(
    <View style={{flex: 1}}> 
      <FlatList
        horizontal={true}
        scrollEventThrottle={1}
        showsHorizontalScrollIndicator={false}
        snapToInterval={width}
        ListFooterComponent={() => renderFooter() }
        onEndReached={() => more()}
        onEndReachedThreshold={.1}
        data={kantaOffers}
        renderItem={({ item }) => <Kantaoffer offer={item} />}
        keyExtractor={item => String(item.key)}
        extraData={render}
        refreshing={refreshing}
      />

      <View style={{flexDirection: "row", alignContent: 'center', border: 1 , borderColor: "black", borderRadius: 5}}>
        <View style={{height: 100, width: width/2-10 , alignItems: 'center' }}>
          <TouchableOpacity onPress={() => setMoney(!money)}>
            <Feather name="dollar-sign" size={60} color={money? "red" : "black"} />
          </TouchableOpacity>
        </View>
        <View style={{height: 100, width: width/2-10 , alignItems: 'center'}}>
          <TouchableOpacity onPress={() => setTime(!time)}>
            <Feather name="clock" size={60} color={time? "red" : "black"} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{flexDirection: "row", alignContent: 'center', border: 1 , borderColor: "black", borderRadius: 5}}>

        <View style={{height: 100, width: width/2-10 ,  alignItems: 'center'}}>
          <TouchableOpacity onPress={() => setPrice(!price)}>
            <Feather name="chevrons-down" size={60} color={price? "red" : "black"} />
          </TouchableOpacity>
        </View>
        <View style={{height: 100, width: width/2-10 ,  alignItems: 'center'}}>
          <TouchableOpacity onPress={() => setActive(!active)}>
            <Feather name="chevrons-up" size={60} color={active? "green" : "black"} />
          </TouchableOpacity>
        </View>
        
      </View>

      <TouchableOpacity onPress={ () => changeQery()}>
           <Text>Sort Again </Text> 
           {/* <RNFluidicSlider></RNFluidicSlider> */}
           
      </TouchableOpacity>
      {/* <RNNumberStepper
          value={5}
          // size={1}
          autoRepeat={true}
          stepValue={2}
          onChange={(nValue, oValue) => {
            console.log('New Value: ' + nValue + ', Old Value: ' + oValue)
          }}
          // width={300}
          // height={100}
          // leftButtonText={'M'}
          // rightButtonText={'P'}
          // buttonsTextColor={'#ebebeb'}
          // buttonsBackgroundColor={'#fd6e61'}
          // labelTextColor={'#858585'}
          // labelBackgroundColor={'#eaeef0'}
          // buttonsContainerWidth={60}
          // borderColor={'#000'}
          // borderWidth={5}
        />
      <RNMorphingText effect={"scale"}>{'Text'}</RNMorphingText> */}

    </View>
   )



}