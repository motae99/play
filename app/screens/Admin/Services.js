// import { Formik } from 'formik';
// import React from 'react';
// import {Button, Text, TextInput, View} from 'react-native';
// import React from "react"

// const CatInputs = (props) => {
//   return (
//     props.cats.map((val, idx)=> {
//       let catId = `cat-${idx}`, ageId = `age-${idx}`
//       return (
//         <View key={idx}>
//           <TextInput
//             type="text"
//             name={catId}
//             data-id={idx}
//             id={catId}
//             value={props.cats[idx].name} 
//             className="name"

//             key={catId}
//             // onChangeText={handleChange(`services[${index}].name`)}
//             // onBlur={handleBlur(`services[${index}].name`)}
//             value={props.cats[idx].name}
//           />
//         </View>
//       )
//     })
//   )
// }
// export default CatInputs
// // const createService = () => ({
// //   name: '',
// //   price: '',
// //   desc: '',
// // });

// // /*
// // * Form for submitting a bunch of questions
// // * */
// // const HelloForm = () => {
// //   return (
// //     <Formik
// //       initialValues={{ services: [] }}
// //       onSubmit={values => console.log(values)}
// //     >
// //       {({ handleChange, handleBlur, handleSubmit, values, setFieldValue }) => (
// //         <View>
// //           <Text>services!</Text>
          
// //           {values.services.map(({ name, desc, price }, index) => (
// //             <View>
// //             <TextInput
// //               key={index}
// //               onChangeText={handleChange(`services[${index}].name`)}
// //               onBlur={handleBlur(`services[${index}].name`)}
// //               value={values.services[index].text}
// //             />
// //             <TextInput
// //               key={index}
// //               onChangeText={handleChange(`services[${index}].desc`)}
// //               onBlur={handleBlur(`services[${index}].desc`)}
// //               value={values.services[index].text}
// //             />
// //             <TextInput
// //               key={index}
// //               onChangeText={handleChange(`services[${index}].price`)}
// //               onBlur={handleBlur(`services[${index}].price`)}
// //               value={values.services[index].text}
// //             />
// //             </View>
// //           ))}
// //           <Button onPress={() => setFieldValue('services', [...values.services, createService()])} title="Add a service" />
// //           <Button onPress={handleSubmit} title="Submit" />
// //         </View>
// //       )}
// //     </Formik>
// //   )
// // };

// // export default HelloForm;

// // import React, { Component, Fragment } from 'react'
// // import {
// //     View, Text, StyleSheet, ScrollView, Alert,
// //     Image, TouchableOpacity, NativeModules, Dimensions, TextInput,
// //     PermissionsAndroid, Platform, ToastAndroid,
// //   } from 'react-native';


// // import { Button, CheckBox } from 'react-native-elements'
// // import Icon from 'react-native-vector-icons/FontAwesome';

// // import  {Formik}  from 'formik'
// // import * as Yup from 'yup'
// // import FormInput from '../../components/FormInput'
// // import FormButton from '../../components/FormButton'
// // import ErrorMessage from '../../components/ErrorMessage'

// // const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
// // const validationSchema = Yup.object().shape({
// //     name: Yup.string()
// //         .label(' Name')
// //         .required()
// //         .min(4, 'Must have at least 4 characters'),
// //     desc: Yup.string()
// //         .label('Full desc')
// //         .required()
// //         .min(10, 'Must have at least 10 characters'),
// //     price: Yup.number()
// //         .label(' Price')
// //         .required()
// //         .min(100)
// //         .max(10000)
// // })


// // export default class Service extends React.Component {
    
// //     constructor() {
// //         super();
// //         this.state = {
// //             currentUser: auth().currentUser,
// //             loading: false,
// //         };
// //         this.arr = [];
// //     }

// //     componentDidMount = async () => {
    
// //     }
    
// //     handleonAdd = async (values, actions) => {
// //     const { 
// //             name, 
// //             desc, 
// //             price, 
// //         } = values
// //     try {
// //             const providerData = {  
// //                 name, 
// //                 desc, 
// //                 price, 
// //             };
            
// //             const saving = await firestore()
// //                     .collection('partyHalls')
// //                     .doc(providerData.ownerId)
// //                     .set(providerData);

// //             if(saving){
// //                 console.log('saved succussfuly')
// //                 // this.props.navigation.navigate('Main')
// //             }

        

// //         } catch (error) {
// //             console.error(error)
// //             actions.setFieldError('general', error.message)
// //         } finally {
// //             actions.setSubmitting(false)
// //         }
// //     }



