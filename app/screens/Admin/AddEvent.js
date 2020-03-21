import React, { Component, Fragment } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  Image,
  TouchableOpacity,
  NativeModules,
  Dimensions,
  TextInput,
  PermissionsAndroid,
  Platform,
  ToastAndroid,
  Modal
} from "react-native";

import Geolocation from "react-native-geolocation-service";
import LottieView from "lottie-react-native";

import { Button, CheckBox } from "react-native-elements";
import Ionicon from "react-native-vector-icons/Ionicons";
import Icon from "react-native-vector-icons/FontAwesome";
import * as Progress from "react-native-progress";

import { Formik } from "formik";
import * as Yup from "yup";
import FormInput from "../../components/FormInput";
import FormButton from "../../components/FormButton";
import ErrorMessage from "../../components/ErrorMessage";
import Address from "../../components/Address";

import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import storage from "@react-native-firebase/storage";
import geohash from "ngeohash";

import Video from "react-native-video";

var ImagePicker = NativeModules.ImageCropPicker;
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const validationSchema = Yup.object().shape({
  partyHallName: Yup.string()
    .label("Provider Name")
    .required()
    .min(4, "Must have at least 4 characters"),
  address: Yup.string()
    .label("Full address")
    .required()
    .min(10, "Must have at least 10 characters"),
  hallRenting: Yup.number()
    .label("hallRenting Price")
    .required()
    .min(1000)
    .max(100000),
  cabacity: Yup.number()
    .label("cabacity Price")
    .required("Cabacity of your place")
    .min(50)
    .max(1000),
  contactNo: Yup.string()
    .label("contact No")
    .required("Plaese submit comtact info")
    .matches(phoneRegExp, "Phone number is not valid"),
  email: Yup.string()
    .label("Email")
    .email("Enter a valid email")
    .required("Please enter a registered email"),
  check: Yup.boolean().oneOf([true], "Please check the agreement")
});

export default class ProviderHome extends React.Component {
  constructor() {
    super();
    this.state = {
      currentUser: auth().currentUser,
      modal: false,
      images: null,
      remoteUris: [],
      uploadingProg: null,
      uploadingTotal: null,
      perc: null,
      dynamicIndex: 0,
      // for location
      loading: false,
      updatesEnabled: false,
      location: {},
      geoPoint: null,
      geoHash: null,
      saving: false,
    };
    this.arr = [];
  }

  componentDidMount = async () => {
    // Instead of navigator.geolocation, just use Geolocation.
    // const hasLocationPermission = await this.hasLocationPermission();
    // if (hasLocationPermission) {
    //   await this.getLocation();
    // }
  };

