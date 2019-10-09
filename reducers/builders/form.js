import buildNamedWrapperReducer from './namedWrapper';
import actionTypes from '../../actionTypes';

const { FORM } = actionTypes;

export default (initialState, name) => {
  const formReducer = (state = initialState, action) => {
    const actionType = action.type;
    const actionPayload = action.payload;

    switch (actionType) {
      case FORM.RESET_STATE:
        return { ...initialState };
      case FORM.SET_FIELD:
        return {
          ...state,
          [actionPayload.field]: {
            ...state[actionPayload.field],
            value: actionPayload.value,
            dirty: true,
          },
        };
      default:
        return state;
    }
  };

  return buildNamedWrapperReducer(formReducer, name);
};
