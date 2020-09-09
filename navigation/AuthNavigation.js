import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import AuthHome from '../screens/Auth/AuthHome';
import Confirm from '../screens/Auth/Confirm';
import SignUp from '../screens/Auth/SignUp';
import Login from '../screens/Auth/Login';

const AuthNavigation = createStackNavigator(
  {
    Login,
    Confirm,
    AuthHome,
    SignUp,
  },
  { headerMode: 'none' }
);

export default createAppContainer(AuthNavigation);
