import React, { Component, Fragment } from 'react'
import { 
    StyleSheet, SafeAreaView, ScrollView, Text, Image, View, TouchableOpacity, NativeModules, 
    Dimensions, TextInput, PermissionsAndroid, Platform, ToastAndroid 
    } from 'react-native'
import { Button, CheckBox } from 'react-native-elements'
import Icon from "react-native-vector-icons/Ionicons";
import * as Progress from 'react-native-progress';
import  {Formik}  from 'formik'
import * as Yup from 'yup'
import Video from 'react-native-video';


import ImagePicker from "react-native-image-picker";


import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

var ImageCropPicker = NativeModules.ImageCropPicker;


export default class PostScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            currentUser: auth().currentUser,
            remoteUris: [],
            uploadingProg: null,
            uploadingTotal: null,
            perc: null,
            dynamicIndex: 0,
            loading: false,
            updatesEnabled: false,
            title: '',
            type: '',
            post: '',
            video: null,
            images: null,


        };
        this.arr = [];
    }

    uploadPhotoAsync = async (uri) => {
        const {type} = this.state;
        const uid = this.state.currentUser.uid
        const fileExt = uri.split('.').pop();
        const path = `posts/${type}/${uid}/${Date.now()}.${fileExt}`;
        const putFile = uri.replace('file:///', '/');
        return new Promise(async (res, rej) => {
            let upload = storage()
                .ref(path)
                .putFile(putFile)
            upload.on(
                storage.TaskEvent.STATE_CHANGED,
                    (snapshot) => {
                    console.log(snapshot.bytesTransferred);
                    console.log(snapshot.totalBytes);
                    var percentage = (snapshot.bytesTransferred/snapshot.totalBytes);
                    this.setState({perc: percentage});
                    if (snapshot.state === storage.TaskState.SUCCESS) {
                        console.log("upload completed "); 
                    }
                    },
                err => {
                    rej(err);
                },
                async () => {
                    const url = await storage().ref(path).getDownloadURL();
                    res(url);
                }
            );
        });
    };

    downButtonHandler = () => {
        if (this.arr.length >= this.state.dynamicIndex) {
          this.scrollview_ref.scrollTo({
            x: this.arr[this.state.dynamicIndex],
            y: 0,
            animated: true,
          });
        } else {
          alert('Out of Max Index');
        }
    };
    
    handleonAdd = async () => {
        console.log('you are sumitting')

        const {type, text, images, video, post, currentUser} = this.state;
        if(text && type == 'post' && post){
            console.log('you are sumitting a post')

            try {
    
                const data = {  
                    autherID: currentUser.uid,
                    autherName: currentUser.displayName,
                    autherPhoto: currentUser.photoURL,
                    timestamp: Date.now(),
                    title: text, 
                    type: type,
                    post: this.state.post
                };
                
                const saving = await firestore()
                        .collection('posts')
                        .add(data);
    
                if(saving){
                    // this.props.navigation.navigate('ListView')
                    console.log('saved  video and post correctrly')
                }
    
            } catch (error) {
                console.error(error)
            }

        }
        if(text && type == 'video' && video){
            console.log('you are trying to submit a video')

            try {
                this.setState({uploadingTotal: 1});
                this.setState({uploadingProg: 1});
                this.setState({dynamicIndex: 1});
                this.downButtonHandler()
                var remoteUri = await this.uploadPhotoAsync(video.uri);
                video.uri = remoteUri
                this.setState({video: video});

                this.setState({uploadingProg: null});
    
                const data = {  
                    autherID: currentUser.uid,
                    autherName: currentUser.displayName,
                    autherPhoto: currentUser.photoURL,
                    timestamp: Date.now(),
                    timestamp: Date.now(),
                    title: text, 
                    type: type,
                    video: this.state.video
                };
                
                const saving = await firestore()
                        .collection('posts')
                        .add(data);
    
                if(saving){
                    // this.props.navigation.navigate('ListView')
                    console.log('saved  video and post correctrly')
                }
    
            } catch (error) {
                console.error(error)
            }

        }
        if(text && type == 'images'){
            console.log('you are trying to submit images')

            try {
                this.setState({uploadingTotal: images.length});
                for (let i = 0; i < images.length; i++) {
                    const image = images[i];
                    this.setState({uploadingProg: i});
                    this.setState({dynamicIndex: i});
                    this.downButtonHandler();
                    var remoteUri = await this.uploadPhotoAsync(image.uri);
                    let localImages = [...this.state.images]
                    image.uri = remoteUri
                    localImages[i] = image;
                    this.setState[{images}]
                    this.setState({uploadingProg: i});
                }
    
                this.setState({uploadingProg: null});
    
                const data = {  
                    autherID: currentUser.uid,
                    autherName: currentUser.displayName,
                    autherPhoto: currentUser.photoURL,
                    timestamp: Date.now(),
                    title: text, 
                    type: type,
                    images: this.state.images
                };
                
                const saving = await firestore().collection('posts').add(data);
                
                
    
                if(saving){
                    this.props.navigation.goBack()
                    // this.props.closeModal

                    console.log('saved all images and postcorrectrly')
                }
    
            } catch (error) {
                console.error(error)
            }

        }
    }

    pickVideo = () =>{
        ImageCropPicker.openPicker({
            multiple: false,
            mediaType: "video",
            includeExif: true,
        }).then(video => {
            this.setState({
                video: {uri: video.path, width: video.width, height: video.height, mime: video.mime},
                type: 'video',
                images: null,
                post: null,
            });
        }).catch(e => alert(e));
    }

    pickImages= () => {
        ImageCropPicker.openPicker({
            multiple: true,
            waitAnimationEnd: true,
            includeExif: true,
            mediaType: "photo",
            forceJpg: true,
        }).then(images => {
            this.setState({
            type: 'images',
            video: null,
            post: null,
            images: images.map(i => {
                return {uri: i.path, width: i.width, height: i.height, mime: i.mime};
            })
            });
        }).catch(e => alert(e));
    }
    
    renderImage(image) {
        const { uploadingProg, perc, uploadingTotal } = this.state
        var array = [...this.state.images]; 
        var index = array.indexOf(image)
        return(
            <View style={{height: 300, width: 300}}>
                <TouchableOpacity onLongPress={() => this.cleanupSingleImage(image)} >
                    <Image  style={{width: 300, height: 300, resizeMode: 'cover'}} source={image} />
                </TouchableOpacity>
                {(index === uploadingProg) ? ( 
                    <View style={styles.progressView}>
                        <Progress.Circle
                            style={styles.progress}
                            progress={perc}
                            // indeterminate={this.state.indeterminate} later
                            showsText={true}
                            size= {100}
                            thickness={6}
                        />
                        <Text style={styles.progText}>uploading {uploadingProg+1} out of {uploadingTotal}</Text>
                    </View>
                ) : null}
                
                
            </View>
        ) ;
    }

    renderVideo(video) {
        const { uploadingProg, perc, uploadingTotal } = this.state
        return (
            <View style={{height: 300, width: 300}}>
                <Video source={{uri: video.uri, type: video.mime}}
                    style={{position: 'absolute',
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0
                    }}
                    rate={1}
                    paused={false}
                    volume={1}
                    muted={true}
                    resizeMode={'cover'}
                    onError={e => console.log(e)}
                    onLoad={load => console.log(load)}
                    repeat={true} />

                {(uploadingProg) ? ( 
                    <View style={styles.progressView}>
                        <Progress.Circle
                            style={styles.progress}
                            progress={perc}
                            // indeterminate={this.state.indeterminate} later
                            showsText={true}
                            size= {100}
                            thickness={6}
                        />
                        <Text style={styles.progText}>uploading {uploadingProg} out of {uploadingTotal}</Text>
                    </View>
                ) : null}
            </View>
        );
        
    }
    // clean up after a successfull upload
    // ImagePicker.clean().then(() => {
    //     console.log('removed all tmp images from tmp directory');
    //   }).catch(e => {
    //     alert(e);
    //   });

    render() {
        return (
            <ScrollView style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={this.props.closeModal}>
                      <Text style={{ color: "#4080FF" }}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.handleonAdd}>
                        <Text style={{ fontWeight: "500" }}>Post</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.inputContainer}>
                
                    {/* <Image source={require("../../images/tempAvatar.jpg")} style={styles.avatar}></Image> */}
                    <TextInput
                        autoFocus={true}
                        multiline={true}
                        numberOfLines={4}
                        style={{ flex: 1 }}
                        placeholder="Want to share something?"
                        onChangeText={text => this.setState({ text })}
                        value={this.state.text}
                    ></TextInput>
                </View>

                <View style={styles.optionContainer}>
                    <TouchableOpacity style={styles.option} onPress={this.pickImages}>
                        <Icon name="ios-images" size={35} color={"black"} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.option} onPress={this.pickVideo}>
                        <Icon name="ios-videocam" size={32} color="black" />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.option} onPress={() => { this.setState({type: 'post', images: null, video: null})}}>
                        <Icon name="ios-text" size={32} color="black" />
                    </TouchableOpacity>
                </View>

                <View style={{ marginHorizontal: 32, marginTop: 32}}>
                    <ScrollView  
                        horizontal={true} 
                        ref={ref => {
                            this.scrollview_ref = ref;
                        }}
                     >
                    { (this.state.type == 'video') ? 

                        this.renderVideo(this.state.video)

                        : null
                    }

                    { (this.state.type == 'images') ? this.state.images.map( (image, key) => 
                                        
                        <View 
                            style={styles.filesContainer} 
                            key={key}
                            onLayout={event => {
                                const layout = event.nativeEvent.layout;
                                this.arr[key] = layout.x;
                            }}

                            >
                            {this.renderImage(image)}

                        </View>
                            ) : null
                    }
                    { (this.state.type == 'post') ?  
                        <TextInput
                            style={styles.post}
                            value={this.state.post}
                            onChangeText={ text=>this.setState(
                                {
                                    post:text,
                                    type: 'post',
                                    images: null,
                                    video: null
                                })
                            }
                            multiline={true}
                            underlineColorAndroid='transparent'
                        /> 
                    : null}
                    </ScrollView>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 32,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#D8D9DB"
    },
    inputContainer: {
        margin: 32,
        flexDirection: "row"
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        marginRight: 16
    },
    photo: {
        alignItems: "flex-end",
        marginHorizontal: 32
    },
    optionContainer: {
        flexDirection: "row"
    },
    option: {
        flex: 1,
        alignItems: "center",
        marginHorizontal: 32
    },
    filesContainer: {
        marginHorizontal: 10,
    },
    post: {
        width:280,
        height:200,
        borderColor:'black',
        borderWidth:1,
    },
    progressView: {
        position: 'absolute',
        top: 0, 
        left: 0, 
        right: 0, 
        bottom: 0, 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    progText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 15,
        fontStyle: 'italic',
    }
});

