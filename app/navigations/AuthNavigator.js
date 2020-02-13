import { createStackNavigator } from 'react-navigation-stack'
import Login from '../screens/Auth/Login'
import Signup from '../screens/Auth/Signup'
import Phone from '../screens/Auth/Phone'
import Verify from '../screens/Auth/Verify'

const AuthNavigation = createStackNavigator(
  {
    Login: { screen: Login },
    Signup: { screen: Signup },
    Phone: { screen: Phone },
    Verify: { screen: Verify },
  },
  {
    initialRouteName: 'Login',
    headerMode: 'none'
  }
)

export default AuthNavigation 
