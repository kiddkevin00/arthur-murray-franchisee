import me from './me';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  me,
});

export { rootReducer as default };
