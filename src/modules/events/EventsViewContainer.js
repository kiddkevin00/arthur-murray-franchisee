import { eventsActionCreator as actionCreator } from './EventsState';
import EventsView from './EventsView';
import { compose } from 'recompose';
import { connect } from 'react-redux';

export default compose(
  connect(
    state => ({
      isLoadingData: state.events.loadData.isLoadingData,
      events: state.events.main.events,
    }),
    dispatch => ({
      dispatchFetchEvents() {
        dispatch(actionCreator.fetchEvents());
      },
    }),
  ),
)(EventsView);
