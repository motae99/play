import React from "react";
import { ScrollView, SafeAreaView, StatusBar, Text, View } from "react-native";
// import { Text, Asset, DangerZone } from "expo";
import Animated from "react-native-reanimated";

// import { Apps, Position, App as AppModel } from "./components/Model";
import App from "./components/App";
import AppModal from "./components/AppModal";

// const { Animated } = DangerZone;
const { Value } = Animated;

const app = [
  {
    id: 0,
    title: "Namaste",
    subtitle: "Best Yoga apps for the summer",
    source: require("./assets/images/yoga.jpg"),
    content: "",
  },
  {
    id: 1,
    title: "Get Fit",
    subtitle: "Wear it while you work out",
    source: require("./assets/images/fitness.jpg"),
    content: "",
  },
  {
    id: 2,
    title: "Classic Games",
    subtitle: "They never get old",
    source: require("./assets/images/chess.jpg"),
    content: "",
  },
];

// interface AppProps {}
// interface AppState {
//   ready: boolean;
//   modal: AppModalProps | null
// }

export default class extends React.PureComponent{
  activeAppId = new Value(-1);

  state = {
    ready: false,
    modal: null,
  };

  async componentDidMount() {
    // await Promise.all(apps.map(app => Asset.loadAsync(app.source)));
    this.setState({ ready: true });
  }

  open = (app, position) => {
    this.activeAppId.setValue(app.id);
    this.setState({ modal: { app, position } });
  }

  close = () => {
    this.activeAppId.setValue(-1);
    this.setState({ modal: null });
  }

  render() {
    const { open, close, activeAppId } = this;
    const { ready, modal } = this.state;
    if (ready) {
      return (
        <Text > Loading </Text>
      );
    }
    return (
      <View>
        <StatusBar
          barStyle="dark-content"
        />
        <SafeAreaView />
        <ScrollView>
          {
            apps.map(app => (
              <App
                key={app.id}
                {...{ app, open, activeAppId }}
              />
            ))
          }
        </ScrollView>
        {
          modal !== null && (
            <AppModal {...modal} {...{ close }} />
          )
        }
      </View>
    );
  }
}
