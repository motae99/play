import React from 'react';
import {View, Text, Alert} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {fWidth, fHeight} from './FoldingStyle';

const First = () => {
  return (
    <View style={{width: fWidth, height: fHeight}}>
      <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
        <View style={{justifyContent: 'center', alignItems: 'flex-start'}}>
          <Text style={{fontSize: 8, fontWeight: 'normal'}}>DELIVER DATE</Text>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>6:40 PM </Text>
          <Text style={{fontSize: 10, fontWeight: 'normal'}}>
            May something
          </Text>
        </View>

        <View style={{justifyContent: 'center', alignItems: 'flex-start'}}>
          <Text style={{fontSize: 8, fontWeight: 'normal'}}>
            SOME OTHER TEXT
          </Text>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>24 minuts </Text>
          <Text style={{fontSize: 10, fontWeight: 'normal'}}>
            May something
          </Text>
        </View>
      </View>
    </View>
  );
};

export default First;
