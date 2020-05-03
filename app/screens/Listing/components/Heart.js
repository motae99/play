import React, {useRef, useContext, useState} from 'react';
import {StyleSheet, TouchableWithoutFeedback} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Svg, {Path} from 'react-native-svg';
// import {ListingContext} from '../../../context/ListingContext';

const styles = StyleSheet.create({
  // icon: {
  //   color: 'white',
  //   // opacity: 0.5,
  // },
});

const Heart = item => {
  // const {heart} = useContext(ListingContext);
  const [hearted, toggleHeart] = useState(item.item.isHearted);
  const handleViewRef = useRef(null);
  const bounce = () => {
    handleViewRef.current.bounce(300).then(endState => {
      toggleHeart(!hearted);
      // heart(item.item);
    });
  };

  // <Animatable.View
  //               animation={data.isHearted ? 'bounceIn' : 'pulse'}
  //               direction={data.isHearted ? 'alternate' : null}
  //               delay={data.isHearted ? 2000 : null}
  //               iterationCount={!data.isHearted ? 'infinite' : null}
  //               easing={!data.isHearted ? 'ease-out' : null}
  //               style={styles.heart}>
  //               <Feather
  //                 name="heart"
  //                 size={35}
  //                 color={data.isHearted ? 'red' : '#ffff'}
  //               />
  //             </Animatable.View>

  return (
    <TouchableWithoutFeedback onPress={() => bounce()}>
      <Animatable.View ref={handleViewRef} useNativeDriver={true}>
        <Svg
          width={24}
          height={24}
          viewBox="0 0 24 24"
          fill={hearted ? 'rgba(249, 41, 145, 0.8)' : 'rgba(0, 0, 0, 0.3)'}
          stroke="white"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-heart">
          <Path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
        </Svg>
      </Animatable.View>
    </TouchableWithoutFeedback>
  );
};

export default Heart;
