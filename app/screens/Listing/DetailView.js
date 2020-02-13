import React, { useState, useEffect, useContext }from 'react';
import {
  Text,
  View,
  Image,
  Animated,
  FlatList,
  TextInput,
  StatusBar,
  ScrollView,
  StyleSheet,
  Dimensions,
  ToolbarAndroid,
  TouchableOpacity,
} from 'react-native';

import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/Ionicons'
import firestore from '@react-native-firebase/firestore';
import { NavigationContext } from 'react-navigation';



import Services from './Services'

export default function DetailView() {
    const { width, height } = Dimensions.get('window')
    const navigation = useContext(NavigationContext);
    console.log('Im logging')
    const dataSource = navigation.props.state.params.data;
    const [ services, setServices] = useState([]); 
    const [serviceLoading, setServiceLoading] = useState(true);

      useEffect(() => {
        const unsubscribe = firestore()
            .collection('partyHalls')
            .doc('9Cg4qvaHKvaWNolba8F9XrU3Wxx1')
            .collection('services')
            .onSnapshot((querySnapshot) => {
            const serverData = querySnapshot.docs.map((documentSnapshot) => {
              // console.log("=========================");
              // console.log(documentSnapshot.data());
              // console.log("==========================");
                return {
                ...documentSnapshot.data(),
                key: documentSnapshot.id, // required for FlatList
                };
            });

            // Update state with the users array
            setServices(serverData);
            // console.log(serverData)

            // As this can trigger multiple times, only update loading after the first update
            if (serviceLoading) {
                setServiceLoading(false);
            }
            });
    
            return () => unsubscribe(); // Stop listening for updates whenever the component unmounts
      }, []);

      

    return (        
            <View style={{height: 900}}>
            { serviceLoading ? <Text> loading Services</Text> :  <Services data={services}/> }
            </View>
    );
  }

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

});


// // import React, { Component } from 'react';
// // import {
// //   Animated,
// //   Dimensions,
// //   Platform,
// //   ScrollView,
// //   StyleSheet,
// //   Text,
// //   View,
// //   ToolbarAndroid
// // } from 'react-native';
// // // import str from './content';

// // const HEADER_EXPANDED_HEIGHT = 300;
// // const HEADER_COLLAPSED_HEIGHT = 60;

// // const { width: SCREEN_WIDTH } = Dimensions.get("screen")

// // export default class App extends Component {
// //   constructor() {
// //     super();

// //     this.state = {
// //       scrollY: new Animated.Value(0)
// //     }
// //   }

// //   render() {
// //     const headerHeight = this.state.scrollY.interpolate({
// //       inputRange: [0, HEADER_EXPANDED_HEIGHT-HEADER_COLLAPSED_HEIGHT],
// //       outputRange: [HEADER_EXPANDED_HEIGHT, HEADER_COLLAPSED_HEIGHT],
// //       extrapolate: 'clamp'
// //     });
// //     const headerTitleOpacity = this.state.scrollY.interpolate({
// //       inputRange: [0, HEADER_EXPANDED_HEIGHT-HEADER_COLLAPSED_HEIGHT],
// //       outputRange: [0, 1],
// //       extrapolate: 'clamp'
// //     });
// //     const heroTitleOpacity = this.state.scrollY.interpolate({
// //       inputRange: [0, HEADER_EXPANDED_HEIGHT-HEADER_COLLAPSED_HEIGHT],
// //       outputRange: [1, 0],
// //       extrapolate: 'clamp'
// //     });

// //     const headerTitle = 'HEADER'

