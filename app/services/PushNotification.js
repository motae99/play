import React, { Component } from "react";
import PushNotification from "react-native-push-notification";
import NavigationService from "./NavigationService";
import AsyncStorage from "@react-native-community/async-storage";

import firebase from "@react-native-firebase/app";
import "@react-native-firebase/messaging";
import "@react-native-firebase/dynamic-links";
import "@react-native-firebase/firestore";
import "@react-native-firebase/auth";

// var PushNotification = require("react-native-push-notification");
async function bootstrapApp() {
  const initialLink = await firebase.dynamicLinks().getInitialLink();

  if (initialLink) {
    // Handle dynamic link inside your own application
    // console.log('true')
    if (initialLink.url === "https://www.example.com/?curPage=1")
      return NavigationService.navigate("EListing");

    // if (initialLink.url === 'https://invertase.io/offer') return navigateTo('/offers')
  }
}

const remoteMessaging = firebase.messaging().onMessage(async (remoteMessage) => {
 console.log('FCM Message Data:', remoteMessage.data);

  // Update a users messages list using AsyncStorage
  const currentMessages = await AsyncStorage.getItem('messages');
  const messageArray = JSON.parse(currentMessages);
  messageArray.push(remoteMessage.data);
  await AsyncStorage.setItem('messages', JSON.stringify(messageArray));
});

export default class PushController extends Component {
  // componentDidMount(){
  //   PushNotification.configure({
  //       // (optional) Called when Token is generated (iOS and Android)
  //       onRegister: function(token) {
  //         console.log("TOKEN:", token);
  //       },

  //       // (required) Called when a remote or local notification is opened or received
  //       onNotification: function(notification) {
  //         console.log("NOTIFICATION:", notification);
  //         // return NavigationService.navigate('EListing');
  //         // process the notification here

  //         // required on iOS only
  //         // notification.finish(PushNotificationIOS.FetchResult.NoData);
  //       },
  //       // Android only
  //       senderID: "443844365530",
  //       // iOS only
  //       // permissions: {
  //       //   alert: true,
  //       //   badge: true,
  //       //   sound: true
  //       // },
  //       popInitialNotification: true,
  //       requestPermissions: true
  //   });

  //   bootstrapApp()
  // }

  async componentDidMount() {
    this.checkPermission();
    this.createNotificationListeners(); //add this line
      PushNotification.configure({
        // (optional) Called when Token is generated (iOS and Android)
        // onRegister: function(token) {
        //   console.log("TOKEN:", token);
        // },

        // (required) Called when a remote or local notification is opened or received
        onNotification: function(notification) {
          console.log("NOTIFICATION:", notification);
          // return NavigationService.navigate('EListing');
          // process the notification here

          // required on iOS only
          // notification.finish(PushNotificationIOS.FetchResult.NoData);
        },
        // Android only
        senderID: "443844365530",
        // iOS only
        permissions: {
          alert: true,
          badge: true,
          sound: true
        },
        popInitialNotification: true,
        requestPermissions: true
    });
    bootstrapApp();
  }

  componentWillUnmount() {
    // this.notificationListener();
    // this.notificationOpenedListener();
  }

  //1
  async checkPermission() {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      this.getToken();
    } else {
      this.requestPermission();
    }
  }

  //3
  async getToken() {
    let fcmToken = await AsyncStorage.getItem("fcmToken");
    if (!fcmToken) {
      fcmToken = await firebase.messaging().getToken();
      if (fcmToken) {
        // user has a device token
        console.log("fcmToken : ", fcmToken);
        await AsyncStorage.setItem("fcmToken", fcmToken);
        // update user in firestore to reflect the new fcmToken
        let uid = firebase.auth().currentUser.uid;
        if (uid) {
          await firebase
            .firestore()
            .doc(`users/${uid}`)
            .update({
              fcmToken: fcmToken
              // firestore.FieldValues.arrayUnion(fcmToken)
            });
        }
      }
    }

    // consider this also
    // const unsubscribe = firebase.messaging().onTokenRefresh(async (fcmToken) => {
    //  console.log('New FCM Token:', fcmToken);

    //  // Append the database with the users new FCM token (e.g. with Firestore)
    //  const uid = firebase.auth().currentUser.uid;
    //  await firebase.firestore().doc(`users/${uid}`)
    //    .update({
    //      fcmTokens: firebase.firestore.FieldValues.arrayUnion(fcmToken),
    //    });
    // });
  }

  //2
  async requestPermission() {
    try {
      await firebase.messaging().requestPermission();
      // User has authorised
      this.getToken();
    } catch (error) {
      // User has rejected permissions
      console.log("permission rejected");
    }
  }

  async createNotificationListeners() {
    /*
     * Triggered when a particular notification has been received in foreground
     * */
    // this.notificationListener = firebase.notifications().onNotification((notification) => {
    //     const { title, body } = notification;
    //     this.showAlert(title, body);
    // });

    // /*
    // * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
    // * */
    // this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
    //     const { title, body } = notificationOpen.notification;
    //     this.showAlert(title, body);
    // });

    // /*
    // * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
    // * */
    // const notificationOpen = await firebase.notifications().getInitialNotification();
    // if (notificationOpen) {
    //     const { title, body } = notificationOpen.notification;
    //     this.showAlert(title, body);
    // }

    /*
     * Triggered for data only payload in foreground
     * */
    this.messageListener = firebase.messaging().onMessage(message => {
      //process data message
      console.log(JSON.stringify(message));
    });


    this.remoteMessaging = firebase.messaging().onMessage(async (remoteMessage) => {
     console.log('FCM Message Data:', remoteMessage.data);
    
      // Update a users messages list using AsyncStorage
      const currentMessages = await AsyncStorage.getItem('messages');
      const messageArray = JSON.parse(currentMessages);
      messageArray.push(remoteMessage.data);
      await AsyncStorage.setItem('messages', JSON.stringify(messageArray));
    });
    
   // Unsubscribe from further message events
   // remoteMessaging();


  }

  showAlert(title, body) {
    Alert.alert(
      title,
      body,
      [{ text: "OK", onPress: () => console.log("OK Pressed") }],
      { cancelable: false }
    );
  }

  render() {
    return null;
  }
}