// import React, {Component} from 'react';
// import {
//   View, Text, StyleSheet, ScrollView, Alert,
//   Image, TouchableOpacity, NativeModules, Dimensions
// } from 'react-native';

// import Video from 'react-native-video';

// var ImagePicker = NativeModules.ImageCropPicker;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center'
//   },
//   button: {
//     backgroundColor: 'blue',
//     marginBottom: 10
//   },
//   text: {
//     color: 'white',
//     fontSize: 20,
//     textAlign: 'center'
//   }
// });

// export default class App extends Component {

//   constructor() {
//     super();
//     this.state = {
//       image: null,
//       images: null
//     };
//   }

//   pickSingleWithCamera(cropping, mediaType='photo') {
//     ImagePicker.openCamera({
//       cropping: cropping,
//       width: 500,
//       height: 500,
//       includeExif: true,
//       mediaType,
//     }).then(image => {
//       console.log('received image', image);
//       this.setState({
//         image: {uri: image.path, width: image.width, height: image.height, mime: image.mime},
//         images: null
//       });
//     }).catch(e => alert(e));
//   }

//   pickSingleBase64(cropit) {
//     ImagePicker.openPicker({
//       width: 300,
//       height: 300,
//       cropping: cropit,
//       includeBase64: true,
//       includeExif: true,
//     }).then(image => {
//       console.log('received base64 image');
//       this.setState({
//         image: {uri: `data:${image.mime};base64,`+ image.data, width: image.width, height: image.height},
//         images: null
//       });
//     }).catch(e => alert(e));
//   }

