import reducer from './reducer';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { applyMiddleware, createStore, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

const composeEnhancers = (global.__DEV__ && global.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
const enhancers = [
  applyMiddleware(
    thunkMiddleware,
    //createLogger({
    //  collapsed: true,
    //  predicate: () => global.__DEV__,
    //}),
  ),
];
const enhancer = composeEnhancers(...enhancers);

const persistConfig = {
  key: 'root',
  storage,
  blacklist: [],
};
const persistedReducer = persistReducer(persistConfig, reducer);
const initialState = undefined;

export const store = createStore(persistedReducer, initialState, enhancer);

export const persistor = persistStore(store);
