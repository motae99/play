import React from 'react';
import {StyleSheet, Text, View, Platform} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

const styles = StyleSheet.create({
  container: {
    height: 45,
    paddingHorizontal: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  text: {
    fontSize: 14,
    fontFamily: 'UberMoveRegular',
  },
});

export default ({name, color, onMeasurement, onPress}) => {
  return (
    <TouchableWithoutFeedback {...{onPress}}>
      <View
        onLayout={
          onMeasurement
            ? ({
                nativeEvent: {
                  layout: {width},
                },
              }) => onMeasurement(width)
            : undefined
        }
        style={styles.container}>
        {Platform.OS === 'ios' ? (
          <Text style={[styles.text, {color}]}>{name}</Text>
        ) : (
          <Text style={[styles.text, {}]}>{name}</Text>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};