//   cleanupImages() {
//     ImagePicker.clean().then(() => {
//       console.log('removed tmp images from tmp directory');
//     }).catch(e => {
//       alert(e);
//     });
//   }

//   cleanupSingleImage() {
//     let image = this.state.image || (this.state.images && this.state.images.length ? this.state.images[0] : null);
//     console.log('will cleanup image', image);

//     ImagePicker.cleanSingle(image ? image.uri : null).then(() => {
//       console.log(`removed tmp image ${image.uri} from tmp directory`);
//     }).catch(e => {
//       alert(e);
//     })
//   }

//   cropLast() {
//     if (!this.state.image) {
//       return Alert.alert('No image', 'Before open cropping only, please select image');
//     }

//     ImagePicker.openCropper({
//       path: this.state.image.uri,
//       width: 200,
//       height: 200
//     }).then(image => {
//       console.log('received cropped image', image);
//       this.setState({
//         image: {uri: image.path, width: image.width, height: image.height, mime: image.mime},
//         images: null
//       });
//     }).catch(e => {
//       console.log(e);
//       Alert.alert(e.message ? e.message : e);
//     });
//   }

//   pickSingle(cropit, circular=false, mediaType) {
//     ImagePicker.openPicker({
//       width: 500,
//       height: 500,
//       cropping: cropit,
//       cropperCircleOverlay: circular,
//       sortOrder: 'none',
//       compressImageMaxWidth: 1000,
//       compressImageMaxHeight: 1000,
//       compressImageQuality: 1,
//       compressVideoPreset: 'MediumQuality',
//       includeExif: true,
//     }).then(image => {
//       console.log('received image', image);
//       this.setState({
//         image: {uri: image.path, width: image.width, height: image.height, mime: image.mime},
//         images: null
//       });
//     }).catch(e => {
//       console.log(e);
//       Alert.alert(e.message ? e.message : e);
//     });
//   }

//   pickMultiple() {
//     ImagePicker.openPicker({
//       multiple: true,
//       waitAnimationEnd: false,
//       sortOrder: 'desc',
//       includeExif: true,
//       forceJpg: true,
//     }).then(images => {
//       this.setState({
//         image: null,
//         images: images.map(i => {
//           console.log('received image', i);
//           return {uri: i.path, width: i.width, height: i.height, mime: i.mime};
//         })
//       });
//     }).catch(e => alert(e));
//   }

//   scaledHeight(oldW, oldH, newW) {
//     return (oldH / oldW) * newW;
//   }

//   renderVideo(video) {
//     console.log('rendering video');
//     return (<View style={{height: 300, width: 300}}>
//       <Video source={{uri: video.uri, type: video.mime}}
//          style={{position: 'absolute',
//             top: 0,
//             left: 0,
//             bottom: 0,
//             right: 0
//           }}
//          rate={1}
//          paused={false}
//          volume={1}
//          muted={false}
//          resizeMode={'cover'}
//          onError={e => console.log(e)}
//          onLoad={load => console.log(load)}
//          repeat={true} />
//      </View>);
//   }

//   renderImage(image) {
//     return <Image style={{width: 300, height: 300, resizeMode: 'contain'}} source={image} />
//   }

//   renderAsset(image) {
//     if (image.mime && image.mime.toLowerCase().indexOf('video/') !== -1) {
//       return this.renderVideo(image);
//     }

//     return this.renderImage(image);
//   }

//   render() {
//     return (<View style={styles.container}>
//       <ScrollView>
//         {this.state.image ? this.renderAsset(this.state.image) : null}
//         {this.state.images ? this.state.images.map(i => <View key={i.uri}>{this.renderAsset(i)}</View>) : null}
//       </ScrollView>

