import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Root, Popup } from 'popup-ui'

import PhoneInput from "react-native-phone-input";

export default class Phone extends Component {
  constructor() {
    super();

    this.state = {
      valid: "",
      type: "",
      value: ""
    };

    this.updateInfo = this.updateInfo.bind(this);
    this.renderInfo = this.renderInfo.bind(this);
  }

  updateInfo() {
    this.setState({
      valid: this.phone.isValidNumber(),
      type: this.phone.getNumberType(),
      value: this.phone.getValue()
    });

   //  if(this.state.valid && this.state.type == "MOBILE"){
   //    var type = 'Success';
   //    var title = ` No is ${this.state.value}`;
   //    var textBody = 'You will recieve a text at this number press continue';
   //    var buttontext = 'Continue';
   //    var autoClose = false;
   //    var action = () => this.props.navigation.navigate('Verify', {phone: this.state.value});
   //  }

   //  if(this.state.valid && this.state.type !== "MOBILE"){
   //   var type = 'Warning';
   //   var title = ` No is ${this.state.value} of type ${this.state.type}`;
   //   var textBody = 'your number is not mobile plz confirm before continue';
   //   var buttontext = 'Confirm';
   //   var autoClose = true;
   //   var action = () => this.props.navigation.navigate('Verify', {phone: this.state.value});
   // }

   // else {
   //   var type = 'Danger';
   //   var title = `${this.state.value}`;
   //   var textBody = 'Enter a valid number';
   //   var buttontext = 'Cancel';
   //   var autoClose = true;
   //   var action = () => Popup.hide();
   // }

    // Popup.show({ 
    //  type: `${type}`, 
    //  title: `${title}`,  
    //  textBody: `${textBody}`, 
    //  buttontext: `${buttontext}`,
    //  autoClose: `${autoClose}`,
    //  callback: `${action}`
    // });

  }

  verify = async () => {
    console.log('verify now')
        Popup.hide()
        this.props.navigation.navigate('Verify', {phone: this.state.value})
  }

  renderInfo() {
    if (this.state.value) {
      return (
        <View style={styles.info}>
          <Text>
            Is Valid:{" "}
            <Text style={{ fontWeight: "bold" }}>
              {this.state.valid.toString()}
            </Text>
          </Text>
          <Text>
            Type: <Text style={{ fontWeight: "bold" }}>{this.state.type}</Text>
          </Text>
          <Text>
            Value:{" "}
            <Text style={{ fontWeight: "bold" }}>{this.state.value}</Text>
          </Text>
        </View>
      );
    }
  }


  // renderInfo() {
  //   if (this.state.value) {
  //    if(this.state.valid && this.state.type == "MOBILE"){
  //     // modal success with button to confirm
  //     return (
  //      <Root style={styles.popup}> 
  //         <TouchableOpacity 
  //            onPress={() => 
  //              Popup.show({ 
  //                type: 'success', 
  //                title: ` No is ${this.state.value}`,  
  //                textBody: 'You will recieve a text at this number press continue', 
  //                buttontext: 'Continue',
  //                // autoClose: true,
  //                callback: () => Popup.hide()
  //               })
  //            }
  //          >
  //          </TouchableOpacity>
  //      </Root>
  //      );
  //    }
  //    if(this.state.valid && this.state.type !== "MOBILE"){
  //     return (
  //      <Root style={styles.popup}> 
  //         <TouchableOpacity 
  //            onPress={() => 
  //              Popup.show({ 
  //                type: 'Warning', 
  //                title: `${this.state.value} `,  
  //                textBody: 'your number is not mobile plz confirm before continue', 
  //                buttontext: 'Continue',
  //                autoClose: true,
  //                callback: () => Popup.hide()
  //               })
  //            }
  //          >
  //          </TouchableOpacity>
  //      </Root>
  //      );
  //    }
  //    else {
  //     //danger danger auto close
  //     return (
  //      <Root style={styles.popup}> 
  //         <TouchableOpacity 
  //            onPress={() => 
  //              Popup.show({ 
  //                type: 'Danger', 
  //                title: `${this.state.value}`,  
  //                textBody: 'Enter a valid number', 
  //                // buttontext: 'Continue',
  //                autoClose: true,
  //               })
  //            }
  //          >
  //          </TouchableOpacity>
  //      </Root>
  //      );
  //    }
  //   }
  // }

