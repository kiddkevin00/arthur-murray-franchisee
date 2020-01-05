import actionTypes from '../actionTypes/';

const { FORM } = actionTypes;

export default name => ({
  resetFormState() {
    return {
      type: FORM.RESET_STATE,
      name,
    };
  },

  setFormField(field, value) {
    return {
      type: FORM.SET_FIELD,
      payload: { field, value },
      name,
    };
  },
});
