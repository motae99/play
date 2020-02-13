// // import React from 'react';

// // import {
// //   Platform,
// //   ScrollView,
// //   StatusBar,
// //   StyleSheet,
// //   View,
// // } from 'react-native';

// // import Row from './Row';

// // const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : 0;

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //   },
// //   scrollView: {
// //     backgroundColor: '#4A637D',
// //     flex: 1,
// //     padding: 10,
// //     paddingTop: STATUSBAR_HEIGHT,
// //   },
// // });

// // export default () => (
// //   <View style={styles.container}>
// //     <StatusBar
// //       barStyle="light-content"
// //     />
// //     <ScrollView
// //       style={styles.scrollView}
// //     >
// //       <Row zIndex={100} />
// //       {/* <Row zIndex={90} />
// //       <Row zIndex={80} />
// //       <Row zIndex={70} /> */}
// //     </ScrollView>
// //   </View>
// // );

// /* eslint-disable */
// // Slider works check fast image and need to be designed to add other component on top
// // import React, {Component} from 'react';
// // import {StyleSheet, SafeAreaView, View} from 'react-native';
// // import FastImage from 'react-native-fast-image';

// // // import {SliderBox} from './components/SliderBox'; // for develop time, first add:>>    yarn add react-native-snap-carousel
// // import {SliderBox} from 'react-native-image-slider-box';

// // export default class App extends Component {
// //   constructor(props) {
// //     super(props);
// //     this.state = {
// //       images: [
// //         'https://images.unsplash.com/photo-1496595351388-d74ec2c9c9cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1364&q=80',
// //         'https://images.unsplash.com/photo-1500731753043-cbb4269ca2ac?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1385&q=80',
// //         'https://images.unsplash.com/photo-1522262139463-236991a708cb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1406&q=80',
// //         'https://images.unsplash.com/photo-1446059004666-8148312ba98b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
// //         'https://images.unsplash.com/photo-1540544660406-6a69dacb2804?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1431&q=80',
// //         // require('./assets/images/girl.jpg'),
// //       ],
// //     };
// //   }

// //   onLayout = e => {
// //     this.setState({
// //       width: e.nativeEvent.layout.width,
// //       height: e.nativeEvent.layout.height,
// //     });
// //   };

// //   render() {
// //     return (
// //       <SafeAreaView style={styles.container} onLayout={this.onLayout}>
// //         <SliderBox
// //         // add to android/app/proguard-rules.pro
// //         // -keep public class com.dylanvann.fastimage.* {*;}
// //         // -keep public class com.dylanvann.fastimage.** {*;}
// //         // -keep public class * implements com.bumptech.glide.module.GlideModule
// //         // -keep public class * extends com.bumptech.glide.module.AppGlideModule
// //         // -keep public enum com.bumptech.glide.load.ImageHeaderParser$** {
// //         //   **[] $VALUES;
// //         //   public *;
// //         // }
// //         // for handling image caches
// //         //   ImageComponent={FastImage}
// //           images={this.state.images}
// //           sliderBoxHeight={200}
// //           onCurrentImagePressed={index =>
// //             console.warn(`image ${index} pressed`)
// //           }
// //           //currentImageEmitter={index => console.warn(`image ${index} pressed`)}
// //           dotColor="#FFEE58"
// //           inactiveDotColor="#90A4AE"
// //           paginationBoxVerticalPadding={20}
// //           paginationBoxStyle={{
// //             position: 'absolute',
// //             bottom: 0,
// //             padding: 0,
// //             alignItems: 'center',
// //             alignSelf: 'center',
// //             justifyContent: 'center',
// //             paddingVertical: 10,
// //           }}
// //           dotStyle={{
// //             width: 10,
// //             height: 10,
// //             borderRadius: 5,
// //             marginHorizontal: 0,
// //             padding: 0,
// //             margin: 0,
// //             backgroundColor: 'rgba(128, 128, 128, 0.92)',
// //           }}
// //           autoplay
// //           circleLoop
// //         />
// //       </SafeAreaView>
// //     );
// //   }
// // }

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //   },
// // });

// // full example snap//////////////

// // import React, { Component } from 'react';
// // import { Platform, View, ScrollView, Text, StatusBar, SafeAreaView } from 'react-native';
// // import LinearGradient from 'react-native-linear-gradient';
// // import Carousel, { Pagination } from 'react-native-snap-carousel';
// // import { sliderWidth, itemWidth } from './snap/example/src/styles/SliderEntry.style';
// // import SliderEntry from './snap/example/src/components/SliderEntry';
// // import styles, { colors } from './snap/example/src/styles/index.style';
// // import { ENTRIES1, ENTRIES2 } from './snap/example/src/static/entries';
// // import { scrollInterpolators, animatedStyles } from './snap/example/src/utils/animations';

// // const IS_ANDROID = Platform.OS === 'android';
// // const SLIDER_1_FIRST_ITEM = 1;

// // export default class example extends Component {

// //     constructor (props) {
// //         super(props);
// //         this.state = {
// //             slider1ActiveSlide: SLIDER_1_FIRST_ITEM
// //         };
// //     }

// //     _renderItem ({item, index}) {
// //         return <SliderEntry data={item} even={(index + 1) % 2 === 0} />;
// //     }

// //     _renderItemWithParallax ({item, index}, parallaxProps) {
// //         return (
// //             <SliderEntry
// //               data={item}
// //               even={(index + 1) % 2 === 0}
// //               parallax={true}
// //               parallaxProps={parallaxProps}
// //             />
// //         );
// //     }

// //     _renderLightItem ({item, index}) {
// //         return <SliderEntry data={item} even={false} />;
// //     }

// //     _renderDarkItem ({item, index}) {
// //         return <SliderEntry data={item} even={true} />;
// //     }

// //     mainExample (number, title) {
// //         const { slider1ActiveSlide } = this.state;

// //         return (
// //             <View style={styles.exampleContainer}>
// //                 <Text style={styles.title}>{`Example ${number}`}</Text>
// //                 <Text style={styles.subtitle}>{title}</Text>
// //                 <Carousel
// //                   ref={c => this._slider1Ref = c}
// //                   data={ENTRIES1}
// //                   renderItem={this._renderItemWithParallax}
// //                   sliderWidth={sliderWidth}
// //                   itemWidth={itemWidth}
// //                   hasParallaxImages={true}
// //                   firstItem={SLIDER_1_FIRST_ITEM}
// //                   inactiveSlideScale={0.94}
// //                   inactiveSlideOpacity={0.7}
// //                   // inactiveSlideShift={20}
// //                   containerCustomStyle={styles.slider}
// //                   contentContainerCustomStyle={styles.sliderContentContainer}
// //                   loop={true}
// //                   loopClonesPerSide={2}
// //                   autoplay={true}
// //                   autoplayDelay={500}
// //                   autoplayInterval={3000}
// //                   onSnapToItem={(index) => this.setState({ slider1ActiveSlide: index }) }
// //                 />
// //                 <Pagination
// //                   dotsLength={ENTRIES1.length}
// //                   activeDotIndex={slider1ActiveSlide}
// //                   containerStyle={styles.paginationContainer}
// //                   dotColor={'rgba(255, 255, 255, 0.92)'}
// //                   dotStyle={styles.paginationDot}
// //                   inactiveDotColor={colors.black}
// //                   inactiveDotOpacity={0.4}
// //                   inactiveDotScale={0.6}
// //                   carouselRef={this._slider1Ref}
// //                   tappableDots={!!this._slider1Ref}
// //                 />
// //             </View>
// //         );
// //     }

