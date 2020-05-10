import * as dataSource from './eventsDataSource';
import buildLoadDataActionCreator from '../../redux/builders/actionCreators/loadData';
import buildLoadDataReducer from '../../redux/builders/reducers/loadData';
import { combineReducers } from 'redux';
import { Alert } from 'react-native';

const namespace = 'EventsState';

// INITIAL STATES
const mainInitialState = {
  events: [],
};
const loadDataInitialState = {
  isLoadingData: false,
};

// ACTION TYPES
const RESET_STATE = `${namespace}/RESET_STATE`;
const SET_DATA = `${namespace}/SET_DATA`;

// ACTION CREATOR
export const eventsActionCreator = {
  ...buildLoadDataActionCreator(namespace),

  resetMainState() {
    return {
      type: RESET_STATE,
    };
  },

  resetState() {
    return dispatch => {
      dispatch(this.resetMainState());

      dispatch(this.resetLoadDataState());
    };
  },

  setData(payload) {
    return {
      type: SET_DATA,
      payload,
    };
  },

  fetchEvents() {
    return async dispatch => {
      try {
        dispatch(this.loadDataRequest());

        const { data: events } = await dataSource.fetchEvents();

        dispatch(this.setData({ events }));

        dispatch(this.loadDataSuccess());
      } catch (error) {
        Alert.alert('Try Again', error.message);

        dispatch(this.loadDataFailure(error.message));
      }
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
  loadData: buildLoadDataReducer(loadDataInitialState, namespace),
});
