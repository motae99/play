import React from "react";
import { StyleSheet, View, ScrollView, Text } from "react-native";
import Animated from "react-native-reanimated";
import { TAB_COLUMNS, TAB_SIZE, tabs } from "./Tab";
import SortableTab from "./SortableTab";

import { useNavigation } from "react-navigation-hooks";


const { Value } = Animated;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1c1d1e"
  },
  button: {
    position: 'relative',
    // bottom: 100,
    // right: 20,
    height: 50,
    width: 100,
    backgroundColor: "green",
    color: "white"
  }
});



export default () => {
  const offsets = tabs.map((_, index) => ({
    x: new Value(index % TAB_COLUMNS === 0 ? 0 : TAB_SIZE),
    y: new Value(Math.floor(index / TAB_COLUMNS) * TAB_SIZE)
  }));

  // const { goBack, getParam, navigate } = useNavigation();
  // const [files, setFiles] = useState(getParam("data"));

  return (
    <View style={styles.container}>
      {tabs.map((tab, index) => (
        <SortableTab key={tab.id} {...{ tab, index, offsets }} />
      ))}
      <Text style={styles.button}>button here</Text>
    </View>
  );
};
