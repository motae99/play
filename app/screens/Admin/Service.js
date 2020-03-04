// import React, { Component, Fragment } from 'react'
// import {
//     View, Text, StyleSheet, ScrollView, Alert,
//     Image, TouchableOpacity, NativeModules, Dimensions, TextInput,
//     PermissionsAndroid, Platform, ToastAndroid,
//   } from 'react-native';


// import { Button, CheckBox } from 'react-native-elements'
// import Icon from 'react-native-vector-icons/FontAwesome';

// import  {Formik}  from 'formik'
// import * as Yup from 'yup'
// import FormInput from '../../components/FormInput'
// import FormButton from '../../components/FormButton'
// import ErrorMessage from '../../components/ErrorMessage'

// import auth from '@react-native-firebase/auth';
// import firestore from '@react-native-firebase/firestore';
  

// const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
// const validationSchema = Yup.object().shape({
//     partyHallName: Yup.string()
//         .label('Provider Name')
//         .required()
//         .min(4, 'Must have at least 4 characters'),
//     address: Yup.string()
//         .label('Full address')
//         .required()
//         .min(10, 'Must have at least 10 characters'),
//     hallRenting: Yup.number()
//         .label('hallRenting Price')
//         .required()
//         .min(100)
//         .max(10000),
//     cabacity: Yup.number()
//         .label('cabacity Price')
//         .required('Cabacity of your place')
//         .min(50)
//         .max(1000),
//     contactNo: Yup.string()
//         .label('contact No')
//         .required('Plaese submit comtact info')
//         .matches(phoneRegExp, 'Phone number is not valid'),
//     email: Yup.string()
//         .label('Email')
//         .email('Enter a valid email')
//         .required('Please enter a registered email'),
//     check: Yup.boolean().oneOf([true], 'Please check the agreement')
// })


// export default class ProviderHome extends React.Component {
    
//     constructor() {
//         super();
//         this.state = {
//             currentUser: auth().currentUser,
//             loading: false,
//         };
//         this.arr = [];
//     }

//     componentDidMount = async () => {
    
//     }
    
//     handleonAdd = async (values, actions) => {
//     const { 
//             partyHallName, 
//             address, 
//             hallRenting, 
//             cabacity, 
//             contactNo, 
//             email, 
//         } = values
//     try {
//             const providerData = {  
//                 ownerId: user.uid,
//                 timestamp: Date.now(),
//                 partyHallName, 
//                 address, 
//                 hallRenting, 
//                 cabacity, 
//                 contactNo, 
//                 email,
//                 files: this.state.images,
//                 coords: this.state.geoPoint,
//                 coordinate: this.state.coordinate,
//                 geohash: hash
//             };
            
//             const saving = await firestore()
//                     .collection('partyHalls')
//                     .doc(providerData.ownerId)
//                     .set(providerData);

//             if(saving){
//                 console.log('saved succussfuly')
//                 // this.props.navigation.navigate('Main')
//             }

        

//         } catch (error) {
//             console.error(error)
//             actions.setFieldError('general', error.message)
//         } finally {
//             actions.setSubmitting(false)
//         }
//     }