// //     momentumExample (number, title) {
// //         return (
// //             <View style={styles.exampleContainer}>
// //                 <Text style={styles.title}>{`Example ${number}`}</Text>
// //                 <Text style={styles.subtitle}>{title}</Text>
// //                 <Carousel
// //                   data={ENTRIES2}
// //                   renderItem={this._renderItem}
// //                   sliderWidth={sliderWidth}
// //                   itemWidth={itemWidth}
// //                   inactiveSlideScale={0.95}
// //                   inactiveSlideOpacity={1}
// //                   enableMomentum={true}
// //                   activeSlideAlignment={'start'}
// //                   containerCustomStyle={styles.slider}
// //                   contentContainerCustomStyle={styles.sliderContentContainer}
// //                   activeAnimationType={'spring'}
// //                   activeAnimationOptions={{
// //                       friction: 4,
// //                       tension: 40
// //                   }}
// //                 />
// //             </View>
// //         );
// //     }

// //     layoutExample (number, title, type) {
// //         const isTinder = type === 'tinder';
// //         return (
// //             <View style={[styles.exampleContainer, isTinder ? styles.exampleContainerDark : styles.exampleContainerLight]}>
// //                 <Text style={[styles.title, isTinder ? {} : styles.titleDark]}>{`Example ${number}`}</Text>
// //                 <Text style={[styles.subtitle, isTinder ? {} : styles.titleDark]}>{title}</Text>
// //                 <Carousel
// //                   data={isTinder ? ENTRIES2 : ENTRIES1}
// //                   renderItem={isTinder ? this._renderLightItem : this._renderItem}
// //                   sliderWidth={sliderWidth}
// //                   itemWidth={itemWidth}
// //                   containerCustomStyle={styles.slider}
// //                   contentContainerCustomStyle={styles.sliderContentContainer}
// //                   layout={type}
// //                   loop={true}
// //                 />
// //             </View>
// //         );
// //     }

// //     customExample (number, title, refNumber, renderItemFunc) {
// //         const isEven = refNumber % 2 === 0;

// //         // Do not render examples on Android; because of the zIndex bug, they won't work as is
// //         return !IS_ANDROID ? (
// //             <View style={[styles.exampleContainer, isEven ? styles.exampleContainerDark : styles.exampleContainerLight]}>
// //                 <Text style={[styles.title, isEven ? {} : styles.titleDark]}>{`Example ${number}`}</Text>
// //                 <Text style={[styles.subtitle, isEven ? {} : styles.titleDark]}>{title}</Text>
// //                 <Carousel
// //                   data={isEven ? ENTRIES2 : ENTRIES1}
// //                   renderItem={renderItemFunc}
// //                   sliderWidth={sliderWidth}
// //                   itemWidth={itemWidth}
// //                   containerCustomStyle={styles.slider}
// //                   contentContainerCustomStyle={styles.sliderContentContainer}
// //                   scrollInterpolator={scrollInterpolators[`scrollInterpolator${refNumber}`]}
// //                   slideInterpolatedStyle={animatedStyles[`animatedStyles${refNumber}`]}
// //                   useScrollView={true}
// //                 />
// //             </View>
// //         ) : false;
// //     }

// //     get gradient () {
// //         return (
// //             <LinearGradient
// //               colors={[colors.background1, colors.background2]}
// //               startPoint={{ x: 1, y: 0 }}
// //               endPoint={{ x: 0, y: 1 }}
// //               style={styles.gradient}
// //             />
// //         );
// //     }

// //     render () {
// //         const example1 = this.mainExample(1, 'Default layout | Loop | Autoplay | Parallax | Scale | Opacity | Pagination with tappable dots');
// //         const example2 = this.momentumExample(2, 'Momentum | Left-aligned | Active animation');
// //         const example3 = this.layoutExample(3, '"Stack of cards" layout | Loop', 'stack');
// //         const example4 = this.layoutExample(4, '"Tinder-like" layout | Loop', 'tinder');
// //         const example5 = this.customExample(5, 'Custom animation 1', 1, this._renderItem);
// //         const example6 = this.customExample(6, 'Custom animation 2', 2, this._renderLightItem);
// //         const example7 = this.customExample(7, 'Custom animation 3', 3, this._renderDarkItem);
// //         const example8 = this.customExample(8, 'Custom animation 4', 4, this._renderLightItem);

// //         return (
// //             <SafeAreaView style={styles.safeArea}>
// //                 <View style={styles.container}>
// //                     <StatusBar
// //                       translucent={true}
// //                       backgroundColor={'rgba(0, 0, 0, 0.3)'}
// //                       barStyle={'light-content'}
// //                     />
// //                     { this.gradient }
// //                     <ScrollView
// //                       style={styles.scrollview}
// //                       scrollEventThrottle={200}
// //                       directionalLockEnabled={true}
// //                     >
// //                         { example1 }
// //                         { example2 }
// //                         { example3 }
// //                         { example4 }
// //                         { example5 }
// //                         { example6 }
// //                         { example7 }
// //                         { example8 }
// //                     </ScrollView>
// //                 </View>
// //             </SafeAreaView>
// //         );
// //     }
// // }



// // full example snap//////////////

// // import React, { Component } from 'react';
// // import { Platform, View, ScrollView, Text, StatusBar, SafeAreaView } from 'react-native';
// // import LinearGradient from 'react-native-linear-gradient';
// // import Carousel, { Pagination } from 'react-native-snap-carousel';
// // import { sliderWidth, itemWidth } from './snap/example/src/styles/SliderEntry.style';
// // import SliderEntry from './snap/example/src/components/SliderEntry';
// // import styles, { colors } from './snap/example/src/styles/index.style';
// // import { ENTRIES1, ENTRIES2 } from './snap/example/src/static/entries';
// // import { scrollInterpolators, animatedStyles } from './snap/example/src/utils/animations';

// // const IS_ANDROID = Platform.OS === 'android';
// // const SLIDER_1_FIRST_ITEM = 1;

// // export default class example extends Component {

// //     constructor (props) {
// //         super(props);
// //         this.state = {
// //             slider1ActiveSlide: SLIDER_1_FIRST_ITEM
// //         };
// //     }


// //     _renderItemWithParallax ({item, index}, parallaxProps) {
// //         return (
// //             <SliderEntry
// //               data={item}
// //               even={(index + 1) % 2 === 0}
// //               parallax={true}
// //               parallaxProps={parallaxProps}
// //             />
// //         );
// //     }



// //     mainExample (number, title) {
// //         const { slider1ActiveSlide } = this.state;

// //         return (
// //             <View style={styles.exampleContainer}>
// //                 <Text style={styles.title}>{`Home Page ${number}`}</Text>
// //                 <Text style={styles.subtitle}>{title}</Text>
// //                 <Carousel
// //                   ref={c => this._slider1Ref = c}
// //                   data={ENTRIES1}
// //                   renderItem={this._renderItemWithParallax}
// //                   sliderWidth={sliderWidth}
// //                   itemWidth={itemWidth}

// //                   // change this in sliderEntry.style
// //                   //  or in sliderEntry file
// //                 //   slideInnerContainer: {
// //                 //     width: itemWidth,
// //                 //     height: 450,
// //                 //     paddingHorizontal: itemHorizontalMargin,
// //                 //     paddingBottom: 18 // needed for shadow
// //                 // },

// //                   hasParallaxImages={true}
// //                   firstItem={SLIDER_1_FIRST_ITEM}
// //                   inactiveSlideScale={0.94}
// //                   inactiveSlideOpacity={0.7}
// //                   inactiveSlideShift={20}
// //                   containerCustomStyle={styles.slider}
// //                   contentContainerCustomStyle={styles.sliderContentContainer}
// //                   // loop={true}
// //                   // loopClonesPerSide={2}
// //                   // autoplay={true}
// //                   // autoplayDelay={500}
// //                   // autoplayInterval={3000}
// //                   // onSnapToItem={(index) => this.setState({ slider1ActiveSlide: index }) }
// //                 />
// //                 {/* <Pagination
// //                   dotsLength={ENTRIES1.length}
// //                   activeDotIndex={slider1ActiveSlide}
// //                   containerStyle={styles.paginationContainer}
// //                   dotColor={'rgba(255, 255, 255, 0.92)'}
// //                   dotStyle={styles.paginationDot}
// //                   inactiveDotColor={colors.black}
// //                   inactiveDotOpacity={0.4}
// //                   inactiveDotScale={0.6}
// //                   carouselRef={this._slider1Ref}
// //                   tappableDots={!!this._slider1Ref}
// //                 /> */}
// //             </View>
// //         );
// //     }


