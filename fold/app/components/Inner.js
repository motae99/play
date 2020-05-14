import React, {Component} from 'react';

import {View, Text, TouchableHighlight, StyleSheet} from 'react-native';

import FoldView from '../../index';

import ProfileDetailCard from './ProfileDetailCard';
import AdditionalInfoCard from './AdditionalInfoCard';

import {ThinGrayLine, ThickDarkGrayLine} from './Lines';

export default class Row extends Component {
  UNSAFE_componentWillMount() {
    this.renderBackface = this.renderBackface.bind(this);
    this.renderInnerBackFace = this.renderInnerBackFace.bind(this);
  }

  renderBlankFace() {
    return (
      <View
        style={{
          backgroundColor: '#D6EFFF',
          flex: 1,
        }}
      />
    );
  }

  renderInnerBackFace() {
    const onPress = this.props.onPress;
    return (
      <View
        style={{
          backgroundColor: '#fff',
          flex: 1,
          borderTopWidth: StyleSheet.hairlineWidth,
          borderTopColor: '#BDC2C9',
          borderBottomLeftRadius: 2,
          borderBottomRightRadius: 2,
        }}>
        <View
          style={{
            backgroundColor: '#FFBD18',
            flex: 1,
            margin: 14,
            borderRadius: 2,
          }}>
          <TouchableHighlight
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={onPress}>
            <Text>PRESS ME now</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }

  render() {
    const onPress = this.props.onPress;

    return (
      <View style={{flex: 1}}>
        <FoldView
          renderFrontface={this.renderBlankFace}
          renderBackface={this.renderInnerBackFace}
          // perspective={1000}
        >
          <AdditionalInfoCard onPress={onPress} />
        </FoldView>
      </View>
    );
  }
}
