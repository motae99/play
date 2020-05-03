import React, {Component, Fragment} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {Formik} from 'formik';
import * as Yup from 'yup';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import ErrorMessage from '../components/ErrorMessage';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';


const validationSchema = Yup.object().shape({
  centerName: Yup.string()
    .label('Center Name')
    .required()
    .min(4, 'أسم المركز أكثر من أربعه حروف'),
  province: Yup.string()
    .label('Province')
    .required()
    .min(5, 'أسم المنطقة اجباري'),
  address: Yup.string()
    .label('Full address')
    .required()
    .min(10, 'عنوان اجباري ١٠ حروف علاقل'),
});

export default class Signup extends Component {
  handleonAdd = async (values, actions) => {
    const {centerName, province, address, contactName, email, phoneNo} = values;
    try {
      const response = await auth().createUserWithEmailAndPassword(
        email,
        phoneNo,
      );

      if (response.user.uid) {
        const {uid} = response.user;
        response.user.updateProfile({displayName: contactName});
        const providerData = {
          ownerId: uid,
          timestamp: Date.now(),
          centerName,
          province,
          address,
          contactName,
          email,
          phoneNo,
        };
        await firestore()
          .collection('centers')
          .doc(uid)
          .set(providerData);
        // this.props.navigation.navigate('ProviderHome')

        await firestore()
          .collection('users')
          .doc(uid)
          .set({
            displayName: contactName,
            type: 'beautyCenter',
            phoneNo: phoneNo,
            email: email,
            status: 'inActive',
          });
      }
    } catch (error) {
      console.error(error);
      actions.setFieldError('general', error.message);
    } finally {
      actions.setSubmitting(false);
    }
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.notify}>
          <Feather
            name="x-circle"
            color="white"
            size={24}
            style={{position: 'absolute', top: 10, right: 10}}
          />
          <Text
            style={{
              position: 'absolute',
              height: 40,
              left: 156,
              top: 47,
              fontFamily: 'Arial',
              fontStyle: 'normal',
              fontWeight: 'bold',
              fontSize: 18,
              lineHeight: 21,
              color: '#FFFFFF',
            }}>
            جاهز لاضافة اعلانك بالتطبيق !
          </Text>
          <Text
            style={{
              position: 'absolute',
              height: 48,
              margin: 10,
              top: 70,
              fontFamily: 'Arial',
              fontStyle: 'normal',
              fontWeight: 'bold',
              fontSize: 18,
              lineHeight: 21,
              color: '#FFFFFF',
            }}>
            يرجى استكمال بينات العيادة أو المركز و سنتواصل معك
          </Text>
        </View>

        <Formik
          initialValues={{
            centerName: '',
            province: '',
            address: '',
            contactName: '',
            email: '',
            phoneNo: '',
          }}
          onSubmit={(values, actions) => {
            this.handleonAdd(values, actions);
          }}
          validationSchema={validationSchema}>
          {({
            handleChange,
            values,
            handleSubmit,
            errors,
            isValid,
            touched,
            handleBlur,
            isSubmitting,
            setFieldValue,
          }) => (
            <Fragment>
              <FormInput
                name="centerName"
                value={values.centerName}
                onChangeText={handleChange('centerName')}
                placeholder="اسم المركز"
                onBlur={handleBlur('centerName')}
              />
              <ErrorMessage
                errorValue={touched.centerName && errors.centerName}
              />

              <View style={styles.buttonContainer}>
                <FormButton
                  // buttonType='outline'
                  onPress={handleSubmit}
                  title="ارسال"
                  buttonColor="white"
                  disabled={!isValid || isSubmitting}
                  loading={isSubmitting}
                />
              </View>
              <ErrorMessage errorValue={errors.general} />
            </Fragment>
          )}
        </Formik>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 0,
  },
  notify: {
    backgroundColor: '#2F80ED',
    height: 171,
  },
  logoContainer: {
    marginBottom: 15,
    alignItems: 'center',
  },
  buttonContainer: {
    margin: 5,
    paddingTop: 20,
  },
  checkBoxContainer: {
    backgroundColor: '#fff',
    borderColor: '#fff',
  },
});
