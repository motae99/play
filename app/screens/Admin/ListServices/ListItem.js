import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export const LIST_ITEM_HEIGHT = 54;
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: '#f4f4f6',
    height: LIST_ITEM_HEIGHT,
  },
  name: {
    fontSize: 16,
  },
  pointsContainer: {
    borderRadius: 8,
    backgroundColor: '#44c282',
    padding: 8,
  },
  points: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ({item, isLast}) => {
  const bottomRadius = isLast ? 8 : 0;
  return (
    <View
      style={[
        styles.container,
        {
          borderBottomLeftRadius: bottomRadius,
          borderBottomRightRadius: bottomRadius,
        },
      ]}>
      <Text style={styles.name}>{item.name}</Text>
      <View style={styles.pointsContainer}>
        {item.optons ? (
          <Text style={styles.points}>
            {item.optons.length > 9
              ? item.optons.length
              : '00' + item.optons.length}
          </Text>
        ) : (
          <Text style={styles.points}>000</Text>
        )}
      </View>
    </View>
  );
};