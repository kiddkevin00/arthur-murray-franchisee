import ProfileView from './ProfileView';
import { compose } from 'recompose';
import { connect } from 'react-redux';

export default compose(
  connect(
    state => ({
      email: state.me.main.email,
      firstName: state.me.main.first_name,
      lastName: state.me.main.last_name,
    }),
    null,
  )
)(ProfileView);
