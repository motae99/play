import React, {Component, memo} from 'react';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import {createAppContainer} from 'react-navigation';
import Feather from 'react-native-vector-icons/Feather';

import Listing from '../Main';
import Testing from './Testing';
import EventListing from './List';
// import EventDetail from './detailScreen/index';
import EventMap from './Map';

import ListingContextProvider from '../../../context/ListingContext';

const ListingStack = createSharedElementStackNavigator(
  {
    Testing: Testing,
    // Listing: Listing,
    // EventListing: EventListing,
    // EventDetail: EventDetail,
    // EventMap: EventMap,
  },
  {
    initialRouteName: 'Testing',
    headerMode: 'none',
  },
);

ListingStack.navigationOptions = ({navigation}) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  let tabBarIcon = ({tintColor}) => (
    <Feather name="list" size={24} color={tintColor} />
  );

  return {
    tabBarVisible,
  };
};

const ListingStackContainer = createAppContainer(ListingStack);

const Stack = () => {
  return (
    <ListingContextProvider>
      <ListingStackContainer />
    </ListingContextProvider>
  );
};

export default Stack;
