import React, { Component } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { DrawerScreen } from './components/drawerscreens';
import { AuthScreen } from './components/authscreen';

import {AuthContext} from './components/context';

export default class Router extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          token : localStorage.getItem('token') ?? null,
          base: localStorage.getItem('id_base') ?? "",
        };
      }
    
      changeIsLogged = (val) => {
        this.setState({
          token: val,
        });
      }

      changeBase = (val) => {
        this.setState({
          base: val,
        });
      }

    render() {
        return(
            <AuthContext.Provider value={{ token: this.state.token, changeIsLogged: this.changeIsLogged, changeBase: this.changeBase,}}>
                <NavigationContainer>
                    {this.state.token ? (
                        <DrawerScreen />
                    ) : (
                        <AuthScreen />
                    )}
                </NavigationContainer>
            </AuthContext.Provider>
        )
    }
}