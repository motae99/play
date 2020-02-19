// import React, { Component } from 'react'
// import { ScrollView, Switch, StyleSheet, Text, View , Dimensions, ImageBackground, Image} from 'react-native'
// import { Avatar, ListItem } from 'react-native-elements'
// import PropTypes from 'prop-types'

// import BaseIcon from './Components/Icon'
// import Chevron from './Components/Chevron'
// import InfoText from './Components/InfoText'

// const styles = StyleSheet.create({
//   scroll: {
//     backgroundColor: 'white',
//   },
//   userRow: {
//     alignItems: 'center',
//     flexDirection: 'row',
//     paddingBottom: 8,
//     paddingLeft: 15,
//     paddingRight: 15,
//     paddingTop: 6,
//   },
//   userImage: {
//     marginRight: 12,
//   },
//   listItemContainer: {
//     height: 55,
//     borderWidth: 0.5,
//     borderColor: '#ECECEC',
//   },
//   coverBio: {
//    color: 'red',
//    fontSize: 15,
//    fontWeight: '600',
//  },
//  coverContainer: {
//    marginBottom: 55,
//    position: 'relative',
//  },
//  coverImage: {
//    height: Dimensions.get('window').width * (3 / 4),
//    width: Dimensions.get('window').width,
//  },
//  coverMetaContainer: {
//    backgroundColor: 'transparent',
//    paddingBottom: 10,
//    paddingLeft: 135,
//  },
//  coverName: {
//    color: 'red',
//    fontSize: 28,
//    fontWeight: 'bold',
//    paddingBottom: 2,
//  },
//  coverTitle: {
//    color: '#FFF',
//    fontSize: 24,
//    fontWeight: 'bold',
//    textAlign: 'center',
//  },
//  coverTitleContainer: {
//    backgroundColor: 'transparent',
//    flex: 1,
//    justifyContent: 'space-between',
//    paddingTop: 45,
//  },
//  headerContainer: {
//    alignItems: 'center',
//    backgroundColor: '#FFF',
//  },
//  indicatorTab: {
//    backgroundColor: 'transparent',
//  },
//  mansonryContainer: {
//    alignItems: 'center',
//    flexDirection: 'row',
//    flexWrap: 'wrap',
//    justifyContent: 'center',
//    marginLeft: 0,
//    marginRight: 0,
//  },
//  profileImage: {
//    borderColor: '#FFF',
//    borderRadius: 55,
//    borderWidth: 3,
//    height: 110,
//    width: 110,
//  },
//  profileImageContainer: {
//    bottom: 0,
//    left: 10,
//    position: 'absolute',
//  },
//  sceneContainer: {
//    marginTop: 10,
//  },
//  scroll: {
//    backgroundColor: '#FFF',
//  },
//  tabBar: {
//    backgroundColor: 'transparent',
//    marginBottom: -10,
//    marginLeft: 130,
//    marginRight: 15,
//  },
//  tabContainer: {
//    flex: 1,
//    marginBottom: 12,
//    marginTop: -55,
//    position: 'relative',
//    zIndex: 10,
//  },
//  tabRow: {
//    flexWrap: 'wrap',
//    flexDirection: 'column',
//    justifyContent: 'flex-start',
//    alignItems: 'flex-start',
//    flex: 1,
//  },
//  tabLabelNumber: {
//    color: 'black',
//    fontSize: 22,
//    textAlign: 'center',
//    marginBottom: 2,
//  },
//  tabLabelText: {
//    color: 'black',
//    fontSize: 14,
//    textAlign: 'left',
//  },
// })

// class SettingsScreen extends Component {
//   // static propTypes = {
//   //   avatar: PropTypes.string.isRequired,
//   //   name: PropTypes.string.isRequired,
//   //   navigation: PropTypes.object.isRequired,
//   //   emails: PropTypes.arrayOf(
//   //     PropTypes.shape({
//   //       email: PropTypes.string.isRequired,
//   //     })
//   //   ).isRequired,
//   // }

//   state = {
//     pushNotifications: true,
//   }

//   onPressOptions = () => {
//     this.props.navigation.navigate('options')
//   }

//   onChangePushNotifications = () => {
//     this.setState(state => ({
//       pushNotifications: !state.pushNotifications,
//     }))
//   }

//   goPayment = () => {
//     this.props.navigation.navigate('Payment')
//   }

