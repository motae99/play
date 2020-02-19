import React, {Component} from "react";
import PushNotification from "react-native-push-notification";
// var PushNotification = require("react-native-push-notification");

export default class PushController extends Component{
    componentDidMount(){
        PushNotification.configure({
            // (optional) Called when Token is generated (iOS and Android)
            onRegister: function(token) {
              console.log("TOKEN:", token);
            },
          
            // (required) Called when a remote or local notification is opened or received
            onNotification: function(notification) {
              console.log("NOTIFICATION:", notification);
          
              // process the notification here
          
              // required on iOS only 
              // notification.finish(PushNotificationIOS.FetchResult.NoData);
            },
            // Android only
            senderID: "443844365530",
            // iOS only
            // permissions: {
            //   alert: true,
            //   badge: true,
            //   sound: true
            // },
            popInitialNotification: true,
            requestPermissions: true
          });
    }

    render(){
        return null;
    }
}

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
//       senderID: "443844365530",

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
//             </View>
//           </ScrollView>
//         </SafeAreaView>
//       </Fragment>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   scrollView: {
//     backgroundColor: 'gray',
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
//     backgroundColor: 'white',
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
//     color: 'black',
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//     color: 'black',
//   },
//   highlight: {
//     fontWeight: '700',
//   },
//   footer: {
//     color: 'black',
//     fontSize: 12,
//     fontWeight: '600',
//     padding: 4,
//     paddingRight: 12,
//     textAlign: 'right',
//   },
// });