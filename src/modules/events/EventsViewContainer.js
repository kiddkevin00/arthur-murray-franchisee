import EventsView from './EventsView';
import { compose, withState } from 'recompose';

export default compose(
  withState('tabIndex', 'setTabIndex', 0),
)(EventsView);
