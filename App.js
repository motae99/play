import React, { Component } from 'react';
import AppContainer from './app/navigations'
import UserContextProvider from './app/context/UserContext';

// import Firebase, { FirebaseProvider } from './config/Firebase'

export default class App extends Component {
  render() {
  return (
    // <FirebaseProvider value={Firebase}>
    <UserContextProvider>
      <AppContainer />
    </UserContextProvider>
    // </FirebaseProvider>
  )
}
}

// import React from 'react';
// import { View, Button } from 'react-native';
// import notifee, {AndroidBadgeIconType, AndroidImportance, AndroidColor, AndroidStyle} from '@notifee/react-native';

// export default function Screen() {
//   async function onDisplayNotification() {
//     // Create a channel 
//     const channelId = await notifee.createChannel({
//       id: 'default',
//       name: 'Default Channel',
//       // importance: AndroidImportance.HIGH,
//     });

//     const badge = await notifee.createChannel({
//       id: 'messages',
//       name: 'Private Messages',
//       badge: true, // disable in badges
//     });

//     // Display a notification
//     // await notifee.displayNotification({
//     //   title: 'Notification Title',
//     //   body: 'Main body content of the notification',
//     //   android: {
//     //     channelId,
//     //   },
//     // });

//     // await notifee.displayNotification({
//     //   title: '<p style="color: #4caf50;"><b>Styled HTMLTitle</span></p></b></p> &#128576;',
//     //   subtitle: '&#129395;',
//     //   body:
//     //     'The <p style="text-decoration: line-through">body can</p> also be <p style="color: #ffffff; background-color: #9c27b0"><i>styled too</i></p> &#127881;!',
//     //   android: {
//     //     channelId,
//     //     color: '#4caf50',
//     //     actions: [
//     //       {
//     //         title: '<b>Dance</b> &#128111;',
//     //         pressAction: { id: 'dance' },
//     //       },
//     //       {
//     //         title: '<p style="color: #f44336;"><b>Cry</b> &#128557;</p>',
//     //         pressAction: { id: 'cry' },
//     //       },
//     //     ],
//     //   },
//     // });

//     // await notifee.displayNotification({
//     //   title: 'Chat with Joe Bloggs',
//     //   body: 'A new message has been received from a user.',
//     //   android: {
//     //     channelId,
//     //     // Remote image
//     //     // largeIcon: 'https://my-cdn.com/users/123456.png',
    
//     //     // Local image
//     //     largeIcon: require('./images/nona1.png'),
    
//     //     // Android resource (mipmap or drawable)
//     //     // largeIcon: 'large_icon',
//     //   },
//     // });

//     // await notifee.displayNotification({
//     //   // title: 'Chat with Joe Bloggs',
//     //   // body: 'Notification using small icon in badged mode',
//     //   // android: {
//     //   //   channelId, // channel with badges enabled
//     //   //   // largeIcon: 'https://my-cdn.com/users/123456.png',
//     //   //   // badgeIconType: AndroidBadgeIconType.SMALL,
//     //   //   importance: AndroidImportance.HIGH,
//     //   //   color: AndroidColor.RED,
//     //   //   // or
//     //   //   // color: '#E8210C', // red
//     //   // },
//     //   title: 'Message from Sarah Lane',
//     //   body: 'Tap to view your unread message from Sarah.',
//     //   subtitle: 'Messages',
//     //   android: {
//     //     channelId,
//     //     largeIcon: 'https://my-cdn/users/123.png',
//     //     timestamp: Date.now() - 480000, // 8 minutes ago
//     //     showTimestamp: true,
//     //   },
//     // });

//     await notifee.displayNotification({
//       title: 'Messages list',
//       android: {
//         channelId,
//         style: {
//           type: AndroidStyle.INBOX,
//           lines: ['First Message', 'Second Message', 'Third Message', 'Forth Message'],
//         },
//       },
//     });
    
    

//   }



//   return (
//     <View>
//       <Button
//         title="Display Notification"
//         onPress={() => onDisplayNotification()}
//       />
//     </View>
//   );
// }



