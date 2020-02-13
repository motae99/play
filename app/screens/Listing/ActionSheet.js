
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image
} from "react-native";

import RNBottomActionSheet from 'react-native-bottom-action-sheet';

import LottieView from 'lottie-react-native';


import Icon from "react-native-vector-icons/FontAwesome";

export default class App extends Component{
  constructor(props) {
    super(props)

    this.state = {
      gridView: false
    }
  }



  _showGridView = () => {
    let facebook = <Icon name={'facebook'} color={'#000000'} size={10} family={'FontAwesome'} />
    let instagram = <Icon name={"instagram"} color={"#000000"} size={10} family={"FontAwesome"} />;
    let skype = <Icon name={"skype"} color={"#000000"} size={10} family={"FontAwesome"} />;
    let twitter = <Icon name={"twitter"} color={"#000000"} size={10} family={"FontAwesome"} />;
    let whatsapp = <Icon name={"whatsapp"} color={"#000000"} size={10} family={"FontAwesome"} />;
    let youtube = <Icon name={"youtube"} color={"#000000"} size={10} family={"FontAwesome"} />;
    let google = <Icon name={'google'} color={'#000000'} size={10} family={'FontAwesome'} />
    let linkedin = <Icon name={"linkedin"} color={"#000000"} size={10} family={"FontAwesome"} />;


    let GridView = RNBottomActionSheet.GridView
    GridView.Show({
      title: "Awesome!",
      items: [
        { title: "feedbook", icon: facebook },
        { title: "Instagram", icon: instagram },
        { title: "Skype", icon: skype },
        { title: "Twitter", icon: twitter },
        { title: "WhatsApp", icon: whatsapp },
        { title: "YouTube", icon: youtube },
        { title: "Google", icon: google },
        { title: "LinkedIn", icon: linkedin }
      ],
      theme: 'light',
      onSelection: (selection) => {
        console.log('selection: ' + selection)
      }
    });
  }

  render() {
    let facebook = <Icon name={"facebook"} size={40} color={"#000000"} family={"FontAwesome"} />;
    let instagram = <Icon name={"instagram"} size={40} color={"#000000"} family={"FontAwesome"} />;
    let skype = <Icon name={"skype"} size={40} color={"#000000"} family={"FontAwesome"} />;
    let twitter = <Icon name={"twitter"} size={40} color={"#000000"} family={"FontAwesome"} />;
    let whatsapp = <Icon name={"whatsapp"} size={40} color={"#000000"} family={"FontAwesome"} />;
    let youtube = <Icon name={"youtube"} size={40} color={"#000000"} family={"FontAwesome"} />;
    let google = <Icon name={"google"} size={40} color={"#000000"} family={"FontAwesome"} />;
    let linkedin = <Icon name={"linkedin"} size={40} color={"#000000"} family={"FontAwesome"} />;


    return <View style={styles.container}>
              <LottieView source={require('./lottie1.json.js.js')} autoPlay loop />

      <TouchableHighlight onPress={() => {
        // this._showGridView();
        this.setState({
          gridView: true
        });
      }}>
        <Text>{"Grid View"}</Text>
      </TouchableHighlight>
      <RNBottomActionSheet.GridView  
        itemTextColor={"white"}
        itemTintColor={"white"}
        backgroundColor={"#7D000000"}
        visible={this.state.gridView} 
        title={"Awesome!"} 
        selection={3} 
        onSelection={selection => {
          console.log("selection: " + selection);
        }}
      >
        <RNBottomActionSheet.GridView.Item title={"Facebook"} icon={facebook} />
        <RNBottomActionSheet.GridView.Item title={"Instagram"} icon={instagram} />
        <RNBottomActionSheet.GridView.Item title={"Skype"} icon={skype} />
        <RNBottomActionSheet.GridView.Item title={"Twitter"} icon={twitter} />
        <RNBottomActionSheet.GridView.Item title={"WhatsApp"} icon={whatsapp} />
        <RNBottomActionSheet.GridView.Item title={"YouTube"} icon={youtube} />
        <RNBottomActionSheet.GridView.Item title={"Google"} icon={google} />
        <RNBottomActionSheet.GridView.Item title={"LinkedIn"} icon={linkedin} />        
      </RNBottomActionSheet.GridView>
    </View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});