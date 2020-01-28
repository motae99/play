import React, { Component } from 'react';
import { View, Image, ScrollView, Alert, StyleSheet, Dimensions, Text, Modal, TouchableWithoutFeedback, FlatList, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';
import ImageViewer from 'react-native-image-zoom-viewer';
import { Rating, AirbnbRating } from 'react-native-elements';



const { width } = Dimensions.get('window');
const height = width * 0.5;
const windowHight = Dimensions.get('window').height;

export default class Carousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      modalVisible: false,
      data: [
        { 
          id: '1',
          title: "first slider title", 
          discription: "first slider discription",
          images: [
            { url: "https://lorempixel.com/400/200/sports/7/"},
            { url: "https://lorempixel.com/400/200/sports/5/"},
            { url: "https://lorempixel.com/400/200/sports/4/"},
            { url: "https://lorempixel.com/400/200/sports/3/"}
          ]
        },
        {
          id: '2',
          title: "second slider title", 
          discription: "second slider discription",
          images: [
            { url: "https://i.picsum.photos/id/1011/5472/3648.jpg"},
            { url: "https://lorempixel.com/400/300/food/5/"},
            { url: "https://lorempixel.com/400/300/food/4/"},
            { url: "https://lorempixel.com/400/300/food/3/"}
          ]
        },
        {
          id: '3',
          title: "first slider title", 
          discription: "first slider discription",
          images: [
            { url: "https://i.picsum.photos/id/10/2500/1667.jpg"},
            { url: "https://i.picsum.photos/id/11/2500/1667.jpg"},
            { url: "https://i.picsum.photos/id/12/2500/1667.jpg"},
            { url: "https://i.picsum.photos/id/13/2500/1667.jpg"}
          ]
        },
        {
          id: '4',
          title: "first slider title", 
          discription: "first slider discription",
          images: [
            { url: "https://i.picsum.photos/id/11/2500/1667.jpg"},
            { url: "https://lorempixel.com/400/500/fashion/5/"},
            { url: "https://lorempixel.com/400/500/fashion/4/"},
            { url: "https://lorempixel.com/400/500/fashion/3/"}
          ]
        },
        {
          id: '5',
          title: "first slider title", 
          discription: "first slider discription",
          images: [
            { url: "https://lorempixel.com/400/600/people/7/"},
            { url: "https://lorempixel.com/400/600/people/5/"},
            { url: "https://lorempixel.com/400/600/people/4/"},
            { url: "https://lorempixel.com/400/600/people/3/"}
          ]
        },
        {
          id: '6',
          title: "first slider title", 
          discription: "first slider discription",
          images: [
            { url: "https://lorempixel.com/400/700/city/7/"},
            { url: "https://lorempixel.com/400/700/city/5/"},
            { url: "https://lorempixel.com/400/700/city/4/"},
            { url: "https://lorempixel.com/400/700/city/3/"}
          ]
        },
        {
          id: '7',
          title: "first slider title", 
          discription: "first slider discription",
          images: [
            { url: "https://lorempixel.com/400/200/cats/7/"},
            { url: "https://lorempixel.com/400/200/cats/5/"},
            { url: "https://lorempixel.com/400/200/cats/4/"},
            { url: "https://lorempixel.com/400/200/cats/3/"}
          ]
        },
        {
          id: '8',
          title: "first slider title", 
          discription: "first slider discription",
          images: [
            { url: "https://lorempixel.com/400/200/transport/7/"},
            { url: "https://lorempixel.com/400/200/transport/5/"},
            { url: "https://lorempixel.com/400/200/transport/4/"},
            { url: "https://lorempixel.com/400/200/transport/3/", }
          ]
        },
        {
          id: '9',
          title: "first slider title", 
          discription: "first slider discription",
          images: [
            { url: "https://lorempixel.com/400/200/nightlife/7/"},
            { url: "https://lorempixel.com/400/200/nightlife/5/"},
            { url: "https://lorempixel.com/400/200/nightlife/4/"},
            { url: "https://lorempixel.com/400/200/nightlife/3/", }
          ]
        },
        {
          id: '10',
          title: "first slider title", 
          discription: "first slider discription",
          images: [
            { url: "https://lorempixel.com/400/200/nature/7/"},
            { url: "https://lorempixel.com/400/200/nature/5/"},
            { url: "https://lorempixel.com/400/200/nature/4/"},
            { url: "https://lorempixel.com/400/200/nature/3/"}
          ]
        },
        {
          id: '11',
          title: "first slider title", 
          discription: "first slider discription",
          images: [
            { url: "https://lorempixel.com/400/200/nature/7/"},
            { url: "https://lorempixel.com/400/200/nature/5/"},
            { url: "https://lorempixel.com/400/200/nature/4/"},
            { url: "https://lorempixel.com/400/200/nature/3/"}
          ]
        },
      ]

    };
  }
  renderModel(images){
    // console.log(images);
    return (
      <View
        // style={{
        //   padding: 10
        // }}
      >
        <Modal
          visible={this.state.modalVisible}
          transparent={true}
          onRequestClose={() => this.setState({ modalVisible: false })}
        >
          <ImageViewer
             style={{
                height: 500
              }}
            imageUrls={images}
            index={this.state.index}
            onSwipeDown={() => {
              console.log(images);
              // () => this.setState({ modalVisible: false })
            }}
            renderFooter = {() => { return (<Text> footer dfhaskjdfh jashfkjhkjs </Text>) }}
            loadingRender = {() => { <Text> loading ! </Text> }}
            // backgroundColor= '#F5FCFF'
            enableSwipeDown= {true}
            // renderImage={(images) => { return ( console.log(this.images))}}
            // onMove={data => console.log(data)}
            // enableSwipeDown={true}
          />
        </Modal>
      </View>
    );
  }

  // handlerLongClick = (images) => {
  //   //handler for Long Click
  //   // Alert.alert(' Button Long Pressed');
  //   // console.log(images);
  //   // render() {
  //     // this.setState({ modalVisible: true })
      
  //   // }
  //   this.renderModel(images);
  // };


  handlerClick = () => {
    //handler for Long Click
    Alert.alert(' Button Pressed');
  };

  Item(item) {
    return (
      <View
        style={styles.scrollContainer}
      >

        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={true}
          indicatorStyle= 'white'
          pagingEnabled= {true}
        >
          {item.images.map((image, key) => (
            <View key={key}>
              <TouchableWithoutFeedback 
                // onPress={ () => this.setState({modalVisible: true}) }
                // onLongPress={this.handlerClick}
              >
                <View>
                  <FastImage 
                    style={styles.image} 
                    source={{
                        uri: image.url,
                        priority: FastImage.priority.normal,
                        cashe: FastImage.cacheControl.immutable
                    }}
                    resizeMode={FastImage.resizeMode.cover}
                    // onProgress={e => console.log('progress :',e.nativeEvent.loaded / e.nativeEvent.total)}
                    // onLoad={e => console.log('loaded: ', e.nativeEvent.width, e.nativeEvent.height)}
                    // onError={error => console.log('error loading: ', error)}
                    // onLoadEnd={console.log('finished loading')}
                    // fallback= {true}
                  />
                  {/* <Image style={styles.image} source={image.url} /> */}
                  {/* <AirbnbRating style={styles.rating}/> */}
                  <Text style={styles.title}> {item.title}</Text>
                  <Text style={styles.discription}> {item.discription}</Text>
                </View>
                
              </TouchableWithoutFeedback>
              
              
            </View>
          ))}
        </ScrollView>
        {/* {this.renderModel(item.images)} */}
      </View>

    );
  }

  

  render() {
    // const { images } = this.state;
    const { data } = this.state;
    // console.log(object)
    // console.log(images)
    // object.map(object => (console.log('object',object.title)))
    if (data && data.length) {
      return (
        <View style={styles.container}>
          <FlatList
              data={data}
              renderItem={({ item }) => (
              this.Item(item)
              )}
              keyExtractor={item => item.id}
          />
        </View>
        
      );
    }
    console.log('Please provide images');
    return null;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginHorizontal: 10,
    // padding: 10
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  scrollContainer: {
    height: height+5,
    marginBottom: 15,
    // marginRight: 10,
    // marginLeft: 10
  },
  image: {
    width,
    height,
    // resizeMode: 'cover',
    // padding: 10,
    // marginHorizontal: 16,

    
  },
  title: {
    position: "absolute",
    paddingHorizontal: 15,
    backgroundColor: 'transparent',
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 20,
    bottom: 30,
    fontWeight: 'bold',
    // textAlign: 'center'
  },
  discription: {
    position: "absolute",
    bottom: 15,
    marginTop: 5,
    paddingHorizontal: 15,
    backgroundColor: 'transparent',
    color: 'rgba(255, 255, 255, 0.75)',
    fontSize: 13,
    fontStyle: 'italic',
    // textAlign: 'center'
  },
  rating: {
    position: "absolute",
    top: 15,
    right: 5,
  }
});
