import React, { useEffect, memo } from 'react'
import { firebase } from '@react-native-firebase/dynamic-links';
import NavigationService from './NavigationService';


export default memo ( () => {
 const handleDynamicLink = (link) => {
   // Handle dynamic link inside your own application
   console.log('link Pressed')
   if (link.url === 'https://www.example.com/?curPage=1') return NavigationService.navigate('EListing');
   // if (link.url === 'https://www.example.com/?curPage=1') return NavigationService.navigate('EListing', { userName: 'Lucy' });
 };

 useEffect(() => {
   const unsubscribe = firebase.dynamicLinks().onLink(handleDynamicLink);
   // When the component unmounts, remove the listener
   return unsubscribe;
 }, []);

 return null;
})
