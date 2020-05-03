import React, {forwardRef, useRef, useState, useImperativeHandle} from 'react';
import {
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  NativeModules,
  View,
  Text,
  Image,
  Alert,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Video from 'react-native-video';
import * as Progress from 'react-native-progress';

var ImagePicker = NativeModules.ImageCropPicker;

const styles = StyleSheet.create({
  filesContainer: {
    height: 304,
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
    backgroundColor: 'white',
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
    backgroundColor: 'white',
    opacity: 0.5,
    width: 46,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },

  picker: {
    alignItems: 'flex-end',
    marginHorizontal: 32,
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

const upload = forwardRef(
  (
    {perc, uploadingProg, uploadingTotal, dynamicIndex, images, setImages},
    ref,
  ) => {
    const [indexArry, setIndexArry] = useState([]);
    const scrollRef = useRef();

    useImperativeHandle(ref, () => ({
      downButtonHandler() {
        scrollRef.current.scrollTo({
          x: indexArry[dynamicIndex],
          y: 0,
          animated: true,
        });
      },
    }));

    const pickMultiple = () => {
      ImagePicker.openPicker({
        multiple: true,
        waitAnimationEnd: true,
        includeExif: true,
        forceJpg: true,
      })
        .then(images => {
          var imagese = images.map(i => {
            return {
              uri: i.path,
              width: i.width,
              height: i.height,
              mime: i.mime,
            };
          });
          setImages(imagese);
        })
        .catch(e => alert(e));
    };

    const cleanupImages = () => {
      ImagePicker.clean()
        .then(() => {
          console.log('removed tmp images from tmp directory');
        })
        .catch(e => {
          alert(e);
        });
    };

    const crop = image => {
      var array = images;
      var index = array.indexOf(image);

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
          array[index] = '';
          setImages(array);
          // console.log('received cropped image', image);
        })
        .catch(e => {
          console.log(e);
          Alert.alert(e.message ? e.message : e);
        });
    };

    const cleanupSingleImage = file => {
      console.log('selected file', file);
      var array = [images];
      var index = array.indexOf(file);
      if (index !== -1) {
        array.splice(index, 1);
        setImages(array);
      }
      ImagePicker.cleanSingle(file ? file.uri : null)
        .then(() => {
          console.log(`removed tmp image ${file.uri} from tmp directory`);
        })
        .catch(e => {
          alert(e);
        });
    };

    const renderVideo = video => {
      console.log('rendering video');
      console.log(video);
      return (
        <View style={{height: 300, width: 300}}>
          <TouchableOpacity onLongPress={cleanupSingleImage(video)}>
            <Video
              source={{uri: video.uri, type: video.mime}}
              rate={1}
              paused={false}
              volume={1}
              muted={true}
              resizeMode={'cover'}
              onError={e => console.log('error this ', e)}
              onLoad={load => console.log('loading this', load)}
              repeat={true}
            />
          </TouchableOpacity>
        </View>
      );
    };

    const renderImage = image => {
      var array = images;
      var index = array.indexOf(image);
      return (
        <View style={{height: 300, width: 300}}>
          <Image style={styles.image} source={image} />
          <TouchableOpacity
            onPress={() => cleanupSingleImage(image)}
            style={styles.delete}>
            <Feather name="delete" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => crop(image)} style={styles.edit}>
            <Feather name="edit" size={24} color="black" />
          </TouchableOpacity>
          {/* {(progressFile == image.index) ? ( */}
          {index === uploadingProg ? (
            <View style={styles.progressView}>
              <Progress.Circle
                style={styles.progress}
                progress={perc}
                // indeterminate={this.state.indeterminate} later
                showsText={true}
                size={100}
                thickness={6}
              />
              <Text style={styles.progText}>
                uploading {uploadingProg} out of {uploadingTotal}
              </Text>
            </View>
          ) : null}
        </View>
      );
    };

    const renderAsset = image => {
      if (image.mime && image.mime.toLowerCase().indexOf('video/') !== -1) {
        return renderVideo(image);
      }
      return renderImage(image);
    };

    return (
      <View>
        {images ? (
          <TouchableOpacity style={styles.picker} onPress={pickMultiple}>
            <Feather name="plus" size={32} color="#D8D9DB" />
          </TouchableOpacity>
        ) : null}

        <ScrollView horizontal ref={scrollRef}>
          {images ? (
            images.map((image, key) => (
              <View
                style={styles.filesContainer}
                key={key}
                onLayout={event => {
                  const layout = event.nativeEvent.layout;
                  indexArry[key] = layout.x;
                  setIndexArry({...indexArry});
                }}>
                {renderAsset(image)}
              </View>
            ))
          ) : (
            <TouchableOpacity style={styles.picker} onPress={pickMultiple}>
              <View
                style={{
                  justifyContent: 'center',
                  alignContent: 'center',
                  alignItems: 'center',
                }}>
                <Feather name="plus" size={100} color="#D8D9DB" />
              </View>
            </TouchableOpacity>
          )}
        </ScrollView>
      </View>
    );
  },
);

export default upload;
