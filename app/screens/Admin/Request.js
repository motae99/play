import React, {useState, Fragment, useRef, useEffect} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Picker,
} from 'react-native';
import {Button, CheckBox} from 'react-native-elements';
import Feather from 'react-native-vector-icons/Feather';
import Files from '../../components/Files';
import {Formik} from 'formik';
import * as Yup from 'yup';
import FormInput from '../../components/FormInput';
import FormButton from '../../components/FormButton';
import ErrorMessage from '../../components/ErrorMessage';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const validationSchema = Yup.object().shape({
  providerName: Yup.string()
    .label('providerName')
    .required('Provider name is required')
    .min(5, 'Provider name is at least 5 char'),
  province: Yup.string()
    .label('Province')
    .required('Province is required')
    .min(5, 'Province is at least 5 char'),
  city: Yup.string()
    .label('Full city')
    .required('City is required')
    .min(5, 'City is at least 5 char'),
  contactName: Yup.string()
    .label('Contact Name')
    .required('Full name is required')
    .min(10, 'Full name is at least 10 char'),
  phoneNo: Yup.string()
    .label('Phone No')
    .required('Phone No is required')
    .matches(phoneRegExp, 'Plz inter a valid Number'),
  email: Yup.string()
    .label('Email')
    .email('Enter a valid email')
    .required('Plz inter a valid Email'),
});

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