// // short link
// // const link = await firebase.dynamicLinks().buildShortLink(
// //   {
// //     link: 'https://invertase.io',
// //     domainUriPrefix: 'https://xyz.page.link',
// //     analytics: {
// //       campaign: 'banner',
// //     }
// //   },
// //   firebase.dynamicLinks.ShortLinkType.UNGUESSABLE,
// //  );

// import React, {useState} from 'react';
// import {
//   Alert,
//   Button,
//   Platform,
//   TextInput,
//   StyleSheet,
//   Text,
//   View,
//   // Share
// } from 'react-native';


// import { firebase } from '@react-native-firebase/dynamic-links';

// import Share from 'react-native-share';

// import images from './imagesBase64';

// const App = () => {
//   const [packageSearch, setPackageSearch] = useState('');
//   const [result, setResult] = useState('');

//   const checkIfPackageIsInstalled = async () => {
//     const {isInstalled} = await Share.isPackageInstalled(packageSearch);

//     Alert.alert(
//       `Package: ${packageSearch}`,
//       `${isInstalled ? 'Installed' : 'Not Installed'}`,
//     );
//   };

//   function getErrorString(error, defaultValue) {
//     let e = defaultValue || 'Something went wrong. Please try again';
//     if (typeof error === 'string') {
//       e = error;
//     } else if (error && error.message) {
//       e = error.message;
//     } else if (error && error.props) {
//       e = error.props;
//     }
//     return e;
//   }

//   const shareMultipleImages = async () => {
//     const shareOptions = {
//       title: 'Share file',
//       failOnCancel: false,
//       urls: [images.image1, images.image2],
//     };

//     try {
//       const ShareResponse = await Share.open(shareOptions);
//       setResult(JSON.stringify(ShareResponse, null, 2));
//     } catch (error) {
//       console.log('Error =>', error);
//       setResult('error: '.concat(getErrorString(error)));
//     }
//   };

//   const shareEmailImage = async () => {
//     const shareOptions = {
//       title: 'Share file',
//       email: 'email@example.com',
//       social: Share.Social.EMAIL,
//       failOnCancel: false,
//       urls: [images.image1, images.image2],
//     };

//     try {
//       const ShareResponse = await Share.open(shareOptions);
//       setResult(JSON.stringify(ShareResponse, null, 2));
//     } catch (error) {
//       console.log('Error =>', error);
//       setResult('error: '.concat(getErrorString(error)));
//     }
//   };


//   const shareSingleImage = async () => {
    

//     const sharedUrl = await firebase.dynamicLinks().buildShortLink({
//       link: 'https://www.example.com/?curPage=1', //use any Domanin name or ur domain name ? curPage=1 leads to homepage
//       domainUriPrefix: 'https://kanta.page.link',
//       analytics: {
//         campaign: 'offer',
//       },
//       social: {
//         title: 'Social Application',
//         descriptionText: 'A Social Application',
//         imageUrl: 'https://storage.cloud.google.com/kanta-ddb2c.appspot.com/photos/9Cg4qvaHKvaWNolba8F9XrU3Wxx1/1579603334678.png',
//       },
//       android: {
//         packageName: 'com.kanta',
//       },
//     },
//     firebase.dynamicLinks.ShortLinkType);

//     console.log('built link with dynamic Link', sharedUrl)

//     const shareOptions = {
//       // title: 'Share Contents',
//       failOnCancel: false,
//       url: sharedUrl,
//     };

//     console.log('shareOptions   : =>',shareOptions)
//     try {
//       const ShareResponse = await Share.open(shareOptions);
//       console.log('ShareResponse   : =>',ShareResponse);

//       setResult(JSON.stringify(ShareResponse, null, 2));
//     } catch (error) {
//       console.log('Error =>', error);
//       setResult('error: '.concat(getErrorString(error)));
//     }
//   };

//   const shareToFiles = async () => {
//     const shareOptions = {
//       title: 'Share file',
//       failOnCancel: false,
//       saveToFiles: true,
//       urls: [images.image1, images.pdf1], // base64 with mimeType or path to local file
//     };

