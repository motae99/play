// import React from 'react'
// import {
//   Image,
//   StyleSheet,
//   Text,
//   TouchableWithoutFeedback,
//   View,
// } from 'react-native'
// import BottomSheet from 'reanimated-bottom-sheet'

// export default class Sorting extends React.Component {
//   renderInner = () => (
//     <View style={styles.panel}>
//       <Text style={styles.panelTitle}>San Francisco Airport</Text>
//       <Text style={styles.panelSubtitle}>
//         International Airport - 40 miles away
//       </Text>
//       <View style={styles.panelButton}>
//         <Text style={styles.panelButtonTitle}>Directions</Text>
//       </View>
//       <View style={styles.panelButton}>
//         <Text style={styles.panelButtonTitle}>Search Nearby</Text>
//       </View>
//       <Image
//         style={styles.photo}
//         source={require('../../../../images/nona5.png')}
//       />
//     </View>
//   )

//   renderHeader = () => (
//     <View style={styles.header}>
//       <View style={styles.panelHeader}>
//         <View style={styles.panelHandle} />
//       </View>
//     </View>
//   )

//   bs = React.createRef()

//   render() {
//     return (
//       <View style={styles.container}>
//         <BottomSheet
//           style={{zIndex: 10}}
//           ref={this.bs}
//           snapPoints={[100, 250, 500]}
//           renderContent={this.renderInner}
//           renderHeader={this.renderHeader}
//           initialSnap={0}
//         />
//       </View>
//     )
//   }
// }

// const IMAGE_SIZE = 200

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F5FCFF',
//   },
//   box: {
//     width: IMAGE_SIZE,
//     height: IMAGE_SIZE,
//   },
//   panelContainer: {
//     position: 'absolute',
//     top: 0,
//     bottom: 0,
//     left: 0,
//     right: 0,
//   },
//   panel: {
//     height: 600,
//     padding: 20,
//     backgroundColor: '#f7f5eee8',
//   },
//   header: {
//     backgroundColor: 'transparent',
//     shadowColor: '#000000',
//     paddingTop: 20,
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//   },
//   panelHeader: {
//     alignItems: 'center',
//   },
//   panelHandle: {
//     width: 40,
//     height: 8,
//     borderRadius: 4,
//     backgroundColor: '#00000040',
//     marginBottom: 10,
//   },
//   panelTitle: {
//     fontSize: 27,
//     height: 35,
//   },
//   panelSubtitle: {
//     fontSize: 14,
//     color: 'gray',
//     height: 30,
//     marginBottom: 10,
//   },
//   panelButton: {
//     padding: 20,
//     borderRadius: 10,
//     backgroundColor: '#318bfb',
//     alignItems: 'center',
//     marginVertical: 10,
//   },
//   panelButtonTitle: {
//     fontSize: 17,
//     fontWeight: 'bold',
//     color: 'white',
//   },
//   photo: {
//     width: '100%',
//     height: 225,
//     marginTop: 30,
//   },
//   map: {
//     height: '100%',
//     width: '100%',
//   },
// })

import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import BottomSheet from "reanimated-bottom-sheet";
import Animated from "react-native-reanimated";

const Lorem = () => (
 <View style={styles.panel}>
 <Text style={styles.panelTitle}>San Francisco Airport</Text>
 <Text style={styles.panelSubtitle}>
   International Airport - 40 miles away
 </Text>
 <View style={styles.panelButton}>
   <Text style={styles.panelButtonTitle}>Directions</Text>
 </View>
 <View style={styles.panelButton}>
   <Text style={styles.panelButtonTitle}>Search Nearby</Text>
 </View>
 <Image
   style={styles.photo}
   source={require('../../../../images/nona5.png')}
 />
</View>
);
export default class Example extends React.Component {
  trans = new Animated.Value(0);
  renderHeader = () => (
    <View >
      <View style={styles.header}>
        <View style={styles.panelHeader}>
          <View style={styles.panelHandle} />
        </View>
      </View>
      <Lorem />
    </View>
  );

  renderInner = () => (
    <View >
      <Animated.View
        style={{
          zIndex: 10,
          transform: [
            {
              translateY: this.trans.interpolate({
                inputRange: [0, 500, 510],
                outputRange: [0, 500, 500]
              })
            }
          ]
        }}
      >
        {this.renderHeader()}
      </Animated.View>
    </View>
  );

  render() {
    return (
      // <View style={{flex: 1}}>
      <BottomSheet
        contentPosition={this.trans}
        snapPoints={[30, 400]}
        renderContent={this.renderInner}
        enderHeader={this.renderHeader}
        // renderContent={this.renderInner}
      />
       // </View>
    );
  }
}

const IMAGE_SIZE = 200;

const styles = StyleSheet.create({
 panelContainer: {
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
},
panel: {
  height: 600,
  padding: 20,
  backgroundColor: '#f7f5eee8',
},
header: {
  backgroundColor: 'white',//'transparent',
  shadowColor: '#000000',
  paddingTop: 20,
  borderTopLeftRadius: 20,
  borderTopRightRadius: 20,
},
panelHeader: {
  alignItems: 'center',
},
panelHandle: {
  width: 40,
  height: 8,
  borderRadius: 4,
  backgroundColor: '#00000040',
  marginBottom: 10,
},
panelTitle: {
  fontSize: 27,
  height: 35,
},
panelSubtitle: {
  fontSize: 14,
  color: 'gray',
  height: 30,
  marginBottom: 10,
},
panelButton: {
  padding: 20,
  borderRadius: 10,
  backgroundColor: '#318bfb',
  alignItems: 'center',
  marginVertical: 10,
},
panelButtonTitle: {
  fontSize: 17,
  fontWeight: 'bold',
  color: 'white',
},
photo: {
  width: '100%',
  height: 225,
  marginTop: 30,
},
});
