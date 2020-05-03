import React, {memo} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {SharedElement} from 'react-navigation-shared-element';
import {useNavigation} from 'react-navigation-hooks';

// import na from '@react-navigation/'
const {width, height} = Dimensions.get('window');

const CARD_HEIGHT = height / 4;
const CARD_WIDTH = width - 20;

const styles = StyleSheet.create({
  card: {
    padding: 10,
    elevation: 2,
    backgroundColor: '#FFF',
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: {x: 2, y: -2},
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: 'hidden',
  },
  cardImage: {
    // flex: 1,
    width: '100%',
    height: '100%',
    alignSelf: 'center',
  },
  textContent: {
    // flex: 4,
    position: 'absolute',
    bottom: 30,
    paddingHorizontal: 25,
  },
  cardtitle: {
    fontSize: 20,
    marginTop: 5,
    fontWeight: 'bold',
    color: 'white',
    fontStyle: 'italic',
  },
  cardDescription: {
    fontSize: 15,
    color: 'white',
  },
});

export default memo(({data, toggleHeart}) => {
  const {navigate} = useNavigation();
  return (
    <View style={styles.card} key={data.key}>
      <SharedElement id={`item.${data.key}.photo`}>
        <FastImage
          style={styles.cardImage}
          source={{
            uri: data.files[0].uri,
            priority: FastImage.priority.normal,
            cashe: FastImage.cacheControl.immutable,
          }}
          resizeMode={FastImage.resizeMode.cover}
        />
      </SharedElement>
      <TouchableWithoutFeedback
        onPress={() => navigate('EventDetail', {data: data})}>
        <View style={styles.textContent}>
          <Text numberOfLines={1} style={styles.cardtitle}>
            {data.partyHallName}
          </Text>
          <Text numberOfLines={1} style={styles.cardDescription}>
            {data.address}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
});

// import React, {memo} from 'react';
// import {
//   StyleSheet,
//   Text,
//   View,
//   TouchableWithoutFeedback,
//   Dimensions,
//   StatusBar,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';
// import FastImage from 'react-native-fast-image';
// import {SharedElement} from 'react-navigation-shared-element';
// import {useNavigation} from 'react-navigation-hooks';

// // import na from '@react-navigation/'
// const {width, height} = Dimensions.get('window');

// const CARD_HEIGHT = 150;
// const CARD_WIDTH = 289;

// const styles = StyleSheet.create({
//   card: {
//     padding: 10,
//     elevation: 2,
//     backgroundColor: '#FFF',
//     marginHorizontal: 10,
//     shadowColor: '#000',
//     shadowRadius: 5,
//     shadowOpacity: 0.3,
//     shadowOffset: {x: 2, y: -2},
//     height: CARD_HEIGHT,
//     width: CARD_WIDTH,
//     overflow: 'hidden',
//   },
//   cardImage: {
//     width: CARD_WIDTH,
//     height: CARD_HEIGHT,
//     backgroundColor: 'red',
//     borderRadius: 5,
//     marginHorizontal: (width - CARD_WIDTH) / 2,
//   },
//   info: {
//     height: 56,
//     width: CARD_WIDTH,
//     backgroundColor: 'gray',
//     position: 'absolute',
//     bottom: 0,
//     right: 0,
//     borderBottomLeftRadius: 5,
//     borderBottomRightRadius: 5,
//   },
//   textContent: {
//     // flex: 4,
//     position: 'absolute',
//     bottom: 30,
//     paddingHorizontal: 25,
//   },
//   cardtitle: {
//     fontSize: 20,
//     marginTop: 5,
//     fontWeight: 'bold',
//     color: 'white',
//     fontStyle: 'italic',
//   },
//   cardDescription: {
//     fontSize: 15,
//     color: 'white',
//   },
// });

// const data = {
//   CateringPrice: '',
//   address:
//     '11-3-944/1, Laxmi Nagar, Vijaynagar Colony, SBH Colony, Vijaya Nagar Colony, Hyderabad, Telangana 500057, India',
//   coordinate: {latitude: 17.3940636, longitude: 78.4565447},
//   coords: {_latitude: 17.3940636, _longitude: 78.4565447},
//   day: true,
//   email: 'test@testmail.com',
//   files: [
//     {
//       height: 788,
//       mime: 'image/png',
//       uri:
//         'https://firebasestorage.googleapis.com/v0/b/kanta-ddb2c.appspot.com/o/photos%2F14QydYUAGBTszA1UqeZ5wxf16V12%2F1587594205794.png?alt=media&token=c0c4cfb8-d19c-4a37-881f-04317d79e0f0',
//       width: 1080,
//     },
//   ],
//   geohash: 'tepfcq6rc',
//   key: '14QydYUAGBTszA1UqeZ5wxf16V12',
//   ownerId: '14QydYUAGBTszA1UqeZ5wxf16V12',
//   partyHallName: 'Capital O 2523 N R Residency',
//   timestamp: 1587594224331,
//   price: '1200',
//   beforDiscount: '999',
//   rating: 4,
//   tag: 'SPOT ON',
// };

// export default memo(() => {
//   const {navigate} = useNavigation();
//   return (
//     <View>
//       <View style={{height: 370}} />
//       <View key={data.key} style={styles.cardImage}>
//         <View style={styles.info}>
//           <View
//             style={{
//               position: 'absolute',
//               left: '12.68%',
//               bottom: '80.04%',
//               flexDirection: 'row',
//             }}>
//             <View
//               style={{
//                 width: 48,
//                 height: 24,
//                 borderRadius: 3,
//                 backgroundColor: 'green',
//                 flexDirection: 'row',
//               }}>
//               <Text style={{color: 'white', fontFamily: ''}}>4.7</Text>
//               <Icon size={24} color="white" name="ios-star" />
//             </View>
//             <View
//               style={{
//                 width: 24,
//                 height: 24,
//                 borderRadius: 3,
//                 backgroundColor: 'black',
//                 marginLeft: 8,
//               }}
//             />
//           </View>
//         </View>
//       </View>
//     </View>
//   );
// });
