const actionTypes = {
  FORM: {
    RESET_STATE: 'FORM.RESET_STATE',
    SET_FIELD: 'FORM.SET_FIELD',
  },
  LOAD_DATA: {
    RESET_STATE: 'LOAD_DATA.RESET_STATE',
    REQUEST: 'LOAD_DATA.REQUEST',
    SUCCESS: 'LOAD_DATA.SUCCESS',
    FAILURE: 'LOAD_DATA.FAILURE',
  },
  UPDATE_DATA: {
    RESET_STATE: 'UPDATE_DATA.RESET_STATE',
    REQUEST: 'UPDATE_DATA.REQUEST',
    SUCCESS: 'UPDATE_DATA.SUCCESS',
    FAILURE: 'UPDATE_DATA.FAILURE',
  },
  ME: {
    RESET_STATE: 'ME.RESET_STATE',
    SET_DATA: 'ME.SET_DATA',
  },
};

const namespaces = Object.keys(actionTypes).reduce((acc, type) => ({ ...acc, [type]: type }), {});

export { actionTypes as default, namespaces };
