import React, { Component } from 'react';
import Styles from '../styles/loginStyle';


import { Text, View, ImageBackground } from 'react-native';

export default class Consult extends Component{

    render() {
        return(
            <ImageBackground
                source={require('../pictures/space.jpg')}
                style={Styles.background}
            >
                <View>
                    <Text>Consult</Text>
                </View>
            </ImageBackground>
        )
    }
}