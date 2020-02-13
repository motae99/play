import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    Dimensions,
    Modal,
} from 'react-native';

import Colors from '../../../constants/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {randomProfile} from '../helpers';
import moment from 'moment';
import ImagePost from './image-post';
// import Video from 'react-native-af-video-player';
import Video from 'react-native-video';
// import VideoPlayer from 'react-native-video-player';

import { firebase } from '@react-native-firebase/dynamic-links';
import Share from 'react-native-share';

import SocialComments from '../Comments';


import Button from './button';

export default class NewsFeedItem extends Component {
    constructor() {
        super();
        this.state = {
            comment: false,
            profile: randomProfile(),
            time: moment().format('hh:mm A MMM Do'),
            buttons: ['Like', 'Comment', 'Share'],
            icons: ['md-thumbs-up', 'md-chatbubbles', 'ios-share-alt'],
            likes: 2,
            comments: 4,
            share: 1,
        };

    }
    
    sharePost = async () => {
        const {item} = this.props.data;
        if(item.type == 'post'){
           var socialData = { title: item.title, descriptionText: item.post, imageUrl: item.autherPhoto} 
        }
        if(item.type == 'video'){
            var socialData = { title: item.autherName, descriptionText: item.title, imageUrl: item.autherPhoto} 
        }
        if(item.type == 'images'){
            var socialData = { title: item.autherName, descriptionText: item.title, imageUrl: item.images[0].uri} 
        }
        
        const sharedUrl = await firebase.dynamicLinks().buildShortLink({
        link: 'https://www.example.com/?curPage=1', //use any Domanin name or ur domain name ? curPage=1 leads to homepage
        domainUriPrefix: 'https://kanta.page.link',
        analytics: {
            campaign: 'offer',
        },
        social: socialData,
        android: {
            packageName: 'com.kanta',
        },
        },
        firebase.dynamicLinks.ShortLinkType);

        console.log('built link with dynamic Link', sharedUrl)

        const shareOptions = {
        // title: 'Share Contents',
        failOnCancel: false,
        url: sharedUrl,
        };

        console.log('shareOptions   : =>',shareOptions)
        try {
            const ShareResponse = await Share.open(shareOptions);
            console.log('ShareResponse   : =>',ShareResponse);

            // setResult(JSON.stringify(ShareResponse, null, 2));
            this.setState({share: this.state.share + 1});
        } catch (error) {
            console.log('Error =>', error);
            // setResult('error: '.concat(getErrorString(error)));
        }
    }

    renderComment(){
        return (
            <Modal
                animationType={"slide"}
                transparent={false}
                visible={this.state.comment}
                onRequestClose={() => this.setState({comment: false})}
            >
                <SocialComments closeModal={ () => this.setState({comment: false})} />
            </Modal>
        )

    }

      
    buttonOnPress(name) {
        console.log(name);
        switch(name) {
            case 'Like':
                this.setState({likes: this.state.likes + 1});
                break;
            case 'Dislike':
                this.setState({likes: this.state.likes - 1});
                break;
            case 'Comment':
                console.log('open comment modal')
                this.setState({comment: true});
                break;
            case 'Share':
                this.sharePost();
                break;
            default:
                return
        }
    }

    renderAvatar() {
        const {item} = this.props.data;
        return (
            <View style={styles.avatarContainer}>
                <Image style={styles.profile} source={{uri: item.autherPhoto}}/>
                <View style={styles.nameContainer}>
                    <Text style={styles.name}>{item.autherName}</Text>
                    <Text style={styles.time}>{moment(item.timestamp).format('hh:mm A MMM Do')} <Ionicons name='md-globe'/></Text>
                </View>
            </View>
        )
    }

    renderLikesAndComments() {
        const {likes, comments, share} = this.state;

        if(likes == 0 && comments == 0) {
            return
        }

        return (
            <View style={styles.likesComments}>
                <Text style={styles.likeText}>{likes > 0 ? <Ionicons name='md-thumbs-up' color={Colors.main}/> : ''}{likes == 0 ? '' : ' ' + likes}</Text>
                <Text style={styles.likeText}>{comments == 0 ? '' : comments + ' Comments'}</Text>
                <Text style={styles.likeText}>{share == 0 ? '' : share + ' Share'}</Text>
            </View>
        )
    }

