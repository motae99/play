import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  ScrollView,
  StatusBar,
  Dimensions,
  FlatList,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {
  Placeholder,
  PlaceholderMedia,
  PlaceholderLine,
  Fade,
} from 'rn-placeholder';
import Kantaoffer from './MuzOfferCard';
import Feather from 'react-native-vector-icons/Feather';
import {
  CirclesLoader,
  PulseLoader,
  TextLoader,
  DotsLoader,
} from 'react-native-indicator';

import {RNFluidicSlider} from 'react-native-fluidic-slider';
import {RNNumberStepper} from 'react-native-number-stepper';
import RNMorphingText from 'react-native-morphing-text';

import FastImage from 'react-native-fast-image';
import {TouchableOpacity} from 'react-native-gesture-handler';


const {width, height} = Dimensions.get('window');

export default function Offers({category = 'بشرة'}) {

  const intial = firestore()
  .collection('centerOffers')
  // .where('category' == category)
  .orderBy('timestamp', 'desc');
  

  const [kantaOffers, setKantaOffers] = useState([]);
  const [filter, setFilter] = useState(false);
  const [lastVisible, setLastVisible] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [render, setRender] = useState(false);
  const [money, setMoney] = useState(false);
  const [price, setPrice] = useState(false);
  const [active, setActive] = useState(false);
  const [time, setTime] = useState(false);
  const [kantaOffersLoading, setKantaOffersLoading] = useState(false);
  const [query, setQuery] = useState(intial);
  const [subCategories, setSubCategories] = useState(null);


  useEffect(() => {
    try {  ;
      const unsubscribe = firestore()
          .collection('categories')
          .orderBy('timestamp', 'desc')
          .onSnapshot(querySnapshot => {
        if (querySnapshot) {
          const sub = querySnapshot.docs.map(documentSnapshot => {
            return {
              ...documentSnapshot.data(),
              key: documentSnapshot.id,
            };
          });
          if (sub && sub.length > 0) {
              setSubCategories(sub);
          }
        }
      });
      return () => unsubscribe();
    } catch (error) {
      console.log(error);
    }
  }, []);


  useEffect(() => {
    try {
      const unsubscribe = query.limit(10).onSnapshot(querySnapshot => {
        if (querySnapshot) {
          const kanta = querySnapshot.docs.map(documentSnapshot => {
            return {
              ...documentSnapshot.data(),
              key: documentSnapshot.id,
            };
          });
          if (kanta && kanta.length > 0) {
            // console.log('lenght :', kanta.length)
            // // console.log('last :', kanta[kanta.length -1])
            // console.log('start after key :', kanta[kanta.length - 1].key)
            // console.log('start after timestamp :', kanta[kanta.length - 1].timestamp)
            let last = kanta[kanta.length - 1].timestamp;
            if (last) {
              setLastVisible(last);
              setKantaOffers(kanta);
            }
          }

          if (kantaOffersLoading) {
            setKantaOffersLoading(false);
          }
        }
      });
      return () => unsubscribe();
    } catch (error) {
      console.log(error);
    }
  }, [kantaOffersLoading, query]);

  // useEffect(() => {
  //   const unsubscribe = query
  //     .startAfter(lastVisible)
  //     .limit(2)
  //     .onSnapshot(querySnapshot => {
  //       if (querySnapshot) {
  //         const kanta = querySnapshot.docs.map(documentSnapshot => {
  //           return {
  //             ...documentSnapshot.data(),
  //             key: documentSnapshot.id,
  //           };
  //         });
  //         if (kanta && kanta.length > 0) {
  //           // console.log('lenght more load:', kanta.length)
  //           // // console.log('last :', kanta[kanta.length -1])
  //           // console.log('start after key :', kanta[kanta.length - 1].key)
  //           // console.log('start after timestamp :', kanta[kanta.length - 1].timestamp)
  //           let last = kanta[kanta.length - 1].timestamp;
  //           if (last) {
  //             setLastVisible(last);
  //             setKantaOffers([...kantaOffers, ...kanta]);
  //           }
  //         }

  //         // if (kantaOffersLoading) {
  //         //   setKantaOffersLoading(false);
  //         // }
  //         if (refreshing) {
  //           setRefreshing(false);
  //         }
  //       }
  //     });
  //   return () => unsubscribe();
  // }, [kantaOffers, lastVisible, query, refreshing]);

  const changeQery = () => {
    // let Q = firestore().collection('centerOffers').where('hallRenting', '<=', 9000).where('hallRenting', '>', 5000).orderBy('hallRenting').orderBy('timestamp')
    setKantaOffersLoading(true);
    setQuery(Q);

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
  };

  const renderFooter = () => {
    try {
      // Check If Loading
      if (refreshing) {
        return (
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
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
    console.log('End Reached');
    setRefreshing(true);
  };

  if (kantaOffersLoading) {
    return (
      <Placeholder
        Animation={Fade}
        Left={PlaceholderMedia}
        Right={PlaceholderMedia}>
        <PlaceholderLine width={80} />
        <PlaceholderLine />
        <PlaceholderLine width={30} />
      </Placeholder>
    );
  }

  return (
    <View style={{flex: 1}}>
      {
        subCategories.map( cat => console.log('cat : ', cat))
      }

      <FlatList
        // horizontal={true}
        contentContainerStyle={{alignItems: 'center'}}
        scrollEventThrottle={1}
        showsHorizontalScrollIndicator={false}
        // snapToInterval={width}
        ListFooterComponent={() => renderFooter()}
        // onEndReached={() => more()}
        onEndReachedThreshold={0.1}
        data={kantaOffers}
        renderItem={({item}) => <Kantaoffer offer={item} />}
        // keyExtractor={item => String(item.key)}
        extraData={render}
        refreshing={refreshing}
      />
    </View>
  );
}
