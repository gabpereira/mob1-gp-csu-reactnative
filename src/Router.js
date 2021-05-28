import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Login from './views/login';

const AppNavigator = createStackNavigator({
    Login: Login,
},
{
    initialRouteName: 'Login',
});

const Router = createAppContainer(AppNavigator);
export default Router;