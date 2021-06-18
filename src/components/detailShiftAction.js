import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Text,
  FlatList,
  ImageBackground
} from 'react-native';

import Styles from '../styles/loginStyle';

import { AuthContext } from '../components/context'; 

export default class DetailShiftAction extends Component {
  constructor(props) {
    super(props);

    this.loadShiftActions = this.loadShiftActions.bind(this);

    this.api = 'http://127.0.0.1:8000/api/';

    this.state = {
      shift_actions: [],
    };
  }

  async loadShiftActions(){
    let token = this.context.token;
    let id = this.props.route.params.id;

    let shift_actions = await fetch(this.api + 'myactionsinshift/' + id, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token,
      },
    })
    .then(function(response) {
      if(response.ok) {
        return response.json();
      }
      else {
        console.log(response);
      }
    })
    .then(function(data){
      return data.data;
    })
    .catch(function(error) {
      console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message);
    });

    this.setState({
      shift_actions: shift_actions,
    });
  }

  componentDidMount () {
    this.loadShiftActions();
  }

  render() {
    return (
      <ImageBackground
      source={require('../pictures/space.jpg')}
      style={Styles.background}
      >
        <View>
          <Text style={Styles.label}>{this.props.route.params.title}</Text>
          <View>
            {this.state.shift_actions.length <= 0 ? <Text style={Styles.label}>Aucune information</Text> :
              <FlatList
                data={this.state.shift_actions}
                renderItem={({item}) => <Text style={Styles.label}>{item.day ? "J" : "N"} {item.action} {item.at}</Text>}
                keyExtractor={item => item.id.toString()}
              />
            }
          </View>
        </View>
      </ImageBackground>
    );
  }
}

DetailShiftAction.contextType = AuthContext;

const styles = StyleSheet.create({

});