// use following to add to async storage that hold all notifications

// import React, { Component, Fragment } from "react";
// import PushNotification from "react-native-push-notification";
// import {
//   SafeAreaView,
//   StyleSheet,
//   ScrollView,
//   View,
//   Text,
//   StatusBar,
//   FlatList,
// } from 'react-native';
// import {
//   Header,
//   LearnMoreLinks,
//   Colors,
//   DebugInstructions,
//   ReloadInstructions,
// } from 'react-native/Libraries/NewAppScreen';
// export default class PushController extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       pushData: []
//     }
//   }
//   componentDidMount() {
//     let self = this;
//     PushNotification.configure({
//       // (optional) Called when Token is generated (iOS and Android)
//       onRegister: function (token) {
//         console.log("TOKEN:", token);
//       },

//       // (required) Called when a remote or local notification is opened or received
//       onNotification: function (notification) {
//         console.log("NOTIFICATION:", notification);

//         // process the notification
//         self._addDataToList(notification);
//         // required on iOS only (see fetchCompletionHandler docs: https://github.com/react-native-community/react-native-push-notification-ios)
//         // notification.finish(PushNotificationIOS.FetchResult.NoData);
//       },

//       // ANDROID ONLY: GCM or FCM Sender ID (product_number) (optional - not required for local notifications, but is need to receive remote push notifications)
//       senderID: "1090501687137",

//       // IOS ONLY (optional): default: all - Permissions to register.
//       permissions: {
//         alert: true,
//         badge: true,
//         sound: true
//       },

//       // Should the initial notification be popped automatically
//       // default: true
//       popInitialNotification: true,

//       /**
//        * (optional) default: true
//        * - Specified if permissions (ios) and token (android and ios) will requested or not,
//        * - if not, you must call PushNotificationsHandler.requestPermissions() later
//        */
//       requestPermissions: true
//     });
//   }

//   _renderItem = ({ item }) => (
//     <View key={item.title}>
//       <Text style={styles.title}>{item.custom_title}</Text>
//       <Text style={styles.message}>{item.custom_message}</Text>
//     </View>
//   );

//   _addDataToList(data) {
//     let array = this.state.pushData;
//     array.push(data);
//     this.setState({
//       pushData: array
//     });
//     console.log(this.state);
//   }

//   render() {
//     return (
//       <Fragment>
//         <StatusBar barStyle="dark-content" />
//         <SafeAreaView>
//           <ScrollView
//             contentInsetAdjustmentBehavior="automatic"
//             style={styles.scrollView}>
//             <Header />
//             <View style={styles.listHeader}>
//               <Text>Push Notifications</Text>
//             </View>
//             <View style={styles.body}>
//               {(this.state.pushData.length != 0) && <FlatList
//                 data={this.state.pushData}
//                 renderItem={(item) => this._renderItem(item)}
//                 keyExtractor={(item) => item.title}
//                 extraData = {this.state}
//               />
//               }
//               {(this.state.pushData.length == 0) &&
//                 <View style={styles.noData}>
//                   <Text style={styles.noDataText}>You don't have any push notification yet. Send some push to show it in the list</Text>
//                 </View>}
//               {/* <LearnMoreLinks /> */}
//             </View>
//           </ScrollView>
//         </SafeAreaView>
//       </Fragment>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   scrollView: {
//     backgroundColor: Colors.lighter,
//   },
//   listHeader: {
//     backgroundColor: '#eee',
//     color: "#222",
//     height: 44,
//     padding: 12
//   },
//   title: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     paddingTop: 10
//   },
//   noData: {
//     paddingVertical: 50,
//   },
//   noDataText: {
//     fontSize: 14,
//     textAlign: 'center',
//   },
//   message: {
//     fontSize: 14,
//     paddingBottom: 15,
//     borderBottomColor: "#ccc",
//     borderBottomWidth: 1
//   },
//   engine: {
//     position: 'absolute',
//     right: 0,
//   },
//   body: {
//     backgroundColor: Colors.white,
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//   },
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//     color: Colors.black,
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//     color: Colors.dark,
//   },
//   highlight: {
//     fontWeight: '700',
//   },
//   footer: {
//     color: Colors.dark,
//     fontSize: 12,
//     fontWeight: '600',
//     padding: 4,
//     paddingRight: 12,
//     textAlign: 'right',
//   },
// });
