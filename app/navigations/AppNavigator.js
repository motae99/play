import React, {Component, memo} from 'react';
// import {createSharedElementStackNavigator} from 'react-navigation-shared-element';

import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createAppContainer} from 'react-navigation';

import UserContextProvider from '../context/UserContext';

import IonIcon from 'react-native-vector-icons/Ionicons';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';

// import Registration from '../Muzamil/Registration';
// import ListOffers from '../Muzamil/ListOffers';
// import Services from '../Muzamil/Services';
import Customer from '../Muzamil/Customer';
// import ProfileScreen from '../Muzamil/SignOut';

// import Test from '../Muzamil/Test';

import DetailTest from "../screens/Listing/eventServices/detailScreen";

// import HomeScreen from "../screens/HomeScreen";
// import PostScreen from "../screens/PostScreen";
// import NotificationScreen from "../screens/NotificationScreen";
// import CommentScreen from "../screens/CommentScreen";
// import ListingStack from '../screens/Listing/eventServices/ListingStack';

// import UserStack from "../screens/Profile/Index";
// import UserProfile from "../screens/Profile/UserProfile";
// import Offers from "../screens/Offers/OfferLanding";
// // import OfferStack from "../screens/Offers/Index";
// import SocialStack from "../screens/Social/Index";

import Request from '../screens/Admin/Request';
import ListServices from '../screens/Admin/ListServices/';
import AppServices from '../screens/Admin/AppServices';
import EventsInfo from '../screens/AdminParty/EventsInfo';

import Update from '../../Updates';

// import Provider from '../screens/Listing/Provider';
// import AddEvent from "../screens/Admin/AddEvent"
// import AddService from "../screens/Admin/Service"
// import AddSub from "../screens/Admin/SubService"
// import Booking from "../screens/Admin/Booking"
// import AdminBooking from "../screens/Admin/AdminBooking"

// import AddEventProvider from "../screens/Admin/Add";
// import AddEventServices from "../screens/Admin/Services";
// import Files from "../screens/Admin/Files";
// import Reservations from "../screens/Admin/Reservations";
import StyleGuide from '../components/StyleGuide';

import {AnimatedCircleBarComponent} from 'react-navigation-custom-bottom-tab-component/AnimatedCircleBarComponent';

const AppNavigation = createStackNavigator(
  {
    default: createBottomTabNavigator(
      {
        DetailTest: {
          screen: DetailTest,
          navigationOptions: {
            tabBarIcon: ({tintColor}) => (
              <MIcon name="account-details" size={24} color={tintColor} />
            ),
            tabBarVisible: false,
          },
        },

        // ListServices: {
        //   screen: ListServices,
        //   navigationOptions: {
        //     tabBarIcon: ({tintColor}) => (
        //       <MIcon name="apps" size={24} color={tintColor} />
        //     ),
        //   },
        // },

        // Request: {
        //   screen: Request,
        //   navigationOptions: {
        //     tabBarIcon: ({tintColor}) => (
        //       <IonIcon
        //         name="ios-git-pull-request"
        //         size={24}
        //         color={tintColor}
        //       />
        //     ),
        //     // tabBarVisible: false,
        //   },
        // },

        // Update: {
        //   screen: Update,
        //   navigationOptions: {
        //     tabBarIcon: ({tintColor}) => (
        //       <MIcon
        //         name="account-card-details-outline"
        //         size={24}
        //         color={tintColor}
        //       />
        //     ),
        //     // tabBarVisible: false,
        //   },
        // },

        // Home: {
        //   screen: Home,
        //   navigationOptions: {
        //     tabBarIcon: ({tintColor}) => (
        //       <IonIcon name="ios-chatboxes" size={24} color={tintColor} />
        //     ),
        //     // tabBarVisible: false,
        //   },
        // },

        // ListOffers: {
        //   screen: ListOffers,
        //   navigationOptions: {
        //     tabBarIcon: ({tintColor}) => (
        //       <IonIcon name="ios-notifications" size={24} color={tintColor} />
        //     ),
        //   },
        // },

        // Registration: {
        //   screen: Registration,
        //   navigationOptions: {
        //     tabBarIcon: ({tintColor}) => (
        //       <IonIcon name="ios-notifications" size={24} color={tintColor} />
        //     ),
        //   },
        // },

        // Services: {
        //   screen: Services,
        //   navigationOptions: {
        //     tabBarIcon: ({tintColor}) => (
        //       <IonIcon name="ios-notifications" size={24} color={tintColor} />
        //     ),
        //   },
        // },

        // Profile: {
        //   screen: ProfileScreen,
        //   navigationOptions: {
        //     tabBarIcon: ({tintColor}) => (
        //       <IonIcon name="ios-person" size={24} color={tintColor} />
        //     ),
        //     // tabBarVisible: false,
        //   },
        // },

        // Offers: {
        //   screen: Offers,
        //   navigationOptions: {
        //     tabBarIcon: ({ tintColor }) => (
        //       <IonIcon name="ios-chatboxes" size={24} color={tintColor} />
        //     )
        //   }
        // },
        // EListing: {
        //   screen: ListingStack,
        //   navigationOptions: {
        //     tabBarIcon: ({tintColor}) => (
        //       <Feather name="list" size={24} color={tintColor} />
        //     ),
        //   },
        // },
        // Provider: {
        //   screen: Provider,
        //   navigationOptions: {
        //     tabBarIcon: ({tintColor}) => (
        //       <IonIcon name="ios-notifications" size={24} color={tintColor} />
        //     ),
        //   },
        // },
        // AddEvent: {
        //   screen: AddEvent,
        //   navigationOptions: {
        //     tabBarIcon: ({ tintColor }) => (
        //       <IonIcon name="ios-notifications" size={24} color={tintColor} />
        //     )
        //   }
        // },

        // AddService: {
        //   screen: AddService,
        //   navigationOptions: {
        //     tabBarIcon: ({ tintColor }) => (
        //       <IonIcon name="ios-notifications" size={24} color={tintColor} />
        //     )
        //   }
        // },

        // AddSub: {
        //   screen: AddSub,
        //   navigationOptions: {
        //     tabBarIcon: ({ tintColor }) => (
        //       <IonIcon name="ios-notifications" size={24} color={tintColor} />
        //     )
        //   }
        // },

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
        // User: {
        //   screen: UserProfile,
        //   navigationOptions: {
        //     tabBarIcon: ({ tintColor }) => (
        //       <IonIcon name="ios-person" size={24} color={tintColor} />
        //     )
        //   }
        // },

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
      },
      // {
      //   tabBarComponent: AnimatedCircleBarComponent,
      // },
      {
        defaultNavigationOptions: {
          tabBarOnPress: ({navigation, defaultHandler}) => {
            if (navigation.state.key === 'Post') {
              navigation.navigate('postModal');
            } else {
              defaultHandler();
            }
          },
        },
        tabBarOptions: {
          activeTintColor: StyleGuide.palette.primary,
          inactiveTintColor: StyleGuide.palette.backgroundPrimary,
          showLabel: true,
        },
      },
    ),
    Customer: {
      screen: Customer,
      mode: 'modal',
      headerMode: 'none',
    },
  },

  {
    // mode: "modal",
    headerMode: 'none',
    // initialRouteName: "EListing"
  },
);

const AppStackContainer = createAppContainer(AppNavigation);

const AppStack = () => {
  return (
    <UserContextProvider>
      <AppStackContainer />
    </UserContextProvider>
  );
};

export default AppStack;
