import me from './me';
import login from './login';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  me,
  login,
});

export { rootReducer as default };
