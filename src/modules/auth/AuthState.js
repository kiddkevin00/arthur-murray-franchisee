import * as dataSource from './authDataSource';
import { meActionCreator } from '../../redux/states/me';
import buildFormActionCreator from '../../redux/builders/actionCreators/form';
import buildUpdateDataActionCreator from '../../redux/builders/actionCreators/updateData';
import buildFormReducer from '../../redux/builders/reducers/form';
import buildUpdateDataReducer from '../../redux/builders/reducers/updateData';
import { combineReducers } from 'redux';
import { Alert } from 'react-native';

const namespace = 'AuthState';

// INITIAL STATES
export const mainInitialState = {};
const formInitialState = {
  email: {
    value: 'info@dancecomp.org',
  },
  password: {
    value: 'dance1',
  },
};
const updateDataInitialState = {
  isUpdatingData: false,
  error: {
    isVisible: false,
    message: '',
  },
};

// ACTION TYPES
export const RESET_STATE = `${namespace}/RESET_STATE`;

// ACTION CREATOR
export const authActionCreator = {
  ...buildFormActionCreator(namespace),
  ...buildUpdateDataActionCreator(namespace),

  resetMainState() {
    return {
      type: RESET_STATE,
    };
  },

  resetState() {
    return dispatch => {
      dispatch(this.resetMainState());

      dispatch(this.resetFormState());

      dispatch(this.resetUpdateDataState());
    };
  },

  login(emailAddress, password, navigation) {
    return async dispatch => {
      try {
        dispatch(this.updateDataRequest());

        const { data: { access_token: accessToken }} = await dataSource.login(emailAddress, password);
        const { data } = await dataSource.fetchMyInfo(accessToken);

        dispatch(meActionCreator.resetMainState());
        dispatch(meActionCreator.setData(data));

        navigation.replace('Main');

        dispatch(this.updateDataSuccess());
      } catch (error) {
        let errorMessage;

        if (error.original.error === 'invalid_request') {
          errorMessage = 'The email and password is required!';
        } else if (error.original.error === 'invalid_grant') {
          errorMessage = 'Sorry, it seems your login information is incorrect!';
        } else {
          errorMessage = error.message;
        }

        Alert.alert('Try Again', errorMessage);

        dispatch(this.updateDataFailure(errorMessage));
      }
    };
  },
};

// REDUCER
const mainReducer = (state = mainInitialState, action) => {
  const actionType = action.type;

  switch (actionType) {
    case RESET_STATE:
      return { ...mainInitialState };
    default:
      return state;
  }
};

export default combineReducers({
  main: mainReducer,
  form: buildFormReducer(formInitialState, namespace),
  updateData: buildUpdateDataReducer(updateDataInitialState, namespace),
});
