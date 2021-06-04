import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Consult from '../views/consult';
import PrincipalMenu from '../views/principalMenu';
import Rapport from '../views/rapport';

const ConsultStack = createStackNavigator();
const ConsultStackScreen = ({ navigation }) => (
    <ConsultStack.Navigator >
        <ConsultStack.Screen name="Consulter" component={Consult} options={{ 
            title: "Consulter", 
            headerLeft: () => (
                <TouchableOpacity style={{ paddingLeft: 10, paddingTop: 5 }} onPress={() => navigation.openDrawer()}>
                    <Icon name='ios-menu' size={25} color='black' />
                </TouchableOpacity>
            ) }} />
    </ConsultStack.Navigator>
);

const RapportStack = createStackNavigator();
const RapportStackScreen = ({ navigation }) => (
    <RapportStack.Navigator >
        <RapportStack.Screen name="Rapporter" component={Rapport} options={{ 
            title: "Rapporter", 
            headerLeft: () => (
                <TouchableOpacity style={{ paddingLeft: 10, paddingTop: 5 }} onPress={() => navigation.openDrawer()}>
                    <Icon name='ios-menu' size={25} color='black' />
                </TouchableOpacity>
            ) }} />
    </RapportStack.Navigator>
);

const PrincipalMenuStack = createStackNavigator();
const PrincipalMenuStackScreen = ({ navigation }) => (
    <PrincipalMenuStack.Navigator >
        <PrincipalMenuStack.Screen name="Menu Principal" component={PrincipalMenu} options={{ 
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
    <Drawer.Navigator initialRouteName="Menu Principal" drawerType="back" drawerContentOptions={{ labelStyle: { fontSize: 20,}, activeBackgroundColor: "rgba(160, 187, 194, 0.5)", activeTintColor: "rgb(0, 94, 146)" }} drawerStyle={{ position: "absolute", top: 60 }} >
        <Drawer.Screen name="Consulter" component={ConsultStackScreen} />
        <Drawer.Screen name="Rapporter" component={RapportStackScreen} />
        <Drawer.Screen name="Menu Principal" component={PrincipalMenuStackScreen} />
    </Drawer.Navigator>
);