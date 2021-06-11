import React, { Component } from 'react';
import Styles from '../styles/principalMenuStyle';

import { View, Text, ImageBackground, TouchableOpacity  } from 'react-native';

import {AuthContext} from '../components/context';
export default class PrincipalMenu extends Component{
    constructor(props){
        super(props)

        this.onPressButton = this.onPressButton.bind(this);
    }


    async onPressButton() {
        window.localStorage.removeItem('token');
        window.localStorage.removeItem('id_base');
        this.context.changeIsLogged(null);
    }

    render() {
        return(
            <ImageBackground
                source={require('../pictures/space.jpg')}
                style={Styles.background}
            >
                <View style={Styles.container}>
                    <View style={Styles.inputGroups}>
                        <Text style={Styles.label}>Prénom: gab Nom: per</Text>
                    </View>
                    <View>
                        <TouchableOpacity 
                            activeOpacity={0.95} 
                            style={Styles.buttonLogout} 
                            onPress={this.onPressButton}
                        >
                        <Text style={Styles.textLogout}>Se déconnecter</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        )
    }
}

PrincipalMenu.contextType = AuthContext;