// //     return (
// //       <View style={styles.container}>
// //         <ToolbarAndroid
// //             style={styles.toolbar}
// //             title="Movies"
// //             // navIcon={require("../../ic_launcher.png")}
// //             // onActionSelected={this.onActionSelected}
// //             titleColor= "000"
// //             actions = {[
// //               {title: "Log out", show: "never"}
// //             ]}
// //             />
// //         <Animated.View style={[styles.header, { height: headerHeight }]}>
// //           <Animated.Text style={{textAlign: 'center', fontSize: 18, color: 'black', marginTop: 28, opacity: headerTitleOpacity}}>{headerTitle}</Animated.Text>
// //           <Animated.Text style={{textAlign: 'center', fontSize: 32, color: 'black', position: 'absolute', bottom: 16, left: 16, opacity: heroTitleOpacity}}>{headerTitle}</Animated.Text>
// //         </Animated.View>
// //         <ScrollView
// //           contentContainerStyle={styles.scrollContainer}
// //           onScroll={Animated.event(
// //             [{ nativeEvent: {
// //                 contentOffset: {
// //                   y: this.state.scrollY
// //                 }
// //               }
// //             }])
// //           }
// //           scrollEventThrottle={16}>
// //           <Text style={styles.title}>This is Title</Text>
// //           <Text style={styles.content}>kLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel ultrices ante. Duis vulputate lorem non tortor pharetra, aliquet aliquet leo efficitur. Ut sed rutrum nisi. Pellentesque facilisis erat sit amet mi ornare, et dapibus tortor congue. Integer vulputate magna a vehicula accumsan. Cras nec nunc consequat, volutpat felis vitae, pulvinar nibh. Vestibulum lacinia in tortor vel maximus. Suspendisse semper dolor ligula. Praesent pellentesque suscipit enim, at dictum nisl pellentesque non. Phasellus nec consectetur magna. Interdum et malesuada fames ac ante ipsum primis in faucibus. Sed condimentum porttitor elit ut dignissim. Nunc nec libero a orci porttitor accumsan eget sed diam. Cras dignissim, nulla sed laoreet accumsan, mi quam egestas mauris, id posuere purus lorem sagittis purus. Duis sollicitudin neque ac aliquet sollicitudin.
// // In eros est, sollicitudin sit amet risus eget, porttitor pulvinar ipsum. Nulla eget quam arcu. Mauris vel odio cursus, hendrerit augue et, ultricies massa. Phasellus pharetra et libero id semper. Sed sollicitudin commodo mi, nec efficitur sem congue vitae. Ut pellentesque augue ut lacus finibus sollicitudin. Donec a auctor augue. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nullam vitae convallis nulla. Maecenas venenatis lorem at mi commodo pharetra. Mauris finibus hendrerit magna, sit amet ultrices turpis aliquet nec. Proin et diam suscipit, sollicitudin risus ac, porta nibh.
// // Aliquam pretium, elit maximus vehicula lobortis, neque dolor tempor nisl, sit amet interdum erat turpis eu metus. Sed semper libero ac diam finibus, ac interdum orci placerat. Donec nec erat ac erat rhoncus blandit. Nunc felis dui, semper eu porttitor in, porttitor vitae eros. In vel mattis est, vel molestie dui. Nulla semper nisl tempor scelerisque egestas. Duis faucibus, elit id accumsan aliquet, turpis felis scelerisque felis, quis tincidunt felis massa nec eros. Vivamus pellentesque congue velit finibus porttitor. Pellentesque eu mi lacinia sapien fermentum tincidunt sit amet eu nisl. Suspendisse pharetra ex in magna molestie venenatis.
// // Suspendisse non gravida tortor. Donec tristique ipsum eget arcu aliquet molestie. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nam cursus purus eget accumsan maximus. Duis eu iaculis arcu. Donec iaculis, sem vel condimentum maximus, lectus nisl pellentesque dolor, non ullamcorper sapien lectus sed enim. Aenean et leo nisi. Nulla viverra magna id luctus fermentum. Donec et mauris placerat, mollis elit lacinia, cursus lacus. Donec aliquet libero arcu, non consectetur elit maximus sit amet. Quisque lacinia, libero et fermentum rutrum, lorem arcu tincidunt ante, sed iaculis velit tortor non lacus.
// // Sed accumsan lectus laoreet mollis cursus. Phasellus sagittis vulputate erat, non tempus dui pellentesque vel. Fusce imperdiet nulla vitae mauris facilisis bibendum. Fusce vestibulum fringilla orci, sit amet euismod nunc eleifend id. Curabitur mattis dolor at odio maximus lacinia. Vivamus ornare lorem sed augue faucibus, vel volutpat lacus elementum. Suspendisse potenti.sdfjlkasjf aklsdfjlkasjf asdklfjalskfdjfkals fklasjflskldfjakls; fdlkasjdfklasjfdlksajf sdfkjasklfdjklsfjdklasjf safkajsfdlkjaslkfjslkafjlksjdfklsajf askjflksajf safjklsajfdlksajfdlksjdf lkasjdflkasfjlksa dfjklsdjflkasfjklasfjd </Text>
// //         </ScrollView>
// //       </View>
// //     );
// //   }
// // }

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: '#eaeaea',
// //   },
// //   scrollContainer: {
// //     padding: 16,
// //     paddingTop: HEADER_EXPANDED_HEIGHT
// //   },
// //   header: {
// //     backgroundColor: 'lightblue',
// //     position: 'absolute',
// //     width: SCREEN_WIDTH,
// //     top: 0,
// //     left: 0,
// //     zIndex: 9999
// //   },
// //   title: {
// //     marginVertical: 16,
// //     color: "black",
// //     fontWeight: "bold",
// //     fontSize: 24
// //   }
// // });

