import React, { Component } from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from "react-navigation-stack";

import OfferLanding from './OfferLanding';
import OfferMore from './OfferMore';
import OfferDetail from './OfferDetail';


const Navigator = createStackNavigator({
    OfferLanding: { screen: OfferLanding },
    OfferMore: { screen: OfferMore },
    OfferDetail: { screen: OfferDetail },
},


  {
    initialRouteName: 'OfferLanding',
    headerMode: 'none'
  }
);

const OfferStack = createAppContainer(Navigator)

export default class User extends Component {
  render() {
    return <OfferStack />;
  }
} 
