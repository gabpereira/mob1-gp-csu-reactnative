import React, { Component } from 'react';
import { StyleSheet, View, Button, Text, TextInput } from 'react-native';

import Toast from 'react-native-toast-message';
import errorManage from './errorManagement';

export default class PharmaCheck extends Component {
	constructor(props) {
		super(props);

		this.updatePharmaBulb = this.updatePharmaBulb.bind(this);

		this.state = {
			start: this.props.data.start || 0,
			end: this.props.data.end || 0,
		};
	}

	async updatePharmaBulb() {
		let token = this.props.token;
		let success_message = "Modification faite : " + this.props.data.drug + " de la pharma " + this.props.data.pharma;

		fetch(this.props.api + 'pharmacheck', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + token,
			},
			body: JSON.stringify({
				batch_id: this.props.data.batch_id,
				drugsheet_id: this.props.data.drugsheet_id,
				date: this.props.data.date,
				start: this.state.start,
				end: this.state.end,
			})
		})
		.then(function(response) {
			if(response.ok) {
				Toast.show({
					type: 'success',
					text1: 'Modification réussi!',
					text2: success_message
				});
			}
			else {
				Toast.show(errorManage(response.status));
			}
		})
		.catch(function() {
			Toast.show(errorManage());
		});
	}

	formatDate = (val) => {
		var date = new Date(val);

		var dd = date.getDate();
		var mm = date.getMonth() + 1;
		var yyyy = date.getFullYear();

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
			<Text style={styles.label}>Du lot {this.props.data.batch_number} de {this.props.data.drug}</Text>
			<Text style={styles.label}>pour le {this.formatDate(this.props.data.date)}</Text>
			<Text style={styles.label}>
			Matin: <TextInput
				style={styles.input}
				onChangeText={(int) => this.handleText("start", int)}
				value={this.state.start}
			/>
			</Text>
			<Text style={styles.label}>
			Soir: <TextInput
				style={styles.input}
				onChangeText={(int) => this.handleText("end", int)}
				value={this.state.end}
			/>
			</Text>
			<Button
			onPress={this.updatePharmaBulb}
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