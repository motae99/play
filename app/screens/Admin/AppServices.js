import React, {Fragment, memo, useState, useEffect} from 'react';
import {View, StyleSheet, Alert, Text, FlatList} from 'react-native';

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Entypo from 'react-native-vector-icons/Entypo';
import {Button} from 'react-native-elements';

import {Formik} from 'formik';
import * as Yup from 'yup';
import StyleGuide from '../../components/StyleGuide';

import FormInput from '../../components/FormInput';
import FormButton from '../../components/FormButton';
import ErrorMessage from '../../components/ErrorMessage';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation, useNavigationParam} from 'react-navigation-hooks';

const validationSchema = Yup.object().shape({
  service: Yup.string()
    .label('Service Name')
    .required('Required Field')
    .min(4, 'Must have at least 4 characters'),
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    // margin: 25,
  },
});

export default memo(() => {
  // const {navigate} = useNavigation();

  // const [services, setServices] = useState([]);
  // const [loading, setLoading] = useState(ture);

  // useEffect(() => {
  //   try {
  //     const unsubscribe = firestore()
  //       .collection('services')
  //       .orderBy('timestamp', 'desc')
  //       .onSnapshot(querySnapshot => {
  //         if (querySnapshot) {
  //           const AllServices = querySnapshot.docs.map(documentSnapshot => {
  //             return {
  //               ...documentSnapshot.data(),
  //               key: documentSnapshot.id,
  //             };
  //           });
  //           if (AllServices && AllServices.length > 0) {
  //             // console.log(AllServices);
  //             setServices(AllServices);
  //           }

  //           if (loading) {
  //             setLoading(false);
  //           }
  //         }
  //       });

  //     return () => unsubscribe();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, [loading]);

  const handleonAdd = async (values, actions) => {
    const {service} = values;
    try {
      firestore()
        .collection('services')
        .add({name: service, timestamp: Date.now()});
      actions.resetForm({});
      actions.setStatus({success: true});
      // navigate('Request');
    } catch (error) {
      // console.error(error);
      Alert.alert('please Ya :) login as a provider user Ok');
      actions.setFieldError('general', error.message);
      actions.setErrors({submit: error.message});
      actions.setStatus({success: false});
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <SafeAreaView>
      <Formik
        initialValues={{
          service: '',
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
            <View style={{flexDirection: 'row'}}>
              <View style={{flex: 3}}>
                <FormInput
                  name="service"
                  value={values.service}
                  onChangeText={handleChange('service')}
                  placeholder="Add an app service"
                  onBlur={handleBlur('service')}
                />
                <ErrorMessage
                  errorValue={touched.partyHallName && errors.partyHallName}
                />
              </View>
              <View style={{flex: 1}}>
                <Button
                  onPress={handleSubmit}
                  disabled={!isValid || isSubmitting}
                  loading={isSubmitting}
                  icon={<Entypo name="add-to-list" size={30} color="white" />}
                  buttonStyle={{
                    borderRadius: 100,
                    backgroundColor: StyleGuide.palette.primary,
                  }}
                />
                <ErrorMessage errorValue={errors.general} />
              </View>
            </View>
          </Fragment>
        )}
      </Formik>
    </SafeAreaView>
  );
});
