
import React, {Component} from 'react';
import {
    View,
    Dimensions,
    FlatList,
    Text,
    StyleSheet
} from 'react-native';

const {width, height} = Dimensions.get('window');
import Colors from '../../../constants/Colors';
import ChatItem from './chat-item';
import ChatSearchBar from './chat-search-bar';

const data = ['1', '1', '1', '1', '1', '1', '1', '1', '1'];
// const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

export default class Drawer extends Component {
    constructor() {
        super();
        this.state = {
            dataSource: data
        }
    }

    _renderRow(data) {
        return (
            <ChatItem />
        )
    }


    render() {
        return (
            <View style={styles.drawer}>
                <ChatSearchBar/>
                <FlatList
                    data={this.state.dataSource}
                    renderItem={(data) => this._renderRow(data)}
                />

            </View>
        )
    }
}

const styles = StyleSheet.create({
    drawer: {
        height,
        paddingTop: 20,
        width: width * 4/5,
        position: 'absolute',
        backgroundColor: Colors.chat_bg,
        right: 0

    }
});