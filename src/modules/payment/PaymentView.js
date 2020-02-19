import PaymentFormView from './PaymentFormView';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
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
});

export default class PaymentScreen extends React.Component {
  static propTypes = {
    isUpdatingData: PropTypes.bool.isRequired,
    isErrorVisible: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string.isRequired,

    dispatchResetState: PropTypes.func.isRequired,
    dispatchPay: PropTypes.func.isRequired,
  };

  componentWillMount() {
    this.props.dispatchResetState();
  }

  // Handles submitting the payment request
  handlePayment = async cardInput => {
    const cardData = {
      'card[number]': cardInput.values.number.replace(/ /g, ''),
      'card[exp_month]': cardInput.values.expiry.split('/')[0],
      'card[exp_year]': cardInput.values.expiry.split('/')[1],
      'card[cvc]': cardInput.values.cvc,
    };

    this.props.dispatchPay(cardData, cardInput.values.name);
  };

  render() {
    const { isUpdatingData, isErrorVisible, errorMessage } = this.props;

    return (
      <View style={styles.container}>
        <ScrollView ref={component => { this.scrollViewRef = component; }}>
          <Text style={styles.paymentInfoText}>Royalty Fee: $999 ($12,487 * 8%)</Text>
          <PaymentFormView
            onPay={this.handlePayment}
            isPaying={isUpdatingData}
            isErrorVisible={isErrorVisible}
            errorMessage={errorMessage}
          />
        </ScrollView>

        {/* Push the whole credit card form to the top if the screen is not big enough for the keyboard */}
        <KeyboardSpacer
          onToggle={() => {
            // Scroll to the end of the payment form
            setTimeout(() => this.scrollViewRef.scrollToEnd({ animated: true }), 0);
          }}
        />
      </View>
    );
  }
}
