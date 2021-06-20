import React, { Component } from 'react';
import { View, Button, Text, TextInput } from 'react-native';

import Toast from 'react-native-toast-message';
import errorManage from './errorManagement';

import styles from '../styles/checkStyle';
import Grid from '@material-ui/core/Grid';

export default class PharmaCheck extends Component {
	constructor(props) {
		super(props);
		this.state = { value: '' };
		this.onChange = this.onChange.bind(this);
		this.add = this.add.bind(this);
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
			<Text style={styles.label}>Du lot {this.props.data.batch_number} de {this.props.data.drug}</Text>
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
					disabled={!this.state.value}
					onPress={this.updatePharmaBulb}
					title="Envoyer"
					onClick={this.add}
				/>
		</View>
		);
	}
}

