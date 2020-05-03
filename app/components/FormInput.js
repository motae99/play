import React from 'react';
import {Input} from 'react-native-elements';
import {StyleSheet, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const FormInput = ({
  iconName,
  iconColor,
  returnKeyType,
  keyboardType,
  name,
  placeholder,
  ...rest
}) => (
  <View style={styles.inputContainer}>
    <Input
      {...rest}
      leftIcon={<Ionicons name={iconName} size={28} color={iconColor} />}
      leftIconContainerStyle={styles.iconStyle}
      placeholderTextColor="rgba(0, 0, 0, 0.5)"
      name={name}
      placeholder={placeholder}
      style={styles.input}
      inputContainerStyle={{borderBottomWidth: 0}}
    />
  </View>
);

const styles = StyleSheet.create({
  // inputContainer: {
  //   margin: 15
  // },
  // iconStyle: {
  //   marginRight: 10
  // }
  input: {
    borderBottomWidth: 0,
  },
  inputContainer: {
    marginHorizontal: 10,
    marginTop: 5,
    height: 49,
    backgroundColor: '#FFFFFF',
    // borderWidth: 1,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
});

export default FormInput;

// import React from 'react'
// import { Input } from 'react-native-elements'
// import { StyleSheet, View } from 'react-native'
// import Ionicons from 'react-native-vector-icons/Ionicons';

// const FormInput = ({
//   iconName,
//   iconColor,
//   returnKeyType,
//   keyboardType,
//   name,
//   placeholder,
//   ...rest
// }) => (
//   <View style={styles.inputContainer}>
//     <Input
//       {...rest}
//       leftIcon={<Ionicons name={iconName} size={28} color={iconColor} />}
//       leftIconContainerStyle={styles.iconStyle}
//       placeholderTextColor='grey'
//       name={name}
//       placeholder={placeholder}
//       style={styles.input}
//     />
//   </View>
// )

// const styles = StyleSheet.create({
//   inputContainer: {
//     margin: 15
//   },
//   iconStyle: {
//     marginRight: 10
//   }
// })

// export default FormInput
