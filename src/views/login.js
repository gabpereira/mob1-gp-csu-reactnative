import React, { Component } from 'react';
import Styles from '../styles/loginStyle';
//import inputRegister from '../components/inputRegister'
import { Text, View, TextInput, ImageBackground, Button } from 'react-native';
//import axios from 'axios';

export default class Login extends Component{
    constructor(props){
        super(props);
        this.state ={value: 'payerne'};

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    render() {
        return(
            <ImageBackground
                source={require('../pictures/space.jpg')}
                style={Styles.background}
            >
                <View style={Styles.container}>
                    <View style={Styles.inputGroups}>
                        <Text style={Styles.label}>Initiales:</Text>
                        <TextInput
                            style={Styles.textInput}
                            placeholderTextColor="rgb(180, 180, 180)"
                            placeholder="gab" 
                        />
                    </View>
                    <View style={Styles.inputGroups}>
                        <Text style={Styles.label}>Mdp:</Text>
                        <TextInput
                            style={Styles.textInput}
                            placeholderTextColor="rgb(180, 180, 180)"
                            placeholder="mot de passe" 
                        />
                    </View>
                    <View style={Styles.inputGroups}>
                        <label>
                            Base
                            <select value={this.state.value} onChange={this.handleChange}>
                                <option value="valleDeJoux">La Vallée-de-Joux</option>
                                <option value="payerne">Payerne</option>
                                <option value="saintloup">Saint-Loup</option>
                                <option value="steCroix">Ste-Croix</option>
                                <option value="yverdon">Yverdon</option>
                            </select>
                        </label>
                    </View>
                    <Button title="Se connecter" />
                </View>
            </ImageBackground>
        )
    }
}