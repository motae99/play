
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Alert,
  Image
} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import { Root, Popup, Toast } from 'popup-ui'


import CodeInput from 'react-native-confirmation-code-input';

export default class example extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      code: '',
      phone: this.props.navigation.state.params.phone,
      staus: null,
      message: "",
    };
  }

  componentDidMount = async () => {
   

  }

  renderToast = () => {
    console.log('render Taost')
    if(this.state.status == 'success'){
      return (
        <Root style={styles.popup}>
          {
            Popup.show({ 
              type: 'Success', 
              title: 'Upload complete',
              button: false,
              textBody: 'Congrats! Your upload successfully done', 
              buttontext: 'Ok',
              autoClose: true,
              callback: () => Popup.hide()
              
             })


            // Toast.show({
            //   title: 'Success',
            //   text: 'Vola',
            //   color: '#2ecc71',
            //   timing: 2000,
            //   icon: <Image source={require('../../../images/tick.png')} style={{ width: 25, height: 25 }} resizeMode="contain" />
            // })
          }
        </Root>
      );
    }
    if(this.state.status == 'error'){
      return (
        <Root style={styles.popup}>
          {
            Popup.show({ 
              type: 'Danger', 
              title: 'Faild complete',
              button: false,
              textBody: this.state.message, 
              buttontext: 'Ok',
              autoClose: true,
              callback: () => Popup.hide()
              
             })
          // Toast.show({
          //   title: 'Error',
          //   text: 'Code is wrong please Verify',
          //   color: '#e74c3c',
          //   timing: 2000,
          //   icon: <Image source={require('../../../images/close.png')} style={{ width: 15, height: 15 }} resizeMode="contain" />
          // })
          }
        </Root>
      );
    }
    return null;
  }

  success = () => {
    console.log('you success')
    return (
      <Root>
        {
          Toast.show({
            title: 'Success',
            text: 'Vola',
            color: '#2ecc71',
            timing: 2000,
            icon: <Image source={require('../../../images/tick.png')} style={{ width: 25, height: 25 }} resizeMode="contain" />
          })
        }
      </Root>
    );

  }

  error = () => {
    return (
      <Root>
        {
        Toast.show({
          title: 'Error',
          text: 'Code is wrong please Verify',
          color: '#e74c3c',
          timing: 2000,
          icon: <Image source={require('../../../images/close.png')} style={{ width: 15, height: 15 }} resizeMode="contain" />
        })
        }
      </Root>
    );
  }
  
  _onFulfill = async (code) => {
     try {
            const snapshot = await auth().verifyPhoneNumber(this.state.phone)
            .on('state_changed', (phoneAuthSnapshot) => {
                console.log('State: ', phoneAuthSnapshot.state);
              }, (error) => {
                console.error(error);
              }, (phoneAuthSnapshot) => {
                console.log('Success');
              }); 
            

            const credential = auth.PhoneAuthProvider.credential(snapshot.verificationId, code);
            await auth().currentUser.updatePhoneNumber(credential);

            // Successful login - onAuthStateChanged is triggered
            auth().onAuthStateChanged( async (user) => {
                if (user) {  
                // Stop the login flow / Navigate to next page
                  // console.log('User info for provider: ', user);
                  // console.log('+++++++++_____________========')
                  this.setState({status: 'success'});
                  const userData =  {  
                      uid: user.uid,
                      timestamp: Date.now(),
                      displayName: user.displayName, 
                      email: user.email,
                      phoneNumber: user.phoneNumber,
                      photoURL: user.photoURL,
                    };
                  await firestore()
                    .collection('users')
                    .doc(user.uid)
                    .set(userData)
                  setTimeout(() => { this.props.navigation.navigate('Initial') }, 1000)

                }
              });
        

    } catch (e) {
      console.log('error :',e); // Invalid code
      this.setState({status: 'error', message: e});
    }

      this.refs.codeInputRef1.clear();
  }
  
  _onFinishCheckingCode1(isValid) {
    console.log(isValid);
    if (!isValid) {
      Alert.alert(
        'Confirmation Code',
        'Code not match!',
        [{text: 'OK'}],
        { cancelable: false }
      );
    } else {
      Alert.alert(
        'Confirmation Code',
        'Successful!',
        [{text: 'OK'}],
        { cancelable: false }
      );
    }
  }
  
  _onFinishCheckingCode2(isValid, code) {
    console.log(isValid);
    if (!isValid) {
      Alert.alert(
        'Confirmation Code',
        'Code not match!',
        [{text: 'OK'}],
        { cancelable: false }
      );
    } else {
      this.setState({ code });
      Alert.alert(
        'Confirmation Code',
        'Successful!',
        [{text: 'OK'}],
        { cancelable: false }
      );
    }
  }
  
  render() {
    
    console.log('this is the user', auth().currentUser)
    
    return (
      <View style={styles.container}>
        {this.state.status ? this.renderToast() : null}

        <ScrollView style={styles.wrapper}>

          <View style={styles.inputWrapper3}>
            <Text style={styles.inputLabel3}>CIRCLE CONFIRMATION CODE</Text>
            <CodeInput
             ref="codeInputRef1"
             keyboardType="numeric"
             codeLength={6}
             className={'border-circle'}
             activeColor='rgba(49, 180, 4, 1)'
             inactiveColor='rgba(49, 180, 4, 1.3)'
             space={5}
             size={50}
             onFulfill={(code) => this._onFulfill(code)}
             onCodeChange={(code) => { this.state.code = code }}

              // ref="codeInputRef2"
              // keyboardType="numeric"
              // codeLength={5}
              // className={'border-circle'}
              // compareWithCode='12345'
              // autoFocus={false}
              // codeInputStyle={{ fontWeight: '800' }}
              // // onFulfill={(code) => this._onFulfill(code)}
              // onFulfill={(isValid, code) => this._onFinishCheckingCode2(isValid, code)}
              // onCodeChange={(code) => { this.state.code = code }}
            />
          </View>
        </ScrollView> 
      
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F6CE'
  },
  titleWrapper: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  title: {
    color: 'red',
    fontSize: 16,
    fontWeight: '800',
    paddingVertical: 30
  },
  wrapper: {
    marginTop: 30
  },
  inputWrapper1: {
    paddingVertical: 50,
    paddingHorizontal: 20,
    backgroundColor: '#009C92'
  },
  inputWrapper2: {
    paddingVertical: 50,
    paddingHorizontal: 20,
    backgroundColor: '#E0F8F1'
  },
  inputWrapper3: {
    paddingVertical: 50,
    paddingHorizontal: 20,
    backgroundColor: '#2F0B3A'
  },
  inputLabel1: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '800'
  },
  inputLabel2: {
    color: '#31B404',
    fontSize: 14,
    fontWeight: '800',
    textAlign: 'center'
  },
  inputLabel3: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '800',
    textAlign: 'center'
  },

  popup: {
    position: "absolute",
    top:0,
    left: 0,
    right: 0,
    bottom: 0
   }
});

