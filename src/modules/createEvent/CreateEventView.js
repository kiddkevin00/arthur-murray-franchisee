import { fonts, colors } from '../../styles';
import { TextInput, Button } from '../../components';
import DatePicker from 'react-native-datepicker';

import { format } from 'date-fns';
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
  socialButton: {
    flex: 1,
  },
  socialButtonCenter: {
    marginLeft: 10,
    marginRight: 10,
  },
});
const todayTimestamp = format(new Date, 'MMM do yyyy, h:mm a');

export default class CreateEventScreen extends React.Component {
  static propTypes = {
    formName: PropTypes.string.isRequired,
    formDescription: PropTypes.string.isRequired,
    formDate: PropTypes.string.isRequired,
    isUpdatingData: PropTypes.bool.isRequired,
    isErrorVisible: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string.isRequired,

    dispatchResetState: PropTypes.func.isRequired,
    dispatchSetFormField: PropTypes.func.isRequired,
    dispatchCreateEvent: PropTypes.func.isRequired,

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

  handleChange(field, eventOrValue) {
    this.props.dispatchSetFormField(
      field,
      eventOrValue.nativeEvent ? eventOrValue.nativeEvent.text : eventOrValue,
    );
  }

  handleCreateEvent = async () => {
    this.props.dispatchCreateEvent(
      {
        name: this.props.formName,
        description: this.props.formDescription,
        dateInterval: this.props.formDate,
      },
      this.props.navigation,
    );
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
    const { formName, formDescription, formDate } = this.props;

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
              placeholder="Event Name"
              style={styles.textInput}
              value={formName}
              onChange={this.handleChange.bind(this, 'name')}
            />
            <TextInput
              placeholder="Description"
              style={styles.textInput}
              value={formDescription}
              onChange={this.handleChange.bind(this, 'description')}
            />
            <DatePicker
              style={{ width: '100%', marginTop: 25 }}
              date={formDate}
              mode="datetime"
              placeholder="Select Date"
              format="MMM Do YYYY, h:mm A"
              minDate={todayTimestamp}
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  position: 'absolute',
                  left: 0,
                  top: 4,
                  marginLeft: 10,
                },
                dateInput: {
                  borderWidth: 0,
                  borderBottomWidth: 1,
                  borderBottomColor: colors.textInputColor,
                },
                dateText: {
                  color: colors.textInputColor,
                },
              }}
              onDateChange={this.handleChange.bind(this, 'date')}
            />

            <Text style={styles.errorText}>
              {!this.props.isUpdatingData && this.props.isErrorVisible && this.props.errorMessage}
            </Text>
            <ActivityIndicator
              animating={this.props.isUpdatingData}
              color={colors.secondary}
              size="large"
            />

            <View
              style={[styles.section, styles.bottom]} // ,this.fadeIn(700, -20)
            >
              <Button
                bgColor={colors.secondary}
                textColor="white"
                primary
                style={{ alignSelf: 'stretch', marginBottom: 10 }}
                caption="Create Event"
                onPress={this.handleCreateEvent}
              />

              {!this.state.isKeyboardVisible && (
                <TouchableOpacity
                  onPress={() => this.props.navigation.goBack()}
                  style={{ paddingTop: 30, flexDirection: 'row' }}
                >
                  <Text
                    style={{
                      color: colors.primary,
                      fontFamily: fonts.primaryRegular,
                    }}
                  >
                    Back to events
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
