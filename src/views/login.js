import React, { Component } from 'react';
import Styles from '../styles/loginStyle';
import { Picker } from '@react-native-picker/picker';
//import inputRegister from '../components/inputRegister'
import { Text, View, TextInput, ImageBackground, Button } from 'react-native';

import API from '../../api/Api'
export default class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            bases: new Array()
        }
    }

    componentDidMount(){
        API.get('bases')
        .then(res => {
            this.setState({bases: res.data});
            console.log(this.state.bases);
        })
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
                        <Text style={Styles.label}>Bases:</Text>
                        <Picker style={{marginTop: 10}}>
                            {this.state.bases.map(base =>
                                <Picker.Item label={base.name} value={base.id} />    
                            )}
                        </Picker>
                    </View>
                    <Button title="Se connecter" />
                </View>
            </ImageBackground>
        )
    }
}