// //     get gradient () {
// //         return (
// //             <LinearGradient
// //               colors={[colors.background1, colors.background2]}
// //               startPoint={{ x: 1, y: 0 }}
// //               endPoint={{ x: 0, y: 1 }}
// //               style={styles.gradient}
// //             />
// //         );
// //     }

// //     render () {
// //         const Home = this.mainExample(6, 'Main Page for listing');
// //         return (
// //             <SafeAreaView style={styles.safeArea}>
// //                 <View style={styles.container}>
// //                     <StatusBar
// //                       translucent={true}
// //                       backgroundColor={'rgba(0, 0, 0, 0.3)'}
// //                       barStyle={'light-content'}
// //                     />
// //                     { this.gradient }
// //                     <ScrollView
// //                       style={styles.scrollview}
// //                       scrollEventThrottle={200}
// //                       directionalLockEnabled={true}
// //                     >
// //                         { Home }
// //                     </ScrollView>
// //                 </View>
// //             </SafeAreaView>
// //         );
// //     }
// // }

// // full example snap//////////////


// /// wix Calendar Agenda//

// // import React, { Component } from 'react';
// // import {
// //   Text,
// //   View,
// //   StyleSheet,
// //   TouchableOpacity,
// //   Image,
// //   ScrollView
// // } from 'react-native';
// // import {Agenda} from 'react-native-calendars';
// // import ViewPagerAndroid from '@react-native-community/viewpager'


// // const dayImage = require('./day.png');
// // const nightImage = require('./night.png');

// // export default class AgendaScreen extends Component {
// //   constructor(props) {
// //     super(props);
// //     this.state = {
// //       items: {}
// //     };
// //   }

// //   render() {
// //     return (
// //     <View>
// //       <View style={{
// //         // borderWidth: 1,
// //         // borderColor: 'gray',
// //         height: 10
// //       }}> 
// //       </View>
// //       <View style={{
// //         height: 400,
// //         // width: 300
// //       }}>  
// //       <Agenda 
// //         // Initially visible month. Default = Date()
// //         // current={'2020-01-05'}
// //         // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
// //         minDate={this.timeToString(Date())}
// //         // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
// //         // maxDate={'2020-10-30'}
// //         items={this.state.items}
// //         loadItemsForMonth={this.loadItems.bind(this)}
// //         selected={this.timeToString(Date())}
// //         renderItem={this.renderItem.bind(this)}
// //         renderEmptyDate={this.renderEmptyDate.bind(this)}
// //         rowHasChanged={this.rowHasChanged.bind(this)}
// //         renderEmptyData={() => { return null }}  // instead of having empty arrays everywhere
// //         // onDayPress={(day) => {console.log('selected day', day)}}
// //         // Handler which gets executed on day long press. Default = undefined
// //         // onDayLongPress={(day) => {console.log('long pressselected day', day)}}
// //         // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting

// //         // Max amount of months allowed to scroll to the past. Default = 50
// //         pastScrollRange={1}
// //         // Max amount of months allowed to scroll to the future. Default = 50
// //         futureScrollRange={6}
// //         // Enable or disable scrolling of calendar list
// //         // scrollEnabled={true}
// //         // Enable or disable vertical scroll indicator. Default = false
// //         // showScrollIndicator={true}        

// //         // markingType={'period'}
// //         // markedDates={{
// //         //    '2017-05-08': {textColor: '#666'},
// //         //    '2017-05-09': {textColor: '#666'},
// //         //    '2017-05-14': {startingDay: true, endingDay: true, color: 'blue'},
// //         //    '2017-05-21': {startingDay: true, color: 'blue'},
// //         //    '2017-05-22': {endingDay: true, color: 'gray'},
// //         //    '2017-05-24': {startingDay: true, color: 'gray'},
// //         //    '2017-05-25': {color: 'gray'},
// //         //    '2017-05-26': {endingDay: true, color: 'gray'}}}
// //         // monthFormat={'yyyy'}
// //         // theme={{calendarBackground: 'red', agendaKnobColor: 'green'}}
// //         //renderDay={(day, item) => (<Text>{day ? day.day: 'item'}</Text>)}
// //       />
// //     </View>
// //     <View style={{
// //       // borderWidth: 1,
// //       // borderColor: 'gray',
// //       height: 10
// //     }}> 
// //     </View>
// //     <View style={{
// //       // borderWidth: 1,
// //       // borderColor: 'gray',
// //       height: 10
// //     }}> 
// //     </View>
// //   </View>
// //     );
// //   }

// //   loadItems(day) {
   
    
// //     setTimeout(() => {
// //       for (let i = 0; i < 99; i++) {
// //         const time = day.timestamp + i * 24 * 60 * 60 * 1000;
// //         const strTime = this.timeToString(time);
// //         const strDate = this.timeToString(Date());
// //         // remember to stop generating data according to your calender max scrooling months
// //         if(strTime >= strDate){
// //           // console.log(strTime, "greater tthen procceed", strDate);
// //           if (!this.state.items[strTime] ) {
// //             this.state.items[strTime] = [];
// //             this.state.items[strTime].push({
// //               date: strTime
// //             });
// //             // const numItems = Math.floor(Math.random() * 5);
// //             // for (let j = 0; j < numItems; j++) {
              
// //             //   this.state.items[strTime].push({
// //             //     name: 'Item for ' + strTime,
// //             //     height: Math.max(50, Math.floor(Math.random() * 150)),
// //             //   });
// //             // }
  
// //           }
// //         }
// //       }
// //       console.log(this.state.items);
// //       const newItems = {};
// //       Object.keys(this.state.items).forEach(
// //         key => {newItems[key] = this.state.items[key];});
// //       this.setState({
// //         items: newItems
// //       });
// //     }, 1000);
// //     // console.log(`Load Items for ${day.year}-${day.month}`);
// //   }


// // option = (dateOption, timeOption) => {
// //   console.log('touched on date', dateOption)
// //   console.log('touched on date', timeOption)

// // }

// //   renderItem(item) {
// //     return (
// //       <View style={[styles.row]}>
// //         <TouchableOpacity
// //           onPress={() => this.option(item.date, 'day') }
// //           style={[styles.item]}
// //         >
// //           <Image
// //             resizeMode="contain"
// //             source={dayImage}
// //             style={[styles.itemImage]}
// //           />
// //           <Text style={[styles.itemText]}>Day Time</Text>
// //         </TouchableOpacity>

// //         <TouchableOpacity
// //           onPress={() => this.option(item.date, 'night') }
// //           style={[styles.item]}
// //         >
// //           <Image
// //             resizeMode="contain"
// //             source={nightImage}
// //             style={[styles.itemImage]}
// //           />
// //           <Text style={[styles.itemText]}>Night Time</Text>
// //         </TouchableOpacity>
// //       </View>
// //     );
// //   }

// //   renderEmptyDate() {
// //     return (
// //       <View style={styles.emptyDate}>
// //         <Text>This is empty date!</Text>
// //       </View>
// //     );
// //   }

// //   rowHasChanged(r1, r2) {
// //     return r1.name !== r2.name;
// //   }

// //   timeToString(time) {
// //     const date = new Date(time);
// //     return date.toISOString().split('T')[0];
// //   }
// // }

