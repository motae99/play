
import React, { Component } from 'react';
import { Platform, View, ScrollView, Text, StatusBar, SafeAreaView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { sliderWidth, itemWidth } from './styles/SliderEntry.style';
import SliderEntry from './SliderEntry';
import styles, { colors } from './styles/Index.style';
import { scrollInterpolators, animatedStyles } from './utils/animations';


const IS_ANDROID = Platform.OS === 'android';
const SLIDER_1_FIRST_ITEM = 1;

const ENTRIES1 = [
 {
     title: 'Events',
     subtitle: 'All Events provider and related services',
     illustration: 'https://i.imgur.com/UYiroysl.jpg',
     stack: 'Events'
 },
 {
     title: 'Earlier this morning, NYC',
     subtitle: 'Lorem ipsum dolor sit amet',
     illustration: 'https://i.imgur.com/UPrs1EWl.jpg'
 },
 {
     title: 'White Pocket Sunset',
     subtitle: 'Lorem ipsum dolor sit amet et nuncat ',
     illustration: 'https://i.imgur.com/MABUbpDl.jpg'
 },
 {
     title: 'Acrocorinth, Greece',
     subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
     illustration: 'https://i.imgur.com/KZsmUi2l.jpg'
 },
 {
     title: 'The lone tree, majestic landscape of New Zealand',
     subtitle: 'Lorem ipsum dolor sit amet',
     illustration: 'https://i.imgur.com/2nCt3Sbl.jpg'
 },
 {
     title: 'Middle Earth, Germany',
     subtitle: 'Lorem ipsum dolor sit amet',
     illustration: 'https://i.imgur.com/lceHsT6l.jpg'
 }
];

export default class example extends Component {

    constructor (props) {
        super(props);
        this.state = {
            slider1ActiveSlide: SLIDER_1_FIRST_ITEM
        };

    }


    renderItemWithParallax = ({item, index}, parallaxProps) => {
        // console.log('log    ;',this.props.navigation)


        
        return (
            <SliderEntry
              data={item}
              even={(index + 1) % 2 === 0}
              parallax={true}
              parallaxProps={parallaxProps}
              navigation={this.props.navigation}
            />
        );
    }



    mainExample (number, title) {
        const { slider1ActiveSlide } = this.state;

        return (
            <View style={styles.exampleContainer}>
                <Text style={styles.title}>Providers</Text>
                <Text style={styles.subtitle}>Render Search Or something Here</Text>
                <Carousel
                  ref={c => this._slider1Ref = c}
                  data={ENTRIES1}
                  renderItem={this.renderItemWithParallax}
                  sliderWidth={sliderWidth}
                  itemWidth={itemWidth}
                  hasParallaxImages={true}
                  firstItem={SLIDER_1_FIRST_ITEM}
                  inactiveSlideScale={0.94}
                  inactiveSlideOpacity={0.7}
                  inactiveSlideShift={20}
                  containerCustomStyle={styles.slider}
                  contentContainerCustomStyle={styles.sliderContentContainer}
                  loop={true}
                  loopClonesPerSide={2}
                  autoplay={true}
                  autoplayDelay={2000}
                  autoplayInterval={6000}
                  onSnapToItem={(index) => this.setState({ slider1ActiveSlide: index }) }
                />
                {/* <Pagination
                  dotsLength={ENTRIES1.length}
                  activeDotIndex={slider1ActiveSlide}
                  containerStyle={styles.paginationContainer}
                  dotColor={'rgba(255, 255, 255, 0.92)'}
                  dotStyle={styles.paginationDot}
                  inactiveDotColor={colors.black}
                  inactiveDotOpacity={0.4}
                  inactiveDotScale={0.6}
                  carouselRef={this._slider1Ref}
                  tappableDots={!!this._slider1Ref}
                /> */}
            </View>
        );
    }


    get gradient () {

        return (
            <LinearGradient
              colors={[colors.background1, colors.background2]}
              startPoint={{ x: 1, y: 0 }}
              endPoint={{ x: 0, y: 1 }}
              style={styles.gradient}
            />
        );
    }

    render () {
        const Home = this.mainExample(6, 'Main Page for listing');
        return (
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.container}>
                    <StatusBar
                      translucent={true}
                      backgroundColor={'rgba(0, 0, 0, 0.3)'}
                      barStyle={'light-content'}
                    />
                    { this.gradient }
                    <ScrollView
                      style={styles.scrollview}
                      scrollEventThrottle={200}
                      directionalLockEnabled={true}
                    >
                        { Home }
                    </ScrollView>
                    
                </View>
            </SafeAreaView>
        );
    }
}