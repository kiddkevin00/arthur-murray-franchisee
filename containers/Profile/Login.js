import actionCreator from '../../actionCreators/login/login';
import dimensions from '../../constants/dimensions';
import * as WebBrowser from 'expo-web-browser';
import {
  Platform,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  View,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import { connect } from 'react-redux';
import { Icon } from 'native-base';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

const mainPadding = 30;
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f4f7f9',
  },
  main: {
    flexGrow: 80,
    padding: mainPadding,
    paddingTop: mainPadding + 10,
    backgroundColor: '#0C223F',
  },
  footer: {
    flexGrow: 5,
    ...Platform.select({
      android: {
        flexGrow: 3,
      },
    }),
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    height: 25,
    width: dimensions.window.width - mainPadding * 2,
  },
  formInput: {
    marginBottom: 10,
    borderWidth: 1,
    ...Platform.select({
      android: {
        borderWidth: 0,
      },
    }),
    borderRadius: 8,
    borderColor: 'white',
    padding: 10,
    height: 50,
    fontSize: 23,
    color: 'white',
  },
  loginButton: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 5,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: 'white',
    height: 45,
    backgroundColor: 'white',
  },
  signUpButton: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#FFBF3B',
    height: 45,
    backgroundColor: '#FFBF3B',
  },
  errorText: {
    color: 'red',
    alignSelf: 'center',
    textAlign: 'center',
  },
  footerText: {
    fontSize: 12,
    ...Platform.select({
      android: {
        fontSize: 14,
      },
    }),
    color: '#a3a7b2',
  },
  title: {
    color: '#FFBF3B',
    fontSize: 20,
    lineHeight: 20,
    minHeight: 20,
  },
  loginButtonText: {
    fontSize: 18,
    color: '#111',
  },
  signUpButtonText: {
    fontSize: 18,
    color: 'white',
  },
});

class UnconnectedLogin extends Component {
  static navigationOptions = {
    header: null,
  };

  static propTypes = {
    formEmail: PropTypes.string.isRequired,
    formPassword: PropTypes.string.isRequired,
    isErrorVisible: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string.isRequired,
    isUpdatingData: PropTypes.bool.isRequired,

    dispatchResetState: PropTypes.func.isRequired,
    dispatchSetFormField: PropTypes.func.isRequired,
    dispatchLogin: PropTypes.func.isRequired,

    navigation: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  };

  componentWillUnmount() {
    this.props.dispatchResetState();
  }

  handleChange(field, event) {
    this.props.dispatchSetFormField(field, event.nativeEvent.text);
  }

  handleLogin = async () => {
    this.props.dispatchLogin(this.props.formEmail, this.props.formPassword, this.props.navigation);
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View style={styles.main}>
          <View style={styles.titleContainer}>
            <TouchableOpacity
              onPress={() => this.props.navigation.goBack()}
              style={{ paddingHorizontal: 5 }}
            >
              <Icon
                name="arrow-back"
                style={{
                  color: '#FFBF3B',
                  fontSize: 20,
                }}
              />
            </TouchableOpacity>
            <Text style={styles.title}>Arthur Murray Franchisee</Text>
            <View style={{ width: 18 }} />
          </View>

          <TextInput
            style={styles.formInput}
            placeholderTextColor="#a3a7b2"
            underlineColorAndroid="white"
            value={this.props.formEmail}
            onChange={this.handleChange.bind(this, 'email')}
            placeholder="Email Address"
          />
          <TextInput
            style={styles.formInput}
            placeholderTextColor="#a3a7b2"
            underlineColorAndroid="white"
            value={this.props.formPassword}
            onChange={this.handleChange.bind(this, 'password')}
            placeholder="Password"
            secureTextEntry={true}
          />

          <TouchableHighlight
            style={styles.loginButton}
            onPress={this.handleLogin}
            underlayColor="#f2f2f2"
          >
            <Text style={styles.loginButtonText}>LOG IN</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.signUpButton}
            onPress={() => WebBrowser.openBrowserAsync('https://reporting.arthurmurray.com')}
            underlayColor="#ffcc00"
          >
            <Text style={styles.signUpButtonText}>SIGN UP</Text>
          </TouchableHighlight>

          <Text style={styles.errorText}>
            {!this.props.isUpdatingData && this.props.isErrorVisible && this.props.errorMessage || ''}
          </Text>
          <ActivityIndicator animating={this.props.isUpdatingData} color="#fff" size="large" />
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            By signing in, you agree to our Terms & Privacy Policy
          </Text>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  formEmail: state.login.form.email.value,
  formPassword: state.login.form.password.value,
  isErrorVisible: state.login.updateData.error.isVisible,
  errorMessage: state.login.updateData.error.message,
  isUpdatingData: state.login.updateData.isUpdatingData,
});

const mapDispatchToProps = dispatch => ({
  dispatchResetState() {
    dispatch(actionCreator.resetState());
  },

  dispatchSetFormField(field, value) {
    dispatch(actionCreator.setFormField(field, value));
  },

  dispatchLogin(email, password, navigation) {
    dispatch(actionCreator.login(email, password, navigation));
  },
});

const Login = connect(mapStateToProps, mapDispatchToProps)(UnconnectedLogin);

export { UnconnectedLogin, Login as default };
