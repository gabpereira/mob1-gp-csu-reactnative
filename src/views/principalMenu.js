import React, { Component } from 'react';
import Styles from '../styles/loginStyle';


import { Text, View, ImageBackground } from 'react-native';

export default class PrincipalMenu extends Component{

    render() {
        return(
            <ImageBackground
                source={require('../pictures/space.jpg')}
                style={Styles.background}
            >
                <View>
                    <Text>menu principal</Text>
                </View>
            </ImageBackground>
        )
    }
}