import ReportsView from './ReportsView';
import { compose, withState } from 'recompose';

export default compose(
  withState('tabIndex', 'setTabIndex', 2),
)(ReportsView);
