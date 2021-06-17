import React, { Component } from 'react';
import Styles from '../styles/loginStyle';
import { Picker } from '@react-native-picker/picker';
import { Text, View, TextInput, ImageBackground, Button } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {AuthContext} from '../components/context';
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
            connection_fail: false,
        }
    }

    async _onPressButton() {
        let str_api = 'http://127.0.0.1:8000/api/';
        let initials = this.state.initials;
        let password = this.state.password;
        let base_name =  this.state.base_name;
        let base_id = this.state.base_id;
        let connection_fail = false;
    
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
            connection_fail = true;
          }
        })
        .then(function(data){
          return data.token;
        })
        .catch(function(error) {
          console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message);
        });
        if (!connection_fail) {
            this.setState({
              connection_fail: false
            });
        this.context.changeIsLogged(token);
        this.context.changeBase_name(base_name);
        this.context.changeBase_id(base_id);
        }
        else {
            this.setState({
              connection_fail: true
            });
        }
    }

    async getBases(){
        let str_api = 'http://127.0.0.1:8000/api/';
    
        let bases =  await fetch(str_api + 'bases', {
          method: 'GET',
        })
        .then(function(response) {
          if(response.ok) {
            return response.json();
          }
          else {
            console.log('Mauvaise réponse du réseau');
          }
        })
        .then(function(data){
          return data;
        })
        .catch(function(error) {
          console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message);
        });

        this.setState({
            bases: bases
        });
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
                {this.state.connection_fail ? <Text style={Styles.error}>Login ou mot de passe incorrect</Text> : null}
                    <View style={Styles.inputGroups}>
                        <Text style={Styles.label}>Initiales:</Text>
                        <TextInput style={Styles.textInput} maxLength={3} placeholderTextColor="rgb(180, 180, 180)" placeholder="gab" onChangeText={(text) => this.handleText("initials", text)}/>
                    </View>
                    <View style={Styles.inputGroups}>
                        <Text style={Styles.label}>Mdp:</Text>
                        <TextInput style={Styles.textInput} placeholderTextColor="rgb(180, 180, 180)" placeholder="mot de passe" onChangeText={(text) => this.handleText("password", text)} secureTextEntry={true}/>
                        <Icon name="ios-eye-off-outline" size={20} color="white" />
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