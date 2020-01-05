import { combineReducers } from 'redux';

import me from './states/me';
// ## Generator Reducer Imports
import app from '../modules/AppState';
//import gallery from '../modules/gallery/GalleryState';
//import calendar from '../modules/calendar/CalendarState';
import charts from '../modules/charts/ChartsState';
//import chat from '../modules/chat/ChatState';
import auth from '../modules/auth/AuthState';

export default combineReducers({
  me,
  // ## Generator Reducers
  //gallery,
  app,
  //calendar,
  charts,
  //chat,
  auth,
});
