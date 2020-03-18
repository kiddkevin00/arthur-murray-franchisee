import { eventsActionCreator } from '../events/EventsState';
import * as dataSource from './createEventDataSource';
import buildFormActionCreator from '../../redux/builders/actionCreators/form';
import buildUpdateDataActionCreator from '../../redux/builders/actionCreators/updateData';
import buildFormReducer from '../../redux/builders/reducers/form';
import buildUpdateDataReducer from '../../redux/builders/reducers/updateData';
import { combineReducers } from 'redux';
import { Alert } from 'react-native';
import { format } from 'date-fns';

const namespace = 'CreateEventState';

// INITIAL STATES
export const mainInitialState = {};
const formInitialState = {
  name: {
    value: '',
  },
  description: {
    value: '',
  },
  date: {
    value: format(new Date, 'MMM do yyyy, h:mm a'),
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
export const createEventActionCreator = {
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

  createEvent(payload, navigation) {
    return async dispatch => {
      try {
        dispatch(this.updateDataRequest());

        await dataSource.createEvent(payload);

        await dispatch(eventsActionCreator.fetchEvents());

        Alert.alert('Event Created', `The event ${payload.name} has been created successfully!`);

        navigation.navigate('Events');

        dispatch(this.updateDataSuccess());
      } catch (error) {
        Alert.alert('Try Again', error.message);

        dispatch(this.updateDataFailure(error.message));
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
