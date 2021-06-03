import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Login from '../views/login';
import PrincipalMenu from '../views/principalMenu';

const LoginStack = createStackNavigator();
const LoginStackScreen = ({ navigation }) => (
    <LoginStack.Navigator >
        <LoginStack.Screen name="Login" component={Login} options={{ 
            title: "Login", 
            headerLeft: () => (
                <TouchableOpacity style={{ paddingLeft: 10, paddingTop: 5 }} onPress={() => navigation.openDrawer()}>
                    <Icon name='ios-menu' size={25} color='black' />
                </TouchableOpacity>
            ) }} />
    </LoginStack.Navigator>
);

const PrincipalMenuStack = createStackNavigator();
const PrincipalMenuStackScreen = ({ navigation }) => (
    <PrincipalMenuStack.Navigator >
        <PrincipalMenuStack.Screen name="PrincipalMenu" component={PrincipalMenu} options={{ 
            title: "Menu Principal", 
            headerLeft: () => (
                <TouchableOpacity style={{ paddingLeft: 10, paddingTop: 5 }} onPress={() => navigation.openDrawer()}>
                    <Icon name='ios-menu' size={25} color='black' />
                </TouchableOpacity>
            ) }} />
    </PrincipalMenuStack.Navigator>
);

const Drawer = createDrawerNavigator();
export const DrawerScreen = () => (
    <Drawer.Navigator initialRouteName="PrincipalMenu"
        drawerType="back"
        drawerContentOptions={{
            labelStyle: {
                fontSize: 20,
            },
            activeBackgroundColor: "rgba(160, 187, 194, 0.5)",
            activeTintColor: "rgb(0, 94, 146)"
        }}
        drawerStyle={{ position: "absolute", top: 60 }} >
        <Drawer.Screen name="Login" component={LoginStackScreen} />
        <Drawer.Screen name="PrincipalMenu" component={PrincipalMenuStackScreen} />
    </Drawer.Navigator>
);