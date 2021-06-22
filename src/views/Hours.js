import React, { Component } from 'react';
import Styles from '../styles/hoursStyle';
import { Text, View, ImageBackground, Button } from 'react-native';
import Grid from '@material-ui/core/Grid';

import {AuthContext} from '../components/context';

export default class hours extends Component{
    constructor(props){
        super(props)

        this.api = 'http://127.0.0.1:8000/api/';

        this.getHours = this.getHours.bind(this);

        this.state = {
            hours: [],
            type: [],
            worktime: [],
        };
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

        let worktime = this.state.hours.worktime;
        this.setState({
            hours: hours,
            worktime: worktime,
        });
    }

    componentDidMount () {
        this.getHours();
    }

    render() {
        return(
            <ImageBackground
            source={require('../pictures/space.jpg')}
            style={Styles.background}
            >
                <View>
                    <View style={Styles.container}>
                        <Text style={Styles.text}>Il vous reste {this.context.sumConfirmations} Horaires à confirmer</Text>
                    </View>
                    { this.state.hours.map((hour) => (
                         hour.confirmation == null || hour.confirmation == 0 && (
                            <View style={Styles.container}>
                                <Grid container spacing={3}>
                                    <Grid item xs={6}>
                                        <Text style={Styles.text}>{hour.date}</Text>
                                    </Grid>
                                    <Grid item xs={6}>
                                        { hour.confirmation == 0 &&(<Text style={Styles.text}>A discuter</Text>)}
                                        { hour.confirmation == null &&(<Text style={Styles.text}>Inconnu</Text>)}
                                        { hour.confirmation == 1 &&(<Text style={Styles.text}>Confirmé</Text>)}
                                    </Grid>
                                </Grid>
                                <Text style={Styles.text}>Votre code de travail sera {hour.worktime.type}</Text>
                                <Grid container spacing={3}>
                                    <Grid item xs={6}>
                                    <Button title='Confirmé'/>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Button title='A discuté' />
                                    </Grid>
                                </Grid>
                            </View>
                        )
                    ))}
                </View>
            </ImageBackground>
        )
    }
} 

hours.contextType = AuthContext;