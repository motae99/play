import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from 'react-navigation-hooks';

import auth from '@react-native-firebase/auth';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default function() {
  const {navigate} = useNavigation();

  const startOver = () => {
    auth().signOut();
    // navigate('Registration');
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={startOver}>
        <Text>getOutta here</Text>
      </TouchableOpacity>
    </View>
  );
}
