import React, {Fragment} from 'react';
import {StyleSheet, Text, View, Alert} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {Button} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FormInput from '../../../components/FormInput';
import ErrorMessage from '../../../components/ErrorMessage';

export const ADD_SERVICE_HEIGHT = 64;
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
    height: ADD_SERVICE_HEIGHT,
  },
  name: {
    fontSize: 16,
    width: 250,
  },
  pointsContainer: {
    borderRadius: 25,
    // backgroundColor: '#44c282',
    padding: 5,
  },
  points: {
    color: 'white',
    fontWeight: 'bold',
  },
});

const validationSchema = Yup.object().shape({
  category: Yup.string()
    .label('Category Name')
    .required('Required Field')
    .min(4, 'Must have at least 4 characters'),
});

export default ({service}) => {
  const handleonAdd = async (values, actions) => {
    const {category} = values;
    try {
      firestore()
        .collection('categories')
        .doc(`${service.name}`)
        .collection('Categories')
        .doc(`${category}`)
        .set({name: category, timestamp: Date.now()});
      actions.resetForm({});
      actions.setStatus({success: true});
      navigate('Request');
    } catch (error) {
      console.log(error);
      actions.setFieldError('general', error.message);
      actions.setErrors({submit: error.message});
      actions.setStatus({success: false});
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{
        category: '',
      }}
      onSubmit={(values, actions) => {
        handleonAdd(values, actions);
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
          <View style={[styles.container]}>
            <View style={styles.name}>
              <FormInput
                name="category"
                value={values.category}
                onChangeText={handleChange('category')}
                placeholder="Add a new category"
                onBlur={handleBlur('category')}
              />
              <ErrorMessage errorValue={touched.category && errors.category} />
            </View>

            <View style={styles.pointsContainer}>
              <Button
                onPress={handleSubmit}
                disabled={!isValid || isSubmitting}
                loading={isSubmitting}
                icon={
                  <Ionicons name="ios-add-circle" size={45} color="#002A32" />
                }
                buttonStyle={{backgroundColor: 'white'}}
              />
              <ErrorMessage errorValue={errors.general} />
            </View>
          </View>
        </Fragment>
      )}
    </Formik>
  );
};
