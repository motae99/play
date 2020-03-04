import React from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

function MapInput(props){
        return (

            <GooglePlacesAutocomplete
                placeholder='Search'
                minLength={2} // minimum length of text to search
                autoFocus={false}
                returnKeyType={'search'} // Can be left out for default return key 
                // keyboardShouldPersistTaps="handled"
                listViewDisplayed={false}    // true/false/undefined
                fetchDetails={true}
                onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
                    props.notifyChange(details.geometry.location);
                }}
                styles={{
                    container: {
                      position: "absolute",
                      top: Platform.select({ ios: 60, android: 40 }),
                      width: "100%"
                    },
                    textInputContainer: {
                      flex: 1,
                      backgroundColor: "transparent",
                      height: 40,
                      marginHorizontal: 20,
                      borderTopWidth: 0,
                      borderBottomWidth: 0
                    },
                    textInput: {
                      height: 40,
                      margin: 0,
                      borderRadius: 0,
                      paddingTop: 0,
                      paddingBottom: 0,
                      paddingLeft: 20,
                      paddingRight: 20,
                      marginTop: 0,
                      marginLeft: 0,
                      marginRight: 0,
                      elevation: 5,
                      shadowColor: "#000",
                      shadowOpacity: 0.1,
                      shadowOffset: { x: 0, y: 0 },
                      shadowRadius: 15,
                      borderWidth: 1,
                      borderColor: "#ddd",
                      fontSize: 18
                    },
                    listView: {
                      borderWidth: 1,
                      borderColor: "#ddd",
                      backgroundColor: "#fff",
                      marginHorizontal: 20,
                      elevation: 5,
                      shadowColor: "#000",
                      shadowOpacity: 0.1,
                      shadowOffset: { x: 0, y: 0 },
                      shadowRadius: 15,
                      marginTop: 10
                    },
                    description: {
                      fontSize: 16
                    },
                    row: {
                      padding: 20,
                      height: 58
                    },
                    poweredContainer: {
                        display: 'none'
                    },
                    powered: {
                        display: 'none'
                    }
                }}
                query={{
                    key: 'AIzaSyCx60-3gx-i-UgRKTSErDhX7ZEmvb_yo5c',
                    language: 'en'
                }}
                nearbyPlacesAPI='GooglePlacesSearch'
                debounce={300}
                // currentLocation={true}
            />
        );
}
export default MapInput;

// import React from 'react';
// import { Image, Text } from 'react-native';
// import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

// const homePlace = { description: 'Home', geometry: { location: { lat: 48.8152937, lng: 2.4597668 } }};
// const workPlace = { description: 'Work', geometry: { location: { lat: 48.8496818, lng: 2.2940881 } }};

// export default function GooglePlacesInput(){
//   return (
//     <GooglePlacesAutocomplete
//       placeholder='Search'
//       minLength={2} // minimum length of text to search
//       autoFocus={true}
//       returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
//       keyboardAppearance={'dark'} // Can be left out for default keyboardAppearance https://facebook.github.io/react-native/docs/textinput.html#keyboardappearance
//       listViewDisplayed='auto'    // true/false/undefined
//       fetchDetails={true}
//       renderDescription={row => row.description} // custom description render
//       onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
//         console.log(data, details);
//         console.log("data, details");
//       }}

//       getDefaultValue={() => ''}

//       query={{
//         // available options: https://developers.google.com/places/web-service/autocomplete
//         key: 'AIzaSyCx60-3gx-i-UgRKTSErDhX7ZEmvb_yo5c',
//         language: 'en', // language of the results
//         types: '(cities)' // default: 'geocode'
//       }}

//       styles={{
//         textInputContainer: {
//           width: '100%'
//         },
//         description: {
//           fontWeight: 'bold'
//         },
//         predefinedPlacesDescription: {
//           color: '#1faadb'
//         }
//       }}

//     //   currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
//       currentLocationLabel="Current location"
//       nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
//       GoogleReverseGeocodingQuery={{
//         // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
//       }}
//     //   GooglePlacesSearchQuery={{
//     //     // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
//     //     rankby: 'distance',
//     //     type: 'cafe'
//     //   }}
      
//     //   GooglePlacesDetailsQuery={{
//     //     // available options for GooglePlacesDetails API : https://developers.google.com/places/web-service/details
//     //     fields: 'formatted_address',
//     //   }}

//     //   filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
//     //   predefinedPlaces={[homePlace, workPlace]}

//       debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
//     //   renderLeftButton={()  => <Image source={require('path/custom/left-icon')} />}
//     //   renderRightButton={() => <Text>Custom text after the input</Text>}
//     />
//   );
// }