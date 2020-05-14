import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';

import AppService from '../AppServices';
import firestore from '@react-native-firebase/firestore';
import List from './List';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f6',
    padding: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
  },
});

export default () => {
  const [services, setServices] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const unsubscribe = firestore()
        .collection('services')
        // .orderBy('timestamp', 'desc')
        .onSnapshot(querySnapshot => {
          if (querySnapshot) {
            const AllServices = querySnapshot.docs.map(documentSnapshot => {
              return {
                ...documentSnapshot.data(),
                key: documentSnapshot.id,
              };
            });
            if (AllServices && AllServices.length > 0) {
              // console.log(AllServices);
              setServices(AllServices);
            }

            if (loading) {
              setLoading(false);
            }
          }
        });

      return () => unsubscribe();
    } catch (error) {
      console.log(error);
    }
  }, [loading]);

  // useEffect(() => {
  //   if (services) {
  //     services.map(service => {
  //       // console.log(service.name);
  //       firestore()
  //         .collection('categories')
  //         // .doc('Events')
  //         .doc(`${service.name}`)
  //         .collection('Categories')
  //         .onSnapshot(querySnapshot => {
  //           if (querySnapshot) {
  //             const allCat = querySnapshot.docs.map(documentSnapshot => {
  //               // console.log(documentSnapshot.data());
  //               return {
  //                 ...documentSnapshot.data(),
  //                 // key: documentSnapshot.id,
  //               };
  //             });
  //             if (allCat && allCat.length > 0) {
  //               service.categories = allCat;
  //               console.log(service);
  //               // setServices(AllServices);
  //             }

  //             if (loading) {
  //               setLoading(false);
  //             }
  //           }
  //         });
  //     });
  //     setServices(services);
  //   }
  // }, [loading, services]);

  if (loading) {
    return <Text>worth waiting</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <AppService />
      {services
        ? services.map((service, i) => {
            return <List key={i} {...{service}} />;
          })
        : null}

      <View style={{height: 50}} />
    </ScrollView>
  );
};
