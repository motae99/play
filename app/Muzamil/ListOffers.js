import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  ScrollView,
  StatusBar,
  Dimensions,
  FlatList,
  StyleSheet,
} from 'react-native';
import {useNavigation} from 'react-navigation-hooks';

import firestore from '@react-native-firebase/firestore';
import {
  Placeholder,
  PlaceholderMedia,
  PlaceholderLine,
  Fade,
} from 'rn-placeholder';
import Kantaoffer from './MuzOfferCard';
import {readDocuments} from './ReadDocuments';
import Feather from 'react-native-vector-icons/Feather';
import {
  CirclesLoader,
  PulseLoader,
  TextLoader,
  DotsLoader,
} from 'react-native-indicator';

import {RNFluidicSlider} from 'react-native-fluidic-slider';
import {RNNumberStepper} from 'react-native-number-stepper';
import RNMorphingText from 'react-native-morphing-text';

import FastImage from 'react-native-fast-image';
import {TouchableOpacity} from 'react-native-gesture-handler';

const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
  header: {
    height: 48,
    backgroundColor: '#5999F1',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  item: {
    justifyContent: 'center',
    alignContent: 'center',
    margin: 12,
    // height: 190,
    // width: 348,
  },
  filterView: {
    // margin: 5,
    // height: 30,
    backgroundColor: 'gray',
    borderRadius: 20,
    justifyContent: 'center',
    // alignItems: 'center',
    marginHorizontal: 5,
    marginBottom: 10,
  },
  filterText: {
    fontFamily: 'BigVestaRegular',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 14,
    lineHeight: 17,
    color: '#FFFFFF',
    padding: 8,
    alignSelf: 'center',
  },
  sorting: {
    height: 40,
    width: width - 20,
    // margin: 10,
    marginTop: 10,
    borderColor: '#F264B1',
    borderWidth: 1,
    borderRadius: 10,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  sortingView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRightColor: '#F264B1',
    borderRightWidth: 1,
  },
  sortingText: {
    fontFamily: 'BigVestaBold',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 12,
    lineHeight: 17,
    color: '#F264B1',
    padding: 5,
  },
  customer: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: 'blue',
    position: 'absolute',
    bottom: 30,
    right: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default function Offers({category = 'بشرة'}) {
  let intialFilter = ['category', '==', category];
  let intialSort = ['timestamp', 'desc'];

  let options = {
    // where: [intialFilter],
    orderBy: intialSort,
  };

  const intialQuery = readDocuments('centerOffers', options);

  // Usage
  // Multiple where
  // let options = {where: [["category", "==", "someCategory"], ["color", "==", "red"], ["author", "==", "Sam"]], orderBy: ["date", "desc"]};

  // //OR
  // // A single where
  // let options = {where: ["category", "==", "someCategory"]};

  // let documents = readDocuments("books", options);
  const {navigate} = useNavigation();

  const [loading, setLoading] = useState(true);
  const [subCategories, setSubCategories] = useState(null);
  const [offers, setOffers] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [lastVisible, setLastVisible] = useState(null);
  const [query, setQuery] = useState(intialQuery);
  const [filter, setFilter] = useState(null);
  const [sort, setSort] = useState(intialSort);

  const [render, setRender] = useState(false);
  const [money, setMoney] = useState(false);
  const [price, setPrice] = useState(false);
  const [active, setActive] = useState(false);
  const [time, setTime] = useState(false);

  const changeQuery = cond => {
    if (cond) {
      console.log(filter);

      let addFilter = ['subCategories', 'array-contains', cond];
      let newFilter = [...intialFilter, addFilter];

      console.log(filter);

      setFilter(newFilter);
      console.log(filter);

      // console.log(newFilter);

      //   const newQuery = firestore()
      //     .collection('centerOffers')
      //     // .where('languages', 'in', ['en', 'fr'])  // also option
      //     .where('category', '==', category)
      //     .where('subCategories', 'array-contains', cond)
      //     .orderBy('timestamp', 'asc');

      //   setLoading(true);
      //   setQuery(newQuery);
    } else {
      // const newQuery = intial;
      // setLoading(true);
      // setQuery(newQuery);
    }
  };

  useEffect(() => {
    let options = {
      where: filter,
      orderBy: sort,
      startAfter: lastVisible,
      limit: 2,
    };
    console.log('see numer it runs: ', lastVisible);
    let newQuery = readDocuments('centerOffers', options);
    setQuery(newQuery);
  }, [filter, sort, lastVisible]);

  useEffect(() => {
    try {
      const unsubscribe = firestore()
        .collection('categories')
        .where('name', '==', category)
        // .orderBy('timestamp', 'desc')
        .onSnapshot(querySnapshot => {
          if (querySnapshot) {
            const sub = querySnapshot.docs.map(documentSnapshot => {
              return {
                ...documentSnapshot.data(),
                // key: documentSnapshot.id,
              };
            });
            if (sub && sub.length > 0) {
              setSubCategories(sub);
            }
          }
        });
      return () => unsubscribe();
    } catch (error) {
      console.log(error);
    }
  }, [category]);

  useEffect(() => {
    try {
      const unsubscribe = query.onSnapshot(querySnapshot => {
        if (querySnapshot) {
          const kanta = querySnapshot.docs.map(documentSnapshot => {
            return {
              ...documentSnapshot.data(),
              key: documentSnapshot.id,
            };
          });
          if (kanta && kanta.length > 0) {
            let last = kanta[kanta.length - 1].timestamp;
            if (last) {
              setLastVisible(last);
              setOffers(kanta);
            }
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
  }, [loading, query]);

  // useEffect(() => {
  //   const unsubscribe = query
  //     .startAfter(lastVisible)
  //     .limit(2)
  //     .onSnapshot(querySnapshot => {
  //       if (querySnapshot) {
  //         const kanta = querySnapshot.docs.map(documentSnapshot => {
  //           return {
  //             ...documentSnapshot.data(),
  //             key: documentSnapshot.id,
  //           };
  //         });
  //         if (kanta && kanta.length > 0) {
  //           // console.log('lenght more load:', kanta.length)
  //           // // console.log('last :', kanta[kanta.length -1])
  //           // console.log('start after key :', kanta[kanta.length - 1].key)
  //           // console.log('start after timestamp :', kanta[kanta.length - 1].timestamp)
  //           let last = kanta[kanta.length - 1].timestamp;
  //           if (last) {
  //             setLastVisible(last);
  //             setOffers([...offers, ...kanta]);
  //           }
  //         }

  //         // if (loading) {
  //         //   setLoading(false);
  //         // }
  //         if (refreshing) {
  //           setRefreshing(false);
  //         }
  //       }
  //     });
  //   return () => unsubscribe();
  // }, [offers, lastVisible, query, refreshing]);

  const renderFooter = () => {
    try {
      // Check If Loading
      if (refreshing) {
        return (
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <CirclesLoader />
            <TextLoader text="Loading" />
          </View>
        );
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const more = () => {
    console.log('End Reached');
    setRefreshing(true);
  };

  if (loading) {
    return (
      <View>
        <View style={{height: 100}} />
        <Placeholder
          Animation={Fade}
          Left={PlaceholderMedia}
          Right={PlaceholderMedia}>
          <PlaceholderLine width={80} />
          <PlaceholderLine />
          <PlaceholderLine width={30} />
        </Placeholder>
        <Placeholder
          Animation={Fade}
          Left={PlaceholderMedia}
          Right={PlaceholderMedia}>
          <PlaceholderLine width={80} />
          <PlaceholderLine />
          <PlaceholderLine width={30} />
        </Placeholder>
        <Placeholder
          Animation={Fade}
          Left={PlaceholderMedia}
          Right={PlaceholderMedia}>
          <PlaceholderLine width={80} />
          <PlaceholderLine />
          <PlaceholderLine width={30} />
        </Placeholder>
      </View>
    );
  }

  return (
    <View style={{flex: 1}}>
      <View style={styles.header}>
        <Feather name="x" size={24} color="white" />
        <Text style={styles.filterText}>{category}</Text>
        <TouchableOpacity onPress={() => console.log('navigation goBack()')}>
          <Feather name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
      </View>
      {subCategories ? (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            height: 50,
            alignItems: 'center',
            // justifyContent: 'flex-start',
            // justifyContent: 'space-evenly',
          }}>
          {subCategories[0].options.map((element, i) => {
            return (
              <View key={i} style={styles.filterView}>
                <TouchableOpacity onPress={() => changeQuery(element)}>
                  <Text style={styles.filterText}>{element}</Text>
                </TouchableOpacity>
              </View>
            );
          })}
          <View style={styles.filterView}>
            <TouchableOpacity onPress={() => changeQuery()}>
              <Text style={styles.filterText}>اظهار الكل</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      ) : null}

      <View style={styles.sorting}>
        <TouchableOpacity onPress={() => setSort(['price', 'desc'])}>
          <View style={styles.sortingView}>
            <Text style={styles.sortingText}>أكثر مبيعا</Text>
            <Feather name="arrow-up" color="#F264B1" size={16} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setSort(['price', 'desc'])}>
          <View style={styles.sortingView}>
            <Text style={styles.sortingText}>أقل سعرا</Text>
            <Feather name="arrow-down" color="#F264B1" size={16} />
          </View>
        </TouchableOpacity>

        <View style={styles.sortingView}>
          <Text style={styles.sortingText}>أفضل تقييما</Text>
          <Feather name="smile" color="#F264B1" size={16} />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={styles.sortingText}>دون فيلتر</Text>
          <Feather name="filter" color="#F264B1" size={16} />
        </View>
      </View>

      <FlatList
        contentContainerStyle={{alignItems: 'center'}}
        scrollEventThrottle={1}
        showsHorizontalScrollIndicator={false}
        // snapToInterval={width}
        ListFooterComponent={() => renderFooter()}
        // onEndReached={() => more()}
        onEndReachedThreshold={0.1}
        data={offers}
        renderItem={({item}) => <Kantaoffer offer={item} />}
        // keyExtractor={item => String(item.key)}
        extraData={loading}
        onRefresh={true}
        refreshing={refreshing}
      />
      <View style={styles.customer}>
        <TouchableOpacity
          onPress={() => {
            navigate('Customer');
          }}>
          <Feather name="message-circle" size={30} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
