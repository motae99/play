import React from "react";
import DetailView from './DetailView';
import { withNavigation } from 'react-navigation';


export default class Details extends React.Component {
    render() { 
        return ( 
            <DetailView navigation={this.props.navigation}/> 
        ) 
    }
}

// withNavigation(List)