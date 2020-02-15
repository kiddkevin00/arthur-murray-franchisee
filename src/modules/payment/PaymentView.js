import { View, Text, StyleSheet, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import PaymentFormView from './PaymentFormView';

const STRIPE_ERROR = 'Payment service error. Try again later.';
const SERVER_ERROR = 'Server error. Try again later.';
const STRIPE_PUBLISHABLE_KEY = 'pk_test_RyxLSIb4yirMUv21I32hLwjw00tQ4Bmyal';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  cardFormWrapper: {
    padding: 10,
    margin: 10,
  },
  infoText: {
    fontSize: 18,
    textAlign: 'center',
  },
});

const getCreditCardToken = creditCardData => {
  const card = {
    'card[number]': creditCardData.values.number.replace(/ /g, ''),
    'card[exp_month]': creditCardData.values.expiry.split('/')[0],
    'card[exp_year]': creditCardData.values.expiry.split('/')[1],
    'card[cvc]': creditCardData.values.cvc,
  };
  return fetch('https://api.stripe.com/v1/tokens', {
    headers: {
      // Use the correct MIME type for your server
      Accept: 'application/json',
      // Use the correct Content Type to send data to Stripe
      'Content-Type': 'application/x-www-form-urlencoded',
      // Use the Stripe publishable key as Bearer
      Authorization: `Bearer ${STRIPE_PUBLISHABLE_KEY}`,
    },
    // Use a proper HTTP method
    method: 'post',
    // Format the credit card data to a string of key-value pairs
    // divided by &
    body: Object.keys(card)
      .map(key => key + '=' + card[key])
      .join('&'),
  }).then(response => response.json());
};

const subscribeUser = creditCardToken => {
  // Here you can save the user to somewhere
  return new Promise(resolve => {
    // This is user data
    //console.log('Credit card token\n', creditCardToken);
    setTimeout(() => {
      resolve({ status: true });
    }, 1000);
  });
};

export default class PaymentScreen extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  };

  state = {
    submitted: false,
    error: null,
  };

  // Handles submitting the payment request
  onSubmit = async creditCardInput => {
    const { navigation } = this.props;
    // Disable the Submit button after the request is sent
    this.setState({ submitted: true });
    let creditCardToken;
    try {
      // Create a credit card token
      creditCardToken = await getCreditCardToken(creditCardInput);
      if (creditCardToken.error) {
        // Reset the state if Stripe responds with an error
        // Set submitted to false to let the user subscribe again
        this.setState({ submitted: false, error: STRIPE_ERROR });
        return;
      }
    } catch (e) {
      // Reset the state if the request was sent with an error
      // Set submitted to false to let the user subscribe again
      this.setState({ submitted: false, error: STRIPE_ERROR });
      return;
    }
    // Send a request to your server with the received credit card token
    const { error } = await subscribeUser(creditCardToken);
    // Handle any errors from your server
    if (error) {
      this.setState({ submitted: false, error: SERVER_ERROR });
    } else {
      this.setState({ submitted: false, error: null });

      // Navigate after payment success
      //navigation.navigate('Home');
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} ref={ref => (this.scrollViewRef = ref)}>
          <View style={styles.textWrapper}>
            <Text style={styles.infoText}>
              Try out full Stripe payment functionality in a React Native app
            </Text>
          </View>
          <View style={styles.textWrapper}>
            <Text style={styles.infoText}>Subscribe to see the magic number!</Text>
          </View>
          <View style={styles.textWrapper}>
            <Text style={styles.infoText}>Subscription Plan: $10/month</Text>
          </View>
          <View style={styles.cardFormWrapper}>
            <PaymentFormView
              error={this.state.error}
              submitted={this.state.submitted}
              onSubmit={this.onSubmit}
            />
          </View>
        </ScrollView>
        {/* Scrolls to the payment form */}
        {/* This will push the words and credit card image to the top if the screen is not bug enough */}
        <KeyboardSpacer
          onToggle={() => {
            setTimeout(() => this.scrollViewRef.scrollToEnd({ animated: true }), 0);
          }}
        />
      </View>
    );
  }
}
