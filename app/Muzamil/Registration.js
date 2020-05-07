import React, {useState, Fragment, useRef} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import {Button, CheckBox} from 'react-native-elements';
import Feather from 'react-native-vector-icons/Feather';
import Files from '../components/Files';
import {Formik} from 'formik';
import * as Yup from 'yup';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import ErrorMessage from '../components/ErrorMessage';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const validationSchema = Yup.object().shape({
  centerName: Yup.string()
    .label('Center Name')
    .required('الرجاء ادخال اسم المركز')
    .min(4, 'أسم المركز أكثر من أربعه حروف'),
  province: Yup.string()
    .label('Province')
    .required('أسم المنطقة اجباري')
    .min(5, 'أسم المنطقة اجباري'),
  address: Yup.string()
    .label('Full address')
    .required()
    .min(10, 'عنوان اجباري ١٠ حروف علاقل'),
  contactName: Yup.string()
    .label('Contact Name')
    .required()
    .min(5, 'اسم الشخص بالكامل أجباري'),
  phoneNo: Yup.string()
    .label('Phone No')
    .required('رقم الهاتف اجباري')
    .matches(phoneRegExp, 'الرجاء ادخال رقم صحيح'),
  email: Yup.string()
    .label('Email')
    .email('Enter a valid email')
    .required('الرجاء ادخال بريد صحيحط'),
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

  const childRef = useRef();

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
    const {centerName, province, address, contactName, email, phoneNo} = values;
    try {
      const response = await auth().createUserWithEmailAndPassword(
        email,
        phoneNo,
      );

      if (response.user.uid) {
        const {uid} = response.user;
        response.user.updateProfile({displayName: contactName});

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

        const providerData = {
          ownerId: uid,
          timestamp: Date.now(),
          centerName,
          province,
          address,
          contactName,
          email,
          phoneNo,
          files: images,
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
            type: 'centers',
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
          جاهز لاضافة اعلانك بالتطبيق !
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

            <FormInput
              name="province"
              value={values.province}
              onChangeText={handleChange('province')}
              placeholder="المنطقه"
              onBlur={handleBlur('province')}
            />
            <ErrorMessage errorValue={touched.province && errors.province} />

            <FormInput
              name="address"
              value={values.address}
              onChangeText={handleChange('address')}
              placeholder="الحي"
              onBlur={handleBlur('address')}
            />
            <ErrorMessage errorValue={touched.address && errors.address} />

            <FormInput
              name="contactName"
              value={values.contactName}
              onChangeText={handleChange('contactName')}
              placeholder="اسم الشخص"
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
              placeholder="رقم الجوال"
              onBlur={handleBlur('phoneNo')}
            />
            <ErrorMessage errorValue={touched.phoneNo && errors.phoneNo} />

            <FormInput
              name="email"
              value={values.email}
              onChangeText={handleChange('email')}
              placeholder="الايميل"
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
