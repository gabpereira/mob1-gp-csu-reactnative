import React, { Component } from 'react';
import Styles from '../styles/loginStyle';

import { View, ImageBackground, Button, FlatList, Text } from 'react-native';
import Grid from '@material-ui/core/Grid';

import {AuthContext} from '../components/context';

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
        let base_id = this.context.base_id; console.log(base_id);

        let checks =  await fetch(this.api + 'missingchecks/' + base_id, {
            method: 'GET',
            headers: {'Authorization': 'Bearer ' + token},
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
                            <Text>pharma</Text>
                            : null 
                        }
                        {this.state.show == "nova" ? this.state.nova.length <= 0 ? <Text style={Styles.label}>Il n'y a aucune information</Text> :
                            <Text>nova</Text>
                            : null
                        }
                    </View>
                </View>
            </ImageBackground>
        )
    }
}

Rapport.contextType = AuthContext;