  renderButton = () => {
   return (
      <Root style={styles.popup}> 
         <TouchableOpacity 
            onPress={() => 
              Popup.show({ 
                type: 'Warning', 
                title: `Your Phone No is ${this.state.value}`,  
                textBody: 'You will recieve a text at this number ', 
                buttontext: 'Continue',
                callback: () => {this.verify() }
               })
            }
          >
            <Text style={styles.button}>Confirm</Text>
          </TouchableOpacity>
      </Root>
   );
  }

  render() {
   const {valid, value, type} = this.state ;
    return (
      <View style={styles.container}>
        <PhoneInput
          ref={ref => {
            this.phone = ref;
          }}
        />
 
        {/* <TouchableOpacity onPress={this.updateInfo} style={styles.button}>
          <Text>Get Info</Text>
        </TouchableOpacity> */}
        {/* <Root style={styles.popup}> 
          <TouchableOpacity 
            style={styles.button}
             onPress={this.updateInfo}
           >
             <Text style={styles.button}>Confirm Number</Text>
           </TouchableOpacity>
       </Root> */}

        {/* {this.renderInfo()} */}
        { 
          (valid && value && type == 'MOBILE') ? this.renderButton() 
            : 
          <TouchableOpacity onPress={this.updateInfo} style={styles.button}>
            <Text>Confirm</Text>
          </TouchableOpacity>
        }
      </View>
    );
  }
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    paddingTop: 60
  },
  info: {
    // width: 200,
    borderRadius: 5,
    backgroundColor: "#f0f0f0",
    padding: 10,
    marginTop: 20
  },
  button: {
   position: "relative",
    marginTop: 150,
    padding: 10,
    alignSelf: "center"
  },
  popup: {
   position: "absolute",
   top:0,
   left: 0,
   right: 0,
   bottom: 0
  }
});


// import React, { Component } from 'react';
// import { View, TouchableOpacity, Text, Image } from 'react-native';
// import { Root, Toast, Popup } from 'popup-ui'

// class App extends Component {
//   render(){    
//     return(
//       <Root>
//         <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//           <TouchableOpacity
//             onPress={() => 
//               Toast.show({
//                 title: 'User created',
//                 text: 'Your user was successfully created, use the app now.',
//                 color: '#2ecc71',
//                 timing: 2000,
//                 icon: <Image source={require('../../images/tick.png')} style={{ width: 25, height: 25 }} resizeMode="contain" />
//               })
//             }
//           >
//             <Text>Toast Success</Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             onPress={() => 
//               Toast.show({
//                 title: 'User deleted',
//                 text: 'Your account has been deleted, you will no longer be able to access the app.',
//                 color: '#e74c3c',
//                 timing: 2000,
//                 icon: <Image source={require('../../images/close.png')} style={{ width: 15, height: 15 }} resizeMode="contain" />
//               })
//             }
//           >
//             <Text>Toast Error</Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             onPress={() => 
//               Toast.show({
//                 title: 'Profile edited',
//                 text: 'Your profile has been edited, you can now see your new information.',
//                 color: '#f39c12',
//                 timing: 2000,
//                 icon: <Image source={require('../../images/warning.png')} style={{ width: 25, height: 25 }} resizeMode="contain" />
//               })
//             }
//           >
//             <Text>Toast Warning</Text>
//           </TouchableOpacity>

//           <TouchableOpacity 
//             onPress={() => 
//               Popup.show({ 
//                 type: 'Success', 
//                 title: 'Upload complete',
//                 button: false,
//                 textBody: 'Congrats! Your upload successfully done', 
//                 buttontext: 'Ok',
//                 autoClose: true
//               })
//             }
//           >
//             <Text>Popup Success</Text>
//           </TouchableOpacity>

//           <TouchableOpacity 
//             onPress={() => 
//               Popup.show({ 
//                 type: 'Warning', 
//                 title: 'Upload attention',  
//                 textBody: 'Your file is over 3MB, this may harm your application', 
//                 buttontext: 'Continue',
//                 callback: () => Popup.hide()
//               })
//             }
//           >
//             <Text>Popup Warning</Text>
//           </TouchableOpacity>
//           <TouchableOpacity 
//             onPress={() => 
//               Popup.show({ 
//                 type: 'Danger', 
//                 title: 'Upload failed',  
//                 textBody: 'Sorry! Your upload failed, please try again Sorry! Your upload failed, please try again Sorry! Your upload failed, please try again Sorry! Your upload failed, please try again Sorry! Your upload failed, please try again Sorry! Your upload failed, please try again', 
//                 buttontext: 'Try again',
//                 callback: () => Popup.hide()
//               })
//             }
//           >
//             <Text>Popup Danger</Text>
//           </TouchableOpacity>
//         </View>
//       </Root>
//     );
//   }
// }

// export default App;