//       <TouchableOpacity onPress={() => this.pickSingleWithCamera(false)} style={styles.button}>
//         <Text style={styles.text}>Select Single Image With Camera</Text>
//       </TouchableOpacity>
//       <TouchableOpacity onPress={() => this.pickSingleWithCamera(false, mediaType='video')} style={styles.button}>
//         <Text style={styles.text}>Select Single Video With Camera</Text>
//       </TouchableOpacity>
//       <TouchableOpacity onPress={() => this.pickSingleWithCamera(true)} style={styles.button}>
//         <Text style={styles.text}>Select Single With Camera With Cropping</Text>
//       </TouchableOpacity>
//       <TouchableOpacity onPress={() => this.pickSingle(false)} style={styles.button}>
//         <Text style={styles.text}>Select Single</Text>
//       </TouchableOpacity>
//       <TouchableOpacity onPress={() => this.cropLast()} style={styles.button}>
//         <Text style={styles.text}>Crop Last Selected Image</Text>
//       </TouchableOpacity>
//       <TouchableOpacity onPress={() => this.pickSingleBase64(false)} style={styles.button}>
//         <Text style={styles.text}>Select Single Returning Base64</Text>
//       </TouchableOpacity>
//       <TouchableOpacity onPress={() => this.pickSingle(true)} style={styles.button}>
//         <Text style={styles.text}>Select Single With Cropping</Text>
//       </TouchableOpacity>
//       <TouchableOpacity onPress={() => this.pickSingle(true, true)} style={styles.button}>
//         <Text style={styles.text}>Select Single With Circular Cropping</Text>
//       </TouchableOpacity>
//       <TouchableOpacity onPress={this.pickMultiple.bind(this)} style={styles.button}>
//         <Text style={styles.text}>Select Multiple</Text>
//       </TouchableOpacity>
//       <TouchableOpacity onPress={this.cleanupImages.bind(this)} style={styles.button}>
//         <Text style={styles.text}>Cleanup All Images</Text>
//       </TouchableOpacity>
//       <TouchableOpacity onPress={this.cleanupSingleImage.bind(this)} style={styles.button}>
//         <Text style={styles.text}>Cleanup Single Image</Text>
//       </TouchableOpacity>
//     </View>);
//   }
// }

// import React from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   ScrollView,
//   TextInput,
//   Image,
//   Dimensions,
//   Keyboard,
//   NativeModules,
//   StatusBar
// } from "react-native";
// import Ionicons from "react-native-vector-icons/Ionicons";
// import Video from "react-native-video";
// import * as Progress from "react-native-progress";


// import auth from "@react-native-firebase/auth";
// import firestore from "@react-native-firebase/firestore";
// import storage from "@react-native-firebase/storage";
// var ImagePicker = NativeModules.ImageCropPicker;

// export default class PostScreen extends React.Component {
//   state = {
//       visibleHeight: Dimensions.get("window").height,
//       k_visible: false,
//       text: "",
//       type: null,
//       user: auth().currentUser,
//       // currentUser: auth().currentUser,
//       images: null,
//       remoteUris: [],
//       uploadingProg: null,
//       uploadingTotal: null,
//       perc: null,
//       dynamicIndex: 0,
//       // for location
//       loading: false,
//       updatesEnabled: false
//     };

//     arr = [];
  

//   componentDidMount() {
//     Keyboard.addListener("keyboardWillShow", this.keyboardWillShow.bind(this));
//     Keyboard.addListener("keyboardWillHide", this.keyboardWillHide.bind(this));
//   }

//   componentWillUnmount() {
//     Keyboard.removeListener("keyboardWillShow");
//     Keyboard.removeListener("keyboardWillHide");
//   }

//   keyboardWillShow(e) {
//     let newSize = Dimensions.get("window").height - e.endCoordinates.height;
//     this.setState({ visibleHeight: newSize, k_visible: true });
//   }

//   keyboardWillHide(e) {
//     if (this.componentDidMount) {
//       this.setState({
//         visibleHeight: Dimensions.get("window").height,
//         k_visible: false
//       });
//     }
//   }

//   handleonAdd = async () => {
//     try {
//       const { images } = this.state;

//       this.setState({ uploadingTotal: images.length });

//       for (let i = 0; i < images.length; i++) {
//         const image = images[i];
//         this.setState({ uploadingProg: i });
//         this.setState({ dynamicIndex: i });
//         this.downButtonHandler();
//         var remoteUri = await this.uploadPhotoAsync(image.uri, user.uid);
//         let localImages = [...this.state.images];
//         image.uri = remoteUri;
//         localImages[i] = image;
//         this.setState[{ images }];
//         this.setState({ uploadingProg: i });
//       }

//       this.setState({ uploadingProg: null });

//       const saving = await firestore()
//         .collection("posts")
//         .doc(this.state.user.uid)
//         .add({
//             text: this.state.text.trim(),
//           uid: this.state.user.uid,
//           timestamp: Date.now(),
//           type: this.state.type,
//           files: this.state.images
//         })
//         .then(ref => {
//           res(ref);
//           console.log(res(ref));
//         })
//         .catch(error => {
//           rej(error);
//           console.log(rej(error));
//         });
//     } catch (error) {
//       console.error(error);
//       // actions.setFieldError('general', error.message)
//     } finally {
//       // actions.setSubmitting(false)
//     }
//   };

