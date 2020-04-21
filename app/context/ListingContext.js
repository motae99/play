import React, { createContext, useState, useEffect } from "react";
import { AsyncStorage } from '@react-native-community/async-storage'; 

import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import storage from "@react-native-firebase/storage";
import messaging from '@react-native-firebase/messaging';
import analytics from '@react-native-firebase/analytics';

const intial  = firestore().collection('partyHalls').orderBy("timestamp", "desc");

const ListingContext = createContext();

const ListingContextProvider = props => {
 const [ documentData, setDocumentData] = useState([]); 
 const [ limit, setLimit] = useState(3); 
 const [ reseting, reset] = useState(false); 
 const [ lastVisible, setLastVisible] = useState(null); 
 const [ fetching, reFetching] = useState(false); 
 const [ refreshing, setRfreshing] = useState(false); 
 const [ loading, setLoading] = useState(true); 
 const [ query, setQuery] = useState(intial); 

 useEffect(() => {
  try{ 
    const unsubscribe = query.limit(limit).onSnapshot((querySnapshot) => {
      if(querySnapshot){ 
        const documentData = querySnapshot.docs.map((documentSnapshot) => {
          return {
            ...documentSnapshot.data(),
            key: documentSnapshot.id, 
            isHearted: false
          };
        });
        if(documentData && documentData.length > 0){
          let last = documentData[documentData.length - 1].timestamp;
          if(last){
            setLastVisible(last)
            setDocumentData(documentData);
          }
        }

        if (loading) {
          setLoading(false);
        }
        if (refreshing) {
          setRfreshing(false);
        }
       }
       });
      return () => unsubscribe(); 
    }catch (error) {
      console.log(error);
    }
 }, [query]);

 useEffect(() => {
    const unsubscribe = query.startAfter(lastVisible).limit(limit).onSnapshot((querySnapshot) => {
      if(querySnapshot){ 
        const moreData = querySnapshot.docs.map((documentSnapshot) => {
          return {
            ...documentSnapshot.data(),
            key: documentSnapshot.id, 
            isHearted: false
          };
        });
        if(moreData && moreData.length > 0){
          let last = moreData[moreData.length - 1].timestamp;
          if(last){
            setLastVisible(last)
            setDocumentData([...documentData, ...moreData]);
          }
        }
        if (fetching) {
          reFetching(false);
        }
       }
       });
      return () => unsubscribe(); 
 }, [fetching]);




  return (
    <ListingContext.Provider
      value={{
        documentData,
        loading,
        refreshing,
        setRfreshing, 
        setLoading,
        setQuery,
        reFetching,
      }}
    >
      {props.children}
    </ListingContext.Provider>
  );
};

export { ListingContextProvider, ListingContext } ;
