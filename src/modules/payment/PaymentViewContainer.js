import { paymentActionCreator as actionCreator } from './PaymentState';
import PaymentView from './PaymentView';
import { compose } from 'recompose';
import { connect } from 'react-redux';

export default compose(
  connect(
    state => ({
      formRoyaltyAmount: state.payment.form.royaltyAmount.value,
      isUpdatingData: state.payment.updateData.isUpdatingData,
      isErrorVisible: state.payment.updateData.error.isVisible,
      errorMessage: state.payment.updateData.error.message,
    }),
    dispatch => ({
      dispatchResetState() {
        dispatch(actionCreator.resetState());
      },

      dispatchSetFormField(field, value) {
        dispatch(actionCreator.setFormField(field, value));
      },

      dispatchPay(cardData, nameOnCard, amountToPay, navigation) {
        dispatch(actionCreator.pay(cardData, nameOnCard, amountToPay, navigation));
      },
    }),
  ),
)(PaymentView);
