import React from 'react';
import {Image} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {cardWidth, cardHeigh} from './FoldingStyle';

const Base = ({toggle}) => {
  return (
    <TouchableWithoutFeedback onPress={() => toggle()}>
      <Image
        style={{width: cardWidth, height: cardHeigh, alignSelf: 'center'}}
        resizeMode="cover"
        source={require('../front.png')}
      />
    </TouchableWithoutFeedback>
  );
};

export default Base;
