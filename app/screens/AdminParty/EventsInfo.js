import React, {useState, Fragment, useRef} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Modal,
  StyleSheet,
} from 'react-native';
import Select2 from 'react-native-select-two';

import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MapView, {Marker} from 'react-native-maps';
import Entypo from 'react-native-vector-icons/Entypo';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Button, Input, CheckBox} from 'react-native-elements';
import {Formik} from 'formik';
import * as Yup from 'yup';
import StyleGuide from '../../components/StyleGuide';
import Files from '../../components/Files';
import FormInput from '../../components/FormInput';
import FormButton from '../../components/FormButton';
import ErrorMessage from '../../components/ErrorMessage';
import AddressMap from '../../components/Address';
import geohash from 'ngeohash';

import firestore from '@react-native-firebase/firestore';

import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView} from 'react-native-gesture-handler';
const {width, height} = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0122;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  logoContainer: {
    marginBottom: 15,
    alignItems: 'center',
  },
  buttonContainer: {
    margin: 25,
  },
  checkBoxContainer: {
    backgroundColor: '#fff',
    borderColor: '#fff',
  },
});

const daysData = [
  {id: 'Sat', name: 'Sat'}, // set default checked for render option item
  {id: 'Sun', name: 'Sun'},
  {id: 'Mon', name: 'Mon'},
  {id: 'Tue', name: 'Tue'},
  {id: 'Wen', name: 'Wen'},
  {id: 'Fri', name: 'Fri'},
];

const validationSchema = Yup.object().shape({
  address: Yup.string()
    .label('Full address')
    .required()
    .min(10, 'Must have at least 10 characters'),
  capacity: Yup.number()
    .label('capacity')
    .required('capacity of your place')
    .min(50)
    .max(1000),
  // workingDays: Yup.array()
  //   .of(Yup.string())
  //   .required('Required'),
  Evening: Yup.boolean().oneOf([true, false], 'Please check'),
  // eAmount: Yup.string().when('Evening', {
  //   is: true,
  //   then: Yup.number().required('Evening Amount is required.'),
  // }),
  Night: Yup.boolean().oneOf([true, false], 'Please check'),
  // nAmount: Yup.boolean().when('Night', {
  //   is: true,
  //   then: Yup.number().required('Night Amount is required.'),
  // }),

  // contactNo: Yup.string()
  //   .label("contact No")
  //   .required("Plaese submit comtact info")
  //   .matches(phoneRegExp, "Phone number is not valid"),
  // email: Yup.string()
  //   .label("Email")
  //   .email("Enter a valid email")
  //   .required("Please enter a registered email"),
  // check: Yup.boolean().oneOf([true], "Please check the agreement")
});

