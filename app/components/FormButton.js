import React from 'react';
import {Button} from 'react-native-elements';

const FormButton = ({title, buttonType, buttonColor, ...rest}) => (
  <Button
    {...rest}
    type={buttonType}
    title={title}
    buttonStyle={{
      // borderColor: buttonColor,
      // height,
      borderRadius: 5,
      backgroundColor: '#F264B1',
    }}
    // buttonStyle={{ borderColor: buttonColor, borderRadius: 20 }}
    titleStyle={{color: buttonColor}}
  />
);

export default FormButton;

// import React from 'react'
// import { Button } from 'react-native-elements'

// const FormButton = ({ title, buttonType, buttonColor, ...rest }) => (
//   <Button
//     {...rest}
//     type={buttonType}
//     title={title}
//     buttonStyle={{ borderColor: buttonColor, borderRadius: 20 }}
//     titleStyle={{ color: buttonColor }}
//   />
// )

// export default FormButton
