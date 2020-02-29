import GridView from './GridView';
import { compose, withState } from 'recompose';

export default compose(
  withState('tabIndex', 'setTabIndex', 0),
)(GridView);
