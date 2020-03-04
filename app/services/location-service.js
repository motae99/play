import Geocoder from 'react-native-geocoding';
import Geolocation from 'react-native-geolocation-service';
import geohash from "ngeohash";

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

export const getGeohashRange = (latitude, longitude, distance) => {
    const lat = 0.0144927536231884; // degrees latitude per mile
    const lon = 0.0181818181818182; // degrees longitude per mile

    const lowerLat = latitude - lat * distance;
    const lowerLon = longitude - lon * distance;

    const upperLat = latitude + lat * distance;
    const upperLon = longitude + lon * distance;

    const lower = geohash.encode(lowerLat, lowerLon);
    const upper = geohash.encode(upperLat, upperLon);

    return {
      lower,
      upper
    };
  };

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

