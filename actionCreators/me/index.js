import actionTypes, { namespaces } from '../../actionTypes/index';

const { ME } = actionTypes;

const meActionCreator = {
  resetMainState() {
    return {
      type: ME.RESET_STATE,
    };
  },

  resetState() {
    return dispatch => {
      dispatch(this.resetMainState());
    };
  },

  setData(payload) {
    return {
      type: ME.SET_DATA,
      payload,
    };
  },
};

export { meActionCreator as default };
