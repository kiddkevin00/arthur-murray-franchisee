import { combineReducers } from 'redux';

import me from './states/me';
import auth from '../modules/auth/AuthState';
import payment from '../modules/payment/PaymentState';
import paymentHistory from '../modules/paymentHistory/PaymentHistoryState';
import reports from '../modules/reports/ReportsState';

// ## Generator Reducer Imports
import app from '../modules/AppState';
//import gallery from '../modules/gallery/GalleryState';
//import calendar from '../modules/calendar/CalendarState';
import charts from '../modules/charts/ChartsState';
//import chat from '../modules/chat/ChatState';

export default combineReducers({
  me,
  auth,
  payment,
  paymentHistory,
  reports,

  // ## Generator Reducers
  //gallery,
  app,
  //calendar,
  charts,
  //chat,
});
