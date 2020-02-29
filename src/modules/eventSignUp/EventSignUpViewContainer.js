import EventSignUpView from './EventSignUpView';
import { compose, withState } from 'recompose';
import { connect } from 'react-redux';

export default compose(
  connect(),
  withState('selectedSizeIndex', 'setSelectedSizeIndex', -1),
  withState('selectedQuantityIndex', 'setSelectedQuantityIndex', -1),
)(EventSignUpView);
