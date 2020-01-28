import React, { Component, Fragment } from 'react'
import { StyleSheet, SafeAreaView, ScrollView,  View, TouchableOpacity } from 'react-native'
import { Button, CheckBox } from 'react-native-elements'
import  Ionicon  from 'react-native-vector-icons/Ionicons';
import  {Formik}  from 'formik'
import * as Yup from 'yup'
import FormInput from '../components/FormInput'
import FormButton from '../components/FormButton'
import ErrorMessage from '../components/ErrorMessage'

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/


const validationSchema = Yup.object().shape({
    partyHallName: Yup.string()
        .label('Provider Name')
        .required()
        .min(4, 'Must have at least 4 characters'),
    address: Yup.string()
        .label('Full address')
        .required()
        .min(10, 'Must have at least 10 characters'),
    photographing: Yup.number()
        .label('Photographing Price')
        .min(100)
        .max(10000),
    weddingStage: Yup.number()
        .label('weddingStage Price')
        .min(100)
        .max(10000),
    videoShooting: Yup.number()
        .label('videoShooting Price')
        .min(100)
        .max(10000),
    hallRenting: Yup.number()
        .label('hallRenting Price')
        .min(100)
        .max(10000),
    cabacity: Yup.number()
        .label('cabacity Price')
        .required('Cabacity of your place')
        .min(50)
        .max(1000),
    CateringPrice: Yup.number()
        .label('CateringPrice Price')
        .min(10)
        .max(10000),
    night: Yup.boolean()
        .oneOf([true], 'Please check Night Time')
        .label('Night Time'),
    day: Yup.boolean()
        .oneOf([true], 'Please check Day Time')
        .label('Day time'),
    contactNo: Yup.string()
        .label('contact No')
        .required('Plaese submit comtact info')
        .matches(phoneRegExp, 'Phone number is not valid'),
    email: Yup.string()
        .label('Email')
        .email('Enter a valid email')
        .required('Please enter a registered email'),
    password: Yup.string()
        .label('Password')
        .required()
        .min(6, 'Password should be at least 6 characters '),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Confirm Password must matched Password')
        .required('Confirm Password is required'),
    check: Yup.boolean().oneOf([true], 'Please check the agreement')
})

export default class Signup extends Component {
  state = {
    // user: auth().currentUser,
    passwordVisibility: true,
    confirmPasswordVisibility: true,
    passwordIcon: 'ios-eye',
    confirmPasswordIcon: 'ios-eye'
  }

  goToLogin = () => this.props.navigation.navigate('Login')


  handleonAdd = async (values, actions) => {
    const { 
            partyHallName, 
            address, 
            photographing, 
            weddingStage, 
            videoShooting, 
            hallRenting, 
            cabacity, 
            CateringPrice, 
            contactNo, 
            day, 
            night,
            email, 
            password
        } = values
    try {
        const response = await auth().createUserWithEmailAndPassword(
            email,
            password
        );
    
          if (response.user.uid) {
              const { uid } = response.user
              response.user.updateProfile({desplayName: partyHallName});
              const providerData = {  
                                      ownerId: uid,
                                      timestamp: Date.now(),
                                      partyHallName, 
                                      address, 
                                      photographing, 
                                      weddingStage, 
                                      videoShooting, 
                                      hallRenting, 
                                      cabacity, 
                                      CateringPrice, 
                                      contactNo, 
                                      day, 
                                      night,
                                      email, 
                                  }
              await firestore()
              .collection('partyHalls')
              .doc(uid)
              .set(providerData)
              this.props.navigation.navigate('ProviderHome')
          }

        } catch (error) {
        console.error(error)
        actions.setFieldError('general', error.message)
        } finally {
        actions.setSubmitting(false)
        }
  }

