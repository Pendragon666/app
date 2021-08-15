import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import uiReducer from './reducers/uiReducer';
import userReducer from './reducers/userReducer';

const initialState = {};
const middleware = [thunk, logger];
//this is for redux devtool purpose
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__?: typeof compose;
  }
}
const reducer = combineReducers({
  user: userReducer,
  UI: uiReducer,
});
const store = createStore(
  reducer,
  initialState,
  compose(
    applyMiddleware(...middleware),
    // (window.__REDUX_DEVTOOLS_EXTENSION__ &&
    // window.__REDUX_DEVTOOLS_EXTENSION__()) as any
  ),
);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
