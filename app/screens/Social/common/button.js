import React, {Component, useState, useContext} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet
} from 'react-native';

import Colors from '../../../constants/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { UserContext } from '../../../context/UserContext';

export default function Button({name, icon, data, onPress}){

    const {postDislike, postLike, postsLiked} = useContext(UserContext);
    // const {isLiked, didComment, shared} = data;
    // console.log('data bassed: ', data.isLiked)
    const [liked, setLike] = useState(data.isLiked)
    const [didComment, setComment] = useState(data.didComment)
    const [shared, setshare] = useState(data.shared)


    pressed = (name) => {
        if(name == 'Like') {
            // this.setState({liked: !this.state.liked});
            // console.log('liked log',liked)
            setLike(!liked)
            console.log('reverse liked log',liked)
            // socialLike(User, data)
            if(!liked) {
                onPress('Like');
            } else {
                onPress('Dislike');
            }


        }
        if(name == 'Comment') {
            // this.setState({pressed: !this.state.didComment});
            onPress('Comment');
            // if(!this.state.pressed) {
            //     onPress('Like');
            // }


        }
        if(name == 'Share') {
            // this.setState({pressed: !this.state.shared});
            console.log("these are post been liked",postsLiked)

            onPress('Share');
            // if(!this.state.pressed) {
            //     onPress('Like');
            // }


        }

    }

    const reverse = () => {
        
        if(liked){
            onPress('Dislike');
            setLike(false)
            postDislike(data)
        }
        else{
            onPress('Like');
            setLike(true)
            postLike(data)
        }
    }


        if(name == 'Like'){
            return (
                <TouchableOpacity onPress={ reverse } style={styles.buttonItem}>
                        <Ionicons name={icon} size={16} color ={ liked ? Colors.liked : Colors.like}/>
                        <Text style={[styles.text, {color: liked ? Colors.liked : Colors.like}]}>{name}</Text>
                </TouchableOpacity>
            )
        }

        if(name == 'Comment'){
            return (
                <TouchableOpacity onPress={ () => onPress(name) } style={styles.buttonItem}>
                        <Text style={[styles.text, {color: data.comments > 0 ? Colors.liked : Colors.like}]}>{data.comments}  </Text>
                        <Ionicons name={icon} size={16} color ={ data.comments > 0 ? Colors.liked : Colors.like}/>
                        <Text style={[styles.text, {color: data.comments > 0 ? Colors.liked : Colors.like}]}>{name}</Text>
                </TouchableOpacity>
            )
        }

        else {
            return (
                <TouchableOpacity onPress={() => onPress(name)} style={styles.buttonItem}>
                        <Ionicons name={icon} size={16} color ={Colors.like}/>
                        <Text style={[styles.text, {color:Colors.like}]}>{name}</Text>
                </TouchableOpacity>
            )
        }
        
    
}

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'row',
        height: 36,
        borderBottomWidth: StyleSheet.hairlineWidth
    },


    buttonItem: {
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },

    text: {
        backgroundColor: 'transparent',
        fontSize: 14,
        fontWeight: '700',
        marginLeft: 8,
    }
})