import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { ParallaxImage } from 'react-native-snap-carousel';
import styles from './styles/SliderEntry.style';
import LottieView from 'lottie-react-native';


export default class SliderEntry extends Component {

    static propTypes = {
        data: PropTypes.object.isRequired,
        even: PropTypes.bool,
        parallax: PropTypes.bool,
        parallaxProps: PropTypes.object
    };

    state = {
        // example: EXAMPLES[0],
        duration: 3000,
        isPlaying: true,
        isInverse: false,
        loop: true,
      };

    manageAnimation = shouldPlay => {
        if (!this.state.progress) {
          if (shouldPlay) {
            this.anim.play();
          } else {
            this.anim.reset();
          }
        } else {
          this.state.progress.setValue(0);
    
          if (shouldPlay) {
            Animated.timing(this.state.progress, {
              toValue: 1,
              duration: this.state.duration,
              easing: Easing.linear,
              useNativeDriver: true,
            }).start(() => {
              this.setState({ isPlaying: false });
            });
          }
        }
    
        this.setState({ isPlaying: shouldPlay });
      };
    
      onPlayPress = () => this.manageAnimation(!this.state.isPlaying);
      stopAnimation = () => this.manageAnimation(false);
    
      onInversePress = () => this.setState(state => ({ isInverse: !state.isInverse }));
      onProgressChange = progress => this.state.progress.setValue(progress);
      onDurationChange = duration => this.setState({ duration });
    

    get image () {
        const { data: { illustration }, parallax, parallaxProps, even} = this.props;

        return (
            <ParallaxImage
              source={{ uri: illustration }}
              containerStyle={[styles.imageContainer, even ? styles.imageContainerEven : {}]}
              style={styles.image}
              parallaxFactor={0.35}
              showSpinner={true}
              spinnerColor={even ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.25)'}
              {...parallaxProps}
            />
       
        );
    }

    setAnim = anim => {
        this.anim = anim;
      };

    render () {
        const { data: { title, subtitle }, even, navigation  } = this.props;

        const uppercaseTitle = title ? (
            <Text
              style={[styles.title, even ? styles.titleEven : {}]}
              numberOfLines={2}
            >
                { title.toUpperCase() }
            </Text>
        ) : false;

        return (
            <TouchableOpacity
              activeOpacity={1}
              style={styles.slideInnerContainer}
              onPress={() => navigation.navigate('Events')}
              >
                <View style={styles.shadow} />
                <View style={[styles.imageContainer, even ? styles.imageContainerEven : {}]}>
                    { this.image }
                    <View style={[styles.radiusMask, even ? styles.radiusMaskEven : {}]} />
                </View>
                <View style={[styles.textContainer, even ? styles.textContainerEven : {}]}>
                    { uppercaseTitle }
                    <Text
                      style={[styles.subtitle, even ? styles.subtitleEven : {}]}
                      numberOfLines={2}
                    >
                        { subtitle }
                    </Text>
                </View>
                
                
                <LottieView
                        ref={this.setAnim}
                        // autoPlay={!progress}
                        style={{position: 'absolute', left: 0, right: 0, top:0, bottom: 0,bottom: 60, height: 300, }}
                        source={require('./animations/LottieWalkthrough.json')}
                        // progress={progress}
                        // loop={loop}
                        enableMergePathsAndroidForKitKatAndAbove
                    />
                
            </TouchableOpacity>
        );
    }
}