import { reportsActionCreator as actionCreator } from './ReportsState';
import ReportsView from './ReportsView';
import { compose } from 'recompose';
import { connect } from 'react-redux';

export default compose(
  connect(
    state => ({
      reports: state.reports.main.reports,
      isLoadingData: state.reports.loadData.isLoadingData,
    }),
    dispatch => ({
      dispatchResetState() {
        dispatch(actionCreator.resetState());
      },

      dispatchFetchStudioReports(studio) {
        dispatch(actionCreator.fetchStudioReports(studio));
      },
    }),
  ),
)(ReportsView);