// //     render() {
// //         return (
// //             <ScrollView >   
// //                 <Formik
// //                     initialValues={{
// //                         name: '',
// //                         desc: '',
// //                         price: '',
// //                     }}
// //                     onSubmit={(values, actions) => {
// //                         this.handleonAdd(values, actions)
// //                     }}
// //                     validationSchema={validationSchema}
// //                     >
// //                 {({
// //                     handleChange,
// //                     values,
// //                     handleSubmit,
// //                     errors,
// //                     isValid,
// //                     touched,
// //                     handleBlur,
// //                     isSubmitting,
// //                     setFieldValue
// //                 }) => (
// //                     <Fragment>
// //                     <FormInput
// //                         name='name'
// //                         value={values.name}
// //                         onChangeText={handleChange('name')}
// //                         placeholder='Enter your name'
// //                         iconName='md-person'
// //                         iconColor='#2C384A'
// //                         onBlur={handleBlur('name')}
// //                     />
// //                     <ErrorMessage errorValue={touched.name && errors.name} />
// //                     <FormInput
// //                         name='desc'
// //                         value={values.desc}
// //                         onChangeText={handleChange('desc')}
// //                         placeholder='Enter your desc'
// //                         iconName='md-person'
// //                         iconColor='#2C384A'
// //                         onBlur={handleBlur('desc')}
// //                     />
// //                     <ErrorMessage errorValue={touched.desc && errors.desc} />
// //                     <FormInput
// //                         name='price'
// //                         value={values.price}
// //                         onChangeText={handleChange('price')}
// //                         keyboardType={'numeric'}
// //                         placeholder='Must Enter price Price'
// //                         iconName='md-person'
// //                         iconColor='#2C384A'
// //                         onBlur={handleBlur('price')}
// //                     />
// //                     <ErrorMessage errorValue={touched.price && errors.price} />
                    
// //                     <ScrollView  
// //                         // style={styles.container}
// //                         horizontal 
// //                         ref={ref => {
// //                             this.scrollview_ref = ref;
// //                         }}
// //                      >
// //                         { this.state.images ? this.state.images.map( (image, key) => 
                                        
// //                                         <View 
// //                                             style={styles.filesContainer} 
// //                                             key={key}
// //                                             onLayout={event => {
// //                                                 const layout = event.nativeEvent.layout;
// //                                                 this.arr[key] = layout.x;
// //                                                 console.log('height:', layout.height);
// //                                                 console.log('width:', layout.width);
// //                                                 console.log('x:', layout.x);
// //                                                 console.log('y:', layout.y);
// //                                             }}
// //                                             >
// //                                             {this.renderAsset(image)}

// //                                         </View>
// //                                          ) : null
// //                         }
                        
// //                     </ScrollView>
// //                     <CheckBox
// //                         containerStyle={styles.checkBoxContainer}
// //                         checkedIcon='check-box'
// //                         iconType='material'
// //                         uncheckedIcon='check-box-outline-blank'
// //                         title='Agree to terms and conditions'
// //                         checkedTitle='You agreed to our terms and conditions'
// //                         checked={values.check}
// //                         onPress={() => setFieldValue('check', !values.check)}
// //                     />
// //                     <View style={styles.buttonContainer}>
// //                         <FormButton
// //                         buttonType='outline'
// //                         onPress={handleSubmit}
// //                         title='ADD Provider'
// //                         buttonColor='#F57C00'
// //                         disabled={!isValid || isSubmitting}
// //                         loading={isSubmitting}
// //                         />
// //                     </View>
// //                     <ErrorMessage errorValue={errors.general} />
// //                     </Fragment>
// //                 )}
// //                 </Formik>

// //             </ScrollView>
// //         );
// //     }
// // }

// // const styles = StyleSheet.create({
// //     container: {
// //         flex: 1,
// //         backgroundColor: '#fff',
// //     },
// //     logoContainer: {
// //         marginBottom: 15,
// //         alignItems: 'center'
// //     },
// //     buttonContainer: {
// //         margin: 25
// //     },
// //     checkBoxContainer: {
// //         backgroundColor: '#fff',
// //         borderColor: '#fff'
// //     },
// //     header: {
// //         flexDirection: "row",
// //         justifyContent: "space-between",
// //         paddingHorizontal: 32,
// //         paddingVertical: 12,
// //         borderBottomWidth: 1,
// //         borderBottomColor: "#D8D9DB"
// //     },
// // });

import React from 'react'
import {Text} from 'react-native'
class Files extends React.Component {
 constructor(props) {
  super(props);
  this.state = {  }
 }
 render() { 
  return ( <Text>Files</Text> );
 }
}
 
export default Files;