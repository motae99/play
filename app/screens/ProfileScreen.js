import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Landing from "./Landing";

export default class ProfileScreen extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Landing />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    }
});
