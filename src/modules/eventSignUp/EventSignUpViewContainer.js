import EventSignUpView from './EventSignUpView';
import { compose, withState } from 'recompose';
import { connect } from 'react-redux';

export default compose(
  connect(
    state => ({
      events: state.events.main.events,
    }),
    null,
  ),
  withState('selectedAdmissionTypeIndex', 'setSelectedAdmissionTypeIndex', -1),
  withState('selectedQuantityIndex', 'setSelectedQuantityIndex', -1),
)(EventSignUpView);