//     render() {
//         return (
//             <ScrollView >   
//                 <Formik
//                     initialValues={{
//                         partyHallName: '',
//                         address: '',
//                         hallRenting: '',
//                         cabacity: '',
//                         contactNo: '',
//                         email: '',
//                         check: false
//                     }}
//                     onSubmit={(values, actions) => {
//                         this.handleonAdd(values, actions)
//                     }}
//                     validationSchema={validationSchema}
//                     >
//                 {({
//                     handleChange,
//                     values,
//                     handleSubmit,
//                     errors,
//                     isValid,
//                     touched,
//                     handleBlur,
//                     isSubmitting,
//                     setFieldValue
//                 }) => (
//                     <Fragment>
//                     <FormInput
//                         name='partyHallName'
//                         value={values.partyHallName}
//                         onChangeText={handleChange('partyHallName')}
//                         placeholder='Enter your partyHallName'
//                         iconName='md-person'
//                         iconColor='#2C384A'
//                         onBlur={handleBlur('partyHallName')}
//                     />
//                     <ErrorMessage errorValue={touched.partyHallName && errors.partyHallName} />
//                     <FormInput
//                         name='address'
//                         value={values.address}
//                         onChangeText={handleChange('address')}
//                         placeholder='Enter your address'
//                         iconName='md-person'
//                         iconColor='#2C384A'
//                         onBlur={handleBlur('address')}
//                     />
//                     <ErrorMessage errorValue={touched.address && errors.address} />
//                     <FormInput
//                         name='contactNo'
//                         value={values.contactNo}
//                         onChangeText={handleChange('contactNo')}
//                         keyboardType={'numeric'}
//                         placeholder='249999099148'
//                         iconName='md-person'
//                         iconColor='#2C384A'
//                         onBlur={handleBlur('contactNo')}
//                     />
//                     <ErrorMessage errorValue={touched.contactNo && errors.contactNo} />
//                     <FormInput
//                         name='email'
//                         value={values.email}
//                         onChangeText={handleChange('email')}
//                         placeholder='Enter email'
//                         autoCapitalize='none'
//                         iconName='ios-mail'
//                         iconColor='#2C384A'
//                         onBlur={handleBlur('email')}
//                     />
//                     <ErrorMessage errorValue={touched.email && errors.email} />
//                     <FormInput
//                         name='hallRenting'
//                         value={values.hallRenting}
//                         onChangeText={handleChange('hallRenting')}
//                         keyboardType={'numeric'}
//                         placeholder='Must Enter hallRenting Price'
//                         iconName='md-person'
//                         iconColor='#2C384A'
//                         onBlur={handleBlur('hallRenting')}
//                     />
//                     <ErrorMessage errorValue={touched.hallRenting && errors.hallRenting} />
//                     <FormInput
//                         name='cabacity'
//                         value={values.cabacity}
//                         onChangeText={handleChange('cabacity')}
//                         keyboardType={'numeric'}
//                         placeholder='Enter your cabacity'
//                         iconName='md-person'
//                         iconColor='#2C384A'
//                         onBlur={handleBlur('cabacity')}
//                     />
//                     <ErrorMessage errorValue={touched.cabacity && errors.cabacity} />
                    

//                     <TouchableOpacity style={styles.photo} onPress={this.pickMultiple.bind(this)}>
//                         <Icon name="rocket" size={32} color="#D8D9DB"></Icon>
//                     </TouchableOpacity>
                    
//                     <ScrollView  
//                         // style={styles.container}
//                         horizontal 
//                         ref={ref => {
//                             this.scrollview_ref = ref;
//                         }}
//                      >
//                         { this.state.images ? this.state.images.map( (image, key) => 
                                        
//                                         <View 
//                                             style={styles.filesContainer} 
//                                             key={key}
//                                             onLayout={event => {
//                                                 const layout = event.nativeEvent.layout;
//                                                 this.arr[key] = layout.x;
//                                                 console.log('height:', layout.height);
//                                                 console.log('width:', layout.width);
//                                                 console.log('x:', layout.x);
//                                                 console.log('y:', layout.y);
//                                             }}
//                                             >
//                                             {this.renderAsset(image)}

//                                         </View>
//                                          ) : null
//                         }
                        
//                     </ScrollView>
//                     <CheckBox
//                         containerStyle={styles.checkBoxContainer}
//                         checkedIcon='check-box'
//                         iconType='material'
//                         uncheckedIcon='check-box-outline-blank'
//                         title='Agree to terms and conditions'
//                         checkedTitle='You agreed to our terms and conditions'
//                         checked={values.check}
//                         onPress={() => setFieldValue('check', !values.check)}
//                     />
//                     <View style={styles.buttonContainer}>
//                         <FormButton
//                         buttonType='outline'
//                         onPress={handleSubmit}
//                         title='ADD Provider'
//                         buttonColor='#F57C00'
//                         disabled={!isValid || isSubmitting}
//                         loading={isSubmitting}
//                         />
//                     </View>
//                     <ErrorMessage errorValue={errors.general} />
//                     </Fragment>
//                 )}
//                 </Formik>

//             </ScrollView>
//         );
//     }
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#fff',
//     },
//     logoContainer: {
//         marginBottom: 15,
//         alignItems: 'center'
//     },
//     buttonContainer: {
//         margin: 25
//     },
//     checkBoxContainer: {
//         backgroundColor: '#fff',
//         borderColor: '#fff'
//     },
//     header: {
//         flexDirection: "row",
//         justifyContent: "space-between",
//         paddingHorizontal: 32,
//         paddingVertical: 12,
//         borderBottomWidth: 1,
//         borderBottomColor: "#D8D9DB"
//     },
// });

