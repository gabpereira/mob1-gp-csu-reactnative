import React, { Component } from 'react';
import Styles from '../styles/loginStyle';
import { Text, View, ImageBackground } from 'react-native';

export default class hours extends Component{
    render() {
        return(
            <ImageBackground
            source={require('../pictures/space.jpg')}
            style={Styles.background}
            >
                <View>
                    <Text style={Styles.label}>Hours</Text>
                </View>
            </ImageBackground>
        )
    }
} 