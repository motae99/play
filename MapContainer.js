import React from 'react';
import { Animated, View, PermissionsAndroid, ToastAndroid, Platform, Text, StyleSheet, TouchableOpacity, StatusBar, Image } from 'react-native';
import MapInput from './app/screens/Listing/components/MapInput';
import MyMapView from './MapTestcomponents/MapView';
import { getLocation, geocodeLocationByName, getGeoLocation } from './app/services/location-service';
import LinearGradient from 'react-native-linear-gradient';
const ic_action_back = require('./images/ic_action_back.png');
const direction_start = require('./images/direction_start.png');

class MapContainer extends React.Component {
    state = {
        region: {},
        searching: false,
        searchHeight: new Animated.Value(200),
        headerHeight: new Animated.Value(200)
    };

    componentDidMount() {
        // this.getInitialState();
    }

    hasLocationPermission = async () => {
        if (Platform.OS === 'ios' ||
            (Platform.OS === 'android' && Platform.Version < 23)) {
          return true;
        }
    
        const hasPermission = await PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );
    
        if (hasPermission) return true;
    
        const status = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );
    
        if (status === PermissionsAndroid.RESULTS.GRANTED) return true;
    
        if (status === PermissionsAndroid.RESULTS.DENIED) {
          ToastAndroid.show('Location permission denied by user.', ToastAndroid.LONG);
        } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
          ToastAndroid.show('Location permission revoked by user.', ToastAndroid.LONG);
        }
    
        return false;
    }

    async getInitialState() {
        const hasLocationPermission = await this.hasLocationPermission();
        if (hasLocationPermission) {
            getGeoLocation().then(
                (data) => {
                    console.log(data);
                    this.setState({
                        region: {
                            latitude: data.latitude,
                            longitude: data.longitude,
                            latitudeDelta: 0.003,
                            longitudeDelta: 0.003
                        }
                    });
                }
            ).catch( error => console.log('error', error) )
        }
    }

    getCoordsFromName(loc) {
        this.setState({
            region: {
                latitude: loc.lat,
                longitude: loc.lng,
                latitudeDelta: 0.003,
                longitudeDelta: 0.003
            }
        });
    }

    onMapRegionChange(region) {
        this.setState({ region });
    }

    hide() {

        // if(this.state.animating) {
        //     return;
        // }
        this.setState({animating: true});
        Animated.timing(
            this.state.searchHeight,
            {toValue: 0}
        ).start();

        this.setState({animating: false});
        Animated.timing(
            this.state.headerHeight,
            {toValue: 200}
        ).start();

        
    }

    show() {
        // if(!this.state.animating) {
        //     return;
        // }
        // console.log('animating show Button Bar');
        this.setState({animating: false});
        Animated.timing(
            this.state.searchHeight,
            {toValue: 200}
        ).start();

        this.setState({animating: true});
        Animated.timing(
            this.state.headerHeight,
            {toValue: 0}
        ).start();
    }

    getHeaderStyle() {
        const {height} = this.state;
        return {height, opacity: height.interpolate({
            inputRange: [0, 200],
            outputRange: [0, 1],
        })}
    }

    getSearchStyle() {
        const {height} = this.state;
        return {height, opacity: height.interpolate({
            inputRange: [0, 200],
            outputRange: [0, 1],
        })}
    }

    toggle() {
        // this.setState({height: new Animated.Value(50), original: 50});
        this.hide()
        // setTimeout(() => {
        //     this.show()
        // }, 2000);
    }

    render() {
        return (
            <View >
                {/* { this.state.searching ? */}
                {/* <Animated.View style={this.getSearchStyle()}>
                    <MapInput notifyChange={(loc) => this.getCoordsFromName(loc)} />
                </Animated.View> */}
                {/* //  :  null} */}
                {/* { !this.state.searching ?  */}
                <Animated.View style={this.getHeaderStyle()}>
                    <MapHeader/> 
                </Animated.View>
                
                    {/* :  null} */}

                {
                    // this.state.region['latitude'] ?
                    false ?
                        <View style={{ flex: 2 }}>
                            <MyMapView
                                region={this.state.region}
                                onRegionChange={(reg) => this.onMapRegionChange(reg)} />
                        </View> : null}
                    
            </View>
        );
    }
}

