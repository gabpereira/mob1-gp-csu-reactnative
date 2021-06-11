import React, { Component } from 'react';
import Styles from '../styles/loginStyle';


import { Text, View, ImageBackground } from 'react-native';

export default class Rapport extends Component{

    render() {
        return(
            <ImageBackground source={require('../pictures/space.jpg')} style={Styles.background}>
                <View>
                    <Text>Rapport</Text>
                </View>
            </ImageBackground>
        )
    }
}