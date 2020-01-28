
// import React from 'react';
// import { ActivityIndicator, Text, Button, Platform, StyleSheet, View } from 'react-native';
// import Touchable from 'react-native-platform-touchable';

// import { Permissions, Location } from 'expo';

// const EXAMPLES = [
//   '1 Hacker Way',
//   { latitude: 49.28, longitude: -123.12 },
//   'Palo Alto Caltrain Station (this one will error)',
//   'Rogers Arena, Vancouver',
//   { latitude: 0, longitude: 0 },
// ];

// export default class GeocodingScreen extends React.Component {
//   static navigationOptions = {
//     title: 'Geocoding',
//   };

//   state = {
//     selectedExample: EXAMPLES[0],
//     result: '',
//     inProgress: false,
//   };

//   // componentDidMount() {
//   //   Permissions.askAsync(Permissions.LOCATION);
//   // }

//   componentDidMount() {
//     // Instead of navigator.geolocation, just use Geolocation.
//     if (hasLocationPermission) {
//         Geolocation.getCurrentPosition(
//             (position) => {
//                 console.log(position);
//             },
//             (error) => {
//                 // See error code charts below.
//                 console.log(error.code, error.message);
//             },
//             { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
//         );
//     }
//   }

//   render() {
//     let { selectedExample } = this.state;

//     return (
//       <View style={styles.container}>
//         <View style={styles.headerContainer}>
//           <Text style={styles.headerText}>Select a location</Text>
//         </View>

//         <View style={styles.examplesContainer}>
//           {EXAMPLES.map(this._renderExample)}
//         </View>

//         <View style={styles.separator} />

//         <View style={styles.actionContainer}>
//           <Button
//             onPress={this._attemptGeocodeAsync}
//             title="Geocode"
//             disabled={typeof selectedExample !== 'string'}
//             style={styles.button}
//           />
//           <Button
//             onPress={this._attemptReverseGeocodeAsync}
//             title="Reverse Geocode"
//             disabled={typeof selectedExample !== 'object'}
//             style={styles.button}
//           />
//         </View>

//         <View style={styles.separator} />

//         {this._maybeRenderResult()}
//       </View>
//     );
//   }

//   _attemptReverseGeocodeAsync = async () => {
//     this.setState({ inProgress: true });
//     try {
//       let result = await Location.reverseGeocodeAsync(
//         this.state.selectedExample
//       );
//       this.setState({ result });
//     } catch (e) {
//       this.setState({ error: e });
//     } finally {
//       this.setState({ inProgress: false });
//     }
//   };

//   _attemptGeocodeAsync = async () => {
//     this.setState({ inProgress: true, error: null });
//     try {
//       let result = await Location.geocodeAsync(this.state.selectedExample);
//       this.setState({ result });
//     } catch (e) {
//       this.setState({ error: e.message });
//     } finally {
//       this.setState({ inProgress: false });
//     }
//   };

//   _maybeRenderResult = () => {
//     let { selectedExample } = this.state;
//     let text = typeof selectedExample === 'string'
//       ? selectedExample
//       : JSON.stringify(selectedExample);

//     if (this.state.inProgress) {
//       return <ActivityIndicator style={{ marginTop: 10 }} />;
//     } else if (this.state.result) {
//       return (
//         <Text style={styles.resultText}>
//           {text} resolves to {JSON.stringify(this.state.result)}
//         </Text>
//       );
//     } else if (this.state.error) {
//       return (
//         <Text style={styles.errorResultText}>
//           {text} cannot resolve: {JSON.stringify(this.state.error)}
//         </Text>
//       );
//     }
//   };

//   _renderExample = (example, i) => {
//     let { selectedExample } = this.state;
//     let isSelected = selectedExample === example;
//     let text = typeof example === 'string' ? example : JSON.stringify(example);

//     return (
//       <Touchable
//         key={i}
//         hitSlop={{ top: 10, bottom: 10, left: 20, right: 20 }}
//         onPress={() => this._selectExample(example)}>
//         <Text
//           style={[
//             styles.exampleText,
//             isSelected && styles.selectedExampleText,
//           ]}>
//           {text}
//         </Text>
//       </Touchable>
//     );
//   };

//   _selectExample = example => {
//     if (this.state.inProgress) {
//       return;
//     }

