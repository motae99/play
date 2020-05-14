import React from 'react';
import {Text, View, TouchableOpacity, Dimensions} from 'react-native';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import codePush from 'react-native-code-push';
const {width, height} = Dimensions.get('window');
export default function() {
  const onButtonPress = () => {
    // console.log('pressed');
    codePush.sync({
      updateDialog: true,
      installMode: codePush.InstallMode.IMMEDIATE,
    });
  };
  return (
    <View
      style={{height, width, justifyContent: 'center', alignItems: 'center'}}>
      <Text>We Start Now check 4 updates</Text>
      <TouchableOpacity onPress={() => onButtonPress()}>
        <MIcon name="update" size={100} color="#002A32" />
      </TouchableOpacity>
    </View>
  );
}
