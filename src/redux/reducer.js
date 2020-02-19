import { combineReducers } from 'redux';

import me from './states/me';
import auth from '../modules/auth/AuthState';
import payment from '../modules/payment/PaymentState';

// ## Generator Reducer Imports
import app from '../modules/AppState';
//import gallery from '../modules/gallery/GalleryState';
//import calendar from '../modules/calendar/CalendarState';
import charts from '../modules/charts/ChartsState';
//import chat from '../modules/chat/ChatState';

export default combineReducers({
  me,
  payment,
  auth,

  // ## Generator Reducers
  //gallery,
  app,
  //calendar,
  charts,
  //chat,
});
