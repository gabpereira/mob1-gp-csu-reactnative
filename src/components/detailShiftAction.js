import React, { Component } from 'react';

import {StyleSheet, View,Text,FlatList, ImageBackground} from 'react-native';

import Styles from '../styles/loginStyle';

import { AuthContext } from '../components/context'; 

import Toast from 'react-native-toast-message';
import errorManage from './errorManagement';

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

    let connection_success = true;

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
        connection_success = false;
        Toast.show(errorManage(response.status));
      }
    })
    .then(function(data){
      if (connection_success){
        return data.data;
      }
    })
    .catch(function() {
      connection_success = false;
      Toast.show(errorManage());
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