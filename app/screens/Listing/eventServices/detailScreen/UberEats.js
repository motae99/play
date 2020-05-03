import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import Animated from 'react-native-reanimated'
import HeaderImage from "./HeaderImage";
import Content, { defaultTabs } from "./Content";
import Header from "./Header";
import { useValues, onScroll } from "react-native-redash";

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default () => {
  const [tabs, setTabs] = useState(defaultTabs);
  const [y] = useValues([0], [])
  return (
    <View style={styles.container}>
      <HeaderImage {...{y}}/>

      <Animated.ScrollView 
        style={StyleSheet.absoluteFill} 
        scrollEventThrottle={1}
        onScroll={onScroll({y}) }
         
      >
        <Content
          onMeasurement={ (index, tab) => {
            tabs[index] = tab;
            setTabs([...tabs]);
          }}
        />
      </Animated.ScrollView>
      <Header {...{ tabs, y }} />
      <View style={{height: 60, width: 500, backgroundColor: 'red', position: 'absolute', top: 128}}/>
      <View style={{height: 80, width: 500, backgroundColor: 'green', position: 'absolute', bottom: 0}}/>

    </View>
  );
};