export default MapContainer;

class MapHeader extends React.Component {
    // constructor() {
    //     super();
    //     this.state = {
    //         height: new Animated.Value(36),
    //         buttons: ['Live', 'Photo', 'Check In'],
    //         icons: ['ios-videocam', 'ios-camera', 'ios-pin']
    //     };
    // }
    state= {height: new Animated.Value(200)};

    hide() {

        if(this.state.animating) {
            return;
        }
        this.setState({animating: true});
        Animated.timing(
            this.state.height,
            {toValue: 0}
        ).start();
    }

    show() {
        if(!this.state.animating) {
            return;
        }
        // console.log('animating show Button Bar');
        this.setState({animating: false});
        Animated.timing(
            this.state.height,
            {toValue: 200}
        ).start();
    }

    getStyle() {
        const {height} = this.state;
        return {height, opacity: height.interpolate({
            inputRange: [0, 200],
            outputRange: [0, 1],
        })}
    }

    toggle() {
        // this.setState({height: new Animated.Value(50), original: 50});
        this.hide()
        setTimeout(() => {
            this.show()
        }, 2000);
    }
  
    render() {
        return (
            <LinearGradient colors={['#8301FF', '#30ACFF']}
                            start={{x: 0.0, y: 1.0}} end={{x: 1.0, y: 1.0}}
                            style={{
                                height: '100%', width: '100%',
                                borderBottomLeftRadius: 16,
                                borderBottomRightRadius: 16,
                                paddingBottom: 8
                            }}
            >
                <StatusBar
                    backgroundColor="#00000000"
                    barStyle="default"
                    translucent={true}
                />
                <View style={{
                    paddingTop: 24,
                    width: '100%',
                    alignItems: 'center',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                }}>
                  <TouchableOpacity onPress={() => { this.toggle() }}>
                    <Image source={ic_action_back}
                           resizeMode='center'
                    />
                  </TouchableOpacity>
                    <Text style={{
                        textAlign: 'center',
                        paddingLeft: 20,
                        paddingRight: 20,
                        color: '#FFFFFF'
                    }}>SEE ALL</Text>
  
                </View>



                <View style={{
                    flex: 1,
                    justifyContent: 'flex-end',
                    padding: 10,
                    alignItems: 'flex-start',
                }}>
                    <Text style={{
                        textAlign: 'center',
                        color: '#FFFFFF',
                        opacity: 0.6
                    }}>Restaurants</Text>
                    <Text style={{
                        textAlign: 'center',
                        fontSize: 30,
                        fontFamily: 'Roboto',
                        color: '#FFFFFF'
                    }}>Brooklyn</Text>
                    <Text style={{
                        textAlign: 'center',
                        color: '#FFFFFF',
                        opacity: 0.6
                    }}>3164, Anthony Avenue</Text>
                </View>
  
            </LinearGradient>

        
        )
    }
  
}



  const styles = StyleSheet.create({
    // animatedHeader: {
    //     height: 
    // }
    Header: {
        left: 0,
        right: 0,
        bottom: 0,
        height: 10,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    BottomContainer: {
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 20,
        width: 350,
        height: '15%',
        flexDirection: 'column',
        backgroundColor: 'rgba(255,255,255,0.9)',
        borderRadius: 20,
    },

    container: {
        ...StyleSheet.absoluteFillObject,
        height: '100%',
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,

        backgroundColor: '#000000',
    },
    linearGradient: {
        width: '100%',
        height: '25%',
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16,
    },
    buttonText: {
        fontSize: 18,
        fontFamily: 'Gill Sans',
        fontWeight: 'normal',
        textAlign: 'center',
        margin: 10,
        color: '#ffffff',
        backgroundColor: 'transparent',
    },
    bubble: {
        flex: 1,
        backgroundColor: 'rgba(255,255,255,0.7)',
        paddingHorizontal: 18,
        paddingVertical: 12,
        borderRadius: 20,
    },
    latlng: {
        width: 200,
        alignItems: 'stretch',
    },
    button: {
        width: 80,
        paddingHorizontal: 12,
        alignItems: 'center',
        marginHorizontal: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        marginVertical: 20,
        backgroundColor: 'transparent',
    },
})