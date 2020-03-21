import React, { Fragment, memo, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Picker,
  Alert,
  Image,
  TouchableOpacity,
  NativeModules
} from "react-native";
import * as Progress from "react-native-progress";
import FastImage from "react-native-fast-image";

import Feather from "react-native-vector-icons/Feather";

import firebase from "@react-native-firebase/app";
import "@react-native-firebase/firestore";
import storage from "@react-native-firebase/storage";
import auth from "@react-native-firebase/auth";
import { Formik } from "formik";
import * as Yup from "yup";
import FormInput from "../../components/FormInput";
import FormButton from "../../components/FormButton";
import ErrorMessage from "../../components/ErrorMessage";

var ImagePicker = NativeModules.ImageCropPicker;

const validationSchema = Yup.object().shape({
  // service: Yup.string()
  // .label("Service Name"),
  // .required(),
  // .min(4, "Must have at least 4 characters"),
  description: Yup.string()
    .label("description"),
    // .required()
    // .min("Must have at least 4 characters"),
  price: Yup.number()
    .label("price")
    .required()
    .required()
    .min(50)
    .max(10000)
  // service: Yup.string()
  //   .label("Service Name")
  //   .required()
  //   .min(4, "Must have at least 4 characters")
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  buttonContainer: {
    margin: 25
  },
  photo: {
    alignItems: "flex-end",
    marginHorizontal: 32
  },
  filesContainer: {
    marginHorizontal: 10,
    height: 200
  },
  selectedImage: {
    width: "100%",
    height: "100%",
    alignSelf: "center"
  },

  progressView: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default memo(() => {
  const [user, setUser] = useState(null);
  const [service, setService] = useState(null);
  const [image, setImage] = useState(null);
  const [uploadingProg, setuploadingProg] = useState(false);
  const [percentage, setPercentage] = useState(null);

  const getUser = async () => {
    let user =  await auth().currentUser;
    setUser(user)
  }
  getUser()

  console.log(user)
  
  const onServiceChange = (itemValue, itemIndex) => {
    // console.log(itemIndex, '<= index , value => ', itemValue)
    setService(itemValue);
    // console.log(service)
  };

  const crop = image => {
    ImagePicker.openCropper({
      path: image.uri,
      width: 400,
      height: 400
    })
      .then(image => {
        console.log("received cropped image", image); // fix it later
        setImage({
          uri: image.path,
          width: image.width,
          height: image.height,
          mime: image.mime
        });
      })
      .catch(e => {
        console.log(e);
        Alert.alert(e.message ? e.message : e);
      });
  };

  const cleanupSingleImage = file => {
    console.log("selected file", file);
    setImage(null);
    ImagePicker.cleanSingle(file ? file.uri : null)
      .then(() => {
        console.log(`removed tmp image ${file.uri} from tmp directory`);
      })
      .catch(e => {
        Alert.alert(e);
      });
  };

  const uploadPhotoAsync = async (uri, uid) => {
    const fileExt = uri.split(".").pop();
    const path = `photos/${uid}/${Date.now()}.${fileExt}`;
    const putFile = uri.replace("file:///", "/");
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
          setPercentage(percentage);
          if (snapshot.state === storage.TaskState.SUCCESS) {
            // console.log("upload completed ");
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
        }
      );
    });
  };

  const handleonAdd = async (values, actions) => {
    const { description, price } = values;
    try {
      setuploadingProg(true);

      var remoteUri = await uploadPhotoAsync(image.uri, user.uid);
      let localImage = image;
      localImage.uri = remoteUri;

      setImage(localImage);
      setuploadingProg(false);

      var add = {
        description: description,
        price: price,
        image: image,
        name: service
      }

     const arrayUnion = firebase.firestore.FieldValue.arrayUnion(add);
      try{
        await firebase
        .firestore()
        .collection("partyHalls")
        .doc(user.uid)
        .collection('services')
        .doc(`${service}`)
        .update({
          [service] : arrayUnion,
        });
      }
      catch (error){
        await firebase
        .firestore()
        .collection("partyHalls")
        .doc("24RcBl6iKMPJfJJAbzGE1K8jzKt2")
        .collection('services')
        .doc(`${service}`)
        .set({
          [service] : arrayUnion,
        });
      }

    } catch (error) {
      // if(error == )
      console.log(error);
      actions.setFieldError("general", error.message);
    } finally {
      actions.setSubmitting(false);
    }
  };

  const pickImage = () => {
    ImagePicker.openPicker({
      multiple: false,
      waitAnimationEnd: true,
      includeExif: true,
      mediaType: "photo",
      forceJpg: true
    })
      .then(image => {
        setImage({
          uri: image.path,
          width: image.width,
          height: image.height,
          mime: image.mime
        });
      })
      .catch(e => alert(e));
  };

  const renderImage = image => {
    return (
      <View style={{ height: 200}}>
        <FastImage
          style={styles.selectedImage}
          source={{
            uri: image.uri,
            priority: FastImage.priority.normal,
            cashe: FastImage.cacheControl.immutable
          }}
          resizeMode={FastImage.resizeMode.cover}
        />
        <TouchableOpacity onPress={() => cleanupSingleImage(image)} style={{position: "absolute", top: 10, left: 20}}>
          <Feather name="trash-2" size={35} color={"#ffff"} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => crop(image)} style={{position: "absolute", top: 10, right: 20}}>
          <Feather name="edit-3" size={35} color={"#ffff"} />
        </TouchableOpacity>

        {uploadingProg ? (
          <View style={styles.progressView}>
            <Progress.Circle
              progress={percentage}
              showsText={true}
              size={100}
              thickness={6}
            />
          </View>
        ) : null}
      </View>
    );
  };

  return (
    <ScrollView style={{ marginTop: 50 }}>
      <Formik
        initialValues={{
          // service: service,
          description: "",
          price: ''
        }}
        onSubmit={(values, actions) => {
          handleonAdd(values, actions);
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
            <Picker
              selectedValue={service}
              placeholder="Select Service"
              value={service}
              onValueChange={(itemIndex, itemValue) => onServiceChange(itemIndex, itemValue)}
            >
              <Picker.Item label="Catering" value="Catering" />
              <Picker.Item label="Wedding Stage" value="Wedding Stage" />
              <Picker.Item label="Video Shooting" value="Video Shooting" />
            </Picker>

            {image ? (
              <View style={styles.filesContainer}>{renderImage(image)}</View>
            ) : (
              <TouchableOpacity onPress={pickImage}>
                <View
                  style={[styles.filesContainer, { backgroundColor: "gray" }]}
                >
                  <Feather name="upload-cloud" size={80} color={"#ffff"} style={{position: 'absolute', alignSelf: 'center', }}/>
                </View>
              </TouchableOpacity>
            )}

            <FormInput
              name="description"
              value={values.description}
              onChangeText={handleChange("description")}
              placeholder="Enter your description"
              iconName="md-person"
              iconColor="#2C384A"
              onBlur={handleBlur("description")}
            />
            <ErrorMessage
              errorValue={touched.description && errors.description}
            />

            <FormInput
              name="price"
              value={values.price}
              onChangeText={handleChange("price")}
              placeholder="Enter your price"
              iconName="md-person"
              iconColor="#2C384A"
              onBlur={handleBlur("price")}
            />
            <ErrorMessage errorValue={touched.price && errors.price} />

            <View style={styles.buttonContainer}>
              <FormButton
                buttonType="outline"
                onPress={handleSubmit}
                title="ADD A Sub Service"
                buttonColor="#F57C00"
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
});
