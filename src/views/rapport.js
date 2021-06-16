import React, { Component } from 'react';
import Styles from '../styles/loginStyle';

import { View, ImageBackground, Button, FlatList, Text } from 'react-native';
import Grid from '@material-ui/core/Grid';

export default class Rapport extends Component{

    constructor(props){
        super(props)

        this.api = 'http://127.0.0.1:8000/api/';

        this.state = {
            pharma: [],
            nova: [],
            show: "",
        };
    }

    showPharma = () => {
        this.setState({
          show: "Pharmacheck"
        });
    }
    
    showNova = () => {
        this.setState({
          show: "NovaCheck"
        });
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
                        {this.state.show == "Pharmacheck" ? this.state.pharma.length <= 0 ? <Text style={Styles.label}>Il n'y a aucune information</Text> :
                            <FlatList
                                data={this.state.shift}
                                renderItem={({item}) => <Text style={Styles.label}>Le {item.date} à {item.base}</Text>}
                                keyExtractor={item => item.id.toString()}
                            />
                            : null 
                        }
                        {this.state.show == "NovaCheck" ? this.state.nova.length <= 0 ? <Text style={Styles.label}>Il n'y a aucune information</Text> :
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