import React, { Component } from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from "react-navigation-stack";

import UserProfile from './UserProfile';
import Payment from './Payment';

const Navigator = createStackNavigator({
    UserProfile: { screen: UserProfile },
    Payment: { screen: Payment },
},


  {
    initialRouteName: 'UserProfile',
    headerMode: 'none'
  }
);

const UserContainer = createAppContainer(Navigator)

export default class User extends Component {
  render() {
    return <UserContainer />;
  }
} 
