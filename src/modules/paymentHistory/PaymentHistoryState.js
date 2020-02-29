import * as dataSource from './paymentHistoryDataSource';
import buildLoadDataActionCreator from '../../redux/builders/actionCreators/loadData';
import buildLoadDataReducer from '../../redux/builders/reducers/loadData';
import { combineReducers } from 'redux';
import { Alert } from 'react-native';

const namespace = 'PaymentHistoryState';

// INITIAL STATES
export const mainInitialState = {
  myTransactions: [],
};
const loadDataInitialState = {
  isLoadingData: false,
};

// ACTION TYPES
export const RESET_STATE = `${namespace}/RESET_STATE`;
export const SET_DATA = `${namespace}/SET_DATA`;

// ACTION CREATOR
export const paymentHistoryActionCreator = {
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

  fetchMyTransactions() {
    return async (dispatch, getState) => {
      try {
        dispatch(this.loadDataRequest());

        const { data: { data: allTransactions } } = await dataSource.fetchMyTransactions();
        const studioName = getState().me.main.studio && getState().me.main.studio.name;
        let myTransactions = [];

        if (studioName) {
          myTransactions = allTransactions.filter(
            transaction => transaction.description.split(' from ')[1] === studioName
          );
        }

        dispatch(this.setData({ myTransactions }));

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
