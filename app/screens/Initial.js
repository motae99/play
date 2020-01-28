import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Loader from 'react-native-mask-loader';
import auth from '@react-native-firebase/auth';


// type State = {|
//   appReady: boolean,
//   rootKey: number,
// |};

export default class Initial extends Component {
  constructor() {
    super();

    this._image = require('../../images/twitter.png');
    
    this.state = {
      appReady: false,
      rootKey: Math.random(),
    };
}

//   componentDidMount() {
//     this.resetAnimation();
//   }

componentDidMount() {
  this.resetAnimation();
}

resetAnimation() {
    this.setState({
      appReady: false,
      rootKey: Math.random()
    });

    user = auth().currentUser;
    if (user) {
      // if the user has previously logged in
      this.props.navigation.navigate('App')
    } else {
      // if the user has previously signed out from the app
      this.props.navigation.navigate('Auth')
    }

    setTimeout(() => {
      this.setState({
        appReady: true,
      });
    }, 1000);
}

render() {
    return (
      <View key={this.state.rootKey} style={styles.root}>
        <Loader
          isLoaded={this.state.appReady}
          imageSource={this._image}
          backgroundStyle={styles.loadingBackgroundStyle}
        >
        </Loader>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  loadingBackgroundStyle: {
    backgroundColor: 'rgba(125, 125, 255, 1)',
  },
});

// import React, { Component } from 'react'
// import Loader from 'react-native-mask-loader';
// import { Asset } from 'expo-asset'
// import * as Font from 'expo-font'
// import * as Icon from '@expo/vector-icons'
// import { withFirebaseHOC } from '../config/Firebase'

// class Initial extends Component {
//   state = {
//     isAssetsLoadingComplete: false
//   }

//   componentDidMount = async () => {
//     try {
//       // previously
//       this.loadLocalAsync()

//       await this.props.checkUserAuth(user => {
//         if (user) {
//           // if the user has previously logged in
//           this.props.navigation.navigate('App')
//         } else {
//           // if the user has previously signed out from the app
//           this.props.navigation.navigate('Auth')
//         }
//       })
//     } catch (error) {
//       console.log(error)
//     }
//   }

//   loadLocalAsync = async () => {
//     return await Promise.all([
//       Asset.loadAsync([
//         require('../assets/flame.png'),
//         require('../assets/icon.png')
//       ]),
//       Font.loadAsync({
//         ...Icon.Ionicons.font
//       })
//     ])
//   }

//   handleLoadingError = error => {
//     // In this case, you might want to report the error to your error
//     // reporting service, for example Sentry
//     console.warn(error)
//   }

//   handleFinishLoading = () => {
//     this.setState({ isAssetsLoadingComplete: true })
//   }

//   render() {
//     return (
//       <Loader
//         startAsync={this.loadLocalAsync}
//         onFinish={this.handleFinishLoading}
//         onError={this.handleLoadingError}

//         isLoaded={this.state.appHasLoaded}
//         imageSource={require('./assets/twitter.png')}
//         backgroundStyle={styles.loadingBackgroundStyle}
//       />
//     )
//   }
// }

// export default withFirebaseHOC(Initial)

