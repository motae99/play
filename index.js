/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import LongPress from './LongPress';

// import Progress from './app/components/CircularProgress/index';
// import bgMessaging from './app/services/BgMessaging'; // <-- Import the file you created in (2)

// import MapContainer from './MapContainer';
// import Airbnb from './Airbnb/index';

import {name as appName} from './app.json';

// Move to a proper place
// const handleFCMNotification = async (message) => {
//  console.log('FCM OFFLINE: ', message);
//  return Promise.resolve();
// }

// global.PaymentRequest = require('react-native-payments').PaymentRequest;

AppRegistry.registerComponent(appName, () => App);

// FCM background message task
// AppRegistry.registerHeadlessTask('RNFirebaseBackgroundMessage', () => bgMessaging); // <-- Add this line

// AppRegistry.registerHeadlessTask('RNFirebaseBackgroundMessage', () => PushNotificationService.handleFCMNotification);
