/* eslint-disable max-len */
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Animated from 'react-native-reanimated';
import {HEADER_IMAGE_HEIGHT} from './HeaderImage';
import {MIN_HEADER_HEIGHT} from './Header';
import Details from './components/Details';
import Dates from './components/DateTime';
import Services from './components/Services';
import Payment from './components/Payment';

const styles = StyleSheet.create({
  section: {
    padding: 16,
  },
  placeholder: {
    height: HEADER_IMAGE_HEIGHT,
    marginBottom: MIN_HEADER_HEIGHT,
  },

  divider: {
    height: 2,
    backgroundColor: '#e2e3e4',
  },
});

export default ({
  y,
  onMeasurement,
  onPaymentButton,
  onDateAncher,
  menu,
  services,
}) => {
  return (
    <>
      <View style={styles.placeholder} />

      {menu.map(({name}, index) => {
        return (
          <View
            style={styles.section}
            key={index}
            onLayout={({
              nativeEvent: {
                layout: {y: anchor},
              },
            }) => onMeasurement(index, {name, anchor: anchor - 142})}>
            {name == 'Details' ? <Details {...{y, name}} /> : null}
            {name == 'Dates' ? <Dates {...{onDateAncher}} /> : null}
            {services.includes(name) ? <Services {...{name}} /> : null}
            {name == 'Payment' ? <Payment {...{onPaymentButton}} /> : null}
          </View>
        );
      })}

      <View style={styles.divider} />

      <View style={[styles.section, {height: 400}]}>
        <Text> add some polcies here</Text>
      </View>
    </>
  );
};