// // const styles = StyleSheet.create({
// //   row: {
// //     backgroundColor: 'white',
// //     flexDirection: 'row',
// //     borderRadius: 5,
// //     padding: 10,
// //     marginRight: 10,
// //     marginTop: 17
// //   },
// //   item: {
// //     flex: 1,
// //     height: 100,
// //     paddingVertical: 20,
// //     borderColor: 'gray',
// //     borderWidth: 1,
// //     borderRadius: 5,
// //     alignItems: 'center',
// //     justifyContent: 'space-around',
// //     marginHorizontal: 5,
// //   },
// //   emptyDate: {
// //     height: 15,
// //     flex:1,
// //     paddingTop: 30
// //   },
// //   agenaView: {
// //     height: 200,
// //   },
// //   itemImage: {
// //     height: 35,
// //   },
// //   itemText: {
// //     // color: colors.primary,
// //     // fontFamily: fonts.primary,
// //   },
// // });
// ////wix////////////////
// ///////



// import React, { Component } from 'react'
// import PropTypes from 'prop-types'
// import {
//   View,
//   Text,
//   Image,
//   Keyboard,
//   Platform,
//   StatusBar,
//   ScrollView,
//   StyleSheet,
//   Dimensions,
//   ToastAndroid,
//   TouchableNativeFeedback,
//   TouchableOpacity,
// } from 'react-native'

// import ViewPagerAndroid from '@react-native-community/viewpager'

// import NestedScrollView from 'react-native-nested-scroll-view'



// import {Agenda} from 'react-native-calendars';

// import Icon from 'react-native-vector-icons/Ionicons'
// import IconMDI from 'react-native-vector-icons/MaterialIcons'



// import {
//   CoordinatorLayout,
//   BottomSheetHeader,
//   MergedAppBarLayout,
//   BackdropBottomSheet,
//   BottomSheetBehavior,
//   FloatingActionButton,
//   ScrollingAppBarLayout
// } from  'react-native-bottom-sheet-behavior'

// const { width, height } = Dimensions.get('window')

// const anchorPoint = 235
// const RippleColor = (...args) => (
//   Platform.Version >= 21
//     ? TouchableNativeFeedback.Ripple(...args)
//     : null
// )

// const WHITE = '#FFFFFF'
// const PRIMARY_COLOR = '#4589f2'
// const STATUS_BAR_COLOR = '#205cb2'
// const STAR_COLOR = '#FF5722'

// const { STATE_ANCHOR_POINT, STATE_COLLAPSED } = BottomSheetBehavior

// const images = [
//   require('./images/nona1.png'),
//   require('./images/nona2.png'),
//   require('./images/nona3.png'),
// ]


// //for agenda 
// const dayImage = require('./day.png');
// const nightImage = require('./night.png');


// class GoogleMapsView extends Component {
//   static contextTypes = {
//     openDrawer: PropTypes.func,
//   };

//   state = {
//     hidden: false,
//     viewPagerSelected: 0,
//     items: {}
//   };

//   handleOpenDrawer = () => {
//     Keyboard.dismiss()
//     this.context.openDrawer()
//   }

//   handleFabPress = () => {
//     ToastAndroid.show('Pressed', ToastAndroid.SHORT)
//   }

//   handleState = (state) => {
//     this.bottomSheet.setBottomSheetState(state)
//   }

//   handleHeaderPress = () => {
//     this.handleState(STATE_ANCHOR_POINT)
//   }

//   handleViewPager = (e) => {
//     this.setState({ viewPagerSelected: e.nativeEvent.position })
//   }

//   loadItems(day) {
//     setTimeout(() => {
//       for (let i = 0; i < 99; i++) {
//         const time = day.timestamp + i * 24 * 60 * 60 * 1000;
//         const strTime = this.timeToString(time);
//         const strDate = this.timeToString(Date());
//         if(strTime >= strDate){
//           if (!this.state.items[strTime] ) {
//             this.state.items[strTime] = [];
//             this.state.items[strTime].push({
//               date: strTime
//             });
//           }
//         }
//       }
//       console.log(this.state.items);
//       const newItems = {};
//       Object.keys(this.state.items).forEach(
//         key => {newItems[key] = this.state.items[key];});
//       this.setState({
//         items: newItems
//       });
//     }, 1000);
//   }

//   option = (dateOption, timeOption) => {
//     console.log('touched on date', dateOption)
//     console.log('touched on date', timeOption)

//   }

//   renderItem(item) {
//     return (
//       <View style={[styles.row]}>
//         <TouchableOpacity
//           onPress={() => this.option(item.date, 'day') }
//           style={[styles.item]}
//         >
//           <Image
//             resizeMode="contain"
//             source={dayImage}
//             style={[styles.itemImage]}
//           />
//           <Text style={[styles.itemText]}>Day Time</Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           onPress={() => this.option(item.date, 'night') }
//           style={[styles.item]}
//         >
//           <Image
//             resizeMode="contain"
//             source={nightImage}
//             style={[styles.itemImage]}
//           />
//           <Text style={[styles.itemText]}>Night Time</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }

//   renderEmptyDate() {
//     return (
//       <View style={styles.emptyDate}>
//         <Text>This is empty date!</Text>
//       </View>
//     );
//   }

//   rowHasChanged(r1, r2) {
//     return r1.name !== r2.name;
//   }

//   timeToString(time) {
//     const date = new Date(time);
//     return date.toISOString().split('T')[0];
//   }

//   renderCard(source, title) {
//     return (
//       <View style={styles.card}>
//         <Image source={source} style={styles.cardImage} />
//         <View style={styles.cardContent}>
//           <Text style={styles.cardTitle}>{title}</Text>
//           <Text style={styles.cardDetail}>Beer</Text>
//           <View style={styles.cardStars}>
//             <Text style={{ fontSize: 10, color: STAR_COLOR }}>4.2</Text>
//             <Icon color={STAR_COLOR} name="md-star" size={10} />
//             <Icon color={STAR_COLOR} name="md-star" size={10} />
//             <Icon color={STAR_COLOR} name="md-star" size={10} />
//             <Icon color={STAR_COLOR} name="md-star" size={10} />
//             <Icon color={STAR_COLOR} name="md-star" size={10} />
//             <Text style={{fontSize: 10}}>(52)</Text>
//           </View>
//         </View>
//       </View>
//     )
//   }

//   renderComment(index) {
//     return (
//       <View style={styles.comment}>
//         <View style={{ alignItems: 'center' }}>
//           <Image source={require('./images/nona5.png')} style={styles.picture} />
//           <View style={styles.commentLine} />
//         </View>
//         <View style={styles.commentContent}>
//           <Text style={styles.commentName}>Lorem Ipsum</Text>
//           <Text style={styles.commentNumberReviews}>2 reviews</Text>
//           <View style={styles.commentStars}>
//             <Icon color={STAR_COLOR} name="md-star" size={14} />
//             <Icon color={STAR_COLOR} name="md-star" size={14} />
//             <Icon color={STAR_COLOR} name="md-star" size={14} />
//             <Icon color={STAR_COLOR} name="md-star" size={14} />
//             <Icon color={STAR_COLOR} name="md-star" size={14} />
//             <Text style={{fontSize: 12, marginLeft: 6}}>a month ago</Text>
//           </View>
//           <Text style={styles.commentDescription}>
//             Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque eget blandit sem. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nulla dui eros, gravida vitae mollis in, auctor eget sapien. In suscipit quam non tempus eleifend. Ut lacus massa, pellentesque vitae condimentum eu, dictum et metus
//           </Text>
//           <View style={styles.commentButtons}>
//             <View style={styles.commentButton}>
//               <Icon color='#ccc' name='md-thumbs-up' size={22} />
//               <Text style={styles.commentButtonLabel}>Helpful?</Text>
//             </View>
//             <View style={styles.commentButton}>
//               <Icon color='#ccc' name='md-share' size={22} />
//               <Text style={styles.commentButtonLabel}>Share</Text>
//             </View>
//           </View>
//         </View>
//       </View>
//     )
//   }

