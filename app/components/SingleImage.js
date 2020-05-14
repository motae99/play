import React, {useState} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  NativeModules,
  View,
  Text,
  Image,
  Alert,
} from 'react-native';
import StyleGuide from './StyleGuide';

import Feather from 'react-native-vector-icons/Feather';
import * as Progress from 'react-native-progress';

var ImagePicker = NativeModules.ImageCropPicker;

const styles = StyleSheet.create({
  imageContainer: {
    height: 304,
    width: 340,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    margin: 12,
  },
  image: {
    height: '100%',
    width: '100%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    resizeMode: 'cover',
  },

  edit: {
    position: 'absolute',
    top: 0,
    left: 0,
    borderRadius: 5,
    backgroundColor: StyleGuide.palette.backgroundPrimary,
    opacity: 0.5,
    width: 46,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  delete: {
    position: 'absolute',
    top: 0,
    right: 0,
    borderRadius: 5,
    backgroundColor: StyleGuide.palette.backgroundPrimary,
    opacity: 0.5,
    width: 46,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressView: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
    fontStyle: 'italic',
  },
});

const upload = ({perc, uploadingProg, image, setImageFunction}) => {
  const pickSingle = () => {
    ImagePicker.openPicker({
      multiple: false,
      waitAnimationEnd: true,
      includeExif: true,
      forceJpg: true,
    })
      .then(image => {
        var img = {
          uri: image.path,
          width: image.width,
          height: image.height,
          mime: image.mime,
        };
        setImageFunction(img);
      })
      .catch(e => alert(e));
  };

  const crop = image => {
    ImagePicker.openCropper({
      path: image.uri,
      width: 400,
      height: 400,
    })
      .then(i => {
        var newImage = {
          uri: i.path,
          width: i.width,
          height: i.height,
          mime: i.mime,
        };
        setImageFunction(newImage);
      })
      .catch(e => {
        console.log(e);
        Alert.alert(e.message ? e.message : e);
      });
  };

  const cleanupSingleImage = file => {
    console.log('selected file', file);
    setImageFunction(null);
    ImagePicker.cleanSingle(file ? file.uri : null)
      .then(() => {
        console.log(`removed tmp image ${file.uri} from tmp directory`);
      })
      .catch(e => {
        alert(e);
      });
  };

  const renderImage = image => {
    return (
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={image} />
        <TouchableOpacity
          onPress={() => cleanupSingleImage(image)}
          style={styles.delete}>
          <Feather name="delete" size={24} color={StyleGuide.palette.primary} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => crop(image)} style={styles.edit}>
          <Feather name="edit" size={24} color={StyleGuide.palette.primary} />
        </TouchableOpacity>

        {uploadingProg ? (
          <View style={styles.progressView}>
            <Progress.Circle
              style={styles.progress}
              progress={perc}
              // indeterminate={this.state.indeterminate} later
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
    <View>
      {image ? (
        <View style={styles.filesContainer}>{renderImage(image)}</View>
      ) : (
        <TouchableOpacity style={styles.photo} onPress={pickSingle}>
          <View
            style={{
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
            }}>
            <Feather
              name="plus"
              size={100}
              color={StyleGuide.palette.primary}
            />
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default upload;