    renderLikeBar() {
        const {buttons, icons} = this.state;
        const {item} = this.props.data;
        //onPress={this.buttonOnPress.bind(this)}
        return buttons.map((button, i) => {
       
            // console.log('all buttons : => ',button)

            return (
                <Button key={i} name={button} onPress={this.buttonOnPress.bind(this)} icon={icons[i]} data={item} />
            )
        })
    }

    renderContent() {
        const {item} = this.props.data;
        // console.log('--------------------');
        // console.log(this.props);
        // console.log(item.type);
        if(item.type == 'images') {
            return (
                <ImagePost imageCount={item.images.length} images={item.images} key={item.key} title={item.title}/>
            )
        }if(item.type == 'video'){
            const { width } = Dimensions.get("window");

            return (
                <View key={item.key} style={styles.content}>
                    <View style={styles.textContainer} >
                        <Text>{item.title}</Text>
                    </View>

                    <Video
                        // repeat
                        source={{uri: item.video.uri}}
                        paused={true}
                        // paused={this.state.paused}
                        // onLayout={this.handleVideoLayout}  //Lateer on ScrollPlay
                        style={{ width, height: 300 }}
                    />
                    {/* <Video url={item.video.uri}/> */}
                     {/* <VideoPlayer
                        endWithThumbnail
                        thumbnail={{ uri: this.state.thumbnailUrl }}
                        video={{uri: item.video.uri}}
                        videoWidth={item.video.width}
                        videoHeight={item.video.height}
                        duration={item.video.duration/* I'm using a hls stream here, react-native-video
                            can't figure out the length, so I pass it here from the vimeo config */}

                        {/* <Button
                        onPress={() => this.player.stop()}
                        title="Stop"
                        />
                        <Button
                        onPress={() => this.player.pause()}
                        title="Pause"
                        />
                        <Button
                        onPress={() => this.player.resume()}
                        title="Resume"
                        /> */}
                    
                 </View>
            )
            
        }if(item.type == 'post'){
            return (
                <View key={item.key} style={styles.content}>
                    <Text>{item.title}</Text>
                    <Text>{item.post}</Text>
                </View>
            )
        }

        return (
            <View style={styles.content}>
                <Text>unkown type error posts </Text>
            </View>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <View>
                    {this.renderAvatar()}
                    {this.renderContent()}
                    {this.renderLikesAndComments()}
                    <View style={styles.line} />
                </View>
                <View style={styles.buttonContainer}>
                    {this.renderLikeBar()}
                </View>

                {this.renderComment()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        marginBottom: 10,
    },

    content: {
        padding: 16,
        paddingTop: 0,
        paddingBottom: 0
    },

    line: {
        margin: 16,
        marginBottom: 0,
        borderColor: '#ddd',
        borderBottomWidth: StyleSheet.hairlineWidth
    },

    avatarContainer: {
        padding: 16,
        paddingBottom: 0,
        flexDirection: 'row',
        marginBottom: 10,
    },

    nameContainer: {
        marginLeft: 10,
        justifyContent: 'space-around'
    },

    name: {
        fontSize: 14,
        color: 'black',
        fontWeight: '600'
    },

    time: {
        color: 'gray',
        fontSize: 12,
    },

    profile: {
        backgroundColor: 'black',
        height: 40,
        width: 40,
    },

    buttonContainer: {
        flexDirection: 'row',

        height: 36,
        borderBottomWidth: StyleSheet.hairlineWidth
    },


    buttonItem: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },

    text: {
        fontSize: 14,
        fontWeight: '700',
        marginLeft: 8,
        color: Colors.like
    },

    likeText: {
        fontSize: 12,
        color: Colors.grayText
    },

    likesComments: {
        padding: 16,
        paddingBottom: 0,
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})