//   renderDetailItem(icon, text) {
//     return (
//       <TouchableNativeFeedback delayPressIn={0} delayPressOut={0} background={RippleColor('#d1d1d1')}>
//         <View>
//           <View pointerEvents="none" style={styles.detailItem}>
//             <Icon name={icon} size={22} color={PRIMARY_COLOR} />
//             <Text pointerEvents="none" style={styles.detailText}>{text}</Text>
//           </View>
//         </View>
//       </TouchableNativeFeedback>
//     )
//   }

//   renderAgenda() {
//     return (
//     <View>
//       <View style={{
//         height: 400,
//         // width: 300
//       }}>  
//       <Agenda 
//         minDate={this.timeToString(Date())}
//         items={this.state.items}
//         loadItemsForMonth={this.loadItems.bind(this)}
//         selected={this.timeToString(Date())}
//         renderItem={this.renderItem.bind(this)}
//         renderEmptyDate={this.renderEmptyDate.bind(this)}
//         rowHasChanged={this.rowHasChanged.bind(this)}
//         renderEmptyData={() => { return null }}  // instead of having empty arrays everywhere
//         pastScrollRange={1}
//         futureScrollRange={6}
//       />
//     </View>
//   </View>
//     );
//   }

//   renderBottomSheetContent() {
//     return (
//       <View style={styles.bottomSheetContent}>
//         <View style={styles.sectionIcons}>
//           <View style={styles.iconBox}>
//             <Icon name="md-call" size={22} color={PRIMARY_COLOR} />
//             <Text style={styles.iconLabel}>CALL</Text>
//           </View>
//           <View style={styles.iconBox}>
//             <Icon name="md-star" size={22} color={PRIMARY_COLOR} />
//             <Text style={styles.iconLabel}>SAVE</Text>
//           </View>
//           <View style={styles.iconBox}>
//             <Icon name="md-share" size={22} color={PRIMARY_COLOR} />
//             <Text style={styles.iconLabel}>Share</Text>
//           </View>
//           <View style={styles.iconBox}>
//             <Icon name="md-globe" size={22} color={PRIMARY_COLOR} />
//             <Text style={styles.iconLabel}>WEBSITE</Text>
//           </View>
//         </View>
//         <View style={styles.detailListSection}>
//           {this.renderDetailItem('md-map', 'Av. Lorem Ipsum dolor sit amet - consectetur adipising elit.')}
//           {this.renderDetailItem('md-timer', 'Open now: 06:22:00')}
//           {this.renderDetailItem('md-paper-plane', 'Place an order')}
//           {this.renderDetailItem('md-call', '(11) 9999-9999')}
//           {this.renderDetailItem('md-globe', 'https://github.com/cesardeazevedo/react-native-bottom-sheet-behavior')}
//           {this.renderDetailItem('md-create', 'Suggest an edit')}
//         </View>
//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>Review Summary</Text>
//           <View style={styles.reviewStats}>
//             <View style={styles.reviewStars}>
//               <Text style={styles.reviewStatsItem}>5 <Icon name="md-star" size={16} color='#ccc' /></Text>
//               <Text style={styles.reviewStatsItem}>4 <Icon name="md-star" size={16} color='#ccc' /></Text>
//               <Text style={styles.reviewStatsItem}>3 <Icon name="md-star" size={16} color='#ccc' /></Text>
//               <Text style={styles.reviewStatsItem}>2 <Icon name="md-star" size={16} color='#ccc' /></Text>
//               <Text style={styles.reviewStatsItem}>1 <Icon name="md-star" size={16} color='#ccc' /></Text>
//             </View>
//             <View style={styles.reviewBars}>
//               <View style={[styles.reviewStatsItem, styles.reviewBar, {width: 200}]}></View>
//               <View style={[styles.reviewStatsItem, styles.reviewBar, {width: 100}]}></View>
//               <View style={[styles.reviewStatsItem, styles.reviewBar, {width: 60}]}></View>
//               <View style={[styles.reviewStatsItem, styles.reviewBar, {width: 10}]}></View>
//               <View style={[styles.reviewStatsItem, styles.reviewBar, {width: 30}]}></View>
//             </View>
//             <View style={styles.reviewAverage}>
//               <Text style={styles.reviewAverageText}>4.8</Text>
//               <View style={styles.reviewAverageStars}>
//                 <Icon name="md-star" size={16} color={STAR_COLOR} />
//                 <Icon name="md-star" size={16} color={STAR_COLOR} />
//                 <Icon name="md-star" size={16} color={STAR_COLOR} />
//                 <Icon name="md-star" size={16} color={STAR_COLOR} />
//                 <Icon name="md-star" size={16} color={'#ccc'} />
//               </View>
//               <Text>57 reviews</Text>
//             </View>
//           </View>
//         </View>
//         <View style={[styles.section, styles.rateSection]}>
//           <Image source={require('./images/nona5.png')} style={styles.picture} />
//           <Text style={styles.rateTitle}>Rate and review</Text>
//           <Text>Tell everyone about your experience</Text>
//           <View style={styles.rateStars}>
//             <Icon style={styles.rateStar} name="md-star-outline" size={40} />
//             <Icon style={styles.rateStar} name="md-star-outline" size={40} />
//             <Icon style={styles.rateStar} name="md-star-outline" size={40} />
//             <Icon style={styles.rateStar} name="md-star-outline" size={40} />
//             <Icon style={styles.rateStar} name="md-star-outline" size={40} />
//           </View>
//         </View>
//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>All reviews</Text>
//           {this.renderComment()}
//           <Text style={styles.moreReviews}>MORE REVIEWS</Text>
//         </View>
//         <View style={[styles.section, styles.takeoutSection]}>
//           <Text style={[styles.sectionTitle, {marginLeft: 20}]}>Takeout</Text>
//           <View style={styles.cards}>
//             <ScrollView
//               horizontal
//               showsHorizontalScrollIndicator={false}
//               style={{flex: 1}}>
//               {this.renderCard(images[0], 'Lorem Ipsum')}
//               {this.renderCard(images[1], 'Praesent tristique')}
//               {this.renderCard(images[2], 'Donec ultrices')}
//               {this.renderCard(images[0], 'Cras tincidunt')}
//               {this.renderCard(images[1], 'Proin eu feugiat')}
//             </ScrollView>
//           </View>
//         </View>
//         <ScrollView>
//           <NestedScrollView>
//             {this.renderAgenda()}
//           </NestedScrollView>
//         </ScrollView>
        

//         {/* <View style={[styles.section]}>
//           <Text style={[styles.sectionTitle, {marginLeft: 20}]}>Calender</Text>
//           <View>
//             <ScrollView
//               // horizontal
//               showsHorizontalScrollIndicator={false}
//               // style={{flex: 1}}
//               >
//               {this.renderAgenda()}
//             </ScrollView>
//           </View>
//         </View> */}

//       </View>
//     )
//   }

//   renderFloatingActionButton() {
//     return (
//       <FloatingActionButton
//         autoAnchor
//         elevation={18}
//         rippleEffect={true}
//         rippleColor="#55ffffff"
//         icon="directions"
//         iconProvider={IconMDI}
//         iconColor={WHITE}
//         iconColorExpanded={PRIMARY_COLOR}
//         onPress={this.handleFabPress}
//         backgroundColor={PRIMARY_COLOR}
//         backgroundColorExpanded={WHITE}
//       />
//     )
//   }

//   renderBackdropPager(source) {
//     return (
//       <View>
//         <Image resizeMode="cover" style={{width, height: anchorPoint}} source={source} />
//       </View>
//     )
//   }