//   addPost = async ({ text, localUri }) => {
//     const remoteUri = await this.uploadPhotoAsync(localUri);
//     console.log("remote uri from post: ");
//     console.log(remoteUri);
//     return new Promise((res, rej) => {
//       firestore()
//         .collection("posts")
//         .add({
//           text,
//           uid: this.state.user.uid,
//           timestamp: Date.now(),
//           type: this.state.type,
//           file: remoteUri
//         })
//         .then(ref => {
//           res(ref);
//           console.log(res(ref));
//         })
//         .catch(error => {
//           rej(error);
//           console.log(rej(error));
//         });
//     });
//   };

//   uploadPhotoAsync = async (uri, uid) => {
//     const fileExt = uri.split(".").pop();
//     const path = `photos/${uid}/${Date.now()}.${fileExt}`;
//     const putFile = uri.replace("file:///", "/");
//     return new Promise(async (res, rej) => {
//       let upload = storage()
//         .ref(path)
//         .putFile(putFile);
//       upload.on(
//         storage.TaskEvent.STATE_CHANGED,
//         snapshot => {
//           console.log(snapshot.bytesTransferred);
//           console.log(snapshot.totalBytes);
//           var percentage = snapshot.bytesTransferred / snapshot.totalBytes;
//           this.setState({ perc: percentage });
//           if (snapshot.state === storage.TaskState.SUCCESS) {
//             console.log("upload completed ");
//           }
//         },
//         err => {
//           rej(err);
//         },
//         async () => {
//           const url = await storage()
//             .ref(path)
//             .getDownloadURL();
//           res(url);
//         }
//       );
//     });
//   };

//   pickMultiple = () => {
//     ImagePicker.openPicker({
//         multiple: true,
//         waitAnimationEnd: true,
//         includeExif: true,
//         forceJpg: true,
//     }).then(images => {
//         this.setState({
//         images: images.map(i => {
//             return {uri: i.path, width: i.width, height: i.height, mime: i.mime};
//         })
//         });
//     }).catch(e => console.log(e));
// }

//   pickVideo = () => {
//     ImagePicker.openPicker({
//         multiple: false,
//         waitAnimationEnd: false,
//         includeExif: true,
//         // forceJpg: true,
//       }).then(images => {
//         this.setState({
//         images: () => 
//         images.map(i => {
//             return {uri: i.path, width: i.width, height: i.height, mime: i.mime};
//         })
//         });
//         console.log(this.state.images)
//       }).catch(e => console.log(e));
//   }

//   // do this after Done uploading
//   cleanupImages() {
//     ImagePicker.clean()
//       .then(() => {
//         console.log("removed tmp images from tmp directory");
//       })
//       .catch(e => {
//         alert(e);
//       });
//   }

//   // do this for Corping selected image
//   crop(image) {
//     ImagePicker.openCropper({
//       path: image.uri,
//       width: 400,
//       height: 400
//     })
//       .then(image => {
//         console.log("received cropped image", image); // fix it later
//         //     var array = [...this.state.images];
//         //     var index = array.indexOf(image);
//         //     this.setState(this.state.images, {array[index]: image})
//         //   this.setState({
//         //     image: {uri: image.path, width: image.width, height: image.height, mime: image.mime},
//         //     images: null
//         //   });
//       })
//       .catch(e => {
//         console.log(e);
//         Alert.alert(e.message ? e.message : e);
//       });
//   }

//   cleanupSingleImage(file) {
//     console.log("selected file", file);
//     var array = [...this.state.images];
//     var index = array.indexOf(file);
//     if (index !== -1) {
//       array.splice(index, 1);
//       this.setState({ images: array });
//     }
//     ImagePicker.cleanSingle(file ? file.uri : null)
//       .then(() => {
//         console.log(`removed tmp image ${file.uri} from tmp directory`);
//       })
//       .catch(e => {
//         alert(e);
//       });
//   }

//   renderVideo(video) {
//     console.log('rendering video');
//     return (<View style={{height: 300, width: 300}}>
//         <Video source={{uri: video.uri, type: video.mime}}
//            style={{position: 'absolute',
//               top: 0,
//               left: 0,
//               bottom: 0,
//               right: 0
//             }}
//            rate={1}
//            paused={false}
//            volume={1}
//            muted={false}
//            resizeMode={'cover'}
//            onError={e => console.log(e)}
//            onLoad={load => console.log(load)}
//            repeat={true} />
//        </View>);
//   }

//   renderImage(image) {
//     // const { uploadingProg } = this.state;
//     // var array = [...this.state.images];
//     // var index = array.indexOf(image);
         
//          return (<Image style={{width: 300, height: 300, resizeMode: 'contain'}} source={image} />)
//     // return (
//     //   <View style={{ height: 300, width: 300 }}>
//     //     {/* <TouchableOpacity onLongPress={() => this.cleanupSingleImage(image)}> */}
//     //      <Image style={{width: 300, height: 300, resizeMode: 'contain'}} source={image} />
//     //     {/* </TouchableOpacity> */}
//     //     {index === uploadingProg ? (
//     //       <View style={styles.progressView}>
//     //         <Progress.Circle
//     //           style={styles.progress}
//     //           progress={this.state.perc}
//     //           // indeterminate={this.state.indeterminate} later
//     //           showsText={true}
//     //           size={100}
//     //           thickness={6}
//     //         />
//     //         <Text style={styles.progText}>
//     //           uploading {this.state.uploadingProg} out of{" "}
//     //           {this.state.uploadingTotal}
//     //         </Text>
//     //       </View>
//     //     ) : null}
//     //   </View>
//     // );
//   }

