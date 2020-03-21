import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import messaging from '@react-native-firebase/messaging';
import firestore from "@react-native-firebase/firestore";
import AsyncStorage from '@react-native-community/async-storage';

// import dynamicLinks from '@react-native-firebase/dynamic-links';

// function onMessageReceived(message) {
//   console.log('message not ready shipped for testing')
//   const { type, timestamp } = message.data;

//   if (type === 'order_shipped') {
//     notifee.displayNotification({
//       title: 'Your order has been shipped',
//       // body: `Your order was shipped at ${new Date(Number(timestamp)).toString()}!`,
//       android: {
//         channelId: 'default',
//       },
//     });
//   }
// }


// async function bootstrapApp() {
//   const initialLink = await dynamicLinks().getInitialLink();
//   if (initialLink) {
//     if (initialLink.url === 'https://www.example.com/?curPage=1') {
//       console.log('link Recieved navigate now')
//     }
//   }
// }

export default class Initial extends Component {
  constructor() {
    super();
}

componentDidMount = async () => { 

   const user = await auth().currentUser;
    if (user) {
      if(!user.phoneNumber){
        // this.props.navigation.navigate('Phone')
        this.props.navigation.navigate('App')

      }
      if(user.phoneNumber){
        // await messaging().registerForRemoteNotifications();
        // const fcmToken = await messaging().getToken();
        // console.log(fcmToken)
        // // Update backend (e.g. Firestore) with our scoped token for the user
        // await firestore().doc(`users/${user.uid}`)
        //   .update({
        //     fcmTokens: fcmToken,
        //   });
        // await messaging().subscribeToTopic('test');

        this.props.navigation.navigate('App')
      }

    } else {
      console.log('No logged in User navigate to Auth')

      // if the user has previously signed out from the app
      this.props.navigation.navigate('Auth')
    }

    // bootstrapApp();


}



 
// Unsubscribe from further message events



   

render() {
    return (
      <View style={styles.container}>
        <Text>lottie file here</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

});

// // import React, { Component } from 'react'
// // import Loader from 'react-native-mask-loader';
// // import { Asset } from 'expo-asset'
// // import * as Font from 'expo-font'
// // import * as Icon from '@expo/vector-icons'
// // import { withFirebaseHOC } from '../config/Firebase'

// // class Initial extends Component {
// //   state = {
// //     isAssetsLoadingComplete: false
// //   }

// //   componentDidMount = async () => {
// //     try {
// //       // previously
// //       this.loadLocalAsync()

// //       await this.props.checkUserAuth(user => {
// //         if (user) {
// //           // if the user has previously logged in
// //           this.props.navigation.navigate('App')
// //         } else {
// //           // if the user has previously signed out from the app
// //           this.props.navigation.navigate('Auth')
// //         }
// //       })
// //     } catch (error) {
// //       console.log(error)
// //     }
// //   }

// //   loadLocalAsync = async () => {
// //     return await Promise.all([
// //       Asset.loadAsync([
// //         require('../assets/flame.png'),
// //         require('../assets/icon.png')
// //       ]),
// //       Font.loadAsync({
// //         ...Icon.Ionicons.font
// //       })
// //     ])
// //   }

// //   handleLoadingError = error => {
// //     // In this case, you might want to report the error to your error
// //     // reporting service, for example Sentry
// //     console.warn(error)
// //   }

// //   handleFinishLoading = () => {
// //     this.setState({ isAssetsLoadingComplete: true })
// //   }

// //   render() {
// //     return (
// //       <Loader
// //         startAsync={this.loadLocalAsync}
// //         onFinish={this.handleFinishLoading}
// //         onError={this.handleLoadingError}

// //         isLoaded={this.state.appHasLoaded}
// //         imageSource={require('./assets/twitter.png')}
// //         backgroundStyle={styles.loadingBackgroundStyle}
// //       />
// //     )
// //   }
// // }

// // export default withFirebaseHOC(Initial)

