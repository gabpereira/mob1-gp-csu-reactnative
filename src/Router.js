import React, { Component } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { DrawerScreen } from './components/drawerscreens';
import { AuthScreen } from './components/authscreen';

import {AuthContext} from './components/context';
import Toast, {BaseToast} from 'react-native-toast-message';

export default class Router extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
			token : localStorage.getItem('token') != "null" ? localStorage.getItem('token') : null,
			base_name : localStorage.getItem('base_name') != "null" ? localStorage.getItem('token') : null,
			base_id : localStorage.getItem('base_id') != "null" ? localStorage.getItem('token') : null,
        };
    }
    
    changeIsLogged = (val) => {
        this.setState({
        	token: val,
        });
        localStorage.setItem("token", val);
    }

    changeBase_name = (val) => {
        this.setState({
          	base_name: val,
        });
        localStorage.setItem("base_name", val);
    }

    changeBase_id = (val) => {
        this.setState({
          	base_id: val,
        });
        localStorage.setItem("base_id", val);
    }

    render() {
        return(
            <AuthContext.Provider value={{ token: this.state.token, base_name: this.state.base_name, base_id: this.state.base_id, changeIsLogged: this.changeIsLogged, changeBase_name: this.changeBase_name, changeBase_id: this.changeBase_id}}>
                <NavigationContainer>
                    {this.state.token ? (
                        <DrawerScreen />
                    ) : (
                        <AuthScreen />
                    )}
                </NavigationContainer>
                <Toast ref={(ref) => Toast.setRef(ref)} />
            </AuthContext.Provider>
        )
    }
}