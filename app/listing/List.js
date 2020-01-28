import React from "react";
import ListView from './ListView';
import { withNavigation } from 'react-navigation';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import messaging from '@react-native-firebase/messaging';
import analytics from '@react-native-firebase/analytics';
import dynamicLinks from '@react-native-firebase/dynamic-links';


export default class List extends React.Component {
    // componentDidMount(){
    //     this.updateToken();
    // }

    // updateToken = async () => {
    //     await messaging().registerForRemoteNotifications();
    //     const fcmToken = await messaging().getToken();
    //     console.log(fcmToken);
        
    //     // Update backend (e.g. Firestore) with our scoped token for the user
    //     const uid = auth().currentUser.uid;
    //     // await firestore().doc(`users/${uid}`)
    //     // .update({
    //     //     fcmTokens: firestore.FieldValues.arrayUnion(fcmToken),
    //     // });

    //     await analytics().logEvent('screen_view', {
    //         id: '123456789',
    //         color: 'red',
    //         via: 'ProductCatalog',
    //     });
    // }

    render() { 
        // this.updateToken();
        return ( 
            <ListView navigation={this.props.navigation}/> 
        ) 
    }
}

// withNavigation(List)