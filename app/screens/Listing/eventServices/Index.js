import React, {Component} from 'react';  
import {StyleSheet, View, StatusBar} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';  
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';  
import {createAppContainer} from 'react-navigation';  
import EventsListing from "./List.js";  
import EventsMaps from "./Map.js";  
import EventDetail from "./Detail.js";  
  
const TopNav = createMaterialTopTabNavigator(  
    {  
        EventsListing: EventsListing,  
        EventsMaps: EventsMaps,  
        EventDetail: EventDetail,  
        // Sort: Sortcreen,  
    },  
    {  
        tabBarOptions: {  
            activeTintColor: 'black',  
            showIcon: true,  
            showLabel:false,  
            style: {  
                backgroundColor:'red'  
            }  
        },  
    },{
    lazy: true,
    }

)  
const TopIndex = createAppContainer(TopNav);  

export default class Events extends Component{  
    
    static navigationOptions = ({ navigation }) => {
        // const { state } = navigation
        // Setup the header and tabBarVisible status
        // const header = state.params && (state.params.fullscreen ? undefined : null)
        // const tabBarVisible = state.params ? state.params.fullscreen : true
        const tabBarVisible = false 
        return {
          // For stack navigators, you can hide the header bar like so
        //   header,
          // For the tab navigators, you can hide the tab bar like so
          tabBarVisible
        }
      }
    
    render(){  
        return(  
            <View style={{flex:1}} >  
                <StatusBar  
                    backgroundColor='white'  
                    barStyle='dark-content'  
                />  
                <View style={styles.header}>  
                    <Icon name='ios-camera' size={28} color='black'/>  
                    <Icon name='ios-menu' size={28} color='black'/>  
                </View>  
                <TopIndex/>  
            </View>  
        )  
    }  
}  
const styles = StyleSheet.create({  
    wrapper: {  
        flex: 1,  
    },  
    header:{  
        flexDirection: 'row',  
        alignItems: 'center',  
        justifyContent: 'space-between',  
        backgroundColor: 'white',  
        paddingHorizontal: 18,  
        paddingTop: 20,  
    }  
}); 
