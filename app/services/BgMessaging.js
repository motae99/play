
import AsyncStorage from "@react-native-community/async-storage";
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/messaging';


export default async (remoteMessage) => {
    // handle your remoteMessage
    console.log('FCM OFFLINE: ', remoteMessage);

    firebase.messaging().setBackgroundMessageHandler(async (remoteMessage) => {
     // Update a users messages list using AsyncStorage
     const currentMessages = await AsyncStorage.getItem('messages');
     const messageArray = JSON.parse(currentMessages);
     messageArray.push(remoteMessage.data);
     await AsyncStorage.setItem('messages', JSON.stringify(messageArray));
  });

    return Promise.resolve();
}

// const handleFCMNotification = async (message) => {
//  console.log('FCM OFFLINE: ', message);
//  return Promise.resolve();
// }
