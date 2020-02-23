import * as dataSource from './reportsDataSource';
import buildLoadDataActionCreator from '../../redux/builders/actionCreators/loadData';
import buildLoadDataReducer from '../../redux/builders/reducers/loadData';
import { combineReducers } from 'redux';
import { Alert } from 'react-native';

const namespace = 'ReportsState';

// INITIAL STATES
export const mainInitialState = { reports: [] };
const loadDataInitialState = {
  isLoadingData: false,
};

// ACTION TYPES
export const RESET_STATE = `${namespace}/RESET_STATE`;
export const SET_DATA = `${namespace}/SET_DATA`;

// ACTION CREATOR
export const reportsActionCreator = {
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

  fetchStudioReports() {
    return async (dispatch, getState) => {
      try {
        dispatch(this.loadDataRequest());

        const { data: reports } = await dataSource.fetchStudioReports(getState().me.main.studio || 'Rockford'); // TODO

        dispatch(this.setData({ reports }));

        dispatch(this.loadDataSuccess());
      } catch (error) {
        Alert.alert('Try Again', error.message);

        dispatch(this.loadDataFailure());
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
