import React from 'react';
import { View, PermissionsAndroid, ToastAndroid, Platform } from 'react-native';
import MapInput from './MapTestcomponents/MapInput';
import MyMapView from './MapTestcomponents/MapView';
import { getLocation, geocodeLocationByName, getGeoLocation } from './app/services/location-service';


class MapContainer extends React.Component {
    state = {
        region: {}
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

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ flex: 1 }}>
                    <MapInput notifyChange={(loc) => this.getCoordsFromName(loc)}
                    />
                </View>

                {
                    this.state.region['latitude'] ?
                        <View style={{ flex: 1 }}>
                            <MyMapView
                                region={this.state.region}
                                onRegionChange={(reg) => this.onMapRegionChange(reg)} />
                        </View> : null}
            </View>
        );
    }
}

export default MapContainer;