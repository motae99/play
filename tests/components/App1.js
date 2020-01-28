// import React, { useState, useEffect } from 'react';
// import {
//   TouchableOpacity,
//   StyleSheet,
//   ScrollView,
//   View,
//   Text,
//   FlatList,
// } from 'react-native';

// // import {  fonts } from './styles';


// import firestore from '@react-native-firebase/firestore';


// export default function App() {
//   halls = () => {
//     const [halls, setHalls] = useState([]); // Initial empty array of halls
//     const [loading, setLoading] = useState(true); // Set loading to true on component mount
   
//     // On load, fetch our party hall and subscribe to updates
//     useEffect(() => {
//       const unsubscribe = firestore()
//            .collection('partyHall')
//             .orderBy('hallRenting')
//             .get()
//         .onSnapshot((querySnapshot) => {
//           // Add a party hall into an array
//           const halls = querySnapshot.docs.map((documentSnapshot) => {
//             return {
//               ...documentSnapshot.data(),
//               key: documentSnapshot.id, // required for FlatList
//             };
//           });
   
//           // Update state with the halls array
//           setHalls(halls);
   
//           // As this can trigger multiple times, only update loading after the first update
//           if (loading) {
//             setLoading(false);
//           }
//         });
   
//         return () => unsubscribe(); // Stop listening for updates whenever the component unmounts
//     },
//      []
//     );
//   }

//   renderRowTwo = ({ item }) => (
//     <TouchableOpacity
//       key={item.id}
//       style={styles.hallContainer}
//       // onPress={() => this._openArticle(item)}
//     >
//       <View style={styles.hallContent}>
//         {/* <Image style={styles.hallImage} source={{ uri: item.image }} />
//         <View style={styles.hallOverlay} />
//         <Text style={styles.hallTitle}>{item.title}</Text>
//         <Text style={styles.hallSubTitle}>{item.subtitle}</Text> */}
//         <Text style={styles.hallPrice}>{item.hallRenting}</Text>
//       </View>
//     </TouchableOpacity>
//   );
    

    
//       // if (loading) {
//       //   return null; // Show a loading spinner
//       // }
//         return (
//         <View style={styles.container}>
//           <FlatList
//             data={halls}
//             keyExtractor={item => item.id}
//             style={{ backgroundColor: 'white', paddingHorizontal: 15 }}
//             renderItem={this.renderRowTwo()}
//           />
//         </View>
//         );
      
      
    
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'white',
//   },
//   hallContainer: {
//     paddingBottom: 10,
//     backgroundColor: 'white',
//     marginVertical: 5,
//   },
//   hallContent: {
//     padding: 20,
//     position: 'relative',
//     marginHorizontal: Platform.OS === 'ios' ? -15 : 0,
//     height: 150,
//   },
//   hallTitle: {
//     color: 'white',
//     fontFamily: 'Lato-Bold',
//     fontSize: 20,
//   },
//   hallSubTitle: {
//     color: 'white',
//     fontFamily: 'Lato-Regular',
//     fontSize: 15,
//     marginVertical: 5,
//   },
//   hallPrice: {
//     color: 'white',
//     fontFamily: 'Lato-Bold',
//     fontSize: 20,
//   },
//   hallImage: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//   },
//   hallOverlay: {
//     position: 'absolute',
//     left: 0,
//     right: 0,
//     top: 0,
//     bottom: 0,
//     backgroundColor: '#6271da',
//     opacity: 0.5,
//   },
// });


import React, { useState, useEffect } from 'react';
import { 
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  FlatList,
  Image
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
 
// import Slideshow from './Slideshow';
export default function Users() {
  const [users, setUsers] = useState([]); // Initial empty array of users
  const [loading, setLoading] = useState(true); // Set loading to true on component mount
 
  // On load, fetch our users and subscribe to updates
  useEffect(() => {
    const unsubscribe = firestore()
      .collection('partyHalls')
      .onSnapshot((querySnapshot) => {
        // Add users into an array
        const users = querySnapshot.docs.map((documentSnapshot) => {
        //  console.log(documentSnapshot);
          return {
            ...documentSnapshot.data(),
            key: documentSnapshot.id, // required for FlatList
          };
        });
 
        // Update state with the users array
        setUsers(users);
 
        // As this can trigger multiple times, only update loading after the first update
        if (loading) {
          setLoading(false);
        }
      });
 
      return () => unsubscribe(); // Stop listening for updates whenever the component unmounts
  }, []);
 
  if (loading) {
    return null; // Show a loading spinner
  }
 
  return (
    <FlatList
      data={users}
      renderItem={  ({item}) => 
          <TouchableOpacity
            key={item.id}
            style={styles.hallContainer}
            // onPress={() => this._openArticle(item)}
          >
            <View style={styles.hallContent}>
              <Image style={styles.hallImage} resizeMode='fill' source={{ uri: item.images[0]}} />
              <View style={styles.hallOverlay} />
              <Text style={styles.hallTitle}>{item.contact}</Text>
              <Text style={styles.hallSubTitle}>{item.address}</Text> 
              <Text style={styles.hallPrice}>{item.hallRenting}</Text>
            </View>
          </TouchableOpacity>
      
      }
    />
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  hallContainer: {
    paddingBottom: 10,
    backgroundColor: 'white',
    marginVertical: 5,
  },
  hallContent: {
    padding: 20,
    position: 'relative',
    marginHorizontal: Platform.OS === 'ios' ? -15 : 0,
    height: 150,
  },
  hallTitle: {
    color: 'white',
    fontFamily: 'Lato-Bold',
    fontSize: 20,
  },
  hallSubTitle: {
    color: 'white',
    fontFamily: 'Lato-Regular',
    fontSize: 15,
    marginVertical: 5,
  },
  hallPrice: {
    color: 'white',
    fontFamily: 'Lato-Bold',
    fontSize: 20,
  },
  hallImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  hallOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: '#6271da',
    opacity: 0.5,
  },
});