import React, { Component } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { DrawerScreen } from './components/drawerscreens';
import { AuthScreen } from './components/authscreen';

import {AuthContext} from './components/context';

export default class Router extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          is_logged : false,
        };
      }
    
      changeIsLogged = (val) => {
        this.setState({
          is_logged: val,
        })
      }

    render() {
        return(
            <AuthContext.Provider value={{ changeIsLogged: this.changeIsLogged}}>
                <NavigationContainer>
                    {this.state.is_logged ? (
                        <DrawerScreen />
                    ) : (
                        <AuthScreen />
                    )}
                </NavigationContainer>
            </AuthContext.Provider>
        )
    }
}