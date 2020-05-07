import React, {Fragment} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

import I18n from '../utils/i18n';
import * as RNLocalize from 'react-native-localize';
import LiveChat from 'react-native-livechat';
import WebView from 'react-native-webview';
import {useNavigation} from 'react-navigation-hooks';

const styles = StyleSheet.create({
  bubbleStyles: {
    position: 'absolute',
    left: 24,
    bottom: 24,
  },
});

export default function() {
  const {goBack} = useNavigation();

  // async handleLocales() {
  //   this.locales = RNLocalize.getLocales();
  // }

  // getLocale() {
  //   if (this.locales) {
  //     if (Array.isArray(this.locales)) {
  //       console.log(this.locales[0]);
  //       return this.locales[0];
  //     }
  //   }
  //   return null;
  // }

  // render() {
  // var custom_variables = [
  //   { name: "page", value: "Store" },
  //   { name: "user_id", value: "12345" }
  // ];
  // LC_API.update_custom_variables(custom_variables);
  // window.LC_API.hide_chat_window();

  // window.__lc.visitor = {
  //   name: 'Joe Public',
  //   email: 'joe.public@gmail.com'
  //   };

  return (
    <Fragment>
      <WebView
        source={{
          uri:
            'https://secure.livechatinc.com/licence/11907216/v2/open_chat.cgi',
        }}
        javaScriptEnabled={true}
        injectedJavaScript={'LC_API.set_visitor_name("John Doe");'}
        renderLoading={() => (
          <ActivityIndicator
            color="black"
            size="large"
            style={{height: 300, width: 300}}
          />
        )}
      />

      <TouchableOpacity
        onPress={() => {
          goBack();
        }}
        style={{position: 'absolute', right: 15, top: 15}}>
        <Feather name="x" size={24} color="black" />
      </TouchableOpacity>
    </Fragment>

    // <LiveChat
    //   license="11907216"
    //   redirectUri="https://direct.lc.chat/11907216/"
    //   clientId="5cb461f08f292c87d83ff4e031c7bba0"
    //   // bubbleStyles={styles.bubbleStyles}
    //   // bubble={
    //   //   <View style={{width: 60, height: 60, backgroundColor: 'green'}} />
    //   // }
    //   onPressAvatar={info => console.warn(info)}
    // />

    // <View>
    //   <Text>{I18n.t('Hello')}</Text>
    //   <View
    //   // style={{
    //   //   position: 'absolute',
    //   //   top: 100,
    //   //   left: 100,
    //   // }}
    //   >
    //     <LiveChat
    //       bubbleStyles={{
    //         position: 'absolute',
    //         left: 100,
    //         bottom: 100,
    //       }}
    //       license="11907216"
    //       redirectUri="https://direct.lc.chat/11907216/"
    //       clientId="5cb461f08f292c87d83ff4e031c7bba0"
    //     />
    //     {/* <WebView
    //       source={{
    //         uri:
    //           'https://secure.livechatinc.com/licence/11907216/v2/open_chat.cgi',
    //       }}
    //     /> */}
    //   </View>
    // </View>
  );
}

// My Client Secret
// 50b044caaf25de468dd9fadcc34397c7
