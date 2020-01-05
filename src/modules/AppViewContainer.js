import AppView from './AppView';
import { compose, lifecycle } from 'recompose';
import { Platform, UIManager, StatusBar } from 'react-native';

export default compose(
  lifecycle({
    componentWillMount() {
      StatusBar.setBarStyle('light-content');

      if (Platform.OS === 'android') {
        // eslint-disable-next-line no-unused-expressions
        UIManager.setLayoutAnimationEnabledExperimental &&
          UIManager.setLayoutAnimationEnabledExperimental(true);
      }
    },
  }),
)(AppView);
