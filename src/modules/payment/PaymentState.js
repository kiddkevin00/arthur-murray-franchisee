import * as dataSource from './paymentDataSource';
import buildUpdateDataActionCreator from '../../redux/builders/actionCreators/updateData';
import buildUpdateDataReducer from '../../redux/builders/reducers/updateData';
import { NavigationActions } from 'react-navigation';
import { combineReducers } from 'redux';
import { Alert } from 'react-native';

const namespace = 'PaymentState';

// INITIAL STATES
const mainInitialState = {};
const updateDataInitialState = {
  isUpdatingData: false,
  error: {
    isVisible: false,
    message: '',
  },
};

// ACTION TYPES
const RESET_STATE = `${namespace}/RESET_STATE`;

// ACTION CREATOR
export const paymentActionCreator = {
  ...buildUpdateDataActionCreator(namespace),

  resetMainState() {
    return {
      type: RESET_STATE,
    };
  },

  resetState() {
    return dispatch => {
      dispatch(this.resetMainState());

      dispatch(this.resetUpdateDataState());
    };
  },

  pay(cardData, nameOnCard, navigation) {
    return async (dispatch, getState) => {
      try {
        dispatch(this.updateDataRequest());

        const { data: cardToken } = await dataSource.fetchStripeCardToken(cardData);

        await dataSource.proceedPayment({
          token: cardToken.id,
          userInfo: {
            nameOnCard,
            email: getState().me.main.email,
            firstName: getState().me.main.first_name,
            lastName: getState().me.main.last_name,
            studio: getState().me.main.studio && getState().me.main.studio.name,
          },
          chargeAmount: 999, // Will be gathered from `getState().reports[0].revenue`.
        });

        Alert.alert('Payment Successful', 'Your payment has been successfully processed!');

        navigation.navigate(NavigationActions.navigate({ routeName: 'Payments' }));

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
  updateData: buildUpdateDataReducer(updateDataInitialState, namespace),
});
