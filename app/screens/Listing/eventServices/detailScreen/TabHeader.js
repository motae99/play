import React, {RefObject, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import MaskedView from '@react-native-community/masked-view';
import Tabs from './Tabs';
// import {TabModel} from './Content';
import Animated from 'react-native-reanimated';
import {useValues} from 'react-native-redash';

const {useCode} = Animated;
const styles = StyleSheet.create({
  container: {
    marginLeft: 8,
    height: 45,
    marginBottom: 8,
    flexDirection: 'row',
  },
});

export default ({y, tabs, transition}) => {
  const [index] = useValues([0], []);

  const [measurements, setMeasurements] = useState(
    new Array(tabs.length).fill(0),
  );

  const style = {
    borderRadius: 24,
    backgroundColor: 'rgba(0, 0, 0, 1)',
    width: measurements[0],
    flex: 1,
  };

  const opacity = transition;

  // useCode( ()=> block(), [])

  return (
    <Animated.View style={[styles.container, {opacity}]}>
      <Tabs
        onMeasurement={(i, m) => {
          measurements[i] = m;
          setMeasurements([...measurements]);
        }}
        {...{tabs}}
      />

      <View>
        <Animated.View {...{style}} />
      </View>
      <MaskedView
        style={StyleSheet.absoluteFillObject}
        maskElement={<Animated.View {...{style}} />}>
        <Tabs
          active
          onPress={i => {
            return true;
          }}
          {...{tabs}}
        />
      </MaskedView>
    </Animated.View>
  );
};
