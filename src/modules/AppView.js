import AppNavigator from './navigation/RootNavigator';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

const switchNavigator = createSwitchNavigator({
  /*
   * You could add another route here for authentication.
   *
   * Read more at https://reactnavigation.org/docs/en/auth-flow.html
   */
  App: AppNavigator,
});

export default createAppContainer(switchNavigator);
