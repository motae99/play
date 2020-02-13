import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import auth from '@react-native-firebase/auth';



export default class Initial extends Component {
  constructor() {
    super();
}



componentDidMount = async () => 
{ 

   const user = auth().currentUser;
    if (user) {
      console.log('we have user', user)
      console.log('has phone', user.phoneNumber)

      if(!user.phoneNumber){
        // navigate to phone auth screen
        // this.props.navigation.navigate('Phone')
        console.log('no phone no')
        this.props.navigation.navigate('Phone')

      }
      if(user.phoneNumber){
      // this.props.navigation.navigate('App')
      console.log('good to go')
      this.props.navigation.navigate('App')
      }

        
    } else {
      console.log('No logged in User navigate to Auth')

      // if the user has previously signed out from the app
      this.props.navigation.navigate('Auth')
    }

}



   

render() {
    return (
      <View style={styles.container}>
        <Text>lottie file here</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

});

// // import React, { Component } from 'react'
// // import Loader from 'react-native-mask-loader';
// // import { Asset } from 'expo-asset'
// // import * as Font from 'expo-font'
// // import * as Icon from '@expo/vector-icons'
// // import { withFirebaseHOC } from '../config/Firebase'

// // class Initial extends Component {
// //   state = {
// //     isAssetsLoadingComplete: false
// //   }

// //   componentDidMount = async () => {
// //     try {
// //       // previously
// //       this.loadLocalAsync()

// //       await this.props.checkUserAuth(user => {
// //         if (user) {
// //           // if the user has previously logged in
// //           this.props.navigation.navigate('App')
// //         } else {
// //           // if the user has previously signed out from the app
// //           this.props.navigation.navigate('Auth')
// //         }
// //       })
// //     } catch (error) {
// //       console.log(error)
// //     }
// //   }

// //   loadLocalAsync = async () => {
// //     return await Promise.all([
// //       Asset.loadAsync([
// //         require('../assets/flame.png'),
// //         require('../assets/icon.png')
// //       ]),
// //       Font.loadAsync({
// //         ...Icon.Ionicons.font
// //       })
// //     ])
// //   }

// //   handleLoadingError = error => {
// //     // In this case, you might want to report the error to your error
// //     // reporting service, for example Sentry
// //     console.warn(error)
// //   }

// //   handleFinishLoading = () => {
// //     this.setState({ isAssetsLoadingComplete: true })
// //   }

// //   render() {
// //     return (
// //       <Loader
// //         startAsync={this.loadLocalAsync}
// //         onFinish={this.handleFinishLoading}
// //         onError={this.handleLoadingError}

// //         isLoaded={this.state.appHasLoaded}
// //         imageSource={require('./assets/twitter.png')}
// //         backgroundStyle={styles.loadingBackgroundStyle}
// //       />
// //     )
// //   }
// // }

// // export default withFirebaseHOC(Initial)