  render() {
    const {
        passwordVisibility,
        confirmPasswordVisibility,
        passwordIcon,
        confirmPasswordIcon
      } = this.state

    return (
      <ScrollView style={styles.container}>
        <Formik
          initialValues={{
            partyHallName: '',
            address: '',
            photographing: '',
            weddingStage: '',
            videoShooting: '',
            hallRenting: '',
            cabacity: '',
            CateringPrice: '',
            contactNo: '',
            day: false,
            night: false,
            email: '',
            password: '',
            confirmPassword: '',
            check: false
          }}
          onSubmit={(values, actions) => {
            this.handleonAdd(values, actions)
          }}
          validationSchema={validationSchema}
        >
          {({
            handleChange,
            values,
            handleSubmit,
            errors,
            isValid,
            touched,
            handleBlur,
            isSubmitting,
            setFieldValue
          }) => (
            <Fragment>
              <FormInput
                name='partyHallName'
                value={values.partyHallName}
                onChangeText={handleChange('partyHallName')}
                placeholder='Enter your partyHallName'
                iconName='md-person'
                iconColor='#2C384A'
                onBlur={handleBlur('partyHallName')}
              />
              <ErrorMessage errorValue={touched.partyHallName && errors.partyHallName} />
              <FormInput
                name='address'
                value={values.address}
                onChangeText={handleChange('address')}
                placeholder='Enter your address'
                iconName='md-person'
                iconColor='#2C384A'
                onBlur={handleBlur('address')}
              />
              <ErrorMessage errorValue={touched.address && errors.address} />
              <FormInput
                name='contactNo'
                value={values.contactNo}
                onChangeText={handleChange('contactNo')}
                placeholder='249999099148'
                iconName='md-person'
                iconColor='#2C384A'
                onBlur={handleBlur('contactNo')}
              />
              <ErrorMessage errorValue={touched.contactNo && errors.contactNo} />
              <FormInput
                name='photographing'
                value={values.photographing}
                onChangeText={handleChange('photographing')}
                placeholder='Enter photographing Price if Available'
                iconName='md-person'
                iconColor='#2C384A'
                onBlur={handleBlur('photographing')}
              />
              <ErrorMessage errorValue={touched.photographing && errors.photographing} />
              <FormInput
                name='weddingStage'
                value={values.weddingStage}
                onChangeText={handleChange('weddingStage')}
                placeholder='Enter weddingStage Price if Available'
                iconName='md-person'
                iconColor='#2C384A'
                onBlur={handleBlur('weddingStage')}
              />
              <ErrorMessage errorValue={touched.weddingStage && errors.weddingStage} />
              <FormInput
                name='videoShooting'
                value={values.videoShooting}
                onChangeText={handleChange('videoShooting')}
                placeholder='Enter videoShooting Price if Available'
                iconName='md-person'
                iconColor='#2C384A'
                onBlur={handleBlur('videoShooting')}
              />
              <ErrorMessage errorValue={touched.videoShooting && errors.videoShooting} />
              <FormInput
                name='hallRenting'
                value={values.hallRenting}
                onChangeText={handleChange('hallRenting')}
                placeholder='Must Enter hallRenting Price'
                iconName='md-person'
                iconColor='#2C384A'
                onBlur={handleBlur('hallRenting')}
              />
              <ErrorMessage errorValue={touched.hallRenting && errors.hallRenting} />
              <FormInput
                name='cabacity'
                value={values.cabacity}
                onChangeText={handleChange('cabacity')}
                placeholder='Enter your cabacity'
                iconName='md-person'
                iconColor='#2C384A'
                onBlur={handleBlur('cabacity')}
              />
              <ErrorMessage errorValue={touched.cabacity && errors.cabacity} />
              <FormInput
                name='CateringPrice'
                value={values.CateringPrice}
                onChangeText={handleChange('CateringPrice')}
                placeholder='Enter your CateringPrice'
                iconName='md-person'
                iconColor='#2C384A'
                onBlur={handleBlur('CateringPrice')}
              />
              <ErrorMessage errorValue={touched.CateringPrice && errors.CateringPrice} />
              <CheckBox
                containerStyle={styles.checkBoxContainer}
                checkedIcon='check-box'
                iconType='material'
                uncheckedIcon='check-box-outline-blank'
                title='Do you have Day time service'
                checkedTitle='You Do'
                checked={values.day}
                onPress={() => setFieldValue('day', !values.day)}
              />
              <CheckBox
                containerStyle={styles.checkBoxContainer}
                checkedIcon='check-box'
                iconType='material'
                uncheckedIcon='check-box-outline-blank'
                title='Do you have night time service'
                checkedTitle='You Do'
                checked={values.night}
                onPress={() => setFieldValue('night', !values.night)}
              />
              <FormInput
                name='email'
                value={values.email}
                onChangeText={handleChange('email')}
                placeholder='Enter email'
                autoCapitalize='none'
                iconName='ios-mail'
                iconColor='#2C384A'
                onBlur={handleBlur('email')}
              />
              <ErrorMessage errorValue={touched.email && errors.email} />
              <FormInput
                name='password'
                value={values.password}
                onChangeText={handleChange('password')}
                placeholder='Enter password'
                iconName='ios-lock'
                iconColor='#2C384A'
                onBlur={handleBlur('password')}
                secureTextEntry={passwordVisibility}
                rightIcon={
                  <TouchableOpacity onPress={this.handlePasswordVisibility}>
                    <Ionicon name={passwordIcon} size={28} color='grey' />
                  </TouchableOpacity>
                }
              />
              <ErrorMessage errorValue={touched.password && errors.password} />
              <FormInput
                name='password'
                value={values.confirmPassword}
                onChangeText={handleChange('confirmPassword')}
                placeholder='Confirm password'
                iconName='ios-lock'
                iconColor='#2C384A'
                onBlur={handleBlur('confirmPassword')}
                secureTextEntry={confirmPasswordVisibility}
                rightIcon={
                  <TouchableOpacity
                    onPress={this.handleConfirmPasswordVisibility}
                    >
                    <Ionicon
                      name={confirmPasswordIcon}
                      size={28}
                      color='grey'
                    />
                  </TouchableOpacity>
                }
              />
              <ErrorMessage
                errorValue={touched.confirmPassword && errors.confirmPassword}
              />
              <CheckBox
                containerStyle={styles.checkBoxContainer}
                checkedIcon='check-box'
                iconType='material'
                uncheckedIcon='check-box-outline-blank'
                title='Agree to terms and conditions'
                checkedTitle='You agreed to our terms and conditions'
                checked={values.check}
                onPress={() => setFieldValue('check', !values.check)}
              />
              <View style={styles.buttonContainer}>
                <FormButton
                  buttonType='outline'
                  onPress={handleSubmit}
                  title='ADD Provider'
                  buttonColor='#F57C00'
                  disabled={!isValid || isSubmitting}
                  loading={isSubmitting}
                />
              </View>
              <ErrorMessage errorValue={errors.general} />
            </Fragment>
          )}
        </Formik>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 50
  },
  logoContainer: {
    marginBottom: 15,
    alignItems: 'center'
  },
  buttonContainer: {
    margin: 25
  },
  checkBoxContainer: {
    backgroundColor: '#fff',
    borderColor: '#fff'
  }
})


