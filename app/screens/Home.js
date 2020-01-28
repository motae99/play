import React, {useState, useEffect} from "react";
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import auth from '@react-native-firebase/auth';

export default function Home({ navigation }) {

    const [email, setEmail] = useState(''); 
    const [displayName, setDisplayName] = useState(''); 
    const [loading, setLoading] = useState(true); 

    signOutUser = () => {
        // const out =  auth().signOut();
        if(out){
            console.log('logged out User redirect to Auth');
            navigation.navigate('Auth');

        }
    };

    useEffect( () => { 
        const unsubscribe = auth().onAuthStateChanged( (user) => {
            if (user) {
              setEmail(user.email);
              setDisplayName(user.displayName);
              setLoading(false)
            } else {
              // Signed out
              console.log('no User redirect to Auth')
              navigation.navigate('Auth');
                
            }
          });
        return () => unsubscribe();
    }, []);

    if(loading){
        return <ActivityIndicator/>;
    }

    return (
        <View style={styles.container}>
            <Text>Hi {email}!</Text>
            <Text>Hi {displayName}!</Text>

            <TouchableOpacity style={{ marginTop: 32 }} onPress={() => this.signOutUser()}>
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