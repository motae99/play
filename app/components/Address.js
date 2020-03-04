import React from 'react';
import LocationView from "react-native-location-view";
import {View} from "react-native";


export default function SelectLocationScreen( {notifyChange, closeModal} ) {

    return(
      <View style={{flex: 1}}>
        <LocationView
          apiKey={"AIzaSyCx60-3gx-i-UgRKTSErDhX7ZEmvb_yo5c"}
          initialLocation={{
            latitude: 17.3940222,
            longitude: 78.4558341,
          }}
          onLocationSelect={ (address) => { notifyChange(address); closeModal() }}
        />
      </View>
    );
}