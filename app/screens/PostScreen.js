import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Image } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';

import ImagePicker from "react-native-image-picker";


import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';



export default class PostScreen extends React.Component {
    state = {
        text: "",
        file: null,
        fileUri: null,
        type: null,
        user: auth().currentUser
    };


    addPost = async ({ text, localUri }) => {
        const remoteUri = await this.uploadPhotoAsync(localUri);
        console.log("remote uri from post: ");
        console.log(remoteUri);
        return new Promise((res, rej) => {
            firestore()
                .collection("posts")
                .add({
                    text,
                    uid: this.state.user.uid,
                    timestamp: Date.now(),
                    type: this.state.type,
                    file: remoteUri
                })
                .then(ref => {
                    res(ref);
                    console.log(res(ref));
                })
                .catch(error => {
                    rej(error);
                    console.log(rej(error));

                });
        });
    };

    uploadPhotoAsync = async uri => {
        const path = `photos/${this.state.user.uid}/${Date.now()}.jpg`;
        return new Promise(async (res, rej) => {
            let upload = storage()
                .ref(path)
                .putFile(uri.path)

            upload.on(
                storage.TaskEvent.STATE_CHANGED,
                    (snapshot) => {
                      console.log(snapshot.bytesTransferred);
                      console.log(snapshot.totalBytes);
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
    

    handlePost = () => {
            this.addPost({ text: this.state.text.trim(), localUri: this.state.file })
            .then(ref => {
                this.setState({ text: "", file: null , fileUri: null});
                this.props.navigation.goBack();
            })
            .catch(error => {
                alert(error);
            });
    };


    chooseFile = () => {
        var options = {
          title: 'Select file',
          mediaType: 'mixed',
          customButtons: [
            { name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
          ],
          storageOptions: {
            skipBackup: true,
            path: 'images',
            allowsEditing: true,
          },
        };

        ImagePicker.launchImageLibrary(options, response => {
          console.log('Response = ', response);
     
          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          } else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
            alert(response.customButton);
          } else {
            let source = response;
            console.log(source);
            // You can also display the image using data:
            // let source = { uri: 'data:image/jpeg;base64,' + response.data };
            this.setState({
                type: source.type,
                file: source,
                fileUri: source.uri
            });
          }
        });
      };

    render() {
        return (
            <ScrollView style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                        <Ionicons name="md-arrow-back" size={24} color="#D8D9DB"></Ionicons>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.handlePost}>
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

                <TouchableOpacity style={styles.photo} onPress={this.chooseFile}>
                    <Icon name="rocket" size={32} color="#D8D9DB"></Icon>
                </TouchableOpacity>

                <View style={{ marginHorizontal: 32, marginTop: 32, height: 150 }}>
                    {/* if (this.state.type == null) {
                        <Text style={{ fontWeight: "500" }}>Post</Text>
                    }elseif (this.state.type == 'video/mp4'){
                        <Text style={{ fontWeight: "500" }}>Post</Text>
                    }else{ */}
                        <Image source={{ uri: this.state.fileUri }} style={{ width: "100%", height: "100%" }}></Image>
                    {/* } */}
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
    }
});
