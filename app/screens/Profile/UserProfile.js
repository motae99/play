import React, { Component } from 'react'
import { ScrollView, Switch, StyleSheet, Text, View , Dimensions, ImageBackground, Image} from 'react-native'
import { Avatar, ListItem } from 'react-native-elements'
import PropTypes from 'prop-types'

import BaseIcon from './Components/Icon'
import Chevron from './Components/Chevron'
import InfoText from './Components/InfoText'

const styles = StyleSheet.create({
  scroll: {
    backgroundColor: 'white',
  },
  userRow: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingBottom: 8,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 6,
  },
  userImage: {
    marginRight: 12,
  },
  listItemContainer: {
    height: 55,
    borderWidth: 0.5,
    borderColor: '#ECECEC',
  },
  coverBio: {
   color: 'red',
   fontSize: 15,
   fontWeight: '600',
 },
 coverContainer: {
   marginBottom: 55,
   position: 'relative',
 },
 coverImage: {
   height: Dimensions.get('window').width * (3 / 4),
   width: Dimensions.get('window').width,
 },
 coverMetaContainer: {
   backgroundColor: 'transparent',
   paddingBottom: 10,
   paddingLeft: 135,
 },
 coverName: {
   color: 'red',
   fontSize: 28,
   fontWeight: 'bold',
   paddingBottom: 2,
 },
 coverTitle: {
   color: '#FFF',
   fontSize: 24,
   fontWeight: 'bold',
   textAlign: 'center',
 },
 coverTitleContainer: {
   backgroundColor: 'transparent',
   flex: 1,
   justifyContent: 'space-between',
   paddingTop: 45,
 },
 headerContainer: {
   alignItems: 'center',
   backgroundColor: '#FFF',
 },
 indicatorTab: {
   backgroundColor: 'transparent',
 },
 mansonryContainer: {
   alignItems: 'center',
   flexDirection: 'row',
   flexWrap: 'wrap',
   justifyContent: 'center',
   marginLeft: 0,
   marginRight: 0,
 },
 profileImage: {
   borderColor: '#FFF',
   borderRadius: 55,
   borderWidth: 3,
   height: 110,
   width: 110,
 },
 profileImageContainer: {
   bottom: 0,
   left: 10,
   position: 'absolute',
 },
 sceneContainer: {
   marginTop: 10,
 },
 scroll: {
   backgroundColor: '#FFF',
 },
 tabBar: {
   backgroundColor: 'transparent',
   marginBottom: -10,
   marginLeft: 130,
   marginRight: 15,
 },
 tabContainer: {
   flex: 1,
   marginBottom: 12,
   marginTop: -55,
   position: 'relative',
   zIndex: 10,
 },
 tabRow: {
   flexWrap: 'wrap',
   flexDirection: 'column',
   justifyContent: 'flex-start',
   alignItems: 'flex-start',
   flex: 1,
 },
 tabLabelNumber: {
   color: 'black',
   fontSize: 22,
   textAlign: 'center',
   marginBottom: 2,
 },
 tabLabelText: {
   color: 'black',
   fontSize: 14,
   textAlign: 'left',
 },
})

class SettingsScreen extends Component {
  // static propTypes = {
  //   avatar: PropTypes.string.isRequired,
  //   name: PropTypes.string.isRequired,
  //   navigation: PropTypes.object.isRequired,
  //   emails: PropTypes.arrayOf(
  //     PropTypes.shape({
  //       email: PropTypes.string.isRequired,
  //     })
  //   ).isRequired,
  // }

  state = {
    pushNotifications: true,
  }

  onPressOptions = () => {
    this.props.navigation.navigate('options')
  }

  onChangePushNotifications = () => {
    this.setState(state => ({
      pushNotifications: !state.pushNotifications,
    }))
  }

  goPayment = () => {
    this.props.navigation.navigate('Payment')
  }

  renderContactHeader = () => {
   return (
     <View style={styles.headerContainer}>
       <View style={styles.coverContainer}>
         <ImageBackground
           source={{
             uri: 'https://lh3.googleusercontent.com/a-/AAuE7mAmK8u6_tdXp7F_-pZM-6HQzXOdtVWGSWo3LuKqxQ=s96-c',
           }}
           style={styles.coverImage}
         >
           <View style={styles.coverTitleContainer}>
             <Text style={styles.coverTitle} />
           </View>
           <View style={styles.coverMetaContainer}>
             <Text style={styles.coverName}>motae</Text>
             <Text style={styles.coverBio}>my Info</Text>
           </View>
         </ImageBackground>
       </View>
       <View style={styles.profileImageContainer}>
         <Image
           source={{
             uri: 'https://lh3.googleusercontent.com/a-/AAuE7mAmK8u6_tdXp7F_-pZM-6HQzXOdtVWGSWo3LuKqxQ=s96-c',
           }}
           style={styles.profileImage}
         />
       </View>
     </View>
   )
 }