//   renderBackdrop() {
//     const { viewPagerSelected } = this.state
//     return (
//       <BackdropBottomSheet height={anchorPoint}>
//         <View style={{flex: 1, backgroundColor: 'white'}}>
//           <ViewPagerAndroid onPageSelected={this.handleViewPager} style={{flex: 1}}>
//             {this.renderBackdropPager(images[0])}
//             {this.renderBackdropPager(images[1])}
//             {this.renderBackdropPager(images[2])}
//           </ViewPagerAndroid>
//           <View style={styles.dots}>
//             <View style={[styles.dot, viewPagerSelected === 0 && styles.dotActive]} />
//             <View style={[styles.dot, viewPagerSelected === 1 && styles.dotActive]} />
//             <View style={[styles.dot, viewPagerSelected === 2 && styles.dotActive]} />
//           </View>
//         </View>
//       </BackdropBottomSheet>
//     )
//   }

//   renderMergedAppBarLayout() {
//     return (
//       <MergedAppBarLayout
//         translucent
//         mergedColor={PRIMARY_COLOR}
//         toolbarColor={PRIMARY_COLOR}
//         statusBarColor={STATUS_BAR_COLOR}
//         style={styles.appBarMerged}>
//         <Icon
//           navIconName="md-arrow-back"
//           overflowIconName='md-more'
//           title='React Native Bar!'
//           titleColor={WHITE}
//           style={{elevation: 6}}
//           onIconClicked={() => this.handleState(STATE_COLLAPSED)}
//           actions={[
//             {title: 'Search', show: 'always', iconName: 'md-search' },
//             {title: 'More'}
//           ]}
//         />
//       </MergedAppBarLayout>
//     )
//   }

//   renderBottomSheet() {
//     return (
//       <BottomSheetBehavior
//         anchorEnabled
//         anchorPoint={anchorPoint}
//         peekHeight={80}
//         elevation={8}
//         ref={(bottomSheet) => { this.bottomSheet = bottomSheet }}
//         onSlide={this.handleSlide}
//         onStateChange={this.handleBottomSheetChange}>
//         <View style={styles.bottomSheet}>
//           <BottomSheetHeader
//             onPress={this.handleHeaderPress}
//             textColorExpanded={WHITE}
//             backgroundColor={WHITE}
//             backgroundColorExpanded={PRIMARY_COLOR}>
//             <View pointerEvents='none' style={styles.bottomSheetHeader}>
//               <View style={styles.bottomSheetLeft}>
//                 <Text selectionColor={'#000'} style={styles.bottomSheetTitle}>
//                   Service Provider Name
//                 </Text>
//                 <View style={styles.starsContainer}>
//                   <Text style={{marginRight: 8}} selectionColor={STAR_COLOR}>5.0</Text>
//                   <Icon name="md-star" size={16} selectionColor={STAR_COLOR} style={styles.star} />
//                   <Icon name="md-star" size={16} selectionColor={STAR_COLOR} style={styles.star} />
//                   <Icon name="md-star" size={16} selectionColor={STAR_COLOR} style={styles.star} />
//                   <Icon name="md-star" size={16} selectionColor={STAR_COLOR} style={styles.star} />
//                   <Icon name="md-star" size={16} selectionColor={STAR_COLOR} style={styles.star} />
//                 </View>
//               </View>
//               <View style={styles.bottomSheetRight}>
//                 <Text style={styles.routeLabel} selectionColor={PRIMARY_COLOR}>4 min</Text>
//               </View>
//             </View>
//           </BottomSheetHeader>
//           {this.renderBottomSheetContent()}
//         </View>
//       </BottomSheetBehavior>
//     )
//   }

//   renderMaps() {
//     return (
//       <View >
//         <Image
//           // style={{flex:1, height: undefined, width: undefined}}
//           // style={{
//           //   alignSelf: 'cover',
//           // }}
//           resizeMode="cover"  
//           source={require('./images/nona3.png')} 
//         />
//         {/* {this.renderAgenda()} */}

//       </View>
//     )
//   }

//   renderToolbar() {
//     return (
//       <ScrollingAppBarLayout
//         translucent
//         style={styles.scrollAppBar}
//         statusBarColor={STATUS_BAR_COLOR}>
//         <Icon
//           titleColor={WHITE}
//           title="Google Maps"
//           navIconName={'md-menu'}
//           style={styles.toolbar}
//           onIconClicked={() => this.context.openDrawer()} />
//       </ScrollingAppBarLayout>
//     )
//   }

//   render() {
//     return (
//       <CoordinatorLayout style={styles.container}>
//         <StatusBar translucent barStyle='dark-content' backgroundColor={STATUS_BAR_COLOR} />
//         {this.renderToolbar()}
//         <View style={styles.content}>
//           {this.renderMaps()}
//           {/* {this.renderBackdrop()} */}
//         </View>
//         {this.renderBackdrop()}
//         {this.renderBottomSheet()}
//         {this.renderMergedAppBarLayout()}
//         {this.renderFloatingActionButton()}
        
