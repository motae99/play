import React, { Component } from 'react';
import AppContainer from './app/navigations'
import LoginController from './LoginController'
import ListingStack from './app/listing/Index'
// import Firebase, { FirebaseProvider } from './config/Firebase'

export default class App extends Component {
  render() {
  return (
    // <FirebaseProvider value={Firebase}>
      <ListingStack />
    // </FirebaseProvider>
  )
}
}
