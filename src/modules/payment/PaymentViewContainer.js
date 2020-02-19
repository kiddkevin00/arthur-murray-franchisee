import { paymentActionCreator as actionCreator } from './PaymentState';
import PaymentView from './PaymentView';
import { compose } from 'recompose';
import { connect } from 'react-redux';

export default compose(
  connect(
    state => ({
      isUpdatingData: state.payment.updateData.isUpdatingData,
      isErrorVisible: state.payment.updateData.error.isVisible,
      errorMessage: state.payment.updateData.error.message,
    }),
    dispatch => ({
      dispatchResetState() {
        dispatch(actionCreator.resetState());
      },

      dispatchPay(cardData, nameOnCard) {
        dispatch(actionCreator.pay(cardData, nameOnCard));
      },
    }),
  ),
)(PaymentView);