//       </CoordinatorLayout>
//     )
//   }



 
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: WHITE,
//   },
//   content: {
//     backgroundColor: 'transparent',
//   },
//   scrollAppBar: {
//     zIndex: 1,
//   },
//   toolbar: {
//     backgroundColor: PRIMARY_COLOR,
//   },
//   appBarMerged: {
//     backgroundColor: 'transparent',
//   },
//   containerMap: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     height,
//     width,
//     justifyContent: 'flex-end',
//     alignItems: 'center',
//   },
//   bottomSheet: {
//     // height,
//     zIndex: 5,
//     backgroundColor: 'white'
//   },
//   bottomSheetHeader: {
//     padding: 16,
//     paddingLeft: 28,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     // Don't forget this if you are using BottomSheetHeader
//     backgroundColor: 'transparent'
//   },
//   bottomSheetLeft: {
//     flexDirection: 'column'
//   },
//   bottomSheetRight: {
//     flexDirection: 'column'
//   },
//   bottomSheetTitle: {
//     fontFamily: 'sans-serif-medium',
//     fontSize: 18,
//   },
//   dots: {
//     position: 'absolute',
//     bottom: 20,
//     left: 0,
//     right: 0,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   dot: {
//     width: 8,
//     height: 8,
//     marginHorizontal: 4,
//     opacity: 0.8,
//     backgroundColor: WHITE,
//     borderRadius: 50,
//   },
//   dotActive: {
//     width: 10,
//     height: 10,
//     opacity: 1,
//   },
//   bottomSheetContent: {
//     // flex: 1,
//     backgroundColor: WHITE,
//   },
//   starsContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   star: {
//     marginHorizontal: 2,
//   },
//   routeLabel: {
//     marginTop: 32,
//     marginRight: 12,
//     fontSize: 12,
//     fontFamily: 'sans-serif-medium',
//   },
//   sectionIcons: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     padding: 18,
//     borderBottomWidth: 1,
//     borderColor: '#eee'
//   },
//   iconBox: {
//     flex: 1,
//     borderRadius: 50,
//     alignItems: 'center',
//     flexDirection: 'column'
//   },
//   iconLabel: {
//     fontSize: 14,
//     marginTop: 4,
//     color: PRIMARY_COLOR
//   },
//   detailListSection: {
//     paddingVertical: 8,
//   },
//   detailItem: {
//     height: 42,
//     alignItems: 'center',
//     flexDirection: 'row',
//     paddingHorizontal: 26,
//   },
//   detailText: {
//     color: '#333',
//     fontSize: 14,
//     marginLeft: 24,
//     lineHeight: 22,
//   },
//   section: {
//     padding: 22,
//     borderColor: '#eee',
//     borderTopWidth: 1,
//   },
//   sectionTitle: {
//     color: '#333',
//     fontSize: 16,
//     fontFamily: 'sans-serif-medium',
//   },
//   reviewStats: {
//     marginTop: 20,
//     flexDirection: 'row',
//   },
//   reviewStars: {
//     flexDirection: 'column',
//     paddingRight: 8,
//   },
//   reviewStatsItem: {
//     marginTop: 4,
//     height: 20,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   reviewBar: {
//     paddingHorizontal: 8,
//     borderBottomRightRadius: 2,
//     borderTopRightRadius: 2,
//     backgroundColor: STAR_COLOR
//   },
//   reviewAverage: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   reviewAverageText: {
//     fontSize: 42,
//     textAlign: 'center',
//     color: STAR_COLOR,
//     fontWeight: '200',
//   },
//   reviewAverageStars: {
//     marginVertical: 4,
//     flexDirection: 'row',
//   },
//   rateSection: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: 24,
//   },
//   picture: {
//     width: 38,
//     height: 38,
//     borderRadius: 50,
//     zIndex: 2,
//   },
//   rateTitle: {
//     color: '#333',
//     marginTop: 10,
//   },
//   rateStars: {
//     marginTop: 12,
//     flexDirection: 'row',
//   },
//   rateStar: {
//     color: 'grey',
//     marginHorizontal: 12,
//   },
//   comment: {
//     paddingTop: 24,
//     flexDirection: 'row',
//   },
//   commentLine: {
//     position: 'absolute',
//     width: 3,
//     height: 240,
//     zIndex: 1,
//     backgroundColor: '#eee',
//   },
//   commentContent: {
//     flexDirection: 'column',
//     marginLeft: 16,
//     paddingBottom: 10,
//     borderBottomWidth: 1,
//     borderColor: '#eee'
//   },
//   commentName: {
//     color: '#333',
//     fontFamily: 'sans-serif-medium',
//   },
//   commentNumberReviews: {
//     fontSize: 10,
//   },
//   commentStars: {
//     marginTop: 12,
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   commentDescription: {
//     width: width - 100
//   },
//   commentButtons: {
//     flexDirection: 'row',
//     marginTop: 12,
//   },
//   commentButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginRight: 22,
//   },
//   commentButtonLabel: {
//     fontSize: 12,
//     marginLeft: 10,
//   },
//   moreReviews: {
//     color: PRIMARY_COLOR,
//     marginTop: 20,
//     marginLeft: 52,
//     fontFamily: 'sans-serif-medium',
//   },
//   takeoutSection: {
//     borderTopWidth: 1,
//     paddingHorizontal: 0,
//     borderColor: '#ccc',
//     backgroundColor: '#eee',
//   },
//   cards: {
//     height: 200,
//     marginTop: 20,
//   },
//   card: {
//     width: 130,
//     height: 170,
//     marginHorizontal: 5,
//     elevation: 2,
//     borderRadius: 4,
//     overflow: 'hidden',
//     backgroundColor: WHITE,
//   },
//   cardImage: {
//     width: 130,
//     height: 100,
//     borderTopLeftRadius: 4,
//     borderTopRightRadius: 4,
//   },
//   cardContent: {
//     flexDirection: 'column',
//     paddingTop: 4,
//     paddingHorizontal: 8,
//   },
//   cardTitle: {
//     color: '#333',
//     fontFamily: 'sans-serif-medium',
//   },
//   cardDetail: {
//     fontSize: 10,
//   },
//   cardStars: {
//     marginTop: 10,
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   row: {
//     backgroundColor: 'white',
//     flexDirection: 'row',
//     borderRadius: 5,
//     padding: 10,
//     marginRight: 10,
//     marginTop: 17
//     },
//     item: {
//       flex: 1,
//       height: 100,
//       paddingVertical: 20,
//       borderColor: 'gray',
//       borderWidth: 1,
//       borderRadius: 5,
//       alignItems: 'center',
//       justifyContent: 'space-around',
//       marginHorizontal: 5,
//     },
//     emptyDate: {
//       height: 15,
//       flex:1,
//       paddingTop: 30
//     },
//     agenaView: {
//       height: 200,
//     },
//     itemImage: {
//       height: 35,
//     },
//     itemText: {
//       // color: colors.primary,
//       // fontFamily: fonts.primary,
//     },

// });

// export default GoogleMapsView



// // import React, { Component } from 'react';
// // import {
// //   Text,
// //   View,
// //   Image,
// //   Animated,
// //   FlatList,
// //   TextInput,
// //   StatusBar,
// //   ScrollView,
// //   StyleSheet,
// //   Dimensions,
// //   TouchableOpacity,
// //   ToolbarAndroid
// // } from 'react-native';

// // import Icon from 'react-native-vector-icons/Ionicons'

// // import {Agenda} from 'react-native-calendars';


// // import {
// //   AppBarLayout,
// //   CoordinatorLayout,
// //   CollapsingToolbarLayout,
// //   CollapsingParallax,
// // } from 'react-native-collapsing-toolbar'

// // import NestedScrollView from 'react-native-nested-scroll-view'

// // const data = Array(20).fill().map((_, index) => ({key: index.toString()}))

// // const HEADER_HEIGHT = 250
// // const { width, height } = Dimensions.get('window')

// // //for agenda 
// // const dayImage = require('./day.png');
// // const nightImage = require('./night.png');


// // export default class RNCollapsingToolbar extends Component {
// //   state = {
// //     icon: null,
// //     scrollY: new Animated.Value(0),
// //     items: {}
// //   };

// //   componentDidMount() { 
// //     // Load icon from react-native-vector-icons manually
// //     Icon.getImageSource('md-menu', 24, '#ffffff').then((source) => {
// //       this.setState({ icon: source })
// //     })
// //   }

// //   captureAppBarRef = (ref) => {
// //     this.appBar = ref
// //   }

// //   handleActionSelected = (action) => {
// //     return action === 0 ? this.appBar.show()
// //          : action === 1 ? this.appBar.hide()
// //          : null
// //   }

// //   handleOffsetChanged = (e) => {
// //     Animated.event(
// //       [{ nativeEvent: { offset: this.state.scrollY }}]
// //     )(e, this.state)
// //   }

// //   renderBox(item) {
// //     return (
// //       <View style={styles.box} />
// //     )
// //   }

// //   renderBox2(item) {
// //     return (
// //       <View style={styles.box2} />
// //     )
// //   }

// //   renderScroll(props) {
// //     return (
// //       <NestedScrollView {...props} style={styles.nestedScroll} />
// //     )
// //   }

// //   loadItems(day) {
// //     setTimeout(() => {
// //       for (let i = 0; i < 99; i++) {
// //         const time = day.timestamp + i * 24 * 60 * 60 * 1000;
// //         const strTime = this.timeToString(time);
// //         const strDate = this.timeToString(Date());
// //         if(strTime >= strDate){
// //           if (!this.state.items[strTime] ) {
// //             this.state.items[strTime] = [];
// //             this.state.items[strTime].push({
// //               date: strTime
// //             });
// //           }
// //         }
// //       }
// //       // console.log(this.state.items);
// //       const newItems = {};
// //       Object.keys(this.state.items).forEach(
// //         key => {newItems[key] = this.state.items[key];});
// //       this.setState({
// //         items: newItems
// //       });
// //     }, 1000);
// //   }

// //   option = (dateOption, timeOption) => {
// //     console.log('touched on date', dateOption)
// //     console.log('touched on date', timeOption)

// //   }

// //   renderItem(item) {
// //     return (
// //     // <NestedScrollView style={styles.nestedScroll}  >
// //       <View style={[styles.row]}>
// //         <TouchableOpacity
// //           onPress={() => this.option(item.date, 'day') }
// //           style={[styles.item]}
// //         >
// //           <Image
// //             resizeMode="contain"
// //             source={dayImage}
// //             style={[styles.itemImage]}
// //           />
// //           <Text style={[styles.itemText]}>Day Time</Text>
// //         </TouchableOpacity>

// //         <TouchableOpacity
// //           onPress={() => this.option(item.date, 'night') }
// //           style={[styles.item]}
// //         >
// //           <Image
// //             resizeMode="contain"
// //             source={nightImage}
// //             style={[styles.itemImage]}
// //           />
// //           <Text style={[styles.itemText]}>Night Time</Text>
// //         </TouchableOpacity>
// //       </View>
// //     // </NestedScrollView>
// //     );
// //   }

// //   renderEmptyDate() {
// //     return (
// //       <View style={styles.emptyDate}>
// //         <Text>This is empty date!</Text>
// //       </View>
// //     );
// //   }

// //   rowHasChanged(r1, r2) {
// //     return r1.name !== r2.name;
// //   }

// //   timeToString(time) {
// //     const date = new Date(time);
// //     return date.toISOString().split('T')[0];
// //   }

// //   renderAgenda() {
// //     return (
// //     <View>
// //       <View 
// //         style={{
// //           height: 600,
// //           // width: 300
// //         }}
// //       >  
// //       <Agenda 
// //         minDate={this.timeToString(Date())}
// //         items={this.state.items}
// //         loadItemsForMonth={this.loadItems.bind(this)}
// //         selected={this.timeToString(Date())}
// //         renderItem={this.renderItem.bind(this)}
// //         renderEmptyDate={this.renderEmptyDate.bind(this)}
// //         rowHasChanged={this.rowHasChanged.bind(this)}

// //         // specify what should be rendered instead of ActivityIndicator
// //         // renderEmptyData={() => { return (<View />);}}

// //         pastScrollRange={1}
// //         futureScrollRange={6}

// //         // renderScrollComponent={this.renderScroll.bind(this)}

// //         // horizontal={true}
// //         // // // Enable paging on horizontal, default = false
// //         // pagingEnabled={true}
// //         // // // Set custom calendarWidth.
// //         // calendarWidth={280}
// //         // // // Enable or disable scrolling of calendar list
// //         // scrollEnabled={true}
// //         // // // Enable or disable vertical scroll indicator. Default = false
// //         // showScrollIndicator={true}

// //         // Add a custom RefreshControl component, used to provide pull-to-refresh functionality for the ScrollView.
// //         refreshControl={this.renderScroll()}
// //         // onRefresh={this.renderScroll()}

// //       />
// //     </View>
// //   </View>
// //     );
// //   }

// //   render() {
// //     const { scrollY, icon } = this.state
// //     const rotateZ = scrollY.interpolate({
// //       inputRange:  [0, 100],
// //       outputRange: ["0deg", "-50deg"],
// //     })

// //     return (
// //       <View style={styles.container}>
// //         <StatusBar translucent backgroundColor='#512DA8' />
// //         <View style={styles.statusBar} />
// //         <CoordinatorLayout>
// //           <AppBarLayout
// //             ref={this.captureAppBarRef}
// //             onOffsetChanged={this.handleOffsetChanged}
// //             style={styles.appbar}>
// //             <CollapsingToolbarLayout
// //               title='Collapsing Toolbar'
// //               contentScrimColor='#673AB7'
// //               expandedTitleColor='white'
// //               collapsedTitleTextColor='white'
// //               expandedTitleGravity='BOTTOM'
// //               scrimVisibleHeightTrigger={100}
// //               scrimAnimationDuration={400}
// //               expandedTitleMarginStart={22}
// //               expandedTitleMarginBottom={22}
// //               scrollFlags={
// //                   AppBarLayout.SCROLL_FLAG_SCROLL
// //                 | AppBarLayout.SCROLL_FLAG_EXIT_UNTIL_COLLAPSED}>
// //               <CollapsingParallax parallaxMultiplier={0.6}>
// //                 <View collapsable={false} style={styles.parallaxView}>
// //                   <Image source={require('./images/nona1.png')} style={styles.image} />
// //                   <Animated.Image source={require('./images/nona2.png')} style={[styles.reactImage, {
// //                     transform: [{ rotateZ }]
// //                   }]}
// //                   />
// //                 </View>
// //               </CollapsingParallax>
// //               {/* <Icon.ToolbarAndroid
// //                 iconColor='white'
// //                 onActionSelected={this.handleActionSelected}
// //                 actions={[{ title: 'Show' }, { title: 'Hide' }]}
// //                 navIconName={'md-menu'}
// //               /> */}
// //             </CollapsingToolbarLayout>
// //           </AppBarLayout>
// //            <NestedScrollView>

// //               {/* <View style={styles.lent1}>
// //                   {this.renderAgenda()}
// //               </View> */}

// //               <View style={styles.lent}>
// //                 {/* <FlatList
// //                   data={data}
// //                   renderItem={this.renderBox}
// //                   renderScrollComponent={this.renderScroll}
// //                 /> */}

// //               </View>

              

// //               <View  style={styles.lent2}>
// //                 {this.renderAgenda()}
                  
// //               </View >

// //               <View style={styles.lent1}>
// //                   {/* {this.renderAgenda()} */}
// //               </View>

              
// //             </NestedScrollView>



          
// //         </CoordinatorLayout>
// //       </View>
// //     );
// //   }
// // }

// // const styles = StyleSheet.create({
// //   container: {
// //     height: height - HEADER_HEIGHT,
// //   },
// //   lent: {
// //     height: 400,
// //     backgroundColor: '#fff',
// //   },
// //   lent1: {
// //     height: 400,
// //     backgroundColor: '#dfa',
// //   },
// //   lent2: {
// //     height: 600,
// //     backgroundColor: '#ddd',
// //   },
// //   appbar: {
// //     height: HEADER_HEIGHT,
// //     backgroundColor: 'black',
// //   },
// //   nestedScroll: {
// //     backgroundColor: '#f5f5f5',
// //   },
// //   toolbar: {
// //     height: 56,
// //   },
// //   parallaxView: {
// //     height: HEADER_HEIGHT,
// //     alignItems: 'center',
// //     justifyContent: 'center'
// //   },
// //   box: {
// //     alignItems: 'center',
// //     justifyContent: 'center',
// //     height: 100,
// //     borderRadius: 2,
// //     marginVertical: 8,
// //     marginHorizontal: 10,
// //     backgroundColor: '#fff',
// //     elevation: 2,
// //   },
// //   box2: {
// //     alignItems: 'center',
// //     justifyContent: 'center',
// //     height: 200,
// //     borderRadius: 2,
// //     marginVertical: 8,
// //     marginHorizontal: 10,
// //     backgroundColor: '#000',
// //     elevation: 2,
// //   },
// //   image: {
// //     width,
// //     height: HEADER_HEIGHT,
// //     position: 'absolute',
// //     backgroundColor: '#000',
// //     opacity: 0.65,
// //   },
// //   reactImage: {
// //     width: 80,
// //     height: 80,
// //     opacity: 0.8,
// //   },
// //   statusBar: {
// //     height: 24,
// //   },
// //   row: {
// //     backgroundColor: 'white',
// //     flexDirection: 'row',
// //     borderRadius: 5,
// //     padding: 10,
// //     marginRight: 10,
// //     marginTop: 17
// //     },
// //     item: {
// //       flex: 1,
// //       height: 100,
// //       paddingVertical: 20,
// //       borderColor: 'gray',
// //       borderWidth: 1,
// //       borderRadius: 5,
// //       alignItems: 'center',
// //       justifyContent: 'space-around',
// //       marginHorizontal: 5,
// //     },
// //     emptyDate: {
// //       height: 15,
// //       flex:1,
// //       paddingTop: 30
// //     },
// //     agenaView: {
// //       height: 200,
// //     },
// //     itemImage: {
// //       height: 35,
// //     },
// //     itemText: {
// //       // color: colors.primary,
// //       // fontFamily: fonts.primary,
// //     },
// // });