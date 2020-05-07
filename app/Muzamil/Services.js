import React, {Fragment, memo, useState, useEffect, useContext} from 'react';
import {View, StyleSheet, ScrollView, Picker, Text} from 'react-native';

import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

import {Formik} from 'formik';
import * as Yup from 'yup';
import UploadImage from '../components/SingleImage';

import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import ErrorMessage from '../components/ErrorMessage';
import Select2 from 'react-native-select-two';

import {UserContext} from '../context/UserContext';

const validationSchema = Yup.object().shape({
  // category: Yup.string()
  //   .label('النوع')
  //   .required('الرجاءاختيار النوع'),
  // subCategories: Yup.array().of(Yup.string()),
  // // .required('الرجاءاختيار النو'),
  // // Image: Yup.string()
  // //   .label('Image')
  // //   .required(),
  // // Do Object for Image
  // //  yup.object().shape({
  // //   name: string().required(),
  // //   age: number()
  // //     .required()
  // //     .positive()
  // //     .integer(),
  // //   email: string().email(),
  // //   website: string().url(),
  // // });
  // Name: Yup.string()
  //   .label('Name')
  //   .required('اسم أجباري')
  //   .min(5, 'اسم أجباري'),
  // Price: Yup.number()
  //   .label('Price')
  //   .required('سعر الخدمة اجباري')
  //   .min(5, 'سعر '),
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    margin: 25,
  },
  image: {},
});

