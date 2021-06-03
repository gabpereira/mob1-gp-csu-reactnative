import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import Login from '../views/login';

const AuthStack = createStackNavigator();
export const AuthScreen = () => (
    <AuthStack.Navigator>
        <AuthStack.Screen name="Login" component={Login} options={{ header: () => null }} />
    </AuthStack.Navigator>
);