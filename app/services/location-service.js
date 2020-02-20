import Geocoder from 'react-native-geocoding';
import Geolocation from 'react-native-geolocation-service';

export const getGeoLocation = () => {
    return new Promise( (resolve, reject) => {
            Geolocation.getCurrentPosition(
                (data) => resolve(data.coords),
                (err) => reject(err),
                { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000, distanceFilter: 50, forceRequestLocation: true }
            );
    })
}

export const getLocation = () => {   
    return new Promise(
        (resolve, reject) => {
            navigator.geolocation.getCurrentPosition(
                (data) => resolve(data.coords),
                (err) => reject(err)
            );
        }
    );
}

export const geocodeLocationByName = (locationName) => {
    return new Promise(
        (resolve, reject) => {
            Geocoder.from(locationName)
                .then(json => {
                    const addressComponent = json.results[0].address_components[0];
                    resolve(addressComponent);
                })
                .catch(error => reject(error));
        }
    );
}

export const geocodeLocationByCoords = (lat, long) => {
    return new Promise(
        (resolve, reject) => {
            Geocoder.from(lat, long)
                .then(json => {
                    const addressComponent = json.results[0].address_components[0];
                    resolve(addressComponent);
                })
                .catch(error => reject(error));
        }
    );
}