export default function() {
  const childRef = useRef();

  const [perc, setPerc] = useState();
  const [images, setImages] = useState(null);
  const [uploadingTotal, setUpladingTotal] = useState(null);
  const [uploadingProg, setUploadingProg] = useState(null);
  const [dynamicIndex, setDynamicIndex] = useState(null);

  const [modal, setModal] = useState(false);
  const [Address, setAddress] = useState(null);
  const [geoPoint, setgeoPoint] = useState(null);
  const [geoHash, setgeoHash] = useState(null);
  const [coordinate, setcoordinate] = useState(null);
  const [region, setRegion] = useState(null);
  const [workingDays, addWorkingDays] = useState([]);
  const [eBooking, setEBooking] = useState(false);
  const [nBooking, setNBooking] = useState(false);

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
    const {providerName, province, city, contactName, email, eAmount} = values;
    try {
      if (!User || User.type !== 'partyHall') {
        // show custom error message to tell user should be loged in
        // actions.setFieldError('general', error.message);
      }

      if (eBooking && eAmount == '') {
        // show custom error message to tell images must be added
        actions.setErrors('');
        actions.setSubmitting(false);
        return null;
      }
      if (nBooking && nAmount == '') {
        // show custom error message to tell images must be added
        actions.setFieldError(field.name, '');
        actions.setSubmitting(false);
        return null;
      }
      if (!nBooking && !eBooking) {
        // show custom error message to tell images must be added
        actions.setSubmitting(false);
        return null;
      }
      if (!coordinate) {
        // show custom error message to tell images must be added
        actions.setSubmitting(false);
        return null;
      }

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
      } else {
        // show custom error message to tell images must be added
        actions.setSubmitting(false);
        return null;
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
    } catch (error) {
      console.log(error);
      actions.setFieldError('general', error.message);
    } finally {
      actions.setSubmitting(false);
    }
  };

  const handleAddress = address => {
    console.log(address);
    const geoPoint = new firestore.GeoPoint(
      address.latitude,
      address.longitude,
    );
    var coordinate = {
      latitude: address.latitude,
      longitude: address.longitude,
    };
    var hash = geohash.encode(address.latitude, address.longitude);
    setAddress(address.address);
    setgeoHash(hash);
    setcoordinate(coordinate);
    setgeoPoint(geoPoint);
    setRegion({
      latitude: address.latitude,
      longitude: address.longitude,
      latitudeDelta: address.latitudeDelta,
      longitudeDelta: address.longitudeDelta,
    });
  };

  const renderModal = () => {
    return (
      <Modal
        animationType={'slide'}
        transparent={false}
        visible={modal}
        onRequestClose={() => setModal(false)}>
        <AddressMap
          closeModal={() => setModal(false)}
          notifyChange={address => {
            handleAddress(address);
          }}
        />
      </Modal>
    );
  };

  return (
    <SafeAreaView>
      <ScrollView style={{marginHorizontal: 10, marginTop: 20}}>
        <Formik
          initialValues={{
            workingDays: '',
            address: '',
            capacity: '',
            Evening: false,
            Night: false,
            eAmount: '',
            nAmount: '',
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
              <View style={{backgroundColor: 'white'}}>
                <Select2
                  isSelectSingle={false}
                  style={{borderRadius: 5, height: 40}}
                  popupTitle="Week Days"
                  title="Working Days"
                  listEmptyTitle="Pick your Days"
                  // defaultFontName=''
                  selectedTitleStyle={{color: StyleGuide.palette.primary}}
                  buttonTextStyle={{color: StyleGuide.palette.primary}}
                  buttonStyle={{borderRadius: 5}}
                  colorTheme={StyleGuide.palette.backgroundPrimary}
                  cancelButtonText="Cancal"
                  selectButtonText="Add"
                  searchPlaceHolderText="Search"
                  data={daysData}
                  onSelect={data => {
                    addWorkingDays(data);
                    setFieldValue('workingDays', data);
                  }}
                  onRemoveItem={data => {
                    addWorkingDays(data);
                    setFieldValue('workingDays', data);
                  }}
                />
              </View>
              <ErrorMessage
                errorValue={touched.workingDays && errors.workingDays}
              />
              {coordinate ? (
                <View
                  style={{
                    height: 200,
                    borderRadius: 8,
                    borderColor: StyleGuide.palette.backgroundPrimary,
                    borderWidth: 1,
                    justifyContent: 'center',
                  }}>
                  <MapView
                    style={{
                      ...StyleSheet.absoluteFillObject,
                      borderRadius: 8,
                    }}
                    scrollEnabled={false}
                    zoomEnabled={false}
                    pitchEnabled={false}
                    rotateEnabled={false}
                    initialRegion={region}>
                    <Marker
                      title={'Found Address'}
                      description={Address}
                      coordinate={coordinate}
                    />
                  </MapView>
                </View>
              ) : (
                <View
                  style={{
                    backgroundColor: StyleGuide.palette.backgroundPrimary,
                    height: 200,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 8,
                  }}>
                  <TouchableOpacity onPress={() => setModal(true)}>
                    <MIcon
                      name="map-search-outline"
                      size={100}
                      color={StyleGuide.palette.primary}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={{position: 'absolute', top: 10, right: 10}}>
                    <MIcon
                      name="crosshairs-gps"
                      size={35}
                      color={StyleGuide.palette.primary}
                    />
                  </TouchableOpacity>
                </View>
              )}
              <FormInput
                name="address"
                value={values.address}
                onChangeText={handleChange('address')}
                placeholder="Enter your address"
                leftIcon={
                  <Entypo
                    name="address"
                    size={25}
                    color={StyleGuide.palette.primary}
                  />
                }
                onBlur={handleBlur('address')}
              />
              <ErrorMessage errorValue={touched.address && errors.address} />

              <FormInput
                name="capacity"
                keyboardType="number-pad"
                value={values.capacity}
                onChangeText={handleChange('capacity')}
                placeholder="Place capacity"
                leftIcon={
                  <MIcon
                    name="table-column-width"
                    size={25}
                    color={StyleGuide.palette.primary}
                  />
                }
                onBlur={handleBlur('capacity')}
              />
              <ErrorMessage errorValue={touched.capacity && errors.capacity} />

              <View style={{justifyContent: 'center'}}>
                <CheckBox
                  containerStyle={{
                    backgroundColor: '#fff',
                    borderColor: '#fff',
                    borderRadius: 5,
                    width: '100%',
                  }}
                  checkedIcon={
                    <Fontisto
                      name="day-haze"
                      size={25}
                      color={StyleGuide.palette.backgroundPrimary}
                    />
                  }
                  day-sunny
                  // iconType="material"
                  uncheckedIcon={
                    <Fontisto name="day-sunny" size={25} color="#f9c22e" />
                  }
                  title="Evening Booking"
                  checkedTitle="Set Price"
                  checked={values.Evening}
                  onPress={() => {
                    setFieldValue('Evening', !values.Evening);
                    setEBooking(!eBooking);
                  }}
                />
                <View
                  style={{
                    position: 'absolute',
                    right: 5,
                    width: width / 2,
                    opacity: eBooking ? 1 : 0,
                  }}>
                  <Input
                    disabled={!eBooking}
                    placeholder="المبلغ"
                    keyboardType="number-pad"
                    leftIcon={
                      <Ionicons
                        name="ios-pricetags"
                        size={25}
                        color={StyleGuide.palette.primary}
                      />
                    }
                    style={{fontFamily: StyleGuide.fontFamily}}
                    value={values.eAmount}
                    onChangeText={handleChange('eAmount')}
                    errorStyle={{color: 'red'}}
                    // errorMessage="ENTER A VALID ERROR HERE"
                  />
                </View>
              </View>

              <View style={{justifyContent: 'center'}}>
                <CheckBox
                  containerStyle={{
                    backgroundColor: '#fff',
                    borderColor: '#fff',
                    borderRadius: 5,
                    width: '100%',
                  }}
                  checkedIcon={
                    <MIcon
                      name="weather-night"
                      size={25}
                      color={StyleGuide.palette.primary}
                    />
                  }
                  day-sunny
                  // iconType="material"
                  uncheckedIcon={
                    <Fontisto name="night-clear" size={25} color="#5d576b" />
                  }
                  title="Night Booking"
                  checkedTitle="Set Price"
                  checked={values.Night}
                  onPress={() => {
                    setFieldValue('Night', !values.Night);
                    setNBooking(!nBooking);
                  }}
                />
                <View
                  style={{
                    position: 'absolute',
                    right: 5,
                    width: width / 2,
                    opacity: nBooking ? 1 : 0,
                  }}>
                  <Input
                    disabled={!nBooking}
                    placeholder="Amount"
                    keyboardType="number-pad"
                    leftIcon={
                      <Ionicons
                        name="ios-pricetags"
                        size={25}
                        color={StyleGuide.palette.primary}
                      />
                    }
                    style={styles}
                    value={values.nAmount}
                    onChangeText={handleChange('nAmount')}
                    errorStyle={{color: 'red'}}
                    // errorMessage="ENTER A VALID ERROR HERE"
                  />
                </View>
              </View>

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

              <View>
                <FormButton
                  buttonType="outline"
                  onPress={handleSubmit}
                  title="ADD Provider"
                  buttonColor={StyleGuide.palette.primary}
                  disabled={!isValid || isSubmitting}
                  loading={isSubmitting}
                />
              </View>
              <ErrorMessage errorValue={errors.general} />
            </Fragment>
          )}
        </Formik>
      </ScrollView>
      {renderModal()}
    </SafeAreaView>
  );
}
