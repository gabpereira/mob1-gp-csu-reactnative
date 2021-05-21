import React from 'react';
import { View } from 'react-native';
import Styles from './src/styles/appStyle'
import Login from './src/views/login';

export default function App() {
  return (
    <View style={Styles.container}>
        <Login />
    </View>
  );
}