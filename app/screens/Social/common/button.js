import React, {Component} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet
} from 'react-native';

import Colors from '../../../constants/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class Button extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pressed: true,
            liked: props.data.isLiked,
            didComment: props.data.didComment,
            shared: props.data.shared,
            name: props.name,
            icon: props.icon,
            data: props.data,
        }
    }

    pressed(name) {

        if(name == 'Like') {
            this.setState({liked: !this.state.liked});

            if(!this.state.liked) {
                this.props.onPress('Like');
            } else {
                this.props.onPress('Dislike');
            }


        }
        if(name == 'Comment') {
            // this.setState({pressed: !this.state.didComment});
            this.props.onPress('Comment');
            // if(!this.state.pressed) {
            //     this.props.onPress('Like');
            // }


        }
        if(name == 'Share') {
            // this.setState({pressed: !this.state.shared});
            this.props.onPress('Share');
            // if(!this.state.pressed) {
            //     this.props.onPress('Like');
            // }


        }

    }

    render() {
        const {pressed, name, icon, data, liked, didComment, shared} = this.state;
        return (
            <TouchableOpacity onPress={() => this.pressed(name)} style={styles.buttonItem}>
                    <Ionicons name={icon} size={16} color={liked ? Colors.liked : Colors.like}/>
                    <Text style={[styles.text, {color: liked ? Colors.liked : Colors.like}]}>{name}</Text>
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