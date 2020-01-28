/**
 * Created by ggoma on 12/17/16.
 */
import React, {Component} from 'react';
import {
    Animated,
    View,
    Text,
    Dimensions,
    RefreshControl,
    Modal,
    ScrollView,
    FlatList,
    StyleSheet
} from 'react-native';

const {width, height} = Dimensions.get('window');

import Colors from '../constants/Colors';
import SearchBar from './common/search-bar';
import ButtonBar from './common/button-bar';
import OnYourMind from './common/onYourMind';
import NewsFeedItem from './common/newsfeed-item';
import CreatePost from './common/create-post';


import Drawer from './common/drawer';
import _ from 'lodash';

//1 is regular post, 2 is image
const data = ['0',
    {type: 'image', images: ['1']},
    {type: 'image', images: ['1', '2']},
    {type: 'image', images: ['1', '2', '3']},
    {type: 'video', video: ['1']},
    {type: 'image', images: ['1', '2', '3', '4']},
    {type: 'video', video: ['1']},
    {type: 'image', images: ['1', '2', '3', '4', '5']},
    {type: 'image', images: ['1', '2', '3', '4', '5', '6']},
    {type: 'post', text: ['1']},
    {type: 'video', video: ['1']},
    {type: 'post', text: ['1']},
    {type: 'post', text: ['1']},
    ];
// const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

const THRESHOLD = 100; // the mumber of pixles in sceen to start interacting with 


export default class Landing extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modal: false,
            refreshing: false,
            loading: false,
            opacity: new Animated.Value(1),
            header_height: new Animated.Value(96),

            // dataSource: ds.cloneWithRows(data)
             dataSource: data,

            paused: true, //this is to handle auto play Videos
            
        };

        this.offsetY = 0;
        this.offsetX = new Animated.Value(0);
        this.content_height = 0;
        this._onScroll = this._onScroll.bind(this);
        this.loadMore = _.debounce(this.loadMore, 300);
        this._onDrawerOpen = this._onDrawerOpen.bind(this);
    }

    // to calculat scrolling position and play video accordingly
    position = {
        start: null,
        end: null,
    };

    // handleVideoLayout = e => { // Handling Video move to Video screen when refactoring
    //     const { height } = Dimensions.get("window");

    //     this.position.start = e.nativeEvent.layout.y - height + THRESHOLD;
    //     this.position.end = e.nativeEvent.layout.y + e.nativeEvent.layout.height - THRESHOLD;
    // };

    componentDidMount() {
        setTimeout(() => {this.measureView()}, 0);
    }

    measureView() {
        this.refs.view.measure((a, b, w, h, px, py) => {
            this.content_height = h;
        });
    }


    _onRefresh() {
        this.setState({refreshing: true});
        setTimeout(() => {
            this.setState({refreshing: false});
        }, 1500)
    }

    _renderRow(data) {

        if (data == '0') {
            return <OnYourMind onFocus={() => this.setState({modal: true})}/>
        }

        return <NewsFeedItem data={data} videostatus={'test'}/>
    }

    renderModal() {
        return (
            <Modal
                animationType={"slide"}
                transparent={false}
                visible={this.state.modal}
                onRequestClose={() => this.setState({modal: false})}
            >
                <CreatePost closeModal={() => this.setState({modal: false})} />
            </Modal>
        )

    }

    loadMore() {
        console.log('should load more');
        this.setState({loading: true});
        //add two more child views
        data.push('1');
        data.push('1');
        this.setState({dataSource: data});

    }

    _onScroll(event) {
        const e = event.nativeEvent;
        const l_height = e.contentSize.height;
        const offset = e.contentOffset.y;

        // const scrollPosition = event.nativeEvent.contentOffset.y;
        // // const scrollPosition = offset;

        // // to calculate video layout
        // this.position.start = event.nativeEvent.layout.y - height + THRESHOLD;
        // this.position.end = event.nativeEvent.layout.y + event.nativeEvent.layout.height - THRESHOLD;
        // // to calculate video layout
        
        // const paused = this.state.paused;
        // const { start, end } = this.position;
        // console.log(start);
        // console.log("------");
        // console.log(end);

        // if (scrollPosition > start && scrollPosition < end && paused) {
        //     this.setState({ paused: false });
        //     console.log('should play Video');
        // } else if (
        // (scrollPosition > end || scrollPosition < start) && !paused
        // ) {
        //     this.setState({ paused: true });
        //     console.log('should stop play Video');

        // }else {
        //     console.log('Not working');
        // }
  

        if(offset > this.offsetY) {
            console.log('scrolling down');
            if(!(offset < 32)) {
                // console.log('should hide buttonBar');
                // this.refs.buttonBar.hide();
            }

            if(!(offset < 56)) {
                // this.refs.searchBar.hide();
                // console.log('should hide searchBar');

            }

            //if
        } else {
            // console.log('scrolling up');

            // this.refs.buttonBar.show();
            // setTimeout(() => {this.refs.searchBar.show();}, 150);
            // console.log('should show searchBar');
        }

        this.offsetY = offset;


        if(offset + this.content_height >= l_height) {
            console.log('end');
            this.loadMore();
        }

        // console.log(e);
    }

    getStyle() {
        return {
            opacity: this.offsetX.interpolate({
                inputRange: [0, width * 4/5],
                outputRange: [1, 0],
            }),
        }
    }

    renderFade() {
        return (
            <Animated.View style={[styles.fade, this.getStyle()]}>
            </Animated.View>
        )
    }

    renderDrawer() {
        return (
            <Drawer/>
        )
    }

    _onDrawerOpen(event) {
        const e = event.nativeEvent;
        const offset = e.contentOffset.x;
        this.offsetX.setValue(offset);
    }

    openChat() {
        this.refs.scrollview.scrollTo({x: width * 4/5, y: 0, animated: true});
    }


    render() {

        return (
            <View style={{flex: 1}}>
                {this.renderDrawer()}
                <ScrollView
                    ref='scrollview'
                    horizontal={true}
                    pagingEnabled={true}
                    bounces={false}
                    onScroll={this._onDrawerOpen}
                    scrollEventThrottle={100}
                    showsHorizontalScrollIndicator={false}
                >

                    <View ref='view' style={styles.container}>
                        {/* <SearchBar ref='searchBar' openChat={this.openChat.bind(this)}/> */}
                        {/* <ButtonBar ref='buttonBar'/> */}
                        <FlatList
                            refreshControl={
                                <RefreshControl
                                    refreshing={this.state.refreshing}
                                    onRefresh={this._onRefresh.bind(this)}
                                />
                            }

                            onScroll={this._onScroll}
                            data={this.state.dataSource}
                            renderItem={(data) => this._renderRow(data)}
                        />
                    </View>
                    {this.renderFade()}
                </ScrollView>
                {this.renderModal()}
            </View>
        )
    }
}

const styles= StyleSheet.create({
    container: {
        flex: 1,
        width,
        height,
        backgroundColor: Colors.gray
    },
    fade: {
        height,
        backgroundColor: 'black',
        width: width * 4/5,
    },
    drawer: {
        height,
        padding: 8,
        paddingTop: 20,
        width: width * 4/5,
        position: 'absolute',
        backgroundColor: Colors.chat_bg,
        right: 0

    }
})