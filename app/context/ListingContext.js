import React, {createContext, useState, useEffect} from 'react';
import {AsyncStorage} from '@react-native-community/async-storage';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import messaging from '@react-native-firebase/messaging';
import analytics from '@react-native-firebase/analytics';

export const ListingContext = createContext();

const intial = firestore()
  .collection('partyHalls')
  .orderBy('timestamp', 'desc');

const ListingContextProvider = props => {
  const [documentData, setDocumentData] = useState([]);
  const [limit, setLimit] = useState(10);
  const [reseting, reset] = useState(false);
  const [lastVisible, setLastVisible] = useState(null);
  const [fetching, reFetching] = useState(false);
  const [refreshing, setRfreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState(intial);

  useEffect(() => {
    try {
      const unsubscribe = query.limit(limit).onSnapshot(querySnapshot => {
        if (querySnapshot) {
          const documentData = querySnapshot.docs.map(documentSnapshot => {
            return {
              ...documentSnapshot.data(),
              key: documentSnapshot.id,
              isHearted: false,
            };
          });
          if (documentData && documentData.length > 0) {
            let last = documentData[documentData.length - 1].timestamp;
            if (last) {
              setLastVisible(last);
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
    } catch (error) {
      console.log(error);
    }
  }, [limit, loading, query, refreshing]);

  useEffect(() => {
    const unsubscribe = query
      .startAfter(lastVisible)
      .limit(limit)
      .onSnapshot(querySnapshot => {
        if (querySnapshot) {
          const moreData = querySnapshot.docs.map(documentSnapshot => {
            return {
              ...documentSnapshot.data(),
              key: documentSnapshot.id,
              isHearted: false,
            };
          });
          if (moreData && moreData.length > 0) {
            let last = moreData[moreData.length - 1].timestamp;
            if (last) {
              setLastVisible(last);
              setDocumentData([...documentData, ...moreData]);
            }
          }
          if (fetching) {
            reFetching(false);
          }
        }
      });
    return () => unsubscribe();
  }, [documentData, fetching, lastVisible, limit, query]);

  const locationQuery = range => {
    //  console.log(range, 'this is the selected range')
    let newQuery = firestore()
      .collection('partyHalls')
      .where('geohash', '>=', range.lower)
      .where('geohash', '<=', range.upper)
      .orderBy('geohash', 'asc');

    setQuery(newQuery);
  };

  const heart = item => {
    item.isHearted = !item.isHearted;
    console.log(item, 'item is');
    // I want to do tow things Here
    // 1- toggle heart on current list which I dont think its neccassry
    // 2- add Item to favorate list for this user
    // console.log(item)
    // // data.item.selectedClass = data.item.isSelect
    // //   ? styles.selected
    // //   : styles.list;
    // // const index = this.state.dataSource.findIndex(
    // //   item => data.item.id === item.id
    // // );
    // // this.state.dataSource[index] = data.item;
    // // this.setState({
    // //   dataSource: this.state.dataSource
    // // });
    // // console.log("My heart is completely with you")
    // // console.log("Heart", data.isHearted)
    // data.isHearted = !data.isHearted;
    // // console.log("toggled", data.isHearted)
    // const index = documentData.findIndex(
    //   item => data.id === item.id
    // );
    // // console.log("index", index)
    // // console.log("documentData[index]", documentData[index])
    // // console.log("data", data)
    // documentData[index] = data;
    // setDocumentData({ documentData: documentData });
  };

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
        locationQuery,
        heart,
      }}>
      {props.children}
    </ListingContext.Provider>
  );
};

export default ListingContextProvider;
