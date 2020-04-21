import React, { Component, memo } from "react";
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';

import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";


import IonIcon from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";

import HomeScreen from "../screens/HomeScreen";
import PostScreen from "../screens/PostScreen";
import NotificationScreen from "../screens/NotificationScreen";
import ProfileScreen from "../screens/ProfileScreen";
import CommentScreen from "../screens/CommentScreen";
import Listing from "../screens/Listing/Main";
import EventListing from "../screens/Listing/eventServices/List";
import ListingAndMap from "../screens/Listing/eventServices/Index";
import EventDetail from "../screens/Listing/eventServices/Detail";
import EventMap from "../screens/Listing/eventServices/Map";

import UserStack from "../screens/Profile/Index";
import UserProfile from "../screens/Profile/UserProfile";
import Offers from "../screens/Offers/OfferLanding";
// import OfferStack from "../screens/Offers/Index";
import SocialStack from "../screens/Social/Index";

import Provider from "../screens/Listing/ProviderHome"
import AddEvent from "../screens/Admin/AddEvent"
import AddService from "../screens/Admin/Service"
import AddSub from "../screens/Admin/SubService"
import Booking from "../screens/Admin/Booking"
import AdminBooking from "../screens/Admin/AdminBooking"

import AddEventProvider from "../screens/Admin/Add";
import AddEventServices from "../screens/Admin/Services";
import Files from "../screens/Admin/Files";
import Reservations from "../screens/Admin/Reservations";

import { AnimatedCircleBarComponent } from 'react-navigation-custom-bottom-tab-component/AnimatedCircleBarComponent';
// const Navigation = createBottomTabNavigator(
//   {
//     UserStack,
//     OfferStack,
//     Listing,
//     HomeScreen,
//   },
//   {
//     tabBarComponent: AnimatedCircleBarComponent,
//   },
// );
// export default Navigation;



const ListingStack = createSharedElementStackNavigator(
  {
    Listing: Listing,
    // ListingAndMap: ListingAndMap,
    EventListing: EventListing,
    EventDetail: EventDetail,
    EventMap: EventMap
  },
  {
    initialRouteName: 'EventListing',
    headerMode: "none",
  }
);

ListingStack.navigationOptions = ({ navigation }) => {
  // return tabBarIcon = ({ tintColor }) => (
  //   <Feather name="list" size={24} color={tintColor} />
  // )
  let tabBarVisible = true;
  // if (navigation.state.index > 0) {
  //   tabBarVisible = false;
  // }

  return {
    tabBarVisible,
  };
};

const AppNavigation = createStackNavigator(
  {
    default: createBottomTabNavigator(
      {
        // Offers: {
        //   screen: Offers,
        //   navigationOptions: {
        //     tabBarIcon: ({ tintColor }) => (
        //       <IonIcon name="ios-chatboxes" size={24} color={tintColor} />
        //     )
        //   }
        // },
        EListing: {
          screen: ListingStack,
          navigationOptions: {
            tabBarIcon: ({ tintColor }) => (
              <Feather name="list" size={24} color={tintColor} />
            )
          }
        },
        // Provider: {
        //   screen: Provider,
        //   navigationOptions: {
        //     tabBarIcon: ({ tintColor }) => (
        //       <IonIcon name="ios-notifications" size={24} color={tintColor} />
        //     )
        //   }
        // },
        AddEvent: {
          screen: AddEvent,
          navigationOptions: {
            tabBarIcon: ({ tintColor }) => (
              <IonIcon name="ios-notifications" size={24} color={tintColor} />
            )
          }
        },

        AddService: {
          screen: AddService,
          navigationOptions: {
            tabBarIcon: ({ tintColor }) => (
              <IonIcon name="ios-notifications" size={24} color={tintColor} />
            )
          }
        },

        AddSub: {
          screen: AddSub,
          navigationOptions: {
            tabBarIcon: ({ tintColor }) => (
              <IonIcon name="ios-notifications" size={24} color={tintColor} />
            )
          }
        },
       
        // Booking: {
        //   screen: Booking,
        //   navigationOptions: {
        //     tabBarIcon: ({ tintColor }) => (
        //       <IonIcon name="ios-home" size={24} color={tintColor} />
        //     )
        //   }
        // },
        // AdminBooking: {
        //   screen: AdminBooking,
        //   navigationOptions: {
        //     tabBarIcon: ({ tintColor }) => (
        //       <IonIcon name="ios-home" size={24} color={tintColor} />
        //     )
        //   }
        // },
        // Files: {
        //   screen: Files,
        //   navigationOptions: {
        //     tabBarIcon: ({ tintColor }) => (
        //       <IonIcon name="ios-notifications" size={24} color={tintColor} />
        //     )
        //   }
        // },
        User: {
          screen: UserProfile,
          navigationOptions: {
            tabBarIcon: ({ tintColor }) => (
              <IonIcon name="ios-person" size={24} color={tintColor} />
            )
          }
        },
        
        // Add: {
        //   screen: AddEventProvider,
        //   navigationOptions: {
        //     tabBarIcon: ({ tintColor }) => (
        //       <IonIcon name="ios-chatboxes" size={24} color={tintColor} />
        //     )
        //   }
        // },
        // Services: {
        //   screen: AddEventServices,
        //   navigationOptions: {
        //     tabBarIcon: ({ tintColor }) => (
        //       <IonIcon name="ios-person" size={24} color={tintColor} />
        //     )
        //   }
        // },
        
        // Reservations: {
        //   screen: Reservations,
        //   navigationOptions: {
        //     tabBarIcon: ({ tintColor }) => (
        //       <IonIcon name="ios-person" size={24} color={tintColor} />
        //     )
        //   }
        // },
        
        // Social: {
        //   screen: SocialStack,
        //   navigationOptions: {
        //     tabBarIcon: ({ tintColor }) => (
        //       <IonIcon name="ios-person" size={24} color={tintColor} />
        //     )
        //   }
        // },
        

        // Post: {
        //   screen: PostScreen,
        //   navigationOptions: {
        //     tabBarIcon: ({}) => (
        //       <IonIcon
        //         name="ios-add-circle"
        //         size={48}
        //         color="#E9446A"
        //         style={{
        //           shadowColor: "#E9446A",
        //           shadowOffset: { width: 0, height: 10 },
        //           shadowRadius: 10,
        //           shadowOpacity: 0.3
        //         }}
        //       />
        //     )
        //   }
        // },
        
        // Profile: {
        //   screen: ProfileScreen,
        //   navigationOptions: {
        //     tabBarIcon: ({ tintColor }) => (
        //       <IonIcon name="ios-person" size={24} color={tintColor} />
        //     ),
        //     tabBarVisible: false
        //   }
        // }
      },
      // {
      //   tabBarComponent: AnimatedCircleBarComponent,
      // },
      {
        defaultNavigationOptions: {
          tabBarOnPress: ({ navigation, defaultHandler }) => {
            if (navigation.state.key === "Post") {
              navigation.navigate("postModal");
            } else {
              defaultHandler();
            }
            
          }
        },
        tabBarOptions: {
          activeTintColor: "#161F3D",
          inactiveTintColor: "#B8BBC4",
          showLabel: true
        }
      }
    ),

  },
  {
    // mode: "modal",
    headerMode: "none",
    // initialRouteName: "EListing"
  }
);



export default AppNavigation;
