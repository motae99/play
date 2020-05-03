import React, { Component } from "react";
import {View, Text} from 'react-native'
import I18n from "../utils/i18n";
import * as RNLocalize from "react-native-localize";



class MyComponent extends Component {

async handleLocales() {
  this.locales = RNLocalize.getLocales();
}

getLocale() {
  if (this.locales) {
    if (Array.isArray(this.locales)) {
      console.log(this.locales[0])
      return this.locales[0];
    }
  }
  return null;
}


  render() {
    return (
      <View>
        <Text>{I18n.t("Hello")}</Text>
      </View>
    );
  }
}
export default MyComponent;