//   renderContactHeader = () => {
//    return (
//      <View style={styles.headerContainer}>
//        <View style={styles.coverContainer}>
//          <ImageBackground
//            source={{
//              uri: 'https://lh3.googleusercontent.com/a-/AAuE7mAmK8u6_tdXp7F_-pZM-6HQzXOdtVWGSWo3LuKqxQ=s96-c',
//            }}
//            style={styles.coverImage}
//          >
//            <View style={styles.coverTitleContainer}>
//              <Text style={styles.coverTitle} />
//            </View>
//            <View style={styles.coverMetaContainer}>
//              <Text style={styles.coverName}>motae</Text>
//              <Text style={styles.coverBio}>my Info</Text>
//            </View>
//          </ImageBackground>
//        </View>
//        <View style={styles.profileImageContainer}>
//          <Image
//            source={{
//              uri: 'https://lh3.googleusercontent.com/a-/AAuE7mAmK8u6_tdXp7F_-pZM-6HQzXOdtVWGSWo3LuKqxQ=s96-c',
//            }}
//            style={styles.profileImage}
//          />
//        </View>
//      </View>
//    )
//  }

//   render() {
//     // const { avatar, name, emails: [firstEmail] } = this.props
//     return (
//       <ScrollView style={styles.scroll}>
//         {/* <View style={styles.userRow}>
//           <View style={styles.userImage}>
//             <Avatar
//               rounded
//               size="large"
//               source={{
//                 uri: 'https://lh3.googleusercontent.com/a-/AAuE7mAmK8u6_tdXp7F_-pZM-6HQzXOdtVWGSWo3LuKqxQ=s96-c',
//               }}
//             />
//           </View>
//           <View>
//             <Text style={{ fontSize: 16 }}>motae</Text>
//             <Text
//               style={{
//                 color: 'gray',
//                 fontSize: 16,
//               }}
//             >
//               motae99#mail
//             </Text>
//           </View>
//         </View> */}
//         {this.renderContactHeader()}
//         <InfoText text="Account" />
//         <View>
//           <ListItem
//             hideChevron
//             title="Push Notifications"
//             containerStyle={styles.listItemContainer}
//             rightElement={
//               <Switch
//                 onValueChange={this.onChangePushNotifications}
//                 value={this.state.pushNotifications}
//               />
//             }
//             leftIcon={
//               <BaseIcon
//                 containerStyle={{
//                   backgroundColor: '#FFADF2',
//                 }}
//                 icon={{
//                   type: 'material',
//                   name: 'notifications',
//                 }}
//               />
//             }
//           />
//           <ListItem
//             // chevron
//             title="Currency"
//             rightTitle="USD"
//             rightTitleStyle={{ fontSize: 15 }}
//             onPress={() => {this.goPayment()}}
//             containerStyle={styles.listItemContainer}
//             leftIcon={
//               <BaseIcon
//                 containerStyle={{ backgroundColor: '#FAD291' }}
//                 icon={{
//                   type: 'font-awesome',
//                   name: 'money',
//                 }}
//               />
//             }
//             rightIcon={<Chevron />}
//           />
//           <ListItem
//             title="Location"
//             rightTitle="New York"
//             rightTitleStyle={{ fontSize: 15 }}
//             onPress={() => this.onPressOptions()}
//             containerStyle={styles.listItemContainer}
//             leftIcon={
//               <BaseIcon
//                 containerStyle={{ backgroundColor: '#57DCE7' }}
//                 icon={{
//                   type: 'material',
//                   name: 'place',
//                 }}
//               />
//             }
//             rightIcon={<Chevron />}
//           />
//           <ListItem
//             title="Language"
//             rightTitle="English"
//             rightTitleStyle={{ fontSize: 15 }}
//             onPress={() => this.onPressOptions()}
//             containerStyle={styles.listItemContainer}
//             leftIcon={
//               <BaseIcon
//                 containerStyle={{ backgroundColor: '#FEA8A1' }}
//                 icon={{
//                   type: 'material',
//                   name: 'language',
//                 }}
//               />
//             }
//             rightIcon={<Chevron />}
//           />
//         </View>
//         <InfoText text="More" />
//         <View>
//           <ListItem
//             title="About US"
//             onPress={() => this.onPressOptions()}
//             containerStyle={styles.listItemContainer}
//             leftIcon={
//               <BaseIcon
//                 containerStyle={{ backgroundColor: '#A4C8F0' }}
//                 icon={{
//                   type: 'ionicon',
//                   name: 'md-information-circle',
//                 }}
//               />
//             }
//             rightIcon={<Chevron />}
//           />
//           <ListItem
//             title="Terms and Policies"
//             onPress={() => this.onPressOptions()}
//             containerStyle={styles.listItemContainer}
//             leftIcon={
//               <BaseIcon
//                 containerStyle={{ backgroundColor: '#C6C7C6' }}
//                 icon={{
//                   type: 'entypo',
//                   name: 'light-bulb',
//                 }}
//               />
//             }
//             rightIcon={<Chevron />}
//           />
//           <ListItem
//             title="Share our App"
//             onPress={() => this.onPressOptions()}
//             containerStyle={styles.listItemContainer}
//             leftIcon={
//               <BaseIcon
//                 containerStyle={{
//                   backgroundColor: '#C47EFF',
//                 }}
//                 icon={{
//                   type: 'entypo',
//                   name: 'share',
//                 }}
//               />
//             }
//             rightIcon={<Chevron />}
//           />
//           <ListItem
//             title="Rate Us"
//             onPress={() => this.onPressOptions()}
//             containerStyle={styles.listItemContainer}
//             badge={{
//               value: 5,
//               textStyle: { color: 'white' },
//               containerStyle: { backgroundColor: 'gray', marginTop: 0 },
//             }}
//             leftIcon={
//               <BaseIcon
//                 containerStyle={{
//                   backgroundColor: '#FECE44',
//                 }}
//                 icon={{
//                   type: 'entypo',
//                   name: 'star',
//                 }}
//               />
//             }
//             rightIcon={<Chevron />}
//           />
//           <ListItem
//             title="Send FeedBack"
//             onPress={() => this.onPressOptions()}
//             containerStyle={styles.listItemContainer}
//             leftIcon={
//               <BaseIcon
//                 containerStyle={{
//                   backgroundColor: '#00C001',
//                 }}
//                 icon={{
//                   type: 'materialicon',
//                   name: 'feedback',
//                 }}
//               />
//             }
//             rightIcon={<Chevron />}
//           />
//         </View>
//       </ScrollView>
//     )
//   }
// }

