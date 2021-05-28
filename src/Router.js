import React, { Component } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { DrawerScreen } from './components/drawerscreens';

export default class Router extends Component {
    render() {
        return(
            <NavigationContainer>
                <DrawerScreen />
            </NavigationContainer>
        )
    }
}