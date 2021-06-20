import React, { Component } from 'react';
import Styles from '../styles/loginStyle';
import { Picker } from '@react-native-picker/picker';
import { Text, View, TextInput, ImageBackground, Button } from 'react-native';
import {AuthContext} from '../components/context';
import errorManage from  "../components/errorManagement";
import Toast from 'react-native-toast-message';
export default class Login extends Component{
    constructor(props){
        super(props);

        this.getBases = this.getBases.bind(this);
        this._onPressButton = this._onPressButton.bind(this);

        this.updateBase = this.updateBase.bind(this);
        this.getBaseName = this.getBaseName.bind(this);

        this.state = {
            bases: [],
            base_name: '',
            base_id: '',
            initials: '',
            password: '',
            connection_success: true,
        }
    }

    async _onPressButton() {
        let str_api = 'http://127.0.0.1:8000/api/';
        let initials = this.state.initials;
        let password = this.state.password;
        let base_name =  this.state.base_name;
        let base_id = this.state.base_id;
        let connection_success = true;
    
        let token = await fetch(str_api + 'gettoken', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({initials: initials, password: password})
        })
        .then(function(response) {
          if(response.ok) {
            return response.json();
          }
          else {
            connection_success = false;
            Toast.show(errorManage(response.status));
          }
        })
        .then(function(data){
          if (connection_success)
          {
            return data.token;
          }
        })
        .catch(function() {
          connection_success = false;
          Toast.show(errorManage());
        });
        if (connection_success) {
            this.setState({
              connection_success: true
            });
            Toast.show({text1: 'Vous êtes connectez!'});
          this.context.changeIsLogged(token);
          this.context.changeBase_name(base_name);
          this.context.changeBase_id(base_id);
        }
        else {
            this.setState({
              connection_success: false
            });
        }
    }

    async getBases(){
        let str_api = 'http://127.0.0.1:8000/api/';
        let connection_success = true;
    
        let bases =  await fetch(str_api + 'bases', {
          method: 'GET',
        })
        .then(function(response) {
          if(response.ok) {
            return response.json();
          }
          else {
            connection_success = false;
            Toast.show(errorManage(response.status));
          }
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

        if (connection_success) {
          this.setState({
              bases: bases
          });
        }
    }

    handleText(input, value) {
            this.setState({
                [input]: value
            });
    }
        
    componentDidMount () {
            this.getBases();
    }

    getBaseName(val) {
      let baseName = "";
      this.state.bases.map((base) => {
        if (val == base.id) {
          baseName = base.name;
        }else{
        }
      });
      return baseName;
    }
  
    updateBase = (val) => {
      this.setState({base_name: this.getBaseName(val), base_id: val});
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
                        <TextInput style={Styles.textInput} maxLength={3} placeholderTextColor="rgb(180, 180, 180)" placeholder="gab" onChangeText={(text) => this.handleText("initials", text)}/>
                    </View>
                    <View style={Styles.inputGroups}>
                        <Text style={Styles.label}>Mdp:</Text>
                        <TextInput style={Styles.textInput} placeholderTextColor="rgb(180, 180, 180)" placeholder="mot de passe" onChangeText={(text) => this.handleText("password", text)} secureTextEntry={true}/>
                    </View>
                    <View style={Styles.inputGroups}>
                        <Text style={Styles.label}>Bases:</Text>
                          <Picker style={{marginTop: 10}} selectedValue={this.state.base} onValueChange={this.updateBase}>
                          {this.state.bases == [] ? <Text>nothing</Text> : (
                          this.state.bases.map(base =>
                            <Picker.Item label={base.name} value={base.id} key={base.id}/>
                            )
                          )}
                        </Picker>
                    </View>
                    <Button title="Se connecter"  onPress={this._onPressButton} />
                </View>
            </ImageBackground>
        )
    }
}

Login.contextType = AuthContext;