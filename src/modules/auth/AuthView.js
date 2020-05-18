import { fonts, colors } from '../../styles';
import { TextInput, Button } from '../../components';
import * as WebBrowser from 'expo-web-browser';
import {
  StyleSheet,
  View,
  Text,
  Animated,
  Keyboard,
  Platform,
  LayoutAnimation,
  TouchableOpacity,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 30,
  },
  backgroundImage: {
    flex: 1,
  },
  section: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  middle: {
    flex: 2,
    justifyContent: 'center',
    alignSelf: 'stretch',
    paddingTop: 20,
  },
  bottom: {
    flex: 1,
    alignSelf: 'stretch',
    paddingBottom: Platform.OS === 'android' ? 30 : 0,
  },
  last: {
    justifyContent: 'flex-end',
  },
  textInput: {
    alignSelf: 'stretch',
    marginTop: 20,
  },
  errorText: {
    marginTop: 80,
    color: 'red',
    alignSelf: 'center',
    textAlign: 'center',
  },
  logo: {
    height: 60,
    width: 300,
  },
  socialLoginContainer: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    marginTop: 15,
    justifyContent: 'space-between',
  },
  socialButton: {
    flex: 1,
  },
  socialButtonCenter: {
    marginLeft: 10,
    marginRight: 10,
  },
});

export default class AuthScreen extends React.Component {
  static propTypes = {
    formEmail: PropTypes.string.isRequired,
    formPassword: PropTypes.string.isRequired,
    isUpdatingData: PropTypes.bool.isRequired,
    isErrorVisible: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string.isRequired,

    dispatchResetState: PropTypes.func.isRequired,
    dispatchSetFormField: PropTypes.func.isRequired,
    dispatchLogin: PropTypes.func.isRequired,

    navigation: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  };

  state = {
    anim: new Animated.Value(0),
    isKeyboardVisible: false,
  };

  componentWillMount() {
    this.keyboardDidShowListener = Keyboard.addListener(
      Platform.select({ android: 'keyboardDidShow', ios: 'keyboardWillShow' }),
      this._keyboardDidShow.bind(this),
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      Platform.select({ android: 'keyboardDidHide', ios: 'keyboardWillHide' }),
      this._keyboardDidHide.bind(this),
    );
  }

  componentDidMount() {
    this.props.dispatchResetState();

    Animated.timing(this.state.anim, { toValue: 3000, duration: 3000 }).start();
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  handleChange(field, event) {
    this.props.dispatchSetFormField(field, event.nativeEvent.text);
  }

  handleLogin = async () => {
    this.props.dispatchLogin(this.props.formEmail, this.props.formPassword, this.props.navigation);
  };

  _keyboardDidShow() {
    LayoutAnimation.easeInEaseOut();
    this.setState({ isKeyboardVisible: true });
  }

  _keyboardDidHide() {
    LayoutAnimation.easeInEaseOut();
    this.setState({ isKeyboardVisible: false });
  }

  fadeIn(delay, from = 0) {
    const { anim } = this.state;

    return {
      opacity: anim.interpolate({
        inputRange: [delay, Math.min(delay + 500, 3000)],
        outputRange: [0, 1],
        extrapolate: 'clamp',
      }),
      transform: [
        {
          translateY: anim.interpolate({
            inputRange: [delay, Math.min(delay + 500, 3000)],
            outputRange: [from, 0],
            extrapolate: 'clamp',
          }),
        },
      ],
    };
  }

  render() {
    const { formEmail, formPassword, navigation } = this.props;

    return (
      <ImageBackground
        source={require('../../../assets/images/background.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <View style={styles.container}>
          <View style={[styles.section, { paddingTop: 30 }]}>
            <Animated.Image
              resizeMode="contain"
              style={[
                styles.logo,
                this.state.isKeyboardVisible && { height: 45 },
                this.fadeIn(0),
              ]}
              source={require('../../../assets/images/header-title.png')}
            />
          </View>

          <Animated.View
            style={[styles.section, styles.middle, this.fadeIn(700, -20)]}
          >
            <TextInput
              placeholder="Email"
              style={styles.textInput}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              value={formEmail}
              onChange={this.handleChange.bind(this, 'email')}
              textContentType="username"
            />
            <TextInput
              placeholder="Password"
              style={styles.textInput}
              secureTextEntry={true}
              value={formPassword}
              onChange={this.handleChange.bind(this, 'password')}
              textContentType="password"
            />

            <Text style={styles.errorText}>
              {!this.props.isUpdatingData && this.props.isErrorVisible && this.props.errorMessage}
            </Text>
            <ActivityIndicator animating={this.props.isUpdatingData} color={colors.secondary} size="large" />

            <View
              style={[styles.section, styles.bottom]} // ,this.fadeIn(700, -20)
            >
              <Button
                bgColor={colors.secondary}
                textColor="white"
                primary
                style={{ alignSelf: 'stretch', marginBottom: 10 }}
                caption="Login"
                onPress={this.handleLogin}
              />

              {/* !this.state.isKeyboardVisible && (
                <View style={styles.socialLoginContainer}>
                  <Button
                    style={styles.socialButton}
                    bordered
                    bgColor={colors.primary}
                    icon={require('../../../assets/images/google-plus.png')}
                    iconColor={colors.primary}
                    onPress={() => navigation.goBack()}
                  />
                  <Button
                    style={[styles.socialButton, styles.socialButtonCenter]}
                    bordered
                    bgColor={colors.primary}
                    icon={require('../../../assets/images/twitter.png')}
                    iconColor={colors.primary}
                    onPress={() => navigation.goBack()}
                  />
                  <Button
                    style={styles.socialButton}
                    bordered
                    bgColor={colors.primary}
                    icon={require('../../../assets/images/facebook.png')}
                    iconColor={colors.primary}
                    onPress={() => navigation.goBack()}
                  />
                </View>
              ) */}

              {!this.state.isKeyboardVisible && (
                <TouchableOpacity
                  onPress={() => WebBrowser.openBrowserAsync('https://reporting.arthurmurray.com')}
                  style={{ paddingTop: 30, flexDirection: 'row' }}
                >
                  <Text
                    style={{
                      color: colors.primary,
                      fontFamily: fonts.primaryRegular,
                    }}
                  >
                    Don't have an account?
                  </Text>
                  <Text
                    style={{
                      color: colors.primary,
                      fontFamily: fonts.primaryBold,
                      marginLeft: 5,
                    }}
                  >
                    Register
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </Animated.View>
        </View>
      </ImageBackground>
    );
  }
}