export default memo(() => {
  const [provider, setProvider] = useState([]);
  const [categories, setCategories] = useState([]);
  const [category, selectCategory] = useState(null);
  const [subCategories, addSubCategories] = useState([]);
  const [select2, addSelect2] = useState([]);
  const [loading, setLoading] = useState(false);

  const [image, setImage] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [uploadingProg, setUploadingProg] = useState(false);
  const [perc, setPerc] = useState(null);

  const {User} = useContext(UserContext);
  // console.log(User);

  useEffect(() => {
    if (User) {
      try {
        const unsubscribe = firestore()
          .collection('users')
          .doc(User.uid)
          .onSnapshot(documentSnapshot => {
            if (documentSnapshot.exists) {
              setUserInfo(documentSnapshot.data());
            } else {
              // set some exception handling here
            }
          });

        return () => unsubscribe();
      } catch (error) {
        console.log(error);
      }
    }
  }, [User]);

  useEffect(() => {
    // console.log('user info ', userInfo.type);
    if (userInfo) {
      try {
        const unsubscribe = firestore()
          .collection(userInfo.type)
          .doc(userInfo.uid)
          .onSnapshot(documentSnapshot => {
            if (documentSnapshot.exists) {
              setProvider(documentSnapshot.data());
            } else {
              // set some exception handling here
            }
          });

        return () => unsubscribe();
      } catch (error) {
        console.log(error);
      }
    }
  }, [userInfo]);

  useEffect(() => {
    try {
      const unsubscribe = firestore()
        .collection('categories')
        .onSnapshot(querySnapshot => {
          if (querySnapshot) {
            const AllCategories = querySnapshot.docs.map(documentSnapshot => {
              return {
                ...documentSnapshot.data(),
                key: documentSnapshot.id,
              };
            });
            if (AllCategories && AllCategories.length > 0) {
              // console.log(AllCategories);
              setCategories(AllCategories);
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

  useEffect(() => {
    if (category) {
      // console.log(category);
      const item = categories.filter(item => category === item.name);
      const options = item[0].options;
      var array = [];
      options.forEach(element => {
        var obj = {
          id: element,
          name: element,
        };
        array.push(obj);
      });

      addSelect2(array);
    }
  }, [categories, category]);

  const setImageFunction = img => {
    // console.log('works');
    setImage(img);
    // setFieldValue('image', image);
  };

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
          // console.log(snapshot.bytesTransferred);
          // console.log(snapshot.totalBytes);
          var percentage = snapshot.bytesTransferred / snapshot.totalBytes;
          setPerc(percentage);
          // if (snapshot.state === storage.TaskState.SUCCESS) {
          //   console.log('upload completed ');
          // }
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
    const uid = User.uid;
    const {category, subCategories, name, price, disc} = values;
    try {
      setUploadingProg(true);
      var remoteUri = await uploadPhotoAsync(image.uri, uid);

      var acturalImage = image;
      acturalImage.uri = remoteUri;
      setImage(acturalImage);
      setUploadingProg(false);

      const offerData = {
        centerId: provider.ownerId,
        providerName: provider.centerName,
        providerRate: provider.rate,
        timestamp: Date.now(),
        category,
        subCategories,
        image,
        name,
        price,
        disc,
      };

      await firestore()
        .collection('centerOffers')
        .add(offerData);
    } catch (error) {
      console.error(error);
      actions.setFieldError('general', error.message);
    } finally {
      actions.setSubmitting(false);
    }
  };

  if (!userInfo) {
    return (
      <View>
        <Text>please add provider first</Text>
      </View>
    );
  }
  return (
    <ScrollView>
      <Formik
        initialValues={{
          category,
          subCategories,
          image,
          name: '',
          price: '',
          disc: '',
        }}
        onSubmit={(values, actions) => {
          // console.log(
          //   'Values ',
          //   values,
          //   ' subCategories',
          //   values.subCategories,
          // );
          // setTimeout(() => {
          //   // submit them do the server. do whatever you like!
          //   alert(JSON.stringify(values, null, 2));
          //   setSubmitting(false);
          // }, 1000);
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
              selectedValue={category}
              // prompt={'اختار الصنف'}
              // placeholder={'اختار الصنف'}
              // itemStyle={{backgroundColor: 'grey'}}
              // selectedValue={category}
              // value={category}
              onValueChange={(itemIndex, itemValue) => {
                setFieldValue('category', itemIndex);
                selectCategory(itemIndex);
              }}>
              <Picker.Item label="اختار الصنف" value={null} key={0} />
              {categories.map(category => {
                return (
                  <Picker.Item
                    key={category.key}
                    label={category.name}
                    value={category.name}
                  />
                );
              })}
            </Picker>
            <ErrorMessage errorValue={touched.category && errors.category} />

            <Select2
              isSelectSingle={false}
              style={{borderRadius: 5}}
              colorTheme="blue"
              popupTitle="واجد أو أكثر"
              title="اختار التجزئه"
              listEmptyTitle="أختر الصنف أولا"
              colorTheme="#F264B1"
              cancelButtonText="الغاء"
              selectButtonText="تم"
              searchPlaceHolderText="أبحث هنا"
              data={select2}
              onSelect={data => {
                // console.log(data);
                addSubCategories(data);
                setFieldValue('subCategories', data);
              }}
              onRemoveItem={data => {
                addSubCategories(data);
                setFieldValue('subCategories', data);
              }}
            />
            <ErrorMessage
              errorValue={touched.subCategories && errors.subCategories}
            />

            <View style={styles.image}>
              <UploadImage
                {...{
                  perc,
                  uploadingProg,
                  image,
                  // setImage,
                  setImageFunction,
                }}
              />
            </View>

            <FormInput
              name="name"
              value={values.name}
              onChangeText={handleChange('name')}
              placeholder="اسم العرض"
              onBlur={handleBlur('name')}
            />
            <ErrorMessage errorValue={touched.name && errors.name} />

            <FormInput
              name="price"
              keyboardType="numeric"
              value={values.price}
              onChangeText={handleChange('price')}
              placeholder="السعر"
              onBlur={handleBlur('price')}
            />
            <ErrorMessage errorValue={touched.price && errors.price} />

            <FormInput
              name="disc"
              value={values.disc}
              onChangeText={handleChange('disc')}
              placeholder="تسبة التخفيض"
              onBlur={handleBlur('disc')}
            />
            <ErrorMessage errorValue={touched.disc && errors.disc} />

            <View style={styles.buttonContainer}>
              <FormButton
                buttonType="outline"
                onPress={handleSubmit}
                title="ADD A Service"
                buttonColor="white"
                disabled={isSubmitting} //!isValid ||
                loading={isSubmitting}
              />
            </View>
            <ErrorMessage errorValue={errors.general} />
          </Fragment>
        )}
      </Formik>
    </ScrollView>
  );
});
