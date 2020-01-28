import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView
} from "react-native";

// class CLview extends React.PureComponent {
//   constructor(props) {
//     super(props);
//     this.state = {};
//   }
//   render() {
//     return (
//       <View>
//         <Text>t</Text>
//       </View>
//     );
//   }
// }

// export default CLview;

class CLview extends React.PureComponent {
  state = {};
  render() {
    const { data } = this.props;

    const date = data.date;
    const schedule = data.schedule;
    return (
      <ScrollView key={data.key} style={styles.date}>
        {data.schedule.map((time, i) => {
          return (
            <TouchableOpacity
              key={i}
              onPress={() => {
                console.log(
                  "selected time ====",
                  time,
                  "on this date=",
                  data.date
                );
              }}
            >
              <View style={styles.row}>
                <Text> {time}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    backgroundColor: "white",
    flexDirection: "row",
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17
  },
  date: {
    marginBottom: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.20)',
    // borderColor: "gray",
    // borderWidth: 1,
    borderRadius: 5,
    marginHorizontal: 20
  }
});

export default CLview;
