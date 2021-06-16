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
          base: {
            id: localStorage.getItem('base_id') ?? "",
            name: localStorage.getItem('base_name') ?? "",
          }
        };
      }
    
      changeIsLogged = (val) => {
        this.setState({
          token: val,
        });
        localStorage.setItem("token", val);
      }

      changeBase = (id, name) => {
        this.setState({
          base: {
            id: id,
            name: name,
          },
        });
        localStorage.setItem("base_id", id);
        localStorage.setItem("base_name", name);
      }

    render() {
        return(
            <AuthContext.Provider value={{ token: this.state.token, base: this.state.base, changeIsLogged: this.changeIsLogged, changeBase: this.changeBase,}}>
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