
import React, {Component} from 'react';
import {
    View,
    Dimensions,
    Text,
    StyleSheet,
    TouchableWithoutFeedback,
    Image,
    ImageBackground,
} from 'react-native';

import {getImage} from '../helpers';
const {width, height} = Dimensions.get('window');
import { withNavigation } from 'react-navigation';

import SingleImage from './single-image';
import ImageScreen from './imageScreen';

class ImagePost extends Component {


    renderImages() {
        const {imageCount, images} = this.props;

        switch(imageCount) {
            //1 image
            case 1:
                return (
                    <View style={styles.imageContainer} >
                        <SingleImage image={{uri: images[0].uri}}/>
                    </View>
                );
                break;

            case 2:
                return(
                    <TouchableWithoutFeedback onPress={this.openImages.bind(this)}>
                        <View style={styles.imageContainer} >
                            <Image style={[styles.img, {marginBottom: 4}]} source={{uri: images[0].uri}}/>
                            <Image style={styles.img} source={{uri: images[1].uri}}/>
                        </View>
                    </TouchableWithoutFeedback>
                );
                break;
            case 3:
                return(
                    <TouchableWithoutFeedback onPress={this.openImages.bind(this)}>
                        <View style={styles.imageContainer} >
                            <Image style={[styles.img, {marginBottom: 4}]} source={{uri: images[0].uri}}/>
                            <View style={{flexDirection: 'row', flex: 1}}>
                                <Image style={[styles.img, {marginRight: 2}]} source={{uri: images[1].uri}}/>
                                <Image style={[styles.img, {marginLeft: 2}]} source={{uri: images[2].uri}}/>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                );
                break;
            case 4:
                return(
                    <TouchableWithoutFeedback onPress={this.openImages.bind(this)}>
                        <View style={styles.imageContainer} >
                            <View style={{flexDirection: 'row', flex: 1, marginBottom: 4}}>
                                <Image style={[styles.img, {marginRight: 2}]} source={{uri: images[0].uri}}/>
                                <Image style={[styles.img, {marginLeft: 2}]} source={{uri: images[1].uri}}/>
                            </View>
                            <View style={{flexDirection: 'row', flex: 1}}>
                                <Image style={[styles.img, {marginRight: 2}]} source={{uri: images[2].uri}}/>
                                <Image style={[styles.img, {marginLeft: 2}]} source={{uri: images[3].uri}}/>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                );
                break;
            case 5:
                return(
                    <TouchableWithoutFeedback onPress={this.openImages.bind(this)}>
                        <View style={styles.imageContainer} >
                            <View style={{flexDirection: 'row', flex: 1, marginBottom: 4}}>
                                <Image style={[styles.img, {marginRight: 2}]} source={{uri: images[0].uri}}/>
                                <Image style={[styles.img, {marginLeft: 2}]} source={{uri: images[1].uri}}/>
                            </View>
                            <View style={{flexDirection: 'row', flex: 1}}>
                                <Image style={[styles.img, {marginRight: 2}]} source={{uri: images[2].uri}}/>
                                <Image style={[styles.img, {marginLeft: 2, marginRight: 2}]} source={{uri: images[3].uri}}/>
                                <Image style={[styles.img, {marginLeft: 2}]} source={{uri: images[4].uri}}/>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                );
                break;
            default:
                //for cases with 5+ pictures
                //@TODO render images with more than 6
                return(
                    <TouchableWithoutFeedback onPress={this.openImages.bind(this)}>
                        <View style={styles.imageContainer} >
                            <View style={{flexDirection: 'row', flex: 1, marginBottom: 4}}>
                                <Image style={[styles.img, {marginRight: 2}]} source={{uri: images[0].uri}}/>
                                <Image style={[styles.img, {marginLeft: 2}]} source={{uri: images[1].uri}}/>
                            </View>
                            <View style={{flexDirection: 'row', flex: 1}}>
                                <Image style={[styles.img, {marginRight: 2}]} source={{uri: images[2].uri}}/>
                                <Image style={[styles.img, {marginLeft: 2, marginRight: 2}]} source={{uri: images[3].uri}}/>
                                <ImageBackground style={[styles.img, {marginLeft: 2}]} source={{uri: images[4].uri}}>
                                    <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,.7)', justifyContent: 'center', alignItems: 'center'}}>
                                        <Text style={{fontSize: 18, color: 'white', fontWeight: '700'}}>
                                            + {imageCount - 5}
                                        </Text>
                                    </View>
                                </ImageBackground>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                );


        }
    }

    openImages() {
        const {images} = this.props;

        // this.props.navigator.push('images', {images});
        this.props.navigation.push('Message');
    }

    render() {
        const {imageCount, images, key, title} = this.props;
        return (
            <View key={key}>
                <View style={styles.textContainer} >
                    <Text>{title}</Text>
                </View>
                {this.renderImages()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    imageContainer: {
        height: height/2.5,
    },

    img: {
        flex: 1,
        width: null,
        height: null
    },
    textContainer: {
        padding: 16,
        paddingTop: 0,
        paddingBottom: 8
    }
});

export default withNavigation(ImagePost);
