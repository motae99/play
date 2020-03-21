import { NavigationActions } from 'react-navigation';

let _navigator;

function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef;
}

function navigate(routeName, params) {
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    })
  );
}

// add other navigation functions that you need and export them

// gets the current screen from navigation state
function getActiveRouteName(navigationState) {
  // console.log('you here')
 if (!navigationState) {
   return null;
 }
 const route = navigationState.routes[navigationState.index];
 // dive into nested navigators
 if (route.routes) {
  // console.log('route.routes',route)

   return getActiveRouteName(route);
 }
//  console.log('route.routeName',route.routeName)

 return route.routeName;
}


export default {
  navigate,
  setTopLevelNavigator,
  getActiveRouteName,
};