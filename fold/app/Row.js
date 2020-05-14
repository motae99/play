import React, {
    Component,
  } from 'react';
  
  import {
    LayoutAnimation,
    UIManager,
    View,
  } from 'react-native';
  
  import FoldView from '../index';
  
  import InfoCard from './components/InfoCard';
  import PhotoCard from './components/PhotoCard';
  import ProfileCard from './components/ProfileCard';
  
  // Enable LayoutAnimation on Android
  if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }
  
  const ROW_HEIGHT = 180;
  
  const Spacer = ({ height }) => (
    <View
      pointerEvents="none"
      style={{
        height,
      }}
    />
  );
  
  export default class Row extends Component {
  
    constructor(props) {
      super(props);
  
      this.state = {
        expanded: false,
        height: ROW_HEIGHT,
      };
    }
  
    UNSAFE_componentWillMount() {
      this.flip = this.flip.bind(this);
      this.handleAnimationStart = this.handleAnimationStart.bind(this);
      this.renderFrontface = this.renderFrontface.bind(this);
      this.renderBackface = this.renderBackface.bind(this);
    }
  
    flip() {
      this.setState({
        expanded: !this.state.expanded,
      });
    }
  
    handleAnimationStart(duration, height) {
      const isExpanding = this.state.expanded;
  
      const animationConfig = {
        duration,
        update: {
          type: isExpanding ? LayoutAnimation.Types.easeOut : LayoutAnimation.Types.easeIn,
          property: LayoutAnimation.Properties.height,
        },
      };
  
      LayoutAnimation.configureNext(animationConfig);
  
      this.setState({
        height,
      });
    }
  
    renderFrontface() {
      return (
        <InfoCard onPress={this.flip} />
      );
    }
  
    renderBackface() {
      return (
        <ProfileCard onPress={this.flip} />
      );
    }
  
    render() {
      const { height } = this.state;
      const { zIndex } = this.props;
  
      const spacerHeight = height - ROW_HEIGHT;
  
      return (
        <View
          style={{
            flex: 1,
            zIndex,
            marginTop: 5
          }}
        >
          <View
            style={{
              height: ROW_HEIGHT,
              margin: 10,
            }}
          >
            <FoldView
              expanded={this.state.expanded}
              onAnimationStart={this.handleAnimationStart}
              perspective={800}
              renderBackface={this.renderBackface}
              renderFrontface={this.renderFrontface}
            >
              <PhotoCard onPress={this.flip} />
            </FoldView>
  
          </View>
  
          <Spacer height={spacerHeight} />
        </View>
      );
    }
  }
  
// import React, { useState, useRef } from 'react';
// import { Text, View, StyleSheet, Button, StatusBar } from 'react-native';
// import { Transitioning, Transition } from 'react-native-reanimated';

// function shuffleArray(array) {
//   for (let i = array.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1));
//     [array[i], array[j]] = [array[j], array[i]];
//   }
// }

// const Hour = ({ hour, min, pm }) => (
//   <View
//     style={{
//       flexDirection: 'row',
//       alignItems: 'flex-end',
//     }}>
//     <Text style={{ fontSize: 40, textAlignVertical: 'center', color: 'black' }}>
//       {hour}:{min}
//     </Text>
//     <Text style={{ color: 'gray', marginBottom: 7, marginLeft: 4 }}>
//       {pm ? 'PM' : 'AM'}
//     </Text>
//   </View>
// );

// const Location = ({ label, name, delay }) => (
//   <>
//     <Text style={{ color: 'gray' }}>{label}</Text>
//     <Text style={{ fontSize: 26, color: 'black' }}>{name}</Text>
//   </>
// );

// const Spacer = ({ height }) => <View style={{ flex: 1, maxHeight: height }} />;

// const Tix = () => (
//   <View style={{ marginHorizontal: 20, flexGrow: 1 }}>
//     <Spacer height={20} />
//     <View
//       style={{
//         flexDirection: 'row',
//         alignItems: 'flex-end',
//         justifyContent: 'space-between',
//       }}>
//       <Hour hour="11" min="45" am />
//       <Text style={{ fontSize: 40, color: 'black' }}>✈</Text>
//       <Hour hour="1" min="55" pm />
//     </View>
//     <Spacer height={20} />
//     <Location label="From" name="Kraków (KRK)" delay={40} />
//     <Spacer height={20} />
//     <Location label="To" name="Amsterdam (AMS)" delay={80} />
//     <Spacer height={20} />
//     <Text style={{ color: 'gray' }}>Notes</Text>
//     <Text style={{ lineHeight: 20, color: 'black' }}>
//       Crashtest Airlanes · Economy · Embraer RJ-175 {'\n'}
//       CRA 2199 {'\n'}
//       Plane and crew by Bold & Brave ltd.
//     </Text>
//     <View style={{ flex: 2 }} />
//   </View>
// );