export default function() {
  const [perc, setPerc] = useState();
  const [images, setImages] = useState(null);
  const [uploadingTotal, setUpladingTotal] = useState(null);
  const [uploadingProg, setUploadingProg] = useState(null);
  const [dynamicIndex, setDynamicIndex] = useState(null);
  const [services, setServices] = useState([]);
  const [serviceType, selectserviceType] = useState(null);
  const [loading, setLoading] = useState(true);

  const childRef = useRef();

  useEffect(() => {
    try {
      const unsubscribe = firestore()
        .collection('services')
        .onSnapshot(querySnapshot => {
          if (querySnapshot) {
            const AllServices = querySnapshot.docs.map(documentSnapshot => {
              return {
                ...documentSnapshot.data(),
                key: documentSnapshot.id,
              };
            });
            if (AllServices && AllServices.length > 0) {
              // console.log(AllServices);
              setServices(AllServices);
            }

            if (loading) {
              setLoading(false);
            }
          }
        });

      return () => unsubscribe();
    } catch (error) {
      console.log(error);
    }
  }, [loading]);

  const uploadPhotoAsync = async (uri, uid) => {
    const fileExt = uri.split('.').pop();
    const path = `photos/${uid}/${Date.now()}.${fileExt}`;
    const putFile = uri.replace('file:///', '/');
    return new Promise(async (res, rej) => {
      let upload = storage()
        .ref(path)
        .putFile(putFile);
      upload.on(
        storage.TaskEvent.STATE_CHANGED,
        snapshot => {
          console.log(snapshot.bytesTransferred);
          console.log(snapshot.totalBytes);
          var percentage = snapshot.bytesTransferred / snapshot.totalBytes;
          setPerc(percentage);
          if (snapshot.state === storage.TaskState.SUCCESS) {
            console.log('upload completed ');
          }
        },
        err => {
          rej(err);
        },
        async () => {
          const url = await storage()
            .ref(path)
            .getDownloadURL();
          res(url);
        },
      );
    });
  };

  const handleonAdd = async (values, actions) => {
    const {providerName, province, city, contactName, email, phoneNo} = values;
    try {
      const response = await auth().createUserWithEmailAndPassword(
        email,
        phoneNo,
      );

      if (response.user.uid) {
        const {uid} = response.user;
        response.user.updateProfile({displayName: contactName});

        if (images) {
          setUpladingTotal(images.length);

          for (let i = 0; i < images.length; i++) {
            const image = images[i];
            setUploadingProg(i);
            setDynamicIndex(i);
            childRef.current.downButtonHandler();
            var remoteUri = await uploadPhotoAsync(image.uri, uid);
            let localImages = [...images];
            image.uri = remoteUri;
            localImages[i] = image;
            setImages(images);
            setUploadingProg(i);
          }

          setUploadingProg(null);
        }

        const providerData = {
          ownerId: uid,
          timestamp: Date.now(),
          providerName,
          type: serviceType,
          province,
          city,
          email,
          phoneNo,
          files: images,
        };

        await firestore()
          .collection(serviceType)
          .doc(uid)
          .set(providerData);
        // this.props.navigation.navigate('ProviderHome')

        await firestore()
          .collection('users')
          .doc(uid)
          .set({
            displayName: contactName,
            besinussName: providerName,
            type: serviceType,
            phoneNo: phoneNo,
            email: email,
            status: 'inActive',
            timestamp: Date.now(),
          });

        actions.resetForm({});
        actions.setStatus({success: true});
        // navigate('Info');
      }
    } catch (error) {
      console.error(error);
      actions.setFieldError('general', error.message);
    } finally {
      actions.setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
        <Text>Important things worth waiting</Text>
      </View>
    );
  }
  return (
    <ScrollView style={styles.container}>
      {/* <View style={styles.notify}>
        <Feather
          name="x-circle"
          color="white"
          size={24}
          style={{position: 'absolute', top: 10, right: 10}}
        />
        <Text
          style={{
            position: 'absolute',
            // width: 187,
            height: 40,
            left: 156,
            top: 47,
            // margin: 10,

            fontFamily: 'Arial',
            fontStyle: 'normal',
            fontWeight: 'bold',
            fontSize: 18,
            lineHeight: 21,
            color: '#FFFFFF',
          }}>
          User should fill this form to register !
        </Text>
        <Text
          style={{
            position: 'absolute',
            // width: 304,
            height: 48,
            // righ: 20,
            margin: 10,
            top: 70,
            fontFamily: 'Arial',
            fontStyle: 'normal',
            fontWeight: 'bold',
            fontSize: 18,
            lineHeight: 21,
            color: '#FFFFFF',
          }}>
          form acts as request for regisering with this app and Admin approval
          would determine
        </Text>
      </View>*/}
      <Formik
        initialValues={{
          providerName: '',
          province: '',
          city: '',
          contactName: '',
          email: '',
          phoneNo: '',
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
            <Picker
              selectedValue={serviceType}
              onValueChange={(itemIndex, itemValue) => {
                setFieldValue('serviceType', itemIndex);
                selectserviceType(itemIndex);
              }}>
              <Picker.Item label="Service Type" value={null} key={0} />
              {services.map(serviceType => {
                return (
                  <Picker.Item
                    key={serviceType.key}
                    label={serviceType.name}
                    value={serviceType.name}
                  />
                );
              })}
            </Picker>
            <ErrorMessage
              errorValue={touched.serviceType && errors.serviceType}
            />

            <FormInput
              name="providerName"
              value={values.providerName}
              onChangeText={handleChange('providerName')}
              placeholder="Provider Name"
              onBlur={handleBlur('providerName')}
            />
            <ErrorMessage
              errorValue={touched.providerName && errors.providerName}
            />

            <FormInput
              name="city"
              value={values.city}
              onChangeText={handleChange('city')}
              placeholder="City"
              onBlur={handleBlur('city')}
            />
            <ErrorMessage errorValue={touched.city && errors.city} />

            <FormInput
              name="province"
              value={values.province}
              onChangeText={handleChange('province')}
              placeholder="Province"
              onBlur={handleBlur('province')}
            />
            <ErrorMessage errorValue={touched.province && errors.province} />

            <FormInput
              name="contactName"
              value={values.contactName}
              onChangeText={handleChange('contactName')}
              placeholder="Contact Person"
              onBlur={handleBlur('contactName')}
            />
            <ErrorMessage
              errorValue={touched.contactName && errors.contactName}
            />

            <FormInput
              name="phoneNo"
              maxLength={10}
              keyboardType="numeric"
              value={values.phoneNo}
              onChangeText={handleChange('phoneNo')}
              placeholder="Phone NO"
              onBlur={handleBlur('phoneNo')}
            />
            <ErrorMessage errorValue={touched.phoneNo && errors.phoneNo} />

            <FormInput
              name="email"
              value={values.email}
              onChangeText={handleChange('email')}
              placeholder="Email ID"
              onBlur={handleBlur('email')}
            />
            <ErrorMessage errorValue={touched.email && errors.email} />

            <Files
              ref={childRef}
              {...{
                perc,
                uploadingProg,
                uploadingTotal,
                dynamicIndex,
                images,
                setImages,
              }}
            />

            {serviceType ? (
              <View>
                <View style={styles.buttonContainer}>
                  <FormButton
                    // buttonType='outline'
                    onPress={handleSubmit}
                    title="Request"
                    buttonColor="white"
                    disabled={!isValid || isSubmitting}
                    loading={isSubmitting}
                  />
                </View>
                <ErrorMessage errorValue={errors.general} />
              </View>
            ) : null}
          </Fragment>
        )}
      </Formik>
    </ScrollView>
  );
}
