import { createSwitchNavigator, createAppContainer } from 'react-navigation'
import Initial from '../screens/Initial'
import AuthNavigation from './AuthNavigator'
import AppNavigation from './AppNavigator'



const SwitchNavigator = createSwitchNavigator(
  {
    Initial: Initial,
    Auth: AuthNavigation,
    App: AppNavigation,
  },
  {
    initialRouteName: 'App'
  }
)

const AppContainer = createAppContainer(SwitchNavigator)

export default AppContainer 