//     this.setState({ selectedExample: example, result: '', error: '' });
//   };
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   separator: {
//     height: 1,
//     backgroundColor: '#eee',
//     marginTop: 10,
//     marginBottom: 5,
//   },
//   headerText: {
//     fontSize: 18,
//     fontWeight: '600',
//     marginBottom: 5,
//   },
//   headerContainer: {
//     borderBottomWidth: 1,
//     borderBottomColor: '#eee',
//     marginHorizontal: 20,
//     marginBottom: 0,
//     marginTop: 20,
//   },
//   exampleText: {
//     fontSize: 15,
//     color: '#ccc',
//     marginVertical: 10,
//   },
//   examplesContainer: {
//     paddingTop: 15,
//     paddingBottom: 5,
//     paddingHorizontal: 20,
//   },
//   selectedExampleText: {
//     color: 'black',
//   },
//   resultText: {
//     padding: 20,
//   },
//   actionContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginVertical: 10,
//   },
//   errorResultText: {
//     padding: 20,
//     color: 'red',
//   },
//   button: {
//     ...Platform.select({
//       android: {
//         marginBottom: 10,
//       },
//     }),
//   },
// });



import React, { Component } from 'react';
import {
  Button,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  Text,
  ToastAndroid,
  View
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import firestore from '@react-native-firebase/firestore'

export default class App extends Component {
  watchId = null;

  state = {
    loading: false,
    updatesEnabled: false,
    location: {}
  };

  hasLocationPermission = async () => {
    if (Platform.OS === 'ios' ||
        (Platform.OS === 'android' && Platform.Version < 23)) {
      return true;
    }

    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    );

    if (hasPermission) return true;

    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    );

    if (status === PermissionsAndroid.RESULTS.GRANTED) return true;

    if (status === PermissionsAndroid.RESULTS.DENIED) {
      ToastAndroid.show('Location permission denied by user.', ToastAndroid.LONG);
    } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      ToastAndroid.show('Location permission revoked by user.', ToastAndroid.LONG);
    }

    return false;
  }

  getLocation = async () => {
    const hasLocationPermission = await this.hasLocationPermission();
    const geo = {};
    if (!hasLocationPermission) return;

    this.setState({ loading: true }, () => {
      Geolocation.getCurrentPosition(
        (position) => {
          this.setState({ location: position, loading: false });
          console.log(position);
          geo['latitude'] = position.coords.latitude;
          geo['longitude'] = position.coords.longitude;
          console.log('this is the geoloaction  :', geo)

          const geoPoint = new firestore.GeoPoint(position.coords.latitude, position.coords.longitude);
          console.log('this is the geoPoing that saved in firestore: ', geoPoint)
        },
        (error) => {
          this.setState({ location: error, loading: false });
          console.log(error);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000, distanceFilter: 50, forceRequestLocation: true }
      );
    });
  }

  getLocationUpdates = async () => {
    const hasLocationPermission = await this.hasLocationPermission();

    if (!hasLocationPermission) return;
    
    this.setState({ updatesEnabled: true }, () => {
      this.watchId = Geolocation.watchPosition(
        (position) => {
          this.setState({ location: position });
          console.log(position);
        },
        (error) => {
          this.setState({ location: error });
          console.log(error);
        },
        { enableHighAccuracy: true, distanceFilter: 0, interval: 5000, fastestInterval: 2000 }
      );
    });
  }

  removeLocationUpdates = () => {
      if (this.watchId !== null) {
          Geolocation.clearWatch(this.watchId);
          this.setState({ updatesEnabled: false })
      }
  }

  render() {
    const { loading, location, updatesEnabled } = this.state;
    // console.log('location is :',)
    return (
      <View style={styles.container}>
        <Button title='Get Location' onPress={this.getLocation} disabled={loading || updatesEnabled} />
        <View style={styles.buttons}>
            <Button title='Start Observing' onPress={this.getLocationUpdates} disabled={updatesEnabled} />
            <Button title='Stop Observing' onPress={this.removeLocationUpdates} disabled={!updatesEnabled} />
        </View>

        <View style={styles.result}>
            <Text>{JSON.stringify(location, null, 4)}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    paddingHorizontal: 12
  },
  result: {
      borderWidth: 1,
      borderColor: '#666',
      width: '100%',
      paddingHorizontal: 16
  },
  buttons: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      marginVertical: 12,
      width: '100%'
  }
});


// later 
// import React from 'react';
// import LocationView from "react-native-location-view";
// import {View} from "react-native";


// export default class SelectLocationScreen extends React.Component {
//   state = {

//   };

//   render() {
//     return(
//       <View style={{flex: 1}}>
//         <LocationView
//           apiKey={"AIzaSyAiJZomZxOvuedI5Q5bATkcH3FWsljlhdo"}
//           initialLocation={{
//             latitude: 37.78825,
//             longitude: -122.4324,
//           }}
//         />
//       </View>
//     );
//   }
// }