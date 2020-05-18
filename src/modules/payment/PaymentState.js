import * as dataSource from './paymentDataSource';
import buildUpdateDataActionCreator from '../../redux/builders/actionCreators/updateData';
import buildUpdateDataReducer from '../../redux/builders/reducers/updateData';
import { NavigationActions } from 'react-navigation';
import { combineReducers } from 'redux';
import { Alert } from 'react-native';
import buildFormReducer from '../../redux/builders/reducers/form';
import buildFormActionCreator from '../../redux/builders/actionCreators/form';

const namespace = 'PaymentState';

// INITIAL STATES
const mainInitialState = {};
const formInitialState = {
  royaltyAmount: {
    value: '',
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
const RESET_STATE = `${namespace}/RESET_STATE`;

// ACTION CREATOR
export const paymentActionCreator = {
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

  pay(cardData, nameOnCard, amountToPay, navigation) {
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
          chargeAmount: parseFloat(amountToPay) * 100,
        });

        dispatch(this.resetFormState());

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
  form: buildFormReducer(formInitialState, namespace),
  updateData: buildUpdateDataReducer(updateDataInitialState, namespace),
});
