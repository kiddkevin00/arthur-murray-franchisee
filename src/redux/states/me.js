import { combineReducers } from 'redux';

const namespace = 'MeState';

// INITIAL STATES
const mainInitialState = {
  id: undefined,
  email: undefined,
  first_name: undefined,
  last_name: undefined,
  studio: {},
  created_at: undefined,
  enabled: undefined,
};

// ACTION TYPES
export const RESET_STATE = `${namespace}/RESET_STATE`;
export const SET_DATA = `${namespace}/SET_DATA`;

// ACTION CREATOR
export const meActionCreator = {
  resetMainState() {
    return {
      type: RESET_STATE,
    };
  },

  resetState() {
    return dispatch => {
      dispatch(this.resetMainState());
    };
  },

  setData(payload) {
    return {
      type: SET_DATA,
      payload,
    };
  },
};

// REDUCER
const mainReducer = (state = mainInitialState, action) => {
  const actionType = action.type;
  const actionPayload = action.payload;

  switch (actionType) {
    case RESET_STATE:
      return { ...mainInitialState };
    case SET_DATA:
      return {
        ...state,
        ...actionPayload,
      };
    default:
      return state;
  }
};

export default combineReducers({
  main: mainReducer,
});
