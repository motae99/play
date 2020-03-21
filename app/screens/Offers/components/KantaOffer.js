import React from 'react';
import {View, Dimensions} from 'react-native';
import FastImage from "react-native-fast-image";
const {width, height} = Dimensions.get('window')

function KantaOffer({offer}){
 // console.log('kantaOffer ',offer)
 return (
   <View style={{width: width, height: 300, backgroundColor: "green"}} >
        <FastImage
         style={{flex: 1}}
         source={{
           uri: offer.files[0].uri,
           priority: FastImage.priority.normal,
           cashe: FastImage.cacheControl.immutable
         }}
         resizeMode={FastImage.resizeMode.stretch}
       />
    </View>
 )
}
 
export default KantaOffer;