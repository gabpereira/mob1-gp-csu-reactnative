import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Button,
  Text,
  TextInput,
} from 'react-native';

export default class NoveCheck extends Component {
  constructor(props) {
    super(props);

    this.updateNovaBulb = this.updateNovaBulb.bind(this);

    this.state = {
      start: this.props.data.start || 0,
      end: this.props.data.end || 0,
    };
  }

  async updateNovaBulb() {
    let token = this.props.token;
    fetch(this.props.api + 'novacheck', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      },
      body: JSON.stringify({
        nova_id: this.props.data.nova_id,
        drug_id: this.props.data.drug_id,
        drugsheet_id: this.props.data.drugsheet_id,
        date: this.props.data.date,
        start: this.state.start,
        end: this.state.end,
      })
    })
    .then(function(response) {
      if(response.ok) {
        alert("Changement réussi");
      }
      else {
        console.log('Mauvaise réponse du réseau');
      }
    })
    .catch(function(error) {
      console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message);
    });
  }

  formatDate = (val) => {
    var d = new Date(val);

    var dd = d.getDate();
    var mm = d.getMonth() + 1;
    var yyyy = d.getFullYear();

    return ("0" + dd).slice(-2) + '/' + ("0" + mm).slice(-2) + '/' + yyyy;
  }

  handleText(input, value) {
    this.setState({
      [input]: value
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.label}>De {this.props.data.drug} de la nova {this.props.data.nova}</Text>
        <Text style={styles.label}>pour le {this.formatDate(this.props.data.date)}</Text>
        <Text style={styles.label}>
          Matin: <TextInput
            style={styles.input}
            onChangeText={(text) => this.handleText("start", text)}
            value={this.state.start}
          />
          </Text>
          <Text style={styles.label}>
          Soir: <TextInput
            style={styles.input}
            onChangeText={(text) => this.handleText("end", text)}
            value={this.state.end}
          />
        </Text>
        <Button
          onPress={this.updateNovaBulb}
          title="Envoyer"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    borderColor: "black",
    borderWidth: 1,
    marginVertical:10,
    borderColor: 'transparent',
    borderRadius: 10,
  },
  input: {
    borderColor: "white",
    borderWidth:1,
    color: 'white',
  },
  label: {
    flex: 0,
    fontSize: 15,
    paddingRight: 10,
    color: 'white',
},
});