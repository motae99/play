import React, {memo, useContext} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import Feather from 'react-native-vector-icons/Feather';
import {Rating} from 'react-native-elements';
import I18n from '../utils/i18n';

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  item: {
    justifyContent: 'center',
    alignContent: 'center',
    margin: 12,
    // height: 190,
    // width: 348,
  },
  text: {
    fontFamily: 'BigVestaRegular',
  },
});

export default memo(({offer}) => {
  // const {navigate} = useNavigation();
  // const {heart} = useContext(ListingContext);
  // console.log('item from card', offer);

  return (
    <View key={offer.key} style={styles.item}>
      {/* <SharedElement id={`offer.${offer.key}.photo`}> */}
      <View
        style={{
          // flex: 1,
          height: 200,
          width: 340,
          // alignSelf: 'center',
        }}>
        <FastImage
          style={{
            flex: 1,
            // height: 190,
            // width: 340,
            // height: '100%',
            // width: '100%',
            // alignSelf: 'center',
          }}
          source={{
            uri: offer.image.uri,
            priority: FastImage.priority.normal,
            cashe: FastImage.cacheControl.immutable,
          }}
          resizeMode={FastImage.resizeMode.cover}
        />
        <View
          style={{
            backgroundColor: '#ED6909',
            width: 40,
            height: 28,
            position: 'absolute',
            top: -10,
            left: 5,
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: '#FFFFFF',
              // alignSelf: 'center',
              fontSize: 12,
              fontFamily: 'Roboto',
            }}>
            - {offer.disc}%
          </Text>
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginVertical: 6,
        }}>
        <View>
          <View
            style={{
              flexDirection: 'row',
              // justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text style={{opacity: 0.5}}>{offer.price}</Text>
            <Text>
              {'  '} {offer.price - (offer.price * offer.disc) / 100} {'QR '}
            </Text>
          </View>
          <Text style={styles.text}> {offer.providerName}</Text>
          <Text style={styles.text}> Remember to add address</Text>
        </View>

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Rating imageSize={15} ratingBackgroundColor={'yellow'} />
          <View
            style={{
              height: 24,
              width: 31,
              backgroundColor: '#813CF2',
              justifyContent: 'center',
              alignItems: 'center',
              // margin: 5,
            }}>
            <Text style={{color: '#FFFFFF'}}>5.1</Text>
          </View>
        </View>
      </View>
      <View
        style={{
          width: 340,
          height: 42,
          backgroundColor: '#CFD8DC',
          marginVertical: 6,
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text
          style={{
            fontFamily: 'BigVestaRegular',
            fontStyle: 'normal',
            fontWeight: 'normal',
            fontSize: 12,
            color: '#2257E1',
          }}>
          كلام كدا بالعربي اسي خليني منه
        </Text>

        <Feather name="rss" size={24} color="#2257E1" />
      </View>
      <TouchableOpacity
        style={{
          backgroundColor: '#FF87EC',
          height: 32,
          width: 340,
          marginVertical: 6,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontFamily: 'BigVestaRegular',
            fontStyle: 'normal',
            fontWeight: 'normal',
            fontSize: 18,
            lineHeight: 17,
            color: '#FFFFFF',
          }}>
          {I18n.t('Book')}
        </Text>
      </TouchableOpacity>
    </View>
  );
});
