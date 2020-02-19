import React, {Component} from 'react';
import {
    Animated,
    View,
    Text,
    StyleSheet,
    UIManager
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../../../constants/Colors';

export default class ButtonBar extends Component {
    constructor() {
        super();
        this.state = {
            height: new Animated.Value(36),
            buttons: ['Live', 'Photo', 'Check In'],
            icons: ['ios-videocam', 'ios-camera', 'ios-pin']
        };
    }

    componentDidMount() {
        // console.log('this state height from didmount',this.state.height)
        setTimeout(() => {this.measureView()}, 10000)
    }

    // measureView() {
    //     console.log('measuring view');
    //     this.refs.container.measure((a, b, w, h, x, y) => {
    //         this.setState({height: new Animated.Value(h), original: h});
    //     });
    // }

    measureView() {
        // console.log('measuring view');
        this.view.measure((x, y, width, height) => {
            // console.log('height  measre button bar',height)
            this.setState({height: new Animated.Value(height), original: height});
        });
    }

    hide() {

        if(this.state.animating) {
            return;
        }
        // console.log('animating hide button bar');

        this.setState({animating: true});
        Animated.timing(
            this.state.height,
            {toValue: 0}
        ).start();
    }

    show() {
        if(!this.state.animating) {
            return;
        }
        // console.log('animating show Button Bar');
        this.setState({animating: false});
        Animated.timing(
            this.state.height,
            {toValue: 36}
        ).start();
    }

    renderButtons() {
        const {buttons, icons} = this.state;
        return buttons.map((button, i) => {
            return (
                <View key={i} style={styles.buttonItem}>
                    <Ionicons name={icons[i]} size={16} color={Colors.black}/>
                    <Text style={styles.text}>{button}</Text>
                </View>
            )
        })

    }

    getStyle() {
        const {height} = this.state;


        return {height, opacity: height.interpolate({
            inputRange: [0, 36],
            outputRange: [0, 1],
        })}
    }

    render() {

        return (
            <View 
                ref={ ref => this.view = ref}
                onLayout={event => {
                    const layout = event.nativeEvent.layout;
                    // this.arr[key] = layout.x;
                    // console.log('height from layout on button view:', layout.height);
                    // console.log('width:', layout.width);
                    // console.log('x:', layout.x);
                    // console.log('y:', layout.y);
                }}
            
            >
                <Animated.View style={[styles.container, this.getStyle()]}>
                    {this.renderButtons()}
                </Animated.View>
            </View>
        )
    }
} 

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 36,
        backgroundColor: Colors.lightGray,
        borderBottomWidth: StyleSheet.hairlineWidth
    },

    buttonItem: {
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderLeftWidth: StyleSheet.hairlineWidth,
        borderColor: '#ddd'
    },

    text: {
        fontSize: 14,
        backgroundColor: 'transparent',
        fontWeight: '700',
        marginLeft: 8,
        color: Colors.black
    }
});