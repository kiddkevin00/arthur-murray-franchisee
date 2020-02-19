import { Button, ExpoIcon } from '../../components';
import { CreditCardInput } from 'react-native-credit-card-input';
import { StyleSheet, Text, View } from 'react-native';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  buttonWrapper: {
    alignSelf: 'center',
    paddingTop: 20,
    width: 300,
    zIndex: 1,
  },

  alertWrapper: {
    backgroundColor: '#ecb7b7',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    borderRadius: 5,
    padding: 10,
  },
  alertText: {
    flex: 1,
    paddingLeft: 10,
    fontSize: 16,
    fontWeight: '400',
    color: '#c22',
  },
});

/**
 * Renders a payment form to handle all the credit card information,
 * using the `CreditCardInput` component.
 */
export default class PaymentFormView extends Component {
  static propTypes = {
    onPay: PropTypes.func.isRequired,
    isPaying: PropTypes.bool.isRequired,
    isErrorVisible: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string.isRequired,
  };

  state = {
    cardData: { valid: false },
  };

  render() {
    const { onPay, isPaying, isErrorVisible, errorMessage } = this.props;

    return (
      <View>
        <CreditCardInput
          requiresName={true}
          onChange={cardData => this.setState({ cardData })}
        />
        <View style={styles.buttonWrapper}>
          <Button
            primary={true}
            caption="Pay"
            disabled={isPaying || !this.state.cardData.valid}
            onPress={() => onPay(this.state.cardData)}
          />

          {isErrorVisible && (
            <View style={styles.alertWrapper}>
              <ExpoIcon name="exclamation-circle" type="FontAwesome" size={20} color="#c22" />
              <Text style={styles.alertText}>{errorMessage}</Text>
            </View>
          )}
        </View>
      </View>
    );
  }
}
