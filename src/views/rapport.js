import React, { Component } from 'react';
import Styles from '../styles/loginStyle';
import { View, ImageBackground, Button, FlatList, Text } from 'react-native';
import Grid from '@material-ui/core/Grid';

import NovaCheck from "../components/Novacheck";
import PharmaCheck from "../components/Pharmacheck";

import {AuthContext} from '../components/context';

import Toast from 'react-native-toast-message';
import errorManage from '../components/errorManagement';

export default class Rapport extends Component{

    constructor(props){
        super(props)

        this.getChecks = this.getChecks.bind(this);

        this.api = 'http://127.0.0.1:8000/api/';

        this.state = {
            pharma: [],
            nova: [],
            show: "",
        };
    }

    async getChecks(){
        let token = this.context.token;
        let base_id = this.context.base_id;

        let connection_success = true;

        let checks =  await fetch(this.api + 'missingchecks/' + base_id, {
            method: 'GET',
            headers: {'Authorization': 'Bearer ' + token},
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
            if (connection_success){
                return data;
            }
        })
        .catch(function() {
            connection_success = false;
            Toast.show(errorManage());
        });

        this.setState({
            pharma: checks ? checks.pharma : [],
            nova: checks ? checks.nova : [],
        });
    }

    showPharma = () => {
        this.setState({
            show: "pharma"
        });
    }
    
    showNova = () => {
        this.setState({
            show: "nova"
        });
    }

    componentDidMount () {
        this.getChecks();
    }

    render() {
        return(
            <ImageBackground source={require('../pictures/space.jpg')} style={Styles.background}>
                <View>
                    <Grid container spacing={3}>
                        <Grid item xs={6}>
                            <Button title="Pharmacheck" onPress={this.showPharma}/>
                        </Grid>
                        <Grid item xs={6}>
                            <Button title="NovaCheck" onPress={this.showNova}/>
                        </Grid>
                    </Grid>
                    <View>
                        {this.state.show == "pharma" ? this.state.pharma.length <= 0 ? <Text style={Styles.label}>Il n'y a aucune information</Text> :
                            <FlatList
                            data={this.state.pharma}
                            renderItem={({item}) => <PharmaCheck data={item} api={this.api} token={this.context.token}/>}
                            keyExtractor={(item, index) => index.toString()}
                            />
                            : null 
                        }
                        {this.state.show == "nova" ? this.state.nova.length <= 0 ? <Text style={Styles.label}>Il n'y a aucune information</Text> :
                            <FlatList
                                data={this.state.nova}
                                renderItem={({item}) => <NovaCheck data={item} api={this.api} token={this.context.token}/>}
                                keyExtractor={(item, index) => index.toString()}
                            />
                            : null
                        }
                    </View>
                </View>
            </ImageBackground>
        )
    }
}

Rapport.contextType = AuthContext;