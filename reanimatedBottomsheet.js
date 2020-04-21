import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import BottomSheet from 'reanimated-bottom-sheet'
import Animated from 'react-native-reanimated'

const Lorem = () => (
  <View style={{ height: 500, backgroundColor: 'green' }}>
    <Text>
      At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis
      praesentium voluptatum deleniti atque corrupti quos dolores et quas
      molestias excepturi sint occaecati cupiditate non provident, similique
      sunt in culpa qui officia deserunt mollitia animi, id est laborum et
      dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.
      Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil
      impedit quo minus id quod maxime placeat facere possimus, omnis voluptas
      assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut
      officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates
      repudiandae sint et molestiae non recusandae. Itaque earum rerum hic
      tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias
      consequatur aut perferendis doloribus asperiores repellat. At vero eos et
      accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium
      voluptatum deleniti atque corrupti quos dolores et quas molestias
      excepturi sint occaecati cupiditate non provident, similique sunt in culpa
      qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et
      harum quidem rerum facilis est et expedita distinctio. Nam libero tempore,
      cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod
      maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor
      repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum
      necessitatibus saepe eveniet ut et voluptates repudiandae sint et
      molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente
      delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut
      perferendis doloribus asperiores repellat.
    </Text>
  </View>
)
export default class Example extends React.Component {
  trans = new Animated.Value(0)
  renderHeader = name => (
    <View
      style={{
        width: '100%',
        backgroundColor: 'blue',
        height: 40,
        borderWidth: 2,
      }}
    >
      <Text>{name}</Text>
    </View>
  )

  renderInner = () => (
    <View>
      <Animated.View
        style={{
          zIndex: 1,
          transform: [
            {
              translateY: this.trans.interpolate({
                inputRange: [0, 500, 510],
                outputRange: [0, 500, 500],
              }),
            },
          ],
        }}
      >
        {this.renderHeader('one')}
      </Animated.View>
      <Lorem />

      {/* <Animated.View
        style={{
          zIndex: 1,
          transform: [
            {
              translateY: this.trans.interpolate({
                inputRange: [0, 540, 1040, 1050],
                outputRange: [0, 0, 500, 500],
              }),
            },
          ],
        }}
      >
        {this.renderHeader('XXX')}
      </Animated.View>
      <Lorem />
      <Animated.View
        style={{
          zIndex: 1,
          transform: [
            {
              translateY: this.trans.interpolate({
                inputRange: [0, 1080, 1580, 1590],
                outputRange: [0, 0, 500, 500],
              }),
            },
          ],
        }}
      >
        {this.renderHeader('two')}
      </Animated.View>
      <Lorem />
      <Animated.View
        style={{
          zIndex: 1,
          transform: [
            {
              translateY: this.trans.interpolate({
                inputRange: [0, 1620, 2120, 2130],
                outputRange: [0, 0, 500, 500],
              }),
            },
          ],
        }}
      >
        {this.renderHeader('three')}
      </Animated.View>
      <Lorem />
      <Animated.View
        style={{
          zIndex: 1,
          transform: [
            {
              translateY: this.trans.interpolate({
                inputRange: [0, 2160, 2660, 2670],
                outputRange: [0, 0, 500, 500],
              }),
            },
          ],
        }}
      >
        {this.renderHeader('mmm')}
      </Animated.View>
      <Lorem /> */}
    </View>
  )

  render() {
    return (
      <View style={styles.container}>
        <BottomSheet
          contentPosition={this.trans}
          snapPoints={[50, 400]}
          renderContent={this.renderInner}
        />
      </View>
    )
  }
}

const IMAGE_SIZE = 200

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
  },
  box: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
  },
})

// import React from 'react'
// import { StyleSheet, Text, View } from 'react-native'
// import BottomSheet from 'reanimated-bottom-sheet'
// import Animated from 'react-native-reanimated'

// const { block, set, greaterThan, lessThan, Value, cond, sub } = Animated

// const Lorem = () => (
//   <View style={{ backgroundColor: 'green' }}>
//     <Text>
//       At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis
//       praesentium voluptatum deleniti atque corrupti quos dolores et quas
//       molestias excepturi sint occaecati cupiditate non provident, similique
//       sunt in culpa qui officia deserunt mollitia animi, id est laborum et
//       dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.
//       Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil
//       impedit quo minus id quod maxime placeat facere possimus, omnis voluptas
//       assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut
//       officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates
//       repudiandae sint et molestiae non recusandae. Itaque earum rerum hic
//       tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias
//       consequatur aut perferendis doloribus asperiores repellat. At vero eos et
//       accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium
//       voluptatum deleniti atque corrupti quos dolores et quas molestias
//       excepturi sint occaecati cupiditate non provident, similique sunt in culpa
//       qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et
//       harum quidem rerum facilis est et expedita distinctio. Nam libero tempore,
//       cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod
//       maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor
//       repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum
//       necessitatibus saepe eveniet ut et voluptates repudiandae sint et
//       molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente
//       delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut
//       perferendis doloribus asperiores repellat.
//     </Text>
//   </View>
// )
// export default class Example extends React.Component {
//   trans = new Value(0)
//   untraversedPos = new Value(0)
//   prevTrans = new Value(0)
//   headerPos = block([
//     cond(
//       lessThan(this.untraversedPos, sub(this.trans, 100)),
//       set(this.untraversedPos, sub(this.trans, 100))
//     ),
//     cond(
//       greaterThan(this.untraversedPos, this.trans),
//       set(this.untraversedPos, this.trans)
//     ),
//     set(this.prevTrans, this.trans),
//     this.untraversedPos,
//   ])

//   renderHeader = name => (
//     <View
//       style={{
//         width: '100%',
//         backgroundColor: 'blue',
//         height: 100,
//         borderWidth: 2,
//       }}
//     >
//       <Text>{name}</Text>
//     </View>
//   )

//   renderInner = () => (
//     <View>
//       <Animated.View
//         style={{
//           zIndex: 1,
//           transform: [
//             {
//               translateY: this.headerPos,
//             },
//           ],
//         }}
//       >
//         {this.renderHeader('one')}
//       </Animated.View>
//       <Lorem />
//       <Lorem />
//     </View>
//   )

//   render() {
//     return (
//       <View style={styles.container}>
//         <BottomSheet
//           contentPosition={this.trans}
//           snapPoints={[100, 400]}
//           renderContent={this.renderInner}
//         />
//       </View>
//     )
//   }
// }

// const IMAGE_SIZE = 200

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'red',
//   },
//   box: {
//     width: IMAGE_SIZE,
//     height: IMAGE_SIZE,
//   },
// })
// import React from 'react'
// import {
//   Image,
//   StyleSheet,
//   Text,
//   TouchableWithoutFeedback,
//   View,
// } from 'react-native'
// import BottomSheet from 'reanimated-bottom-sheet'

// export default class Example extends React.Component {
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
//           ref={this.bs}
//           snapPoints={[250, 500, 0]}
//           renderContent={this.renderInner}
//           renderHeader={this.renderHeader}
//           initialSnap={1}
//         />
//         <TouchableWithoutFeedback onPress={() => this.bs.current.snapTo(0)}>
//           <Image style={styles.map} source={require('../../../../images/nona1.png')} />
//         </TouchableWithoutFeedback>
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
//     backgroundColor: '#f7f5eee8',
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
