import React, { Component, Fragment } from 'react'
import { StyleSheet, ScrollView, View, TouchableOpacity, StatusBar } from 'react-native'
import { Button } from 'react-native-elements'
import Ionicons  from 'react-native-vector-icons/Ionicons';
import  {Formik}  from 'formik'
import * as Yup from 'yup'
import { HideWithKeyboard } from 'react-native-hide-with-keyboard'
import FormInput from '../../components/FormInput'
import FormButton from '../../components/FormButton'
import ErrorMessage from '../../components/ErrorMessage'
import AppLogo from '../../components/AppLogo'


import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-community/google-signin';
import { LoginButton, AccessToken } from 'react-native-fbsdk';

import {firebase} from '@react-native-firebase/auth';

import Video from "react-native-video";
import InkinWater from "../../../InkinWater.mp4";

import auth from '@react-native-firebase/auth';


// do this after successful login to sync contacts
// PermissionsAndroid.request( 
//   PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
//   {
//     'title': 'Contacts',
//     'message': 'This app would like to view your contacts.',
//     'buttonPositive': 'Please accept bare mortal'
//   }
// ).then(() => {
//   Contacts.getAll((err, contacts) => {
//     if (err === 'denied'){
//       // error 
//       console.log('error denied');
//     } else {
//       // contacts returned in Array
//       console.log('allowed');

//       contacts.forEach(contact => {
//         console.log('--------------------------------------')
//         console.log(contact.givenName)
//         console.log(contact.phoneNumbers)
//         console.log('--------------------------------------')

//       });
//       // console.log(contacts);