//   renderAsset(image) {
//     // if (image.mime && image.mime.toLowerCase().indexOf("video/") !== -1) {
//       return this.renderVideo(image);
//     // }
//     // return this.renderImage(image);
//   }

//   downButtonHandler = () => {
//     if (this.arr.length >= this.state.dynamicIndex) {
//       this.scrollview_ref.scrollTo({
//         x: this.arr[this.state.dynamicIndex],
//         y: 0,
//         animated: true
//       });
//     } else {
//       alert("Out of Max Index");
//     }
//   };

//   renderHeader() {
//     return (
//       <View
//         style={{
//           backgroundColor: "#F6F7F9",
//           paddingTop: 36,
//           borderBottomWidth: StyleSheet.hairlineWidth,
//           borderBottomColor: "#a9a9a9",
//           flexDirection: "row",
//           justifyContent: "space-between",
//           alignItems: "center",
//           padding: 16
//         }}
//       >
//         <TouchableOpacity onPress={this.props.closeModal}>
//           <Text style={{ color: "#4080FF" }}>Cancel</Text>
//         </TouchableOpacity>
//         <Text style={{ fontSize: 16, color: "black", fontWeight: "600" }}>
//           Update Status
//         </Text>
//         <TouchableOpacity onPress={this.handlePost}>
//           <Text style={{ fontWeight: "500" }}>Post</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }

//   renderAvatar() {
//     return (
//       <View style={{ flexDirection: "row", padding: 16, alignItems: "center" }}>
//         <Image source={require("../img/me.png")} style={{width: 40, height: 40}} />
//         <View style={{ paddingLeft: 8 }}>
//           <Text style={{ color: "black", fontWeight: "600" }}>UserName</Text>
//           <View style={{ flexDirection: "row" }}>
//             <View
//               style={{
//                 padding: 2,
//                 paddingLeft: 4,
//                 paddingRight: 4,
//                 flexDirection: "row",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 marginTop: 4,
//                 borderColor: "#a9a9a9",
//                 borderWidth: 1,
//                 borderRadius: 5
//               }}
//             >
//               <Ionicons name="md-globe" color={"gray"} />
//               <Text style={{ color: "gray", marginLeft: 4, marginRight: 4 }}>
//                 Tag1
//               </Text>
//               <Ionicons name="md-arrow-dropdown" color={"gray"} size={16} />
//             </View>
//             <View
//               style={{
//                 padding: 2,
//                 paddingLeft: 4,
//                 paddingRight: 4,
//                 marginLeft: 4,
//                 flexDirection: "row",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 marginTop: 4,
//                 borderColor: "#a9a9a9",
//                 borderWidth: 1,
//                 borderRadius: 5
//               }}
//             >
//               <Ionicons name="md-navigate" color={"gray"} />
//               <Text style={{ color: "gray", marginLeft: 4, marginRight: 4 }}>
//                 Tag2
//               </Text>
//               <Ionicons name="ios-close" color={"gray"} size={16} />
//             </View>
//           </View>
//         </View>
//       </View>
//     );
//   }

// renderText() {
//     return (
//         <View style={{flex: 1, padding: 16, paddingTop: 0}}>
//             <TextInput 
//                 autoFocus={true} 
//                 style={{height: 50, fontSize: 16}} 
//                 placeholderTextColor={'black'} 
//                 placeholder={"What's on your mind?"}
//                 onChangeText={text => this.setState({ text })}
//                 value={this.state.text}
//             />
//         </View>
//     )
// }

//   pickFiles() {
//     const { k_visible } = this.state;
//     if (k_visible) {
//       return (
//         <TouchableOpacity
//           onPress={() => {
//             Keyboard.dismiss();
//           }}
//           style={{
//             height: 56,
//             borderTopWidth: StyleSheet.hairlineWidth,
//             borderColor: "#a9a9a9",
//             flexDirection: "row",
//             justifyContent: "space-between",
//             alignItems: "center",
//             paddingLeft: 16
//           }}
//         >
//           <Text
//             style={{ color: "black", fontSize: 16, fontWeight: "500" }}
//           >
//             Add to your post
//           </Text>
//           <View style={{ flexDirection: "row", paddingRight: 16 }}>
//             <TouchableOpacity style={styles.photo} onPress={this.pickMultiple}>
//               <Ionicons
//                 style={styles.icon}
//                 name="md-camera"
//                 color="#93B75F"
//                 size={24}
//               />
//             </TouchableOpacity>
//             <TouchableOpacity style={styles.photo} onPress={this.pickVideo}>
//               <Ionicons
//                 style={styles.icon}
//                 name="md-videocam"
//                 color="#E7404E"
//                 size={24}
//               />
//             </TouchableOpacity>
//           </View>
//         </TouchableOpacity>
//       );
//     }
//   }

//     renderMenu() {
//     const {k_visible} = this.state;
//     if(k_visible) {
//         return (
//             <TouchableOpacity
//                 onPress={() => {Keyboard.dismiss()}}
//                 style={{height: 56, borderTopWidth: StyleSheet.hairlineWidth, borderColor: "#D8D9DB",
//                 flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingLeft: 16}}>
//                 <Text style={{color: "black", fontSize: 16, fontWeight: '500'}}>Add to your post</Text>
//                 <View style={{flexDirection: 'row', paddingRight: 16}}>
//                     <Ionicons style={styles.icon} name='md-camera' color='#93B75F' size={24} />
//                     <Ionicons style={styles.icon} name='md-pin' color='#D8396F' size={24} />
//                     <Ionicons style={styles.icon} name='md-videocam' color='#E7404E' size={24} />
//                     <Ionicons style={styles.icon} name='ios-happy' color='#EDC370' size={24} />

//                 </View>
//             </TouchableOpacity>
//         )
//     }

//     return (
//         this.renderList()
//     )
  
//     }
    
//   renderList() {
//         return (
//         <View> 
//             <TouchableOpacity  style={{flexDirection: 'row', height: 56, alignItems: 'center', paddingLeft: 16,
//                 borderTopColor: "black", borderTopWidth: StyleSheet.hairlineWidth}}
//                 onPress={this.pickMultiple}
//             >
//                 <Ionicons name={"md-camera"} color={"#93B75F"} size={24}/>
//                 <Text style={{color: 'gray', fontSize: 16, fontWeight: '500', paddingLeft: 16}}>Share Images</Text>

//             </TouchableOpacity>

//             <TouchableOpacity  style={{flexDirection: 'row', height: 56, alignItems: 'center', paddingLeft: 16,
//                 borderTopColor: "black", borderTopWidth: StyleSheet.hairlineWidth}}
//                 onPress={this.pickVideo}
//             >
//                 <Ionicons name={"md-videocam"} color={"#E7404E"} size={24}/>
//                 <Text style={{color: 'gray', fontSize: 16, fontWeight: '500', paddingLeft: 16}}>Share video File</Text>

//             </TouchableOpacity>
//         </View>
//         )

// }

//   selectedFiles() {
//     return (
//       <View style={styles.files}>
//         <ScrollView
//           horizontal
//           ref={ref => {
//             this.scrollview_ref = ref;
//           }}
//         >
//           {this.state.images
//             ? this.state.images.map((image, key) => (
//                 <View
//                   style={styles.filesContainer}
//                   key={key}
//                   onLayout={event => {
//                     const layout = event.nativeEvent.layout;
//                     this.arr[key] = layout.x;
//                     console.log(layout.x)
//                   }}
//                 >
//                   {this.renderAsset(image)}
//                 </View>
//               ))
//             : null}
//         </ScrollView>
//       </View>
//     );
//   }

//   render() {
//     return (
//       <ScrollView style={{ height: this.state.visibleHeight }}>
//         <StatusBar barStyle={"default"} animated={true} />
//         {this.renderHeader()}
//         {this.renderAvatar()}
//         {this.renderText()}
//         {this.selectedFiles()}
//         {this.renderMenu()}
//       </ScrollView>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1
//   },
//   header: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     paddingHorizontal: 32,
//     paddingVertical: 12,
//     borderBottomWidth: 1,
//     borderBottomColor: "#D8D9DB"
//   },
//   inputContainer: {
//     margin: 32,
//     flexDirection: "row"
//   },
//   avatar: {
//     width: 48,
//     height: 48,
//     borderRadius: 24,
//     marginRight: 16
//   },
//   photo: {
//     alignItems: "flex-end",
//     marginHorizontal: 32
//   },
//   icon: {
//         marginLeft: 10,
//     }
// });

// // /**
// //  * Created by ggoma on 12/21/16.
// // //  */
// // // import React, {Component} from 'react';
// // // import {
// // //     View,
// // //     Image,
// // //     Dimensions,
// // //     Keyboard,
// // //     Text,
// // //     TextInput,
// // //     TouchableOpacity,
// // //     StatusBar,
// // //     StyleSheet
// // // } from 'react-native';

// // // const {width, height} = Dimensions.get('window');

// // // import Colors from '../../constants/Colors';
// // // import Ionicons from 'react-native-vector-icons/Ionicons';
// // // import { ScrollView } from 'react-native-gesture-handler';

// // // export default class CreatePost extends Component{
// // //     constructor() {
// // //         super();
// // //         this.state = {
// // //             visibleHeight: Dimensions.get('window').height,
// // //             k_visible: false,
// // //         }
// // //     }

// // //     componentDidMount () {
// // //         Keyboard.addListener('keyboardWillShow', this.keyboardWillShow.bind(this));
// // //         Keyboard.addListener('keyboardWillHide', this.keyboardWillHide.bind(this));
// // //     }

// // //     componentWillUnmount() {
// // //         Keyboard.removeListener('keyboardWillShow');
// // //         Keyboard.removeListener('keyboardWillHide');
// // //     }

// // //     keyboardWillShow (e) {
// // //         let newSize = Dimensions.get('window').height - e.endCoordinates.height
// // //             this.setState({visibleHeight: newSize, k_visible: true})
// // //     }

// // //     keyboardWillHide (e) {
// // //         if(this.componentDidMount) {
// // //             this.setState({visibleHeight: Dimensions.get('window').height, k_visible: false})
// // //         }

// // //     }

// // //     renderHeader() {
// // //         return (
// // //             <View style={{backgroundColor: '#F6F7F9', paddingTop: 36, borderBottomWidth:StyleSheet.hairlineWidth,
// // //                 borderBottomColor: "#a9a9a9", flexDirection: 'row',
// // //                 justifyContent: 'space-between', alignItems: 'center', padding: 16}}>
// // //                 <TouchableOpacity onPress={this.props.closeModal}>
// // //                     <Text style={{color: '#4080FF'}}>Cancel</Text>
// // //                 </TouchableOpacity>
// // //                 <Text style={{fontSize: 16, color: 'black', fontWeight: '600'}}>Update Status</Text>
// // //                 <Text style={{color: '#4080FF', fontWeight: '700'}}>Post</Text>
// // //             </View>
// // //         )
// // //     }

// // //     renderAvatar() {
// // //         return (
// // //             <View style={{flexDirection: 'row', padding: 16, alignItems: 'center'}}>
// // //                 <Image source={require('../img/me.png')} style={styles.img}/>
// // //                 <View style={{paddingLeft: 8}}>
// // //                     <Text style={{color: 'black', fontWeight: '600'}}>Sung Woo Park</Text>
// // //                     <View style={{flexDirection: 'row'}}>
// // //                         <View style={{padding: 2, paddingLeft: 4, paddingRight: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
// // //                         marginTop: 4, borderColor: Colors.gray, borderWidth: 1, borderRadius: 5}}>
// // //                             <Ionicons name='md-globe' color={'gray'}/>
// // //                             <Text style={{color: 'gray', marginLeft: 4, marginRight: 4}}>Public</Text>
// // //                             <Ionicons name='md-arrow-dropdown' color={'gray'} size={16}/>
// // //                         </View>
// // //                         <View style={{padding: 2, paddingLeft: 4, paddingRight: 4, marginLeft: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
// // //                             marginTop: 4, borderColor: Colors.gray, borderWidth: 1, borderRadius: 5}}>
// // //                             <Ionicons name='md-navigate' color={'gray'}/>
// // //                             <Text style={{color: 'gray', marginLeft: 4, marginRight: 4}}>Seoul</Text>
// // //                             <Ionicons name='ios-close' color={'gray'} size={16}/>
// // //                         </View>
// // //                     </View>
// // //                 </View>
// // //             </View>
// // //         )
// // //     }

// // //     renderText() {
// // //         return (
// // //             <View style={{flex: 1, padding: 16, paddingTop: 0}}>
// // //                 <TextInput autoFocus={true} style={{height: 50, fontSize: 16}} placeholderTextColor={'black'} placeholder={"What's on your mind?"}/>
// // //             </View>
// // //         )
// // //     }

// // //     renderMenu() {
// // //         const {k_visible} = this.state;
// // //         if(k_visible) {
// // //             return (
// // //                 <TouchableOpacity
// // //                     onPress={() => {Keyboard.dismiss()}}
// // //                     style={{height: 56, borderTopWidth: StyleSheet.hairlineWidth, borderColor: Colors.chat_line,
// // //                     flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingLeft: 16}}>
// // //                     <Text style={{color: Colors.black, fontSize: 16, fontWeight: '500'}}>Add to your post</Text>
// // //                     <View style={{flexDirection: 'row', paddingRight: 16}}>
// // //                         <Ionicons style={styles.icon} name='md-camera' color='#93B75F' size={24} />
// // //                         <Ionicons style={styles.icon} name='md-videocam' color='#E7404E' size={24} />
// // //                         <Ionicons style={styles.icon} name='md-pin' color='#D8396F' size={24} />
// // //                         <Ionicons style={styles.icon} name='ios-happy' color='#EDC370' size={24} />

// // //                     </View>
// // //                 </TouchableOpacity>
// // //             )
// // //         }

// // //         return (
// // //             this.renderList()
// // //         )
// // //     }

// // //     renderList() {
// // //         const objs =
// // //             [
// // //                 {
// // //                     icon: 'md-camera',
// // //                     color: '#93B75F',
// // //                     name: 'Photo/Video'
// // //                 },
// // //                 {
// // //                     icon: 'md-videocam',
// // //                     color: '#E7404E',
// // //                     name: 'Live Video'
// // //                 },
// // //                 {
// // //                     icon: 'md-pin',
// // //                     color: '#D8396F',
// // //                     name: 'Check In'
// // //                 },
// // //                 {
// // //                     icon: 'ios-happy',
// // //                     color: '#EDC370',
// // //                     name: 'Feeling/Activity'
// // //                 },
// // //                 {
// // //                     icon: 'ios-person-add',
// // //                     color: '#628FF6',
// // //                     name: 'Tag Friends'
// // //                 }
// // //             ];

// // //         return objs.map((o, i) => {
// // //             return (
// // //                 <View key={i} style={{flexDirection: 'row', height: 56, alignItems: 'center', paddingLeft: 16,
// // //                     borderTopColor: Colors.chat_line, borderTopWidth: StyleSheet.hairlineWidth}}>
// // //                     <Ionicons name={o.icon} color={o.color} size={24}/>
// // //                     <Text style={{color: 'gray', fontSize: 16, fontWeight: '500', paddingLeft: 16}}>{o.name}</Text>
// // //                 </View>
// // //             )
// // //         })
// // //     }

// // //     render() {
// // //         return (
// // //             <ScrollView style={{height: this.state.visibleHeight}}>
// // //                 <StatusBar barStyle={'default'} animated={true}/>
// // //                 {this.renderHeader()}
// // //                 {this.renderAvatar()}
// // //                 {this.renderText()}
// // //                 {this.renderMenu()}
// // //             </ScrollView>
// // //         )
// // //     }
// // // }

// // // const styles = StyleSheet.create({
// // //     container: {
// // //         flex: 1,
// // //     },

// // //     img: {
// // //         width: 40,
// // //         height: 40
// // //     },

// // //     icon: {
// // //         marginLeft: 10
// // //     }
// // // });
