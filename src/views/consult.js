import React, { Component } from 'react';
import Styles from '../styles/loginStyle';

import { View, ImageBackground, Button, FlatList, Text } from 'react-native';
import Grid from '@material-ui/core/Grid';

import {AuthContext} from '../components/context';

export default class Consult extends Component{
    constructor(props){
        super(props)

        this.getReports = this.getReports.bind(this);

        this.api = 'http://127.0.0.1:8000/api/';

        this.state = {
            shift: [],
            drug: [],
            show: "",
        };
    }

    async getReports(){
        let token = this.context.token;
    
        let reports =  await fetch(this.api + 'reports', {
          method: 'GET',
          headers: {'Authorization': 'Bearer ' + token},
        })
        .then(function(response) {
          if(response.ok) {
            return response.json();
          }
          else {
            console.log('response');
          }
        })
        .then(function(data){
          return data;
        })
        .catch(function(error) {
          console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message);
        });

        this.setState({
            shift: reports ? reports.shift : [],
            drug: reports ? reports.drug : [],
        });
    }

    showShift = () => {
        this.setState({
          show: "shift"
        });
    }
    
    showDrug = () => {
        this.setState({
          show: "drug"
        });
    }
    
    componentDidMount () {
        this.getReports();
    }

    render() {
        return(
            <ImageBackground
                source={require('../pictures/space.jpg')}
                style={Styles.background}
            >
                <View>
                    <Grid container spacing={3}>
                        <Grid item xs={6}>
                            <Button title="Garde" onPress={this.showShift}/>
                        </Grid>
                        <Grid item xs={6}>
                            <Button title="Stup" onPress={this.showDrug}/>
                        </Grid>
                    </Grid>
                    <View>
                        {this.state.show == "shift" ? this.state.shift.length <= 0 ? <Text style={Styles.label}>Il n'y a aucune information</Text> :
                            <FlatList
                                data={this.state.shift}
                                renderItem={({item}) => <Text style={Styles.label}>Le {item.date} à {item.base}</Text>}
                                keyExtractor={item => item.id.toString()}
                            />
                            : null 
                        }
                        {this.state.show == "drug" ? this.state.drug.length <= 0 ? <Text style={Styles.label}>Il n'y a aucune information</Text> :
                            <FlatList
                                data={this.state.drug}
                                renderItem={({item}) => <Text style={Styles.label}>Semaine {item.week} à {item.base}</Text>}
                                keyExtractor={item => item.id.toString()}
                            />
                            : null
                        }
                    </View>
                </View>
            </ImageBackground>
        )
    }
}

Consult.contextType = AuthContext;