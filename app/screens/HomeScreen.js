import React from "react";
import Home from './Home';

export default class HomeScreen extends React.Component {
    render() { return ( <Home navigation={this.props.navigation} /> ) }
}