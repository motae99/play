import React, {memo} from 'react'
import {View, Text, TouchableOpacity} from 'react-native'

export default memo( ({item, changeState}) =>{
 return(
  <View>
   <Text>{item.userName}</Text>
   <TouchableOpacity onPress={() => changeState(item)}>
     <Text>{item.status}</Text>
   </TouchableOpacity>
  </View>
 )
})