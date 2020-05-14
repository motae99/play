import React from 'react';
import {Image, View} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {cardWidth, cardHeigh} from './FoldingStyle';

const Base = ({toggle}) => {
  return (
    // <View>
    <TouchableWithoutFeedback onPress={() => toggle()}>
      <Image
        style={{width: cardWidth, height: cardHeigh, alignSelf: 'center'}}
        resizeMode="cover"
        source={require('../back.png')}
      />
    </TouchableWithoutFeedback>
    // </View>
  );
};

export default Base;
