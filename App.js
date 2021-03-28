import AppView from './src/modules/AppViewContainer';
import { store, persistor } from './src/redux/store';
//import { colors } from './src/styles';
import colors from './src/styles/colors'; // TODO
import { Root } from 'native-base';
import AppLoading from 'expo-app-loading';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { View, ActivityIndicator, StyleSheet, YellowBox } from 'react-native';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clone from 'lodash.clone';

ignoreWarnings(
  'Warning: componentWillReceiveProps has been renamed',
  'Warning: componentWillUpdate has been renamed',
  'Warning: componentWillMount has been renamed',
  'Warning: Unsafe legacy lifecycles will not be called for components using new component APIs',
);

const loadResourcesAsync = async () => {
  await Promise.all([
    Asset.loadAsync([
      //require('./assets/images/robot-dev.png'),
    ]),
    Font.loadAsync({
      // This is the font that we are using for our tab bar
      ...Ionicons.font,
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      'Lato-Light': require('./assets/fonts/Lato-Light.ttf'),
      'Lato-Regular': require('./assets/fonts/Lato-Regular.ttf'),
      'Lato-Bold': require('./assets/fonts/Lato-Bold.ttf'),
      'Lato-SemiBold': require('./assets/fonts/Lato-Semibold.ttf'),
    }),
  ]);
};

const handleLoadingError = error => {
  // In this case, you might want to report the error to your error reporting
  // service, for example Sentry
  console.warn(error); // eslint-disable-line no-console
};

const handleFinishLoading = setLoadingComplete => {
  setLoadingComplete(true);
};

const App = props => {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return (
      <AppLoading
        startAsync={loadResourcesAsync}
        onError={handleLoadingError}
        onFinish={() => handleFinishLoading(setLoadingComplete)}
      />
    );
  }
  return (
    <Root>
      <Provider store={store}>
        <PersistGate
          loading={
            <View style={styles.container}>
              <ActivityIndicator color={colors.red} />
            </View>
          }
          persistor={persistor}
        >
          <AppView />
        </PersistGate>
      </Provider>
    </Root>
  );
};

App.propTypes = {
  skipLoadingScreen: PropTypes.bool,
};

App.defaultProps = {
  skipLoadingScreen: undefined,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});

function ignoreWarnings(...matchedMessages) {
  YellowBox.ignoreWarnings([...matchedMessages]);

  const _console = clone(console);

  console.warn = message => {
    if (!matchedMessages.find(matchedMsg => message.includes(matchedMsg))) {
      _console.warn(message);
    }
  };
}

export { App as default };