//     }
//   })
// })

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .label('Email')
    .email('Enter a valid email')
    .required('Please enter a registered email'),
  password: Yup.string()
    .label('Password')
    .required()
    .min(6, 'Password must have at least 6 characters ')
})

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pushData: [],
      loggedIn: false,
      passwordVisibility: true,
      rightIcon: 'ios-eye'
    }
  }

  componentDidMount() {
    GoogleSignin.configure({
      scopes: ['https://www.googleapis.com/auth/drive.readonly'],
      webClientId: '443844365530-gr1hepnuf3c5rvmo12lr72v431757pio.apps.googleusercontent.com', 
      offlineAccess: true, 
      hostedDomain: '', 
      forceConsentPrompt: true, 
    });
  }

  // _signIn = async () => {
  //   try {
  //     await GoogleSignin.hasPlayServices();
  //     const userInfo = await GoogleSignin.signIn();
  //     // console.log(userInfo);
  //     this.setState({ userInfo: userInfo, loggedIn: true });
  //   } catch (error) {
  //     if (error.code === statusCodes.SIGN_IN_CANCELLED) {
  //       console.log('user cancelled the login flow');
  //       // user cancelled the login flow
  //     } else if (error.code === statusCodes.IN_PROGRESS) {
  //       // operation (f.e. sign in) is in progress already
  //       console.log('is in progress already');
  //     } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
  //       // play services not available or outdated
  //       console.log('play services not available or outdated');
  //     }else if (error.code === statusCodes.DEVELOPER_ERROR) {
  //       // play services not available or outdated
  //       console.log('DEVELOPER_ERROR');
  //     } else {
  //       // some other error happened
  //       console.log('some other error happened', error);

  //     }
  //   }
  // };

  _firebaseGoogleLogin = async () => {
    try {
      // add any configuration settings here:
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log('google user info ', userInfo)
      this.setState({ userInfo: userInfo, loggedIn: true });
      // create a new firebase credential with the token
      const credential = firebase.auth.GoogleAuthProvider.credential(userInfo.idToken, userInfo.accessToken)
      // login with credential
      const firebaseUserCredential = await firebase.auth().signInWithCredential(credential);
      
      const user = auth().currentUser;
      console.log('we have user', user)

      if(user.phoneNumber){
        console.log('good to go')
        console.log('has phone', user.phoneNumber)
        this.props.navigation.navigate('App')
      }
      else{
        // console.log('no phone #')
        // this.props.navigation.navigate('Phone')
        this.props.navigation.navigate('App')
      }

      } catch (error) {
      console.log(error)
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
        console.log('some other error happened', error);
      }
    }
  }

  faceBookLogin = async (data) => {
    console.log('you here', data)
    const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);
    await firebase.auth().signInWithCredential(credential);
    
    const user = auth().currentUser;
      console.log('we have user', user)

      if(user.phoneNumber){
        console.log('good to go')
        console.log('has phone', user.phoneNumber)
        this.props.navigation.navigate('App')
      }
      else{
        console.log('no phone #')
        this.props.navigation.navigate('App')
      }
  }

  getCurrentUserInfo = async () => {
    try {
      const userInfo = await GoogleSignin.signInSilently();
      this.setState({ userInfo });
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_REQUIRED) {
        // user has not signed in yet
        this.setState({ loggedIn: false });
      } else {
        // some other error
        this.setState({ loggedIn: false });
      }
    }
  };

  signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      this.setState({ user: null, loggedIn: false }); // Remember to remove the user from your app's state as well
    } catch (error) {
      console.error(error);
    }
  };

  goToSignup = () => this.props.navigation.navigate('Signup')

  handlePasswordVisibility = () => {
    this.setState(prevState => ({
      rightIcon: prevState.rightIcon === 'ios-eye' ? 'ios-eye-off' : 'ios-eye',
      passwordVisibility: !prevState.passwordVisibility
    }))
  }

  handleOnLogin = async (values, actions) => {
    const { email, password } = values
    try {
      const response = await auth().signInWithEmailAndPassword(email, password);

      if (response.user) {
        const user = auth().currentUser;
        console.log('we have user', response.user)
        console.log('has phone', response.user.phoneNumber)

        if(response.user.phoneNumber){
          console.log('good to go')
          this.props.navigation.navigate('App')
        }

        else{
          console.log('no phone no')
          this.props.navigation.navigate('Phone')
        }
        
      }
    } catch (error) {
      actions.setFieldError('general', error.message)
    } finally {
      actions.setSubmitting(false)
    }
  }

  render() {
    const { passwordVisibility, rightIcon } = this.state
    return (
      <ScrollView style={styles.container}>
        <StatusBar hidden={true} />
        <Video repeat source={InkinWater} resizeMode="cover" style={StyleSheet.absoluteFill} />
        <HideWithKeyboard style={styles.logoContainer}>
          <AppLogo />
        </HideWithKeyboard>
        <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={(values, actions) => {
            this.handleOnLogin(values, actions)
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
            isSubmitting
          }) => (
            <Fragment>
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
                secureTextEntry={passwordVisibility}
                iconName='ios-lock'
                iconColor='#2C384A'
                onBlur={handleBlur('password')}
                rightIcon={
                  <TouchableOpacity onPress={this.handlePasswordVisibility}>
                    <Ionicons name={rightIcon} size={28} color='grey' ></Ionicons>
                  </TouchableOpacity>
                }
              />
              <ErrorMessage errorValue={touched.password && errors.password} />
              <View style={styles.buttonContainer}>
                <FormButton
                  buttonType='outline'
                  onPress={handleSubmit}
                  title='LOGIN'
                  buttonColor='#039BE5'
                  disabled={!isValid || isSubmitting}
                  loading={isSubmitting}
                />
              </View>
              <ErrorMessage errorValue={errors.general} />
            </Fragment>
          )}
        </Formik>

        <View style={styles.buttonContainer}>
        
          <GoogleSigninButton
            style={styles.socialButton}
            // buttonType={'outline'}
            // size={GoogleSigninButton.Size.Wide}
            // size={GoogleSigninButton.Size.Icon}
            color={GoogleSigninButton.Color.Light}
            onPress={this._firebaseGoogleLogin}
            disabled={this.state.isSigninInProgress} 
          />

          <LoginButton
            style={styles.socialButton}
            // buttonType={'outline'}
            logInWithPermissions={["publish_actions"]}
            onLoginFinished={
              (error, result) => {
                if (error) {
                  console.log("login has error: " + 
                  error);
                } else if (result.isCancelled) {
                  console.log("login is cancelled.");
                } else {

                  console.log(result);
                  AccessToken.getCurrentAccessToken().then(
                    (data) => {
                      this.setState({
                        loggedIn: true,
                        userID: data.userID,
                      })
                      this.faceBookLogin(data)
                      // console.log(data, data.accessToken.toString())
                    }
                  )
                }
              }
            }
            onLogoutFinished={() =>
              this.setState({
                loggedIn: false,
                userID: ''
              })
            } 
          />
        </View>
        
        <Button
          title="Don't have an account? Sign Up"
          onPress={this.goToSignup}
          titleStyle={{
            color: '#F57C00'
          }}
          type='clear'
        />
      </ScrollView>
    )
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // marginTop: 50
  },
  logoContainer: {
    marginBottom: 10,
    alignItems: 'center'
  },
  buttonContainer: {
    margin: 25
  },
  socialButton: {
    width: 300,
    height: 50,
    // color: 'black',
    borderColor: 'gray', 
    borderWidth: 0, 
    borderRadius: 10,
    // backgroundColor: '#039BE5',
    // backgroundColor: '#fff',
    // backgroundColor: "#FFF",
    marginVertical: 10,
    paddingLeft: 10
  },
  inputColor: {
    color: "white",
    tintColor: "white"
  }
});

