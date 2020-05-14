import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';
import firestore from '@react-native-firebase/firestore';

import Animated from 'react-native-reanimated';
import {mix, useTransition} from 'react-native-redash';
import Chevron from './Chevron';
import Item, {LIST_ITEM_HEIGHT} from './ListItem';
import Add, {ADD_SERVICE_HEIGHT} from './AddService';

const {interpolate} = Animated;
const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    backgroundColor: 'white',
    padding: 16,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  items: {
    overflow: 'hidden',
  },
});

// export interface List {
//   name: string;
//   items: ListItem[];
// }

// interface ListProps {
//   list: List;
// }

export default ({list, service}) => {
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  // const [loading, setLoading] = useState(true);

  // .collection(`${service}Categories`)
  // .orderBy('timestamp', 'desc')

  useEffect(() => {
    try {
      const unsubscribe = firestore()
        .collection('categories')
        .doc(`${service.name}`)
        .collection('Categories')
        .onSnapshot(querySnapshot => {
          if (querySnapshot) {
            const AllCategories = querySnapshot.docs.map(documentSnapshot => {
              return {
                ...documentSnapshot.data(),
                key: documentSnapshot.id,
              };
            });
            if (AllCategories && AllCategories.length > 0) {
              // console.log(AllCategories);
              setCategories(AllCategories);
            }
          }
        });

      return () => unsubscribe();
    } catch (error) {
      console.log(error);
    }
  }, [open, service.name]);

  const transition = useTransition(open);
  const height = mix(
    transition,
    0,
    LIST_ITEM_HEIGHT * categories.length + ADD_SERVICE_HEIGHT,
  );
  const bottomRadius = interpolate(transition, {
    inputRange: [0, 16 / 400],
    outputRange: [8, 0],
  });

  // if (loading) {
  //   return <Text>worth waiting</Text>;
  // }
  return (
    <>
      <TouchableWithoutFeedback onPress={() => setOpen(prev => !prev)}>
        <Animated.View
          style={[
            styles.container,
            {
              borderBottomLeftRadius: bottomRadius,
              borderBottomRightRadius: bottomRadius,
            },
          ]}>
          <Text style={styles.title}>{service.name}</Text>
          <Chevron {...{transition}} />
        </Animated.View>
      </TouchableWithoutFeedback>

      <Animated.View style={[styles.items, {height}]}>
        <Add {...{service}} />
        {categories
          ? categories.map((item, key) => (
              <Item
                key={key}
                isLast={key === categories.length - 1}
                {...{item}}
              />
            ))
          : null}
      </Animated.View>
    </>
  );
};
