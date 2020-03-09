import { createEventActionCreator as actionCreator } from './CreateEventState';
import CreateEventView from './CreateEventView';
import { compose } from 'recompose';
import { connect } from 'react-redux';

export default compose(
  connect(
    state => ({
      formName: state.createEvent.form.name.value,
      formDescription: state.createEvent.form.description.value,
      formDate: state.createEvent.form.date.value,
      isUpdatingData: state.createEvent.updateData.isUpdatingData,
      isErrorVisible: state.createEvent.updateData.error.isVisible,
      errorMessage: state.createEvent.updateData.error.message,
    }),
    dispatch => ({
      dispatchResetState() {
        dispatch(actionCreator.resetState());
      },

      dispatchSetFormField(field, value) {
        dispatch(actionCreator.setFormField(field, value));
      },

      dispatchCreateEvent(...params) {
        dispatch(actionCreator.createEvent(...params));
      },
    }),
  ),
)(CreateEventView);