  render() {
    // const { avatar, name, emails: [firstEmail] } = this.props
    return (
      <ScrollView style={styles.scroll}>
        {/* <View style={styles.userRow}>
          <View style={styles.userImage}>
            <Avatar
              rounded
              size="large"
              source={{
                uri: 'https://lh3.googleusercontent.com/a-/AAuE7mAmK8u6_tdXp7F_-pZM-6HQzXOdtVWGSWo3LuKqxQ=s96-c',
              }}
            />
          </View>
          <View>
            <Text style={{ fontSize: 16 }}>motae</Text>
            <Text
              style={{
                color: 'gray',
                fontSize: 16,
              }}
            >
              motae99#mail
            </Text>
          </View>
        </View> */}
        {this.renderContactHeader()}
        <InfoText text="Account" />
        <View>
          <ListItem
            hideChevron
            title="Push Notifications"
            containerStyle={styles.listItemContainer}
            rightElement={
              <Switch
                onValueChange={this.onChangePushNotifications}
                value={this.state.pushNotifications}
              />
            }
            leftIcon={
              <BaseIcon
                containerStyle={{
                  backgroundColor: '#FFADF2',
                }}
                icon={{
                  type: 'material',
                  name: 'notifications',
                }}
              />
            }
          />
          <ListItem
            // chevron
            title="Currency"
            rightTitle="USD"
            rightTitleStyle={{ fontSize: 15 }}
            onPress={() => {this.goPayment()}}
            containerStyle={styles.listItemContainer}
            leftIcon={
              <BaseIcon
                containerStyle={{ backgroundColor: '#FAD291' }}
                icon={{
                  type: 'font-awesome',
                  name: 'money',
                }}
              />
            }
            rightIcon={<Chevron />}
          />
          <ListItem
            title="Location"
            rightTitle="New York"
            rightTitleStyle={{ fontSize: 15 }}
            onPress={() => this.onPressOptions()}
            containerStyle={styles.listItemContainer}
            leftIcon={
              <BaseIcon
                containerStyle={{ backgroundColor: '#57DCE7' }}
                icon={{
                  type: 'material',
                  name: 'place',
                }}
              />
            }
            rightIcon={<Chevron />}
          />
          <ListItem
            title="Language"
            rightTitle="English"
            rightTitleStyle={{ fontSize: 15 }}
            onPress={() => this.onPressOptions()}
            containerStyle={styles.listItemContainer}
            leftIcon={
              <BaseIcon
                containerStyle={{ backgroundColor: '#FEA8A1' }}
                icon={{
                  type: 'material',
                  name: 'language',
                }}
              />
            }
            rightIcon={<Chevron />}
          />
        </View>
        <InfoText text="More" />
        <View>
          <ListItem
            title="About US"
            onPress={() => this.onPressOptions()}
            containerStyle={styles.listItemContainer}
            leftIcon={
              <BaseIcon
                containerStyle={{ backgroundColor: '#A4C8F0' }}
                icon={{
                  type: 'ionicon',
                  name: 'md-information-circle',
                }}
              />
            }
            rightIcon={<Chevron />}
          />
          <ListItem
            title="Terms and Policies"
            onPress={() => this.onPressOptions()}
            containerStyle={styles.listItemContainer}
            leftIcon={
              <BaseIcon
                containerStyle={{ backgroundColor: '#C6C7C6' }}
                icon={{
                  type: 'entypo',
                  name: 'light-bulb',
                }}
              />
            }
            rightIcon={<Chevron />}
          />
          <ListItem
            title="Share our App"
            onPress={() => this.onPressOptions()}
            containerStyle={styles.listItemContainer}
            leftIcon={
              <BaseIcon
                containerStyle={{
                  backgroundColor: '#C47EFF',
                }}
                icon={{
                  type: 'entypo',
                  name: 'share',
                }}
              />
            }
            rightIcon={<Chevron />}
          />
          <ListItem
            title="Rate Us"
            onPress={() => this.onPressOptions()}
            containerStyle={styles.listItemContainer}
            badge={{
              value: 5,
              textStyle: { color: 'white' },
              containerStyle: { backgroundColor: 'gray', marginTop: 0 },
            }}
            leftIcon={
              <BaseIcon
                containerStyle={{
                  backgroundColor: '#FECE44',
                }}
                icon={{
                  type: 'entypo',
                  name: 'star',
                }}
              />
            }
            rightIcon={<Chevron />}
          />
          <ListItem
            title="Send FeedBack"
            onPress={() => this.onPressOptions()}
            containerStyle={styles.listItemContainer}
            leftIcon={
              <BaseIcon
                containerStyle={{
                  backgroundColor: '#00C001',
                }}
                icon={{
                  type: 'materialicon',
                  name: 'feedback',
                }}
              />
            }
            rightIcon={<Chevron />}
          />
        </View>
      </ScrollView>
    )
  }
}

export default SettingsScreen