// function Ticket() {
//   let [refreshed, setRefreshed] = useState(1);
//   const ref = useRef();

//   const transition = (
//     <Transition.Sequence>
//       <Transition.Out type="fade" durationMs={400} interpolation="easeIn" />
//       <Transition.Change />
//       <Transition.Together>
//         <Transition.In
//           type="slide-bottom"
//           durationMs={400}
//           interpolation="easeOut"
//           propagation="bottom"
//         />
//         <Transition.In type="fade" durationMs={200} delayMs={200} />
//       </Transition.Together>
//     </Transition.Sequence>
//   );
//   return (
//     <View style={{ flex: 1 }}>
//       <Button
//         title="refresh"
//         color="#FF5252"
//         onPress={() => {
//           ref.current.animateNextTransition();
//           setRefreshed(refreshed + 1);
//         }}
//       />
//       <Transitioning.View
//         ref={ref}
//         transition={transition}
//         style={{
//           flexGrow: 1,
//           justifyContent: 'center',
//         }}>
//         <Tix key={refreshed} />
//       </Transitioning.View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({});

// export default Ticket;
// 

// import React, { Component } from 'react';
// import {
//   AppRegistry,
//   StyleSheet,
//   Text,
//   View,
//   TouchableOpacity,
//   Animated
// } from 'react-native';

// export default class animatedbasic extends Component {
//   componentWillMount() {
//     this.animatedValue = new Animated.Value(0);
//     this.value = 0;
//     this.animatedValue.addListener(({ value }) => {
//       this.value = value;
//     })
//     this.frontInterpolate = this.animatedValue.interpolate({
//       inputRange: [0, 180],
//       outputRange: ['0deg', '180deg'],
//     })
//     this.backInterpolate = this.animatedValue.interpolate({
//       inputRange: [0, 180],
//       outputRange: ['180deg', '360deg']
//     })
//     this.frontOpacity = this.animatedValue.interpolate({
//       inputRange: [89, 90],
//       outputRange: [1, 0]
//     })
//     this.backOpacity = this.animatedValue.interpolate({
//       inputRange: [89, 90],
//       outputRange: [0, 1]
//     })
//   }

//   flipCard() {
//     if (this.value >= 90) {
//       Animated.spring(this.animatedValue,{
//         toValue: 0,
//         friction: 8,
//         tension: 10
//       }).start();
//     } else {
//       Animated.spring(this.animatedValue,{
//         toValue: 180,
//         friction: 8,
//         tension: 10
//       }).start();
//     }

//   }

//   render() {
//     const frontAnimatedStyle = {
//       transform: [
//         { rotateX: this.frontInterpolate }
//       ]
//     }
//     const backAnimatedStyle = {
//       transform: [
//         { rotateX: this.backInterpolate }
//       ]
//     }

//     return (
//       <View style={styles.container}>
//         <View>

//           <Animated.View style={[styles.flipCard, frontAnimatedStyle, {opacity: this.frontOpacity}]}>
//             <Text style={styles.flipText}>
//               This text is flipping on the front.
//             </Text>
//           </Animated.View>

//           <Animated.View style={[styles.flipCardOnBack, styles.flipCardBack, backAnimatedStyle, {opacity: this.backOpacity}]}>
//             <Text style={styles.flipText}>
//               This text is flipping on the back.
//             </Text>
//             <Text style={styles.flipText}>
//               This text is flipping on the back.
//             </Text>
//             <Text style={styles.flipText}>
//               This text is flipping on the back.
//             </Text>
//             <Text style={styles.flipText}>
//               This text is flipping on the back.
//             </Text>
//           </Animated.View>
//         </View>
//         <TouchableOpacity onPress={() => this.flipCard()}>
//           <Text>Flip!</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   flipCard: {
//     width: 200,
//     height: 200,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: 'blue',
//     backfaceVisibility: 'hidden',
//   },
//   flipCardOnBack: {
//     width: 200,
//     height: 600,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: 'blue',
//     backfaceVisibility: 'hidden',
//   },
//   flipCardBack: {
//     backgroundColor: "red",
//     position: "absolute",
//     top: 0,
//   },
//   flipText: {
//     width: 90,
//     fontSize: 20,
//     color: 'white',
//     fontWeight: 'bold',
//   }
// });

