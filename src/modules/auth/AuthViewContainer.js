import { authActionCreator as actionCreator } from './AuthState';
import AuthView from './AuthView';
import { compose } from 'recompose';
import { connect } from 'react-redux';

export default compose(
  connect(
    state => ({
      formEmail: state.auth.form.email.value,
      formPassword: state.auth.form.password.value,
      isUpdatingData: state.auth.updateData.isUpdatingData,
      isErrorVisible: state.auth.updateData.error.isVisible,
      errorMessage: state.auth.updateData.error.message,
    }),
    dispatch => ({
      dispatchResetState() {
        dispatch(actionCreator.resetState());
      },

      dispatchSetFormField(field, value) {
        dispatch(actionCreator.setFormField(field, value));
      },

      dispatchLogin(email, password, navigation) {
        dispatch(actionCreator.login(email, password, navigation));
      },
    }),
  )
)(AuthView);
