import React, {useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
// import auth from '@react-native-firebase/auth';
import { firebase } from '@react-native-firebase/auth';
import auth from '@react-native-firebase/auth';

import { UserContext } from '../context/UserContext';
// import { useNavigation } from '@react-navigation/native';


export default function Home({ navigation }) {

    const {User} = useContext(UserContext);
    

    signOutUser = async () => {

      try {
        const sigout = await firebase.auth().signOut();
          console.log('signed out ');
          navigation.navigate('Auth')
        // console.log('signout ', sigout)
        
        
      }
      catch(error){
        console.log("error signing Out", error)
      }
        // const confirmation = await auth().signInWithPhoneNumber('+249999099148');

        // // console.log('confirmation ', confirmation)

       
        // try {
        //     await confirmation.confirm('123456'); // User entered code
        //     // Successful login - onAuthStateChanged is triggered
            


        //   } catch (e) {
        //     console.error(e); // Invalid code
        //   }

        // //   Some Android devices may automatically verify codes received via SMS. If this happens, 
        // // the onAuthStateChanged method is triggered, meaning no manual code verification is required.

          


        //   const update = {
        //     displayName: 'motae',
        //     photoURL: 'https://my-cdn.com/assets/user/123.png',
        //   };
           
        //   await auth().currentUser.updateProfile(update);




          // auth().onAuthStateChanged(user => {
          //   if (user) {  
          //    // Stop the login flow / Navigate to next page
          //   // console.log('User info for provider: ', user);
          //   // console.log('+++++++++_____________========')

          //   }
          // });
    };

    // user.providerData.forEach((userInfo) => {
    //   console.log('User info for provider: ', userInfo);
    //   console.log('+++++++++_____________========')
    // });

    // if(loading){
    //     return <ActivityIndicator/>;
    // }

    return (
        <View style={styles.container}>
            <Text>email   {User.email}!</Text>
            <Text>name   {User.displayName}!</Text>
            <Text>id   {User.uid}!</Text>
            <Text>phone   {User.phoneNumber}!</Text>
            <Text>profile   {User.photoURL}!</Text>

            <TouchableOpacity style={{ marginTop: 32 }} onPress={signOutUser}>
                 <Text>Logout</Text>
            </TouchableOpacity>
        </View>
    );
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    }
});

        // console.log('verify phone Number and update current User');
        // try{
            
        //     const snapshot = await auth().verifyPhoneNumber('+918374551457')
        //     .on('state_changed', (phoneAuthSnapshot) => {
        //         console.log('State: ', phoneAuthSnapshot.state);
        //       }, (error) => {
        //         console.error(error);
        //       }, (phoneAuthSnapshot) => {
        //         console.log('Success');
        //         // console.log('snapshot ', phoneAuthSnapshot)
        //         // console.log('vervication ID', snapshot.verificationId)
        //         // console.log('vervication code', snapshot.code)

        //       }); // See PhoneAuthListener - wait for successful verification
            
        //       /// snapshot returnd value is 
        //     //   snapshot  {"code": null, "error": null, "state": "timeout", "verificationId": "AM5PThDr1ST8rWm0IcEVnlWbuw7sEZM2y6gISy3jbbPCSNp0gbttRZubjXKfNk4MTVDq-ojOdTUnsHUAc-eEz4gnBxmFotjv3-uN678hC74NXHUBOcmwOXIcWfHUXl1LpJUZwXRCsxijLNZ9kAX-efuSuCUspoLzwQ"}
        //       // i need both code and verfication ID to get credential

      //  // const facebookCredential = firebase.auth.FacebookAuthProvider.credential('access token from Facebook');
      //  // const userCredential = await firebase.auth().currentUser.linkWithCredential(facebookCredential);
        

        //     const credential = auth.PhoneAuthProvider.credential(snapshot.verificationId, '123456');
            
        //     // console.log('credential ', credential)
        //     // credential  {"providerId": "phone", "secret": "123456", "token": "AM5PThDzjEF3Dj6OvnYGtzLaCW-ZhnYEdPWoJw6O3XOtPMFF0M1KiJrsMAWM9exqZNI8TlEGv4vDBmKk_c9xoLuZjJwXRxWHIhdkKf6jEU8hZbOn94i2Fhs6B20JrDvfemLtNwXgEVQ08Tu8mk0hrfIO9e1b-Ua75w"}

        //     // // Update user with new verified phone number
        //     await auth().currentUser.updatePhoneNumber(credential);
            
        //     // get user credntial
        //     // const out = await auth().currentUser.getIdToken();
        //     // if(out){
        //     //     console.log('logged verfiy number', out);
        //     //     // navigation.navigate('Auth');
        //     // }
        // }
        // catch (error){
        //     console.log('logged out Errir', error);
        // }




// useEffect( () => { 
//     const unsubscribe = auth().onAuthStateChanged( (user) => {
//         if (user) {
//           setEmail(user.email);
//           setDisplayName(user.displayName);
//           setLoading(false)
//         } else {
//           // Signed out
//           console.log('no User redirect to Auth')
//           navigation.navigate('Auth');
            
//         }
//       });
//     return () => unsubscribe();
// }, []);

// import React from "react";
// import { View, Text, StyleSheet, TouchableOpacity, LayoutAnimation } from "react-native";
// import auth from '@react-native-firebase/auth';
// import { FirebaseService } from '../config/FirebaseService'


// export default class HomeScreen extends React.Component {
//     state = { email: "", displayName: "" };

//     componentDidMount() {
//         const { email, displayName } = auth().currentUser;

//         this.setState({ email, displayName });
//     }


//     signOutUser = () => {
//         // FirebaseService.signOut();
//         this.props.navigation.navigate('Auth')
//     };

//     render() {
//         return (
//             <View style={styles.container}>
//                 <Text>Hi {this.state.email}!</Text>
//                 <Text>Hi {this.state.displayName}!</Text>
//                 <TouchableOpacity style={{ marginTop: 32 }} onPress={this.signOutUser}>
//                     <Text>Logout</Text>
//                 </TouchableOpacity>
//             </View>
//         );
//     }
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         alignItems: "center",
//         justifyContent: "center"
//     }
// });

// // import React, { useState, useEffect } from 'react';
// // import { FlatList, Text } from 'react-native';
// // import firestore from '@react-native-firebase/firestore';
 
// // function Users() {
// //   const [users, setUsers] = useState([]); // Initial empty array of users
// //   const [loading, setLoading] useState(true); // Set loading to true on component mount
 
// //   // On load, fetch our users and subscribe to updates
// //   useEffect(() => {
// //     const unsubscribe = firestore()
// //       .collection('users')
// //       .onSnapshot((querySnapshot) => {
// //         // Add users into an array
// //         const users = querySnapshot.docs.map((documentSnapshot) => {
// //           return {
// //             ...documentSnapshot.data(),
// //             key: documentSnapshot.id, // required for FlatList
// //           };
// //         });
 
// //         // Update state with the users array
// //         setUsers(users);
 
// //         // As this can trigger multiple times, only update loading after the first update
// //         if (loading) {
// //           setLoading(false);
// //         }
// //       });
 
// //       return () => unsubscribe(); // Stop listening for updates whenever the component unmounts
// //   }, []);
 
// //   if (loading) {
// //     return null; // Show a loading spinner
// //   }
 
// //   return (
// //     <FlatList
// //       data={users}
// //       renderItem={({item}) => <Text>{item.key}</Text>}
// //     />
// //   );
// // }