//     // If you want, you can use a try catch, to parse
//     // the share response. If the user cancels, etc.
//     try {
//       const ShareResponse = await Share.open(shareOptions);
//       setResult(JSON.stringify(ShareResponse, null, 2));
//     } catch (error) {
//       console.log('Error =>', error);
//       setResult('error: '.concat(getErrorString(error)));
//     }
//   };

//   const shareToInstagramStory = async () => {
//     const shareOptions = {
//       title: 'Share image to instastory',
//       method: Share.InstagramStories.SHARE_BACKGROUND_IMAGE,
//       backgroundImage: images.image1,
//       social: Share.Social.INSTAGRAM_STORIES,
//     };

//     try {
//       const ShareResponse = await Share.shareSingle(shareOptions);
//       setResult(JSON.stringify(ShareResponse, null, 2));
//     } catch (error) {
//       console.log('Error =>', error);
//       setResult('error: '.concat(getErrorString(error)));
//     }
//   };

//   const onShare = async () => {

//     try {
//         const sharedUrl = await firebase.dynamicLinks().buildShortLink({
//           link: 'https://www.example.com/?curPage=1', // this is the deep link in your App //use any Domanin name or ur domain name ? curPage=1 leads to homepage
//           domainUriPrefix: 'https://kanta.page.link',
//           analytics: {
//             campaign: 'example',
//           },
//           social: {
//             title: 'Social Application',
//             descriptionText: 'A Social Application',
//             image: 'https://raw.githubusercontent.com/cdimascio/react-native-share-sheet/master/assets/share-sheet.jpg',
//           },
//           android: {
//             packageName: 'com.kanta',
//           },
//         },
//         firebase.dynamicLinks.ShortLinkType);

//         console.log(sharedUrl)
  
//         const result = await Share.share({
//             url: sharedUrl,
//             message: 'Hey found this new great app for ordering ... You should try it as well.',
//         });

//         if (result.action === Share.sharedAction) {
//             if (result.activityType) {
//                 // shared with activity type of result.activityType
//             } else {
//                 // shared
//             }
//         } else if (result.action === Share.dismissedAction) {
//             // dismissed
//         }
//     } catch (error) {
//         Alert.alert('Opps', error.message);
//     }
// };

// onPressTermsCondition = () => {
//     this.props.navigation.navigate('TermsAndConditions');
// };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.welcome}>Welcome to React Native Share Example!</Text>
//       <View style={styles.optionsRow}>
//         <View style={styles.button}>
//           <Button onPress={onShare} title="Share Multiple Images" />
//         </View>
//         <View style={styles.button}>
//           <Button onPress={shareSingleImage} title="Share Single Image" />
//         </View>
//         <View style={styles.button}>
//           <Button onPress={shareEmailImage} title="Share Social: Email" />
//         </View>
//         <View style={styles.button}>
//           <Button onPress={shareToInstagramStory} title="Share to IG Story" />
//         </View>
//         {Platform.OS === 'ios' && (
//           <View style={styles.button}>
//             <Button onPress={shareToFiles} title="Share To Files" />
//           </View>
//         )}
//         {Platform.OS === 'android' && (
//           <View style={styles.searchPackageContainer}>
//             <TextInput
//               placeholder="Search for a Package"
//               onChangeText={setPackageSearch}
//               value={packageSearch}
//               style={styles.textInput}
//             />
//             <View>
//               <Button
//                 onPress={checkIfPackageIsInstalled}
//                 title="Check Package"
//               />
//             </View>
//           </View>
//         )}
//         <Text style={styles.resultTitle}>Result</Text>
//         <Text style={styles.result}>{result}</Text>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   button: {
//     marginBottom: 10,
//   },
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   textInput: {
//     borderBottomColor: '#151313',
//     borderBottomWidth: 1,
//     marginRight: 10,
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
//   resultTitle: {
//     marginTop: 20,
//     fontSize: 20,
//   },
//   result: {
//     fontSize: 14,
//     margin: 10,
//   },
//   optionsRow: {
//     justifyContent: 'space-between',
//   },
//   searchPackageContainer: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     flexDirection: 'row',
//   },
// });

// export default App;