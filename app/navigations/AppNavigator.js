import React from 'react';

import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import IonIcon from 'react-native-vector-icons/Ionicons';

import HomeScreen from "../screens/HomeScreen";
import MessageScreen from "../screens/MessageScreen";
import PostScreen from "../screens/PostScreen";
import NotificationScreen from "../screens/NotificationScreen";
import ProfileScreen from "../screens/ProfileScreen";
import CommentScreen from "../screens/CommentScreen";


const AppNavigation = createStackNavigator(
  {
      default: createBottomTabNavigator(
          {
              Home: {
                  screen: HomeScreen,
                  navigationOptions: {
                      tabBarIcon: ({ tintColor }) => <IonIcon name="ios-home" size={24} color={tintColor} />
                  }
              },
              Message: {
                  screen: MessageScreen,
                  navigationOptions: {
                      tabBarIcon: ({ tintColor }) => <IonIcon name="ios-chatboxes" size={24} color={tintColor} />
                  }
              },
              Post: {
                  screen: PostScreen,
                  navigationOptions: {
                      tabBarIcon: ({ 
                        
                       }) => (
                          <IonIcon
                              name="ios-add-circle"
                              size={48}
                              color="#E9446A"
                              style={{
                                  shadowColor: "#E9446A",
                                  shadowOffset: { width: 0, height: 10 },
                                  shadowRadius: 10,
                                  shadowOpacity: 0.3
                              }}
                          />
                      )
                  }
              },
              Notification: {
                  screen: NotificationScreen,
                  navigationOptions: {
                      tabBarIcon: ({ tintColor }) => <IonIcon name="ios-notifications" size={24} color={tintColor} />
                  }
              },
              Profile: {
                  screen: ProfileScreen,
                  navigationOptions: {
                      tabBarIcon: ({ tintColor }) => <IonIcon name="ios-person" size={24} color={tintColor} />
                  }
              }
          },
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
                  showLabel: false
              }
          }
      ),
      postModal: {
          screen: PostScreen
      },
      commentModal: {
        screen: CommentScreen
       }
  },
  {
      mode: "modal",
      headerMode: "none"
      // initialRouteName: "postModal"
  }
);

export default AppNavigation
