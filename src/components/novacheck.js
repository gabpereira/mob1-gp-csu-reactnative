import React, { Component } from 'react';

import { View, Button, Text, TextInput, } from 'react-native';
import errorManage from './errorManagement';
import Toast from 'react-native-toast-message';
import styles from '../styles/checkStyle';
import Grid from '@material-ui/core/Grid';

export default class NoveCheck extends Component {
	constructor(props) {
		super(props);
		this.state = { value: '' };
		this.onChange = this.onChange.bind(this);
		this.add = this.add.bind(this);
		this.updateNovaBulb = this.updateNovaBulb.bind(this);

		this.state = {
			start: this.props.data.start || 0,
			end: this.props.data.end || 0,
		};
	}

	async updateNovaBulb() {
		let token = this.props.token;
		let success_message = "Modification faite : " + this.props.data.drug + " de la nova " + this.props.data.nova;

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

	add() {
		this.props.onButtonClick(this.state.value);
		this.setState({ value: '' });
	}
	
	onChange(e) {
		this.setState({ value: e.target.value });
	}

	render() {
		return (
		<View style={styles.container}>
			<Text style={styles.label}>De {this.props.data.drug} de la nova {this.props.data.nova}</Text>
			<Text style={styles.label}>pour le {this.formatDate(this.props.data.date)}</Text>
			<Grid container spacing={3}>
					<Grid item xs={6}>
						<Text style={styles.label}>
						Matin: <TextInput
							style={styles.input}
							onChangeText={(int) => this.handleText("start", int)}
							value={this.state.start}
							onChange={this.onChange}
						/>
						</Text>
					</Grid>
					<Grid item xs={6}>
						<Text style={styles.label}>
						Soir: <TextInput
							style={styles.input}
							onChangeText={(int) => this.handleText("end", int)}
							value={this.state.end}
							onChange={this.onChange}
						/>
						</Text>
					</Grid>
				</Grid>
			<Button
				style={styles.button}
				disabled={!this.state.value}
				onPress={this.updateNovaBulb}
				title="Envoyer"
				onClick={this.add}
			/>
		</View>
		);
	}
}