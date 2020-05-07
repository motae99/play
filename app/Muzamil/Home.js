import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native';
import {useNavigation} from 'react-navigation-hooks';
import Feather from 'react-native-vector-icons/Feather';
import Font from 'react-native-vector-icons/FontAwesome';
const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    height: 49,
    borderRadius: 2,
    margin: 5,
    backgroundColor: 'rgba(197, 205, 208, 0.1)',
  },
  headerCom: {
    margin: 5,
    flexDirection: 'row',
    height: 37,
  },

  search: {
    flex: 3,
    backgroundColor: 'white',
    // width: 200,
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 5,
  },
  drop: {
    flex: 1,
    // width: 80,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'row',
    borderRightWidth: 1,
    borderColor: '#C5CDD0',
    justifyContent: 'center',
    padding: 5,
  },
  searchText: {
    fontFamily: 'BigVestaRegular',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 14,
    lineHeight: 17,
    opacity: 0.5,
    margin: 5,
  },
  dropText: {
    fontFamily: 'BigVestaRegular',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 14,
    lineHeight: 17,
    margin: 5,
  },
  slider: {
    height: 168,
    width: width - 10,
    margin: 5,
  },
  section1: {
    // height: 172,
    // width: width,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  section2: {
    // height: 172,
    // width: width,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  lastSection: {
    height: 113,
    width: '100%',
  },
  sortImages: {
    height: 194,
    width: '100%',
    marginVertical: 8,
  },
  sectionHeader: {
    margin: 18,
    fontFamily: 'BigVestaBold',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 12,
    lineHeight: 11,
    color: '#484848',
  },
  categoryContainer: {
    flexDirection: 'row',
  },
  category: {
    width: width / 2 - 10,
    marginHorizontal: 6,
    alignContent: 'center',
    alignItems: 'center',
  },
  categoryImage: {
    height: 108,
    width: '100%',
    borderRadius: 10,
  },
  categoryText: {
    margin: 5,
    fontFamily: 'BigVestaRegular',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 12,
    lineHeight: 11,
    color: '#484848',
  },
});

export default function() {
  const {navigate} = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerCom}>
          <View style={styles.drop}>
            <Font name="caret-down" size={24} color="black" />

            <Text style={styles.dropText}>الدوحه</Text>
          </View>

          <View style={styles.search}>
            <Text style={styles.searchText}>ابحث</Text>
            <Feather name="search" size={24} color="black" />
          </View>
        </View>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          marginHorizontal: 4,
          justifyContent: 'center',
        }}>
        <View style={styles.slider}>
          <Image
            style={{height: '100%', width: '100%'}}
            resizeMode="cover"
            source={require('./Slider.png')}
          />
        </View>

        <View style={styles.section1}>
          <Text style={styles.sectionHeader}>ليزر ازالة شعر</Text>
          <View style={styles.categoryContainer}>
            <View style={styles.category}>
              <Image
                style={styles.categoryImage}
                resizeMode="cover"
                source={require('./section11.jpeg')}
              />
              <Text style={styles.categoryText}>جسم كامل</Text>
            </View>

            <View style={styles.category}>
              <Image
                style={styles.categoryImage}
                resizeMode="cover"
                source={require('./section12.jpeg')}
              />
              <Text style={styles.categoryText}>مناطق</Text>
            </View>
          </View>
        </View>
        <View style={styles.section2}>
          <Text style={styles.sectionHeader}>اقسام اخرى</Text>
          <View style={styles.categoryContainer}>
            <View style={styles.category}>
              <Image
                style={styles.categoryImage}
                resizeMode="cover"
                source={require('./skin.jpeg')}
              />
              <Text style={styles.categoryText}>بشرة</Text>
            </View>

            <View style={styles.category}>
              <Image
                style={styles.categoryImage}
                resizeMode="cover"
                source={require('./teeth.jpeg')}
              />
              <Text style={styles.categoryText}>أسنان</Text>
            </View>
          </View>

          <View style={styles.categoryContainer}>
            <View style={styles.category}>
              <Image
                style={styles.categoryImage}
                resizeMode="cover"
                source={require('./sba.jpeg')}
              />
              <Text style={styles.categoryText}> سبا</Text>
            </View>

            <View style={styles.category}>
              <Image
                style={styles.categoryImage}
                resizeMode="cover"
                source={require('./section12.jpeg')}
              />
              <Text style={styles.categoryText}>صفقه</Text>
            </View>
          </View>
        </View>

        <Image
          style={styles.sortImages}
          resizeMode="cover"
          source={require('./mostSold.png')}
        />

        <Image
          style={styles.sortImages}
          resizeMode="cover"
          source={require('./leastPrice.png')}
        />
        <Image
          style={styles.lastSection}
          resizeMode="cover"
          source={require('./last.png')}
        />
      </ScrollView>
    </View>
  );
}
