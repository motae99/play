/**
 * Created by ggoma on 12/17/16.
 */
import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    Dimensions
} from 'react-native';


import VideoTest from "../../../InkinWater.mp4";


import Colors from '../../constants/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {randomProfile} from '../helpers';
import moment from 'moment';
import ImagePost from './image-post';
// import Video from 'react-native-af-video-player';
import Video from 'react-native-video';


import Button from './button';



export default class NewsFeedItem extends Component {
    constructor() {
        super();
        this.state = {
            profile: randomProfile(),
            time: moment().format('hh:mm A MMM Do'),
            buttons: ['Like', 'Comment', 'Share'],
            icons: ['md-thumbs-up', 'md-chatbubbles', 'ios-share-alt'],
            likes: 0,
            comments: 0,
        };

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
                this.setState({comments: this.state.comments + 1});
                break;
            default:
                return
        }
    }

    renderAvatar() {
        const {profile, time} = this.state;
        return (
            <View style={styles.avatarContainer}>
                <Image style={styles.profile} source={profile.source}/>
                <View style={styles.nameContainer}>
                    <Text style={styles.name}>{profile.name}</Text>
                    <Text style={styles.time}>{time} <Ionicons name='md-globe'/></Text>
                </View>
            </View>
        )
    }

    renderLikesAndComments() {
        const {likes, comments} = this.state;

        if(likes == 0 && comments == 0) {
            return
        }

        return (
            <View style={styles.likesComments}>
                <Text style={styles.likeText}>{likes > 0 ? <Ionicons name='md-thumbs-up' color={Colors.main}/> : ''}{likes == 0 ? '' : ' ' + likes}</Text>
                <Text style={styles.likeText}>{comments == 0 ? '' : comments + ' Comments'}</Text>
            </View>
        )
    }

    renderLikeBar() {
        const {buttons, icons} = this.state;
        return buttons.map((button, i) => {
            return (
                <Button key={i} name={button} onPress={this.buttonOnPress.bind(this)} icon={icons[i]} />
            )
        })
    }

    renderContent() {
        const {item} = this.props.data;
        // console.log('--------------------');
        // console.log(this.props);
        // console.log(item.type);
        if(item.type == 'image') {
            return (
                <ImagePost imageCount={item.images.length} images={item.images}/>
            )
        }if(item.type == 'video'){
            const { width } = Dimensions.get("window");

            return (
                <View style={styles.content}>
                    <Video
                        // repeat
                        source={VideoTest}
                        // paused={this.state.paused}
                        // onLayout={this.handleVideoLayout}  //Lateer on ScrollPlay
                        style={{ width, height: 300 }}
                    />
                 </View>
                
            )
            
        }if(item.type == 'post'){
            return (
                <View style={styles.content}>
                    <Text>put some random text here from users posts put some random text here from users postsput some random text here from users postsput some random text here from users postsput some random text here from users postsput some random text here from users postsput some random text here from users postsput some random text here from users posts </Text>
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
