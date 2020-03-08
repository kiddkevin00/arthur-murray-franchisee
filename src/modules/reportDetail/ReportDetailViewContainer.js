import { connect } from 'react-redux';
import { compose } from 'recompose';

import ReportDetailView from './ReportDetailView';

export default compose(
  connect(
    state => ({
      reports: state.reports.main.reports,
    }),
    null,
  ),
)(ReportDetailView);
