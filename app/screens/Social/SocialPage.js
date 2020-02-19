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
    StyleSheet,
    TouchableOpacity
} from 'react-native';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { UserContext } from '../../context/UserContext';

import Ionicons from 'react-native-vector-icons/Ionicons';

const {width, height} = Dimensions.get('window');

import Colors from '../../constants/Colors';
import SearchBar from './common/search-bar';
import ButtonBar from './common/button-bar';
import OnYourMind from './common/onYourMind';
import NewsFeedItem from './common/newsfeed-item';
import CreatePost from './common/create-post';

import Drawer from './common/drawer';
import _ from 'lodash';
import Comments from '../CommentScreen';
const THRESHOLD = 100; // the mumber of pixles in sceen to start interacting with 

export default class Social extends Component {
    static contextType = UserContext;

    constructor(props) {
        super(props);

        this.state = {
            modal: false,
            refreshing: false,
            loading: false,
            opacity: new Animated.Value(1),
            header_height: new Animated.Value(96),
            documentData: [],
            lastVisible: null,
        };

        this.offsetY = 0;
        this.offsetX = new Animated.Value(0);
        this.content_height = 0;
        this._onScroll = this._onScroll.bind(this);
        this.loadMore = _.debounce(this.loadMore, 300);
        this._onDrawerOpen = this._onDrawerOpen.bind(this);
    }

    static navigationOptions = ({ navigation }) => {
        const { state } = navigation
        // Setup the header and tabBarVisible status
        // const header = state.params && (state.params.fullscreen ? undefined : null)
        // const tabBarVisible = state.params ? state.params.fullscreen : true
        const tabBarVisible = false 
        return {
          // For stack navigators, you can hide the header bar like so
        //   header,
          // For the tab navigators, you can hide the tab bar like so
          tabBarVisible,
        }
      }


    componentDidMount() {

        setTimeout(() => {this.measureView()}, 0);
        // console.log('posts liked', User)

        try {
            // Cloud Firestore: Initial Query
            this.retrieveData();
          }
          catch (error) {
            console.log(error);
          }
    }

    measureView() {
        this.refs.view.measure((a, b, w, h, px, py) => {
            this.content_height = h;
        });
    }

    retrieveData = async () => {
        try {
        // Set State: Loading
        this.setState({
            loading: true,
        });
        console.log('Retrieving Data');
        // Cloud Firestore: Query
        let initialQuery = await firestore()
            .collection('posts')
            .orderBy('timestamp', 'asc')
            .limit(4)
        // Cloud Firestore: Query Snapshot
        let documentSnapshots = await initialQuery.get();
        // Cloud Firestore: Document Data
        let documentData = documentSnapshots.docs.map((document) => {
            // console.log("this is ID   : ",document.id)
            var isLiked = this.context.postsLiked.some(item => document.id === item.key);
            console.log("this is post   : ",document.id, 'isLiked', isLiked)

            return {
            ...document.data(),
            key: document.id,
            isLiked: isLiked
            }
        });
        // Cloud Firestore: Last Visible Document (Document ID To Start From For Proceeding Queries)
        let lastVisible = documentData[documentData.length - 1].timestamp;

        // console.log("Last Visable ==== :",documentData);

        // Set State
        this.setState({
            documentData: documentData,
            lastVisible: lastVisible,
            loading: false,
        });
        }
        catch (error) {
        console.log(error);
        }
    };

    retrieveMore = async () => {
        var {lastVisible} = this.state
        try {
            let additionalQuery = await firestore()
                .collection('posts')
                .orderBy('timestamp', 'asc')
                .startAfter(lastVisible)
                .limit(3)
            // Cloud Firestore: Query Snapshot
            let documentSnapshots = await additionalQuery.get();
            // Cloud Firestore: Document Data
            let documentData = documentSnapshots.docs.map((document) => {
                var isLiked = this.context.postsLiked.some(item => document.id === item.key);
                
                return {
                ...document.data(),
                key: document.id,
                isLiked: isLiked
                }
            });
            // Cloud Firestore: Last Visible Document (Document ID To Start From For Proceeding Queries)
            if(documentData){
                // console.log("we Have more data ==== :",documentData);
                let lastVisible = documentData[documentData.length - 1].timestamp;
                // console.log("Last Visable ==== :",lastVisible);
                // Set State
                if(lastVisible !== this.state.lastVisible){
                    this.setState({
                        documentData: [...this.state.documentData, ...documentData],
                        lastVisible: lastVisible,
                        // refreshing: false,
                        });
                }
                
            }
        
        }
        catch (error) {
        console.log(error);
        }
    };


    _onRefresh() {
        this.setState({refreshing: true});
        // this.retrieveData();
        // retrive data where timestamp is less than first post
        setTimeout(() => {
            this.setState({refreshing: false});
        }, 1500)
    }

    _renderRow(data) {

        if (data == '0') {
            return <OnYourMind onFocus={() => this.setState({modal: true})}/>
        }

        return <NewsFeedItem data={data}/>
    }

    renderModal() {
        return (
            <Modal
                animationType={"slide"}
                transparent={false}
                visible={this.state.modal}
                onRequestClose={() => this.setState({modal: false})}
            >
                <CreatePost closeModal={ () => this.setState({modal: false})} />
            </Modal>
        )

    }

    

    loadMore() {
        // console.log('should load more');
        this.setState({loading: true});
        //add two more child views
        console.log('gonna retrieve more data')
        try {
            // Cloud Firestore: Initial Query
            this.retrieveMore();
          }
          catch (error) {
            console.log(error);
          }
        
        // data.push('1');
        // data.push('1');
        // this.setState({documentData: data});

    }

    _onScroll(event) {
        const e = event.nativeEvent;
        const l_height = e.contentSize.height;
        const offset = e.contentOffset.y;

        if(offset > this.offsetY) {
            if(!(offset < 32)) {
                this.refs.buttonBar.hide();
            }
            if(!(offset < 56)) {
                this.refs.searchBar.hide();
            }
        } else {
            // console.log('scrolling up');
            // console.log('showed show ');

            this.refs.buttonBar.show();
            setTimeout(() => {this.refs.searchBar.show();}, 150);
            // console.log('should show searchBar');
        }

        this.offsetY = offset;


        if(offset + this.content_height >= l_height) {
            // console.log('end');
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

    static navigationOptions = {
        tabBarVisible: false,
      };

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
                        <SearchBar ref='searchBar' openChat={this.openChat.bind(this)}/>
                        <ButtonBar ref='buttonBar'/>
                        <FlatList
                            refreshControl={
                                <RefreshControl
                                    refreshing={this.state.refreshing}
                                    onRefresh={this._onRefresh.bind(this)}
                                />
                            }

                            onScroll={this._onScroll}
                            data={this.state.documentData}
                            renderItem={(data) => this._renderRow(data)}
                            keyExtractor={item => String(item.key)}
                        />
                    </View>
                    
                    {this.renderFade()}
                </ScrollView>
                {this.renderModal()}
                <TouchableOpacity 
                    style={styles.postButton}
                    onPress={() => this.setState({modal: true})}
                    >
                    <Ionicons name='ios-quote' size={40} color='white'/>
                </TouchableOpacity>
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

    },
    postButton: {
        position: "absolute",
        bottom: 30,
        right: 30,
        backgroundColor: 'transparent',
        color: 'rgba(255, 255, 255, 0.75)',
        zIndex: 1
      },
})