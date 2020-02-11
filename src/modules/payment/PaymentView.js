import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';

export default class PaymentScreen extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  };

  render() {
    return (
      <View>
        <Text>Payment component goes here...</Text>
      </View>
    );
  }
}
