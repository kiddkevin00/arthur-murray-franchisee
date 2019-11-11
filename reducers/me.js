import actionTypes, { namespaces } from '../actionTypes/';
import { combineReducers } from 'redux';

const { ME } = actionTypes;

const mainInitialState = {
  id: undefined,
  email: undefined,
  first_name: undefined,
  last_name: undefined,
  studio: undefined,
  created_at: undefined,
  enabled: undefined,
};

const mainReducer = (state = mainInitialState, action) => {
  const actionType = action.type;
  const actionPayload = action.payload;

  switch (actionType) {
    case ME.RESET_STATE:
      return { ...mainInitialState };
    case ME.SET_DATA:
      return {
        ...state,
        ...actionPayload,
      };
    default:
      return state;
  }
};

const meReducer = combineReducers({
  main: mainReducer,
});

export { meReducer as default };
