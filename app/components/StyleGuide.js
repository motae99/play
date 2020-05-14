import {Platform, StyleSheet, Text} from 'react-native';
import * as RNLocalize from 'react-native-localize';

console.log(RNLocalize.getLocales().isRTL);
// class MyAppHeaderText extends Component {
//   render() {
//     return (
//       <MyAppText>
//         <Text style={{ fontSize: 20 }}>
//           {this.props.children}
//         </Text>
//       </MyAppText>
//     );
//   }
// }

const StyleGuide = {
  spacing: 8,
  palette: {
    primary: '#3D5A80',
    backgroundPrimary: '#98C1D9',
    background: '#f2f2f2',
    border: '#f2f2f2',
  },
  fontFamily: 'BigVestaRegular',
  // {
  //   // ...Platform.select({
  //   //   ios: {fontFamily: 'BigVestaRegular'},
  //   //   android: {fontFamily: 'BigVestaRegular'},
  //   // }),
  // },

  typography: {
    body: {
      fontSize: 17,
      lineHeight: 20,
      ...Platform.select({
        ios: {fontFamily: 'Arial'},
        android: {fontFamily: 'Arial'},
      }),
    },
    callout: {
      fontSize: 16,
      lineHeight: 20,
      ...Platform.select({
        ios: {fontFamily: 'Arial'},
        android: {fontFamily: 'Roboto'},
      }),
    },
    caption: {
      fontSize: 11,
      lineHeight: 13,
      ...Platform.select({
        ios: {fontFamily: 'Arial'},
        android: {fontFamily: 'Roboto'},
      }),
    },
    footnote: {
      fontSize: 13,
      lineHeight: 18,
      ...Platform.select({
        ios: {fontFamily: 'Arial'},
        android: {fontFamily: 'Roboto'},
      }),
      color: '#999999',
    },
    headline: {
      fontSize: 17,
      lineHeight: 22,
      fontFamily: 'SFProText-Semibold',
    },
    subhead: {
      fontSize: 15,
      lineHeight: 20,
      fontFamily: 'SFProText-Bold',
    },
    title1: {
      fontSize: 34,
      lineHeight: 41,
      fontFamily: 'SFProText-Bold',
    },
    title2: {
      fontSize: 28,
      lineHeight: 34,
      fontFamily: 'SFProText-Bold',
    },
    title3: {
      fontSize: 22,
      lineHeight: 26,
      fontFamily: 'SFProText-Bold',
    },
  },
};

export default StyleGuide;
