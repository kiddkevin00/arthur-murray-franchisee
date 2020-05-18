import PaymentFormView from './PaymentFormView';
import { TextInput } from '../../components/';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { View, Text, StyleSheet, ScrollView, Alert, Platform } from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FAFE',
  },
  paymentInfoText: {
    fontSize: 18,
    textAlign: 'center',
    padding: 10,
  },
  textInputContainer: {
    alignSelf: 'center',
    width: '50%',
    marginBottom: 20,
  },
  textInput: {
    textAlign: 'center',
  },
});

export default class PaymentScreen extends React.Component {
  static propTypes = {
    formRoyaltyAmount: PropTypes.string.isRequired,
    isUpdatingData: PropTypes.bool.isRequired,
    isErrorVisible: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string.isRequired,

    dispatchResetState: PropTypes.func.isRequired,
    dispatchSetFormField: PropTypes.func.isRequired,
    dispatchPay: PropTypes.func.isRequired,

    navigation: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  };

  componentWillMount() {
    this.props.dispatchResetState();
  }

  handleChange(field, event) {
    this.props.dispatchSetFormField(field, event.nativeEvent.text);
  }

  // Handles submitting the payment request
  handlePayment = async cardInput => {
    const { formRoyaltyAmount, dispatchPay, navigation } = this.props;

    if (Number.isNaN(parseFloat(this.props.formRoyaltyAmount))) {
      Alert.alert('Invalid Amount', 'Please enter a valid payment amount.');
      return;
    }

    const cardData = {
      'card[number]': cardInput.values.number.replace(/ /g, ''),
      'card[exp_month]': cardInput.values.expiry.split('/')[0],
      'card[exp_year]': cardInput.values.expiry.split('/')[1],
      'card[cvc]': cardInput.values.cvc,
    };

    dispatchPay(cardData, cardInput.values.name, formRoyaltyAmount, navigation);
  };

  render() {
    const { formRoyaltyAmount, isUpdatingData, isErrorVisible, errorMessage } = this.props;

    return (
      <View style={styles.container}>
        <ScrollView ref={component => { this.scrollViewRef = component; }}>
          <Text style={styles.paymentInfoText}>Royalty Payment</Text>
          <TextInput
            placeholder="Total Amount"
            containerStyle={styles.textInputContainer}
            style={styles.textInput}
            keyboardType="decimal-pad"
            value={formRoyaltyAmount}
            onChange={this.handleChange.bind(this, 'royaltyAmount')}
          />
          <PaymentFormView
            onPay={this.handlePayment}
            isPaying={isUpdatingData}
            isErrorVisible={isErrorVisible}
            errorMessage={errorMessage}
          />
        </ScrollView>

        {/* Push the whole credit card form to the top if the screen is not big enough for the keyboard */}
        {Platform.OS === 'ios' && (
          <KeyboardSpacer
            onToggle={() => {
              // Scroll to the end of the payment form
              setTimeout(() => this.scrollViewRef.scrollToEnd({ animated: true }), 0);
            }}
          />
        )}
      </View>
    );
  }
}
