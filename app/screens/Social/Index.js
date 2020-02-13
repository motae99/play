import React, { Component } from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from "react-navigation-stack";

import SocialPage from './SocialPage';
import Comments from './Comments';
import Post from './Post';

const Navigator = createStackNavigator({
    SocialPage: { screen: SocialPage },
    Comments: { screen: Comments },
    Post: { screen: Post },
},


  {
    initialRouteName: 'SocialPage',
    headerMode: 'none'
  }
);

const SocialStack = createAppContainer(Navigator)

export default class User extends Component {
  render() {
    return <SocialStack />;
  }
} 
