import React from 'react';
import {View, Text, Alert} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {sWidth, sHeight} from './FoldingStyle';

const Second = ({toggle}) => {
  return (
    <View style={{width: sWidth, height: sHeight}}>
      <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
        <View style={{justifyContent: 'flex-start', alignItems: 'flex-start'}}>
          <Text style={{fontSize: 8, fontWeight: 'normal'}}>DELIVER DATE</Text>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>6:40 PM </Text>
          <Text style={{fontSize: 10, fontWeight: 'normal'}}>
            May something
          </Text>
        </View>

        <View style={{justifyContent: 'flex-start', alignItems: 'flex-start'}}>
          <Text style={{fontSize: 8, fontWeight: 'normal'}}>
            SOME OTHER TEXT
          </Text>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>24 minuts </Text>
        </View>
      </View>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity
          style={{
            height: sHeight / 2.5,
            width: sWidth * 0.9,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#f48c06',
          }}
          onPress={() => toggle()}>
          <Text>REQUEST</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Second;
