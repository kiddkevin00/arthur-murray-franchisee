import { paymentHistoryActionCreator as actionCreator } from './PaymentHistoryState';
import PaymentHistoryView from './PaymentHistoryView';
import { compose } from 'recompose';
import { connect } from 'react-redux';

export default compose(
  connect(
    state => ({
      myTransactions: state.paymentHistory.main.myTransactions,
    }),
    dispatch => ({
      dispatchResetState() {
        dispatch(actionCreator.resetState());
      },

      dispatchFetchMyTransactions() {
        dispatch(actionCreator.fetchMyTransactions());
      },
    }),
  ),
)(PaymentHistoryView);