// export default SettingsScreen


import React, {Component} from 'react';
/*Components*/
import {Animated, View, StatusBar, Text, Image, Platform, StyleSheet, Linking, TouchableOpacity} from 'react-native';
import MaterialAnimatedView from './Components/MaterialAnimation'
import Icons from "react-native-vector-icons/MaterialCommunityIcons";
/*utils*/
import styles from './style';
import {ThemeUtils, Color} from '../../constants/';
/*Data*/
import coverImage from '../../../images/nona1.png'
import profileImage from '../../../images/nona5.png'

const ARTIST_NAME = 'Bob Marley';
const artistData = [
  {
    "id": 1,
    "songName": "So Much Trouble In The World",
    "albumName": "Survival",
    "artistImage": "https://c-5uwzmx78pmca09x24qx2egbquox2ekwu.g00.ranker.com/g00/3_c-5eee.zivsmz.kwu_/c-5UWZMXPMCA09x24pbbx78ax3ax2fx2fq.gbquo.kwux2fdqx2foINjGBdFFgGx2fpylmnictb.rx78ox3fq98k.uizsx3dquiom_$/$/$/$",
    "songLink": "http://spoti.fi/1czPgmI"
  },
  {
    "id": 2,
    "songName": "Could You Be Loved",
    "albumName": "Uprising",
    "artistImage": "https://c-5uwzmx78pmca09x24qx2egbquox2ekwu.g00.ranker.com/g00/3_c-5eee.zivsmz.kwu_/c-5UWZMXPMCA09x24pbbx78ax3ax2fx2fq.gbquo.kwux2fdqx2faT_JkiQ8q8ex2fpylmnictb.rx78ox3fq98k.uizsx3dquiom_$/$/$/$",
    "songLink": "http://spoti.fi/1czPfz9"
  },
  {
    "id": 3,
    "songName": "Redemption Song",
    "albumName": "Uprising",
    "artistImage": "https://i.ytimg.com/vi/QrY9eHkXTa4/hqdefault.jpg",
    "songLink": "http://spoti.fi/1czP9HP"
  },
  {
    "id": 4,
    "songName": "Jamming",
    "albumName": "Kaya",
    "artistImage": "https://c-5uwzmx78pmca09x24qx2egbquox2ekwu.g00.ranker.com/g00/3_c-5eee.zivsmz.kwu_/c-5UWZMXPMCA09x24pbbx78ax3ax2fx2fq.gbquo.kwux2fdqx2f3EtKlqC7QhIx2fpylmnictb.rx78ox3fq98k.uizsx3dquiom_$/$/$/$",
    "songLink": "http://spoti.fi/1czPfz2"
  },
  {
    "id": 5,
    "songName": "Get Up, Stand Up",
    "albumName": "Burnin",
    "artistImage": "https://c-5uwzmx78pmca09x24qx2egbquox2ekwu.g00.ranker.com/g00/3_c-5eee.zivsmz.kwu_/c-5UWZMXPMCA09x24pbbx78ax3ax2fx2fq.gbquo.kwux2fdqx2fy5qFkSSx78lf8x2fpylmnictb.rx78ox3fq98k.uizsx3dquiom_$/$/$/$",
    "songLink": "http://spoti.fi/1czPdax"
  },
  {
    "id": 6,
    "songName": "Stir It Up",
    "albumName": "Catch a Fire",
    "artistImage": "https://c-5uwzmx78pmca09x24qx2egbquox2ekwu.g00.ranker.com/g00/3_c-5eee.zivsmz.kwu_/c-5UWZMXPMCA09x24pbbx78ax3ax2fx2fq.gbquo.kwux2fdqx2fv4C-BOipedax2fpylmnictb.rx78ox3fq98k.uizsx3dquiom_$/$/$/$",
    "songLink": "http://spoti.fi/1czPg63"
  },
  {
    "id": 7,
    "songName": "Exodus",
    "albumName": "Exodus, Kaya",
    "artistImage": "https://c-5uwzmx78pmca09x24qx2egbquox2ekwu.g00.ranker.com/g00/3_c-5eee.zivsmz.kwu_/c-5UWZMXPMCA09x24pbbx78ax3ax2fx2fq.gbquo.kwux2fdqx2f_x78s8dM-UU_ox2flmnictb.rx78ox3fq98k.uizsx3dquiom_$/$/$/$",
    "songLink": "http://spoti.fi/1czPfPB"
  },
  {
    "id": 8,
    "songName": "Sun Is Shining",
    "albumName": "Soul Revolution, The Wailing Wailers, Soul Revolution Part II",
    "artistImage": "https://c-5uwzmx78pmca09x24qx2egbquox2ekwu.g00.ranker.com/g00/3_c-5eee.zivsmz.kwu_/c-5UWZMXPMCA09x24pbbx78ax3ax2fx2fq.gbquo.kwux2fdqx2f-qsdG71s6vax2fpylmnictb.rx78ox3fq98k.uizsx3dquiom_$/$/$/$",
    "songLink": "http://spoti.fi/1czPg67"
  },
  {
    "id": 9,
    "songName": "Positive Vibration",
    "albumName": "Rastaman Vibration",
    "artistImage": "https://c-5uwzmx78pmca09x24qx2egbquox2ekwu.g00.ranker.com/g00/3_c-5eee.zivsmz.kwu_/c-5UWZMXPMCA09x24pbbx78ax3ax2fx2fq.gbquo.kwux2fdqx2fAOo__AF6PgUx2fpylmnictb.rx78ox3fq98k.uizsx3dquiom_$/$/$/$",
    "songLink": "http://spoti.fi/1czPha1"
  },
  {
    "id": 10,
    "songName": "Easy Skanking",
    "albumName": " Kaya",
    "artistImage": "https://c-5uwzmx78pmca09x24qx2egbquox2ekwu.g00.ranker.com/g00/3_c-5eee.zivsmz.kwu_/c-5UWZMXPMCA09x24pbbx78ax3ax2fx2fq.gbquo.kwux2fdqx2fXBt1mibx786-Yx2fpylmnictb.rx78ox3fq98k.uizsx3dquiom_$/$/$/$",
    "songLink": "http://spoti.fi/1czPgTC"
  },
  {
    "id": 11,
    "songName": "No Woman, No Cry",
    "albumName": "Natty Dread",
    "artistImage": "https://c-5uwzmx78pmca09x24qx2egbquox2ekwu.g00.ranker.com/g00/3_c-5eee.zivsmz.kwu_/c-5UWZMXPMCA09x24pbbx78ax3ax2fx2fq.gbquo.kwux2fdqx2ff37sA0IWzOUx2fpylmnictb.rx78ox3fq98k.uizsx3dquiom_$/$/$/$",
    "songLink": "http://spoti.fi/1czP9HA"
  },
  {
    "id": 12,
    "songName": "Africa Unite",
    "albumName": "Survival",
    "artistImage": "https://c-5uwzmx78pmca09x24qx2egbquox2ekwu.g00.ranker.com/g00/3_c-5eee.zivsmz.kwu_/c-5UWZMXPMCA09x24pbbx78ax3ax2fx2fq.gbquo.kwux2fdqx2fNx78nfL8gG4n6x2fpylmnictb.rx78ox3fq98k.uizsx3dquiom_$/$/$/$",
    "songLink": "http://spoti.fi/1czPha5"
  }
];
export default class ArtistScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            scrollY: new Animated.Value(0)
        };
    }

    openLink = (url) => {
        // Linking.canOpenURL(url)
        //     .then((supported) => {
        //         if (!supported) {
        //             console.log("Can't handle url: " + url);
        //         } else {
        //             return Linking.openURL(url);
        //         }
        //     })
        //     .catch((err) => console.error('An error occurred', err));
    };

    renderArtistCard = (index, item) => {
        return (
            <MaterialAnimatedView key={index.toString()} index={index}>
                <TouchableOpacity activeOpacity={0.8} style={styles.artistCardContainerStyle}
                                  onPress={() => this.openLink(item.songLink)}>
                    <Image source={{uri: item.artistImage}} style={styles.artistImage}/>
                    <View style={styles.cardTextContainer}>
                        <Text numberOfLines={1} style={styles.songTitleStyle}>{item.songName}</Text>
                        <Text numberOfLines={1}>{item.albumName}</Text>
                    </View>
                </TouchableOpacity>
            </MaterialAnimatedView>
        )
    };

    //For header background color from transparent to header color
    _getHeaderBackgroundColor = () => {
        const {scrollY} = this.state;

        return scrollY.interpolate({
            inputRange: [0, 140],
            outputRange: ['rgba(0,0,0,0.0)', Color.HEADER_COLOR],
            extrapolate: 'clamp',
            useNativeDriver: true
        });
    };

    //For header image opacity
    _getHeaderImageOpacity = () => {
        const {scrollY} = this.state;

        return scrollY.interpolate({
            inputRange: [0, 140],
            outputRange: [1, 0],
            extrapolate: 'clamp',
            useNativeDriver: true
        });
    };

    //artist profile image position from left
    _getImageLeftPosition = () => {
        const {scrollY} = this.state;

        return scrollY.interpolate({
            inputRange: [0, 80, 140],
            outputRange: [ThemeUtils.relativeWidth(30), ThemeUtils.relativeWidth(38), ThemeUtils.relativeWidth(10)],
            extrapolate: 'clamp',
            useNativeDriver: true
        });
    };

    //artist profile image position from top
    _getImageTopPosition = () => {
        const {scrollY} = this.state;

        return scrollY.interpolate({
            inputRange: [0, 140],
            outputRange: [ThemeUtils.relativeHeight(20), Platform.OS === 'ios' ? 8 : 10],
            extrapolate: 'clamp',
            useNativeDriver: true
        });
    };

    //artist profile image width
    _getImageWidth = () => {
        const {scrollY} = this.state;

        return scrollY.interpolate({
            inputRange: [0, 140],
            outputRange: [ThemeUtils.relativeWidth(40), ThemeUtils.APPBAR_HEIGHT - 20],
            extrapolate: 'clamp',
            useNativeDriver: true
        });
    };

    //artist profile image height
    _getImageHeight = () => {
        const {scrollY} = this.state;

        return scrollY.interpolate({
            inputRange: [0, 140],
            outputRange: [ThemeUtils.relativeWidth(40), ThemeUtils.APPBAR_HEIGHT - 20],
            extrapolate: 'clamp',
            useNativeDriver: true
        });
    };

    //artist profile image border width
    _getImageBorderWidth = () => {
        const {scrollY} = this.state;

        return scrollY.interpolate({
            inputRange: [0, 140],
            outputRange: [StyleSheet.hairlineWidth * 3, StyleSheet.hairlineWidth],
            extrapolate: 'clamp',
            useNativeDriver: true
        });
    };

    //artist profile image border color
    _getImageBorderColor = () => {
        const {scrollY} = this.state;

        return scrollY.interpolate({
            inputRange: [0, 140],
            outputRange: [Color.CARD_BG_COLOR, 'rgba(0,0,0,0.0)'],
            extrapolate: 'clamp',
            useNativeDriver: true
        });
    };

    //Song list container position from top
    _getListViewTopPosition = () => {
        const {scrollY} = this.state;

        return scrollY.interpolate({
            inputRange: [0, 250],
            outputRange: [ThemeUtils.relativeWidth(100) - ThemeUtils.APPBAR_HEIGHT - 10, 0],
            extrapolate: 'clamp',
            useNativeDriver: true
        });
    };

    //header title opacity
    _getHeaderTitleOpacity = () => {
        const {scrollY} = this.state;

        return scrollY.interpolate({
            inputRange: [0, 20, 50],
            outputRange: [0, 0.5, 1],
            extrapolate: 'clamp',
            useNativeDriver: true
        });
    };

    //artist name opacity
    _getNormalTitleOpacity = () => {
        const {scrollY} = this.state;

        return scrollY.interpolate({
            inputRange: [0, 20, 50],
            outputRange: [1, 0.5, 0],
            extrapolate: 'clamp',
            useNativeDriver: true
        });

    };

    render() {
        const headerBackgroundColor = this._getHeaderBackgroundColor();

        const headerImageOpacity = this._getHeaderImageOpacity();

        const profileImageLeft = this._getImageLeftPosition();

        const profileImageTop = this._getImageTopPosition();

        const profileImageWidth = this._getImageWidth();

        const profileImageHeight = this._getImageHeight();

        const profileImageBorderWidth = this._getImageBorderWidth();

        const profileImageBorderColor = this._getImageBorderColor();

        const listViewTop = this._getListViewTopPosition();

        const headerTitleOpacity = this._getHeaderTitleOpacity();

        const normalTitleOpacity = this._getNormalTitleOpacity();

        return (
            <View style={styles.container}>
                <StatusBar barStyle={'light-content'} backgroundColor={Color.STATUSBAR_COLOR}/>

                <Animated.Image
                    style={[styles.headerImageStyle, {
                        opacity: headerImageOpacity,

                    }]}
                    source={coverImage}/>

                <Animated.View style={[styles.headerStyle, {
                    backgroundColor: headerBackgroundColor,
                }]}>

                    <View style={styles.headerLeftIcon}>
                        <Icons name={"arrow-left"} size={25} color={Color.HEADER_BACK_ICON_COLOR}/>
                    </View>

                    <View style={styles.headerRightIcon}>
                        <Icons name={"settings"} size={25} color={Color.HEADER_BACK_ICON_COLOR}/>
                    </View>

                    <Animated.Text
                        style={[styles.headerTitle, {
                            opacity: headerTitleOpacity
                        }]}>
                        {ARTIST_NAME}
                    </Animated.Text>

                </Animated.View>

                <Animated.Image
                    style={
                        [styles.profileImage, {
                            borderWidth: profileImageBorderWidth,
                            borderColor: profileImageBorderColor,
                            borderRadius: (ThemeUtils.APPBAR_HEIGHT - 20) / 2,
                            height: profileImageHeight,
                            width: profileImageWidth,
                            transform: [
                                {translateY: profileImageTop},
                                {translateX: profileImageLeft}
                            ]
                        }]}
                    source={profileImage}
                />

                <Animated.ScrollView
                    overScrollMode={'never'}
                    style={{zIndex: 10}}
                    scrollEventThrottle={16}
                    onScroll={Animated.event(
                        [
                            {
                                nativeEvent: {contentOffset: {y: this.state.scrollY}}
                            }
                        ]
                    )}>
                    <Animated.Text style={[
                        styles.profileTitle, {
                            opacity: normalTitleOpacity,
                        }
                    ]}
                    >
                        {ARTIST_NAME}
                    </Animated.Text>

                    <Animated.Text style={[
                        styles.songCountStyle, {
                            opacity: normalTitleOpacity,
                        }
                    ]}>
                        {`♬ ${artistData.length} songs`}
                    </Animated.Text>

                    <Animated.View style={{
                        transform: [{
                            translateY: listViewTop
                        }],
                    }}>
                        {artistData.map((item, index) => this.renderArtistCard(index, item))}
                    </Animated.View>

                </Animated.ScrollView>
            </View>
        );
    }
}