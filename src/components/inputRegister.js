import React, { Component } from 'react';
import Styles from '../styles/loginStyle';
import { Text, View, TextInput } from 'react-native';
//import axios from 'axios';

export default class inputRegister extends Component{
    render() {
        return(
            <View style={Styles.inputGroups}>
                <Text style={Styles.label}>{this.props.text}:</Text>
                <TextInput
                    style={Styles.textInput}
                    placeholderTextColor="rgb(180, 180, 180)"
                    placeholder={this.props.placeholder} 
                />
            </View>
        )
    }
}