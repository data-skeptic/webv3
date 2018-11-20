import { combineReducers } from 'redux';
import account from './account'

const initialState = {
  ready: false,
  loading: [],
  loaded: [],
};

const status = (nextState = initialState, action) => {
  let state = Object.assign({}, nextState);
  let { ready, loading, loaded } = state;
  switch (action.type) {
    case 'STATUS:READY':
      /*
        Perform a basic "Ready Check" to see if we're loading anything.
        If anything was flagged to be "loading" then it will happen
        on it's own, however if the page isn't loading anything, then
        this action will change the ready state on it's own.
      */
      state.ready = state.loading.length === 0;
      break;
    case 'STATUS:LOADING':
      /*
        Let the reducer know that something will be loading and we are
        not ready until it is done.
      */
      var { name, dispatch } = action.payload;
      new Promise(() => {
        loaded.splice(loaded.indexOf(name), 1);
        loading.push(name);
      }).then(res => {
        dispatch({ type: 'STATUS:READY' });
      }).catch(err => {
        console.error(action.type, err);
      })
      break;
    case 'STATUS:LOADED':
      /*
        Let the reducer know that one of our data requests has finished
        loading.
      */
      var { name, dispatch } = action.payload;
      new Promise(() => {
        loading.splice(loading.indexOf(name), 1);
        loaded.push(name);
      }).then(res => {
        dispatch({ type: 'STATUS:READY' });
      }).catch(err => {
        console.error(action.type, err);
      })
      break;
    default:
      break;
  }
  return state;
};

const rootReducer = combineReducers({
  status,
  account
});

export default rootReducer;
