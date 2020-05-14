import React, {RefObject, useState} from 'react';
import {StyleSheet, View, Text, Dimensions} from 'react-native';
const {height, width: wWidth} = Dimensions.get('window');

const styles = StyleSheet.create({
  title2: {
    fontFamily: 'UberMoveMedium',
    fontSize: 16,
  },
  text: {
    fontFamily: 'UberMoveRegular',
    fontSize: 14,
  },

  info: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },

  link: {
    color: '#247A00',
  },
});

export default () => {
  return (
    <View>
      <Text style={styles.title2}>Payment and Payment Details</Text>
      <View style={styles.info}>
        <Text style={styles.text}>some payment methods and info</Text>
        <Text style={styles.link}>some text</Text>
      </View>
      <Text style={styles.title2}>Payment and Payment Details</Text>
      <View style={styles.info}>
        <Text style={styles.text}>some payment methods and info</Text>
        <Text style={styles.link}>some text</Text>
      </View>
      <Text style={styles.title2}>Payment and Payment Details</Text>
      <View style={styles.info}>
        <Text style={styles.text}>some payment methods and info</Text>
        <Text style={styles.link}>some text</Text>
      </View>
      <Text style={styles.title2}>Payment and Payment Details</Text>
      <View style={styles.info}>
        <Text style={styles.text}>some payment methods and info</Text>
        <Text style={styles.link}>some text</Text>
      </View>
      <Text style={styles.title2}>Payment and Payment Details</Text>
      <View style={styles.info}>
        <Text style={styles.text}>some payment methods and info</Text>
        <Text style={styles.link}>some text</Text>
      </View>
      <Text style={styles.title2}>Payment and Payment Details</Text>
      <View style={styles.info}>
        <Text style={styles.text}>some payment methods and info</Text>
        <Text style={styles.link}>some text</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.text}>some payment methods and info</Text>
        <Text style={styles.link}>some text</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.text}>some payment methods and info</Text>
        <Text style={styles.link}>some text</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.text}>some payment methods and info</Text>
        <Text style={styles.link}>some text</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.text}>some payment methods and info</Text>
        <Text style={styles.link}>some text</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.text}>some payment methods and info</Text>
        <Text style={styles.link}>some text</Text>
      </View>
      <Text
        style={{
          backgroundColor: 'orange',
          width: wWidth - 50,
          height: 60,
          alignSelf: 'center',
          alignItems: 'center',
          color: 'white',
        }}>
        some text
      </Text>
    </View>
  );
};
