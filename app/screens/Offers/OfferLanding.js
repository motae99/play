import React, { useEffect, useState } from 'react';
import {Text, View, ScrollView, StatusBar, Dimensions, FlatList} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {
  Placeholder,
  PlaceholderMedia,
  PlaceholderLine,
  Fade
} from "rn-placeholder";
import FastImage from "react-native-fast-image";

const {width, height} = Dimensions.get('window')
export default function Offers(){
 const [ kantaOffers, setKantaOffers] = useState([]); 
 const [kantaOffersLoading, setKantaOffersLoading] = useState(true);
//  const providerData = {  
//   timestamp: Date.now(),
//   active: false, 
//   category: 'kanta', 
//   validTill: '2020-03-27', 
//   price: 700, 
//   discount: 300, 
//   image: 'https://cdn.grabon.in/gograbon/images/web-images/uploads/1563948052223/Friendship-day-offers.jpg', 
// };


   useEffect(() => {
    // const unsubscribe = firestore()
    //   .collection('offers')
    //   .add(providerData);

    //  const unsubscribe = firestore()
    //      .collection('offers')
    //     //  .where('category', '==', 'kanta')
    //     //  .where('active', '==', true)
    //     //  .orderBy('timestamp', 'asc')
    //      .limit(3)
    //      .onSnapshot((querySnapshot) => {
    //      const kanta = querySnapshot.docs.map((documentSnapshot) => {
    //       //  
    //       // console.log(documentSnapshot.data())
    //          return {
    //          ...documentSnapshot.data(),
    //          key: documentSnapshot.id, 
    //          };
    //      });
    //      setKantaOffers(kanta);
    //      if (kantaOffersLoading) {
    //       setKantaOffersLoading(false);
    //      }
    //      });
    //     return () => unsubscribe(); 
   }, []);

   const Kantaoffer = (offer) => {
    // console.log('kantaOffer ',offer)
    return (
      <View style={{width: width, height: 300, backgroundColor: "green"}} >
           <FastImage
            style={{flex: 1}}
            source={{
              uri: offer.image,
              priority: FastImage.priority.normal,
              cashe: FastImage.cacheControl.immutable
            }}
            resizeMode={FastImage.resizeMode.cover}
          />
          <Text>{offer.category}</Text>
       </View>
    )
    
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
        data={kantaOffers}
        renderItem={({ item }) => ( Kantaoffer(item))}
        keyExtractor={item => String(item.key)}
      />
    </View>
   )



}