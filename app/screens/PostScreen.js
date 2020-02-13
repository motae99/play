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
import FormInput from '../components/FormInput'
import FormButton from '../components/FormButton'
import ErrorMessage from '../components/ErrorMessage'
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
                    timestamp: Date.now(),
                    tite: text, 
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
                    timestamp: Date.now(),
                    tite: text, 
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
                    timestamp: Date.now(),
                    tite: text, 
                    type: type,
                    images: this.state.images
                };
                
                const saving = await firestore()
                        .collection('posts')
                        .add(data);
    
                if(saving){
                    // this.props.navigation.navigate('ListView')
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
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                        <Icon name="md-arrow-back" size={24} color="#D8D9DB"></Icon>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.handleonAdd}>
                        <Text style={{ fontWeight: "500" }}>Post</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.inputContainer}>
                    <Image source={require("../../images/tempAvatar.jpg")} style={styles.avatar}></Image>
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




// addPost = async ({ text, localUri }) => {
//     const remoteUri = await this.uploadPhotoAsync(localUri);
//     console.log("remote uri from post: ");
//     console.log(remoteUri);
//     return new Promise((res, rej) => {
//         firestore()
//             .collection("posts")
//             .add({
//                 text,
//                 uid: this.state.user.uid,
//                 timestamp: Date.now(),
//                 type: this.state.type,
//                 file: remoteUri
//             })
//             .then(ref => {
//                 res(ref);
//                 console.log(res(ref));
//             })
//             .catch(error => {
//                 rej(error);
//                 console.log(rej(error));

//             });
//     });
// };

// uploadPhotoAsync = async uri => {
//     const path = `photos/${this.state.user.uid}/${Date.now()}.jpg`;
//     return new Promise(async (res, rej) => {
//         let upload = storage()
//             .ref(path)
//             .putFile(uri.path)

//         upload.on(
//             storage.TaskEvent.STATE_CHANGED,
//                 (snapshot) => {
//                   console.log(snapshot.bytesTransferred);
//                   console.log(snapshot.totalBytes);
//                   if (snapshot.state === storage.TaskState.SUCCESS) {
//                     console.log("upload completed "); 
//                   }
//                 },
//             err => {
//                 rej(err);
//             },
//             async () => {
//                 const url = await storage().ref(path).getDownloadURL();
//                 res(url);
//             }
//         );
//     });
// };


// handlePost = () => {
//         this.addPost({ text: this.state.text.trim(), localUri: this.state.file })
//         .then(ref => {
//             this.setState({ text: "", file: null , fileUri: null});
//             this.props.navigation.goBack();
//         })
//         .catch(error => {
//             alert(error);
//         });
// };


// chooseVideo = () => {
//     const options = {
//         title: 'Select video',
//         mediaType: 'video',
//         path:'video',
//         quality: 1,
//         customButtons: [
//             { name: 'customOptionKey', title: 'Choose Video file from Custom Option' },
//           ],
//           storageOptions: {
//             skipBackup: true,
//             path: 'images',
//             allowsEditing: true,
//           },
//       };

//     ImagePicker.launchImageLibrary(options, response => {
//       console.log('Response = ', response);
 
//       if (response.didCancel) {
//         console.log('User cancelled image picker');
//       } else if (response.error) {
//         console.log('ImagePicker Error: ', response.error);
//       } else if (response.customButton) {
//         console.log('User tapped custom button: ', response.customButton);
//         alert(response.customButton);
//       } else {
//         let source = response;
//         console.log(source);
//         // You can also display the image using data:
//         // let source = { uri: 'data:image/jpeg;base64,' + response.data };
//         this.setState({
//             type: "video",
//             file: source,
//             fileUri: source.uri
//         });
//       }
//     });
// };