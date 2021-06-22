import React, { Component } from 'react';
import Styles from '../styles/principalMenuStyle';
import { View, Text, ImageBackground, TouchableOpacity  } from 'react-native';

import {AuthContext} from '../components/context';

import errorManage from  "../components/errorManagement";
import Toast from 'react-native-toast-message';
export default class PrincipalMenu extends Component{
    constructor(props){
        super(props)

        this.api = 'http://127.0.0.1:8000/api/';

        this.getUser = this.getUser.bind(this);
        this.getHours = this.getHours.bind(this);
        this.onPressButton = this.onPressButton.bind(this);

        this.state = {
            user: [],
            hours: [],
            sumConfirmations: '',
        };
    }

    async onPressButton() {
        localStorage.removeItem('token');
        localStorage.removeItem('base_id');
        localStorage.removeItem('base_name');
        this.context.changeIsLogged(null);
        Toast.show({text1: 'Vous êtes déconnectez!'});
    }

    async getUser(_this){
        let token = this.context.token;
        let connection_success = true;
    
        let user =  await fetch(this.api + 'user', {
            method: 'GET',
            headers: {'Authorization': 'Bearer ' + token},
        })
        .then(function(response) {
            if(response.ok) {
                return response.json();
            }
            else {
                connection_success = false;
				Toast.show(errorManage(response.status));            }
        })
        .then(function(data){
            if (connection_success)
			{
				return data;
			}
        })
        .catch(function() {
            connection_success = false;
			Toast.show(errorManage());
        });

        this.setState({
            user: user
        });
    }

    async getHours(_this){
        let token = this.context.token;
        let connection_success = true;
    
        let hours =  await fetch(this.api + 'unconfirmedworkplans', {
            method: 'GET',
            headers: {'Authorization': 'Bearer ' + token},
        })
        .then(function(response) {
            if(response.ok) {
                return response.json();
            }
            else {
                connection_success = false;
				Toast.show(errorManage(response.status));            }
        })
        .then(function(data){
            if (connection_success)
			{
				return data;
			}
        })
        .catch(function() {
            connection_success = false;
			Toast.show(errorManage());
        });

        this.setState({
            hours: hours
        });

        let sumConfirmations = "";
        this.state.hours.map((hour) => {
            if (hour.confirmation == 0) {
                sumConfirmations++;
            };
        });
        this.context.changeSumConfirmations(sumConfirmations);
    }

    handleText(input, value) {
        this.setState({
            [input]: value
        });
    }

    componentDidMount () {
        this.getUser();
        this.getHours();
    }

    render() {
        return(
            <ImageBackground
                source={require('../pictures/space.jpg')}
                style={Styles.background}
            >
                <View style={Styles.container}>
                    <View style={Styles.inputGroups}>
                        <Text style={Styles.label}>Prénom: {this.state.user.firstname}{'\n'}Nom: {this.state.user.lastname}</Text>
                    </View>
                    {this.context.sumConfirmations >= 1 &&(
                        <View>
                            <TouchableOpacity 
                                activeOpacity={0.95} 
                                style={Styles.buttonLogout} 
                                onPress={() => this.props.navigation.navigate('Horaires à confirmer')
                                }
                            >
                            <Text style={Styles.textLogout}>{this.context.sumConfirmations} Horaires à confirmer</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                    <View>
                        <TouchableOpacity 
                            activeOpacity={0.95} 
                            style={Styles.buttonLogout} 
                            onPress={this.onPressButton}
                        >
                        <Text style={Styles.textLogout}>{this.state.user.initials} Déconnexion</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        )
    }
}

PrincipalMenu.contextType = AuthContext;