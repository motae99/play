import React, {useRef, useState} from 'react';
import {StyleSheet, View, StatusBar} from 'react-native';
import Animated from 'react-native-reanimated';
import {onScrollEvent, useValues} from 'react-native-redash';

import HeaderImage from './HeaderImage';
import Content from './Content';
import Header from './Header';
import Footer from './Footer';
import Dates from './Dates';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default () => {
  const services = ['Catering', 'VideoShooting', 'WeedingStage'];

  const menu = [];
  menu.push({name: 'Details'});
  menu.push({name: 'Dates'});
  services.forEach(service => {
    menu.push({name: service});
  });
  menu.push({name: 'Payment'});

  const defaultTabs = menu.map(({name}) => ({name, anchor: 0}));

  const scrollView = useRef(null);
  const [tabs, setTabs] = useState(defaultTabs);
  const [dateAncher, setDateAncher] = useState(0);
  const [paymentAncher, setPaymentAncher] = useState(0);
  const [y] = useValues([0], []);

  return (
    <View style={styles.container}>
      <HeaderImage {...{y}} />
      <Animated.ScrollView
        ref={scrollView}
        style={StyleSheet.absoluteFill}
        onScroll={onScrollEvent({y})}
        scrollEventThrottle={1}>
        <Content
          onMeasurement={(index, tab) => {
            tabs[index] = tab;
            setTabs([...tabs]);
          }}
          onDateAncher={ancher => {
            setDateAncher(ancher);
          }}
          onPaymentButton={ancher => {
            setPaymentAncher(ancher);
          }}
          {...{y, menu, services}}
        />
      </Animated.ScrollView>
      <Header {...{y, tabs, scrollView}} />
      <Dates {...{y, dateAncher}} />
      <Footer {...{y, paymentAncher}} />
    </View>
  );
};