  uploadPhotoAsync = async (uri, uid) => {
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
          this.setState({ perc: percentage });
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

  handleonAdd = async (values, actions) => {
    const {
      partyHallName,
      address,
      hallRenting,
      cabacity,
      contactNo,
      email
    } = values;
    try {
      const newUser = await auth().createUserWithEmailAndPassword(
        email,
        contactNo
      );
      if (newUser) {
        const user = newUser.user;
        user.updateProfile({
          displayName: partyHallName,
          phoneNumber: contactNo
        });
        const { images } = this.state;
        this.setState({ uploadingTotal: images.length });
        for (let i = 0; i < images.length; i++) {
          const image = images[i];
          this.setState({ uploadingProg: i });
          this.setState({ dynamicIndex: i });
          this.downButtonHandler();
          var remoteUri = await this.uploadPhotoAsync(image.uri, user.uid);
          let localImages = [...this.state.images];
          image.uri = remoteUri;
          localImages[i] = image;
          this.setState[{ images }];
          this.setState({ uploadingProg: i });
        }

        this.setState({ uploadingProg: null });

        const providerData = {
          ownerId: user.uid,
          timestamp: Date.now(),
          partyHallName,
          address,
          hallRenting,
          cabacity,
          contactNo,
          email,
          files: this.state.images,
          coords: this.state.geoPoint,
          coordinate: this.state.coordinate,
          geohash: this.state.geoHash
        };

        this.setState({saving: true})
        await firestore()
          .collection("partyHalls")
          .doc(providerData.ownerId)
          .set(providerData);

        await firestore()
          .collection("users")
          .doc(providerData.ownerId)
          .set({displayName: partyHallName, phoneNumber: contactNo, photoUrl: user.photoURL, timestamp: Date.now(), uid: user.uid, type: 'Provider'});
            
          this.setState({saving: false})
        this.props.navigation.navigate('EventListing')
        // saving.then( (res) => {this.props.navigation.navigate('EListing')})
      }
    } catch (error) {
      console.error(error);
      actions.setFieldError("general", error.message);
    } finally {
      actions.setSubmitting(false);
    }
  };

  pickMultiple() {
    ImagePicker.openPicker({
      multiple: true,
      waitAnimationEnd: true,
      includeExif: true,
      forceJpg: true
    })
      .then(images => {
        this.setState({
          images: images.map(i => {
            return {
              uri: i.path,
              width: i.width,
              height: i.height,
              mime: i.mime
            };
          })
        });
      })
      .catch(e => alert(e));
  }

  // do this after Done uploading
  cleanupImages() {
    ImagePicker.clean()
      .then(() => {
        console.log("removed tmp images from tmp directory");
      })
      .catch(e => {
        alert(e);
      });
  }

  // do this for Corping selected image
  crop(image) {
    ImagePicker.openCropper({
      path: image.uri,
      width: 400,
      height: 400
    })
      .then(image => {
        console.log("received cropped image", image); // fix it later
        //     var array = [...this.state.images];
        //     var index = array.indexOf(image);
        //     this.setState(this.state.images, {array[index]: image})
        //   this.setState({
        //     image: {uri: image.path, width: image.width, height: image.height, mime: image.mime},
        //     images: null
        //   });
      })
      .catch(e => {
        console.log(e);
        Alert.alert(e.message ? e.message : e);
      });
  }

  cleanupSingleImage(file) {
    console.log("selected file", file);
    var array = [...this.state.images];
    var index = array.indexOf(file);
    if (index !== -1) {
      array.splice(index, 1);
      this.setState({ images: array });
    }
    ImagePicker.cleanSingle(file ? file.uri : null)
      .then(() => {
        console.log(`removed tmp image ${file.uri} from tmp directory`);
      })
      .catch(e => {
        alert(e);
      });
  }

  renderVideo(video) {
    console.log("rendering video");
    console.log(video);
    return (
      <View style={{ height: 300, width: 300 }}>
        <TouchableOpacity onLongPress={() => this.cleanupSingleImage(video)}>
          <Video
            source={{ uri: video.uri, type: video.mime }}
            // style={{
            //     position: 'absolute',
            //     top: 0,
            //     left: 0,
            //     bottom: 0,
            //     right: 0
            // }}
            rate={1}
            paused={true}
            volume={1}
            muted={true}
            resizeMode={"cover"}
            onError={e => console.log("error this ", e)}
            onLoad={load => console.log("loading this", load)}
            repeat={true}
          />
        </TouchableOpacity>
      </View>
    );
  }

  renderImage(image) {
    const { uploadingProg } = this.state;
    var array = [...this.state.images];
    var index = array.indexOf(image);
    return (
      <View style={{ height: 300, width: 300 }}>
        <TouchableOpacity onLongPress={() => this.cleanupSingleImage(image)}>
          <Image
            style={{ width: 300, height: 300, resizeMode: "cover" }}
            source={image}
          />
        </TouchableOpacity>
        {/* {(progressFile == image.index) ? ( */}
        {index === uploadingProg ? (
          <View style={styles.progressView}>
            <Progress.Circle
              style={styles.progress}
              progress={this.state.perc}
              // indeterminate={this.state.indeterminate} later
              showsText={true}
              size={100}
              thickness={6}
            />
            <Text style={styles.progText}>
              uploading {this.state.uploadingProg} out of{" "}
              {this.state.uploadingTotal}
            </Text>
          </View>
        ) : null}
      </View>
    );
  }

  renderAsset(image) {
    if (image.mime && image.mime.toLowerCase().indexOf("video/") !== -1) {
      return this.renderVideo(image);
    }
    return this.renderImage(image);
  }

  downButtonHandler = () => {
    if (this.arr.length >= this.state.dynamicIndex) {
      this.scrollview_ref.scrollTo({
        x: this.arr[this.state.dynamicIndex],
        y: 0,
        animated: true
      });
    } else {
      alert("Out of Max Index");
    }
  };

  handleAddress(address) {
    const geoPoint = new firestore.GeoPoint(
      address.latitude,
      address.longitude
    );
    var coordinate = {
      latitude: address.latitude,
      longitude: address.longitude
    };
    var hash = geohash.encode(address.latitude, address.longitude);

    this.setState({
      address: address.address,
      // location: position,
      loading: false,
      geoPoint: geoPoint,
      coordinate: coordinate,
      geoHash: hash
    });

    // this.setState({
    //     address: address.address,
    //     latitude: address.latitude,
    //     longitude: address.longitude,
    //     latitudeDelta: address.latitudeDelta,
    //     longitudeDelta: address.longitudeDelta
    // })
  }

  renderModal() {
    return (
      <Modal
        animationType={"slide"}
        transparent={false}
        visible={this.state.modal}
        onRequestClose={() => this.setState({ modal: false })}
      >
        <Address
          closeModal={() => this.setState({ modal: false })}
          notifyChange={address => {
            this.handleAddress(address);
          }}
        />
      </Modal>
    );
  }

  render() {
   if(this.state.saving){
    return (
     <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
       <LottieView
         source={require("../../../images/weedingStage.json")}
         autoPlay
         loop
       />
     </View>
   );
   }
    return (
      <ScrollView>
        <Formik
          initialValues={{
            partyHallName: "",
            address: "",
            hallRenting: "",
            cabacity: "",
            contactNo: "",
            email: "",
            check: false
          }}
          onSubmit={(values, actions) => {
            this.handleonAdd(values, actions);
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
                name="partyHallName"
                value={values.partyHallName}
                onChangeText={handleChange("partyHallName")}
                placeholder="Enter your partyHallName"
                iconName="md-person"
                iconColor="#2C384A"
                onBlur={handleBlur("partyHallName")}
              />
              <ErrorMessage
                errorValue={touched.partyHallName && errors.partyHallName}
              />
              {this.renderModal()}
              <TouchableOpacity onPress={() => this.setState({ modal: true })}>
                <Text> Check Address </Text>
              </TouchableOpacity>
              <FormInput
                name="address"
                value={this.state.address ? this.state.address : values.address}
                onChangeText={handleChange("address")}
                placeholder="Enter your address"
                iconName="md-person"
                iconColor="#2C384A"
                onBlur={handleBlur("address")}
              />
              <ErrorMessage errorValue={touched.address && errors.address} />

              <FormInput
                name="contactNo"
                value={values.contactNo}
                onChangeText={handleChange("contactNo")}
                keyboardType={"numeric"}
                placeholder="249999099148"
                iconName="md-person"
                iconColor="#2C384A"
                onBlur={handleBlur("contactNo")}
              />
              <ErrorMessage
                errorValue={touched.contactNo && errors.contactNo}
              />
              <FormInput
                name="email"
                value={values.email}
                onChangeText={handleChange("email")}
                placeholder="Enter email"
                autoCapitalize="none"
                iconName="ios-mail"
                iconColor="#2C384A"
                onBlur={handleBlur("email")}
              />
              <ErrorMessage errorValue={touched.email && errors.email} />
              <FormInput
                name="hallRenting"
                value={values.hallRenting}
                onChangeText={handleChange("hallRenting")}
                keyboardType={"numeric"}
                placeholder="Must Enter hallRenting Price"
                iconName="md-person"
                iconColor="#2C384A"
                onBlur={handleBlur("hallRenting")}
              />
              <ErrorMessage
                errorValue={touched.hallRenting && errors.hallRenting}
              />
              <FormInput
                name="cabacity"
                value={values.cabacity}
                onChangeText={handleChange("cabacity")}
                keyboardType={"numeric"}
                placeholder="Enter your cabacity"
                iconName="md-person"
                iconColor="#2C384A"
                onBlur={handleBlur("cabacity")}
              />
              <ErrorMessage errorValue={touched.cabacity && errors.cabacity} />
              <TouchableOpacity
                style={styles.photo}
                onPress={this.pickMultiple.bind(this)}
              >
                <Icon name="rocket" size={32} color="#D8D9DB"></Icon>
              </TouchableOpacity>

              <ScrollView
                // style={styles.container}
                horizontal
                ref={ref => {
                  this.scrollview_ref = ref;
                }}
              >
                {this.state.images
                  ? this.state.images.map((image, key) => (
                      <View
                        style={styles.filesContainer}
                        key={key}
                        onLayout={event => {
                          const layout = event.nativeEvent.layout;
                          this.arr[key] = layout.x;
                          console.log("height:", layout.height);
                          console.log("width:", layout.width);
                          console.log("x:", layout.x);
                          console.log("y:", layout.y);
                        }}
                      >
                        {this.renderAsset(image)}
                      </View>
                    ))
                  : null}
              </ScrollView>
              <CheckBox
                containerStyle={styles.checkBoxContainer}
                checkedIcon="check-box"
                iconType="material"
                uncheckedIcon="check-box-outline-blank"
                title="Agree to terms and conditions"
                checkedTitle="You agreed to our terms and conditions"
                checked={values.check}
                onPress={() => setFieldValue("check", !values.check)}
              />
              <View style={styles.buttonContainer}>
                <FormButton
                  buttonType="outline"
                  onPress={handleSubmit}
                  title="ADD Provider"
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
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  logoContainer: {
    marginBottom: 15,
    alignItems: "center"
  },
  buttonContainer: {
    margin: 25
  },
  checkBoxContainer: {
    backgroundColor: "#fff",
    borderColor: "#fff"
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#D8D9DB"
  },
  photo: {
    alignItems: "flex-end",
    marginHorizontal: 32
  },
  filesContainer: {
    marginHorizontal: 10,
    height: 350
  },
  progress: {
    // position: 'absolute',
    // justifyContent: 'center',
    // alignItems: "center"
  },
  progressView: {
    // height: 300,
    // width: 300,
    // backgroundColor: 'green',
    backgroundColor: 'rgba(0,0,0,0.4)',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center"
  },
  progText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 15,
    fontStyle: "italic"
  }
});
