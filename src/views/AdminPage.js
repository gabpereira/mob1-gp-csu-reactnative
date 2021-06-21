import React, { Component } from 'react';
import Styles from '../styles/loginStyle';
import { Text, View } from 'react-native';

export default class adminPage extends Component{
    render() {
        return(
            <View style={Styles.inputGroups}>
                <Text style={Styles.label}>Admin</Text>
            </View>
        )
    }
}