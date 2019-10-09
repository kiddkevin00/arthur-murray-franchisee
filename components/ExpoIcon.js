import * as Icon from '@expo/vector-icons';
import React from 'react';
import PropTypes from 'prop-types';

export default class ExpoIcon extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    type: PropTypes.string,
    size: PropTypes.number,
    color: PropTypes.string,
    style: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  };

  static defaultProps = {
    type: 'Ionicons',
    size: 26,
    color: '#1F2952',
    style: {},
  };

  render() {
    const SelectedIconType = Icon[this.props.type];

    return (
      <SelectedIconType
        name={this.props.name}
        size={this.props.size}
        color={this.props.color}
        style={this.props.style}
      />
    );
  }
}
