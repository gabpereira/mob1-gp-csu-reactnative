import React, { Component } from 'react';
import Styles from '../styles/principalMenuStyle';

import { Button, View, Text, ImageBackground, StyleSheet, TouchableOpacity  } from 'react-native';
import API from '../../api/Api';

export default class PrincipalMenu extends Component{
    constructor(props){
        super(props)
    }
    /*state = {
        user: [],
    }

    componentDidMount() {
        axios.get(`http://localhost:8000/api/user`).then(res => {
            const user = res.data; this.setState({user})
        })
    }*/

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
                            onPress={() => {
                                localStorage.removeItem('token');
                                localStorage.removeItem('nav');
                                let userToken = localStorage.getItem('token')
                                this.props.auth(userToken)
                            }}
                        >
                            <Text style={Styles.textLogPout}>Se déconnecter</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        )
    }
}