import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { composeWithDevTools } from 'redux-devtools-extension';

import { ReactGA as analytics } from 'react-ga';
import api, { data_service } from './api';
import { NotificationsReducer as notifications } from './components/Notifications';

const initialState = {};

const rootReducer = (nextState = initialState, action) => {
  let state = Object.assign({}, nextState);
  switch(action.type) {
    case "persist/REHYDRATE":
      state = action.payload || state;
      break;
    default:
      break;
  }
  return reducers(state, action);
}

const initialStatus = {
  ready: false,
  loading: [],
  loaded: [],
  error: {}
};

const status = (nextState = initialStatus, action) => {
  let state = Object.assign({}, nextState);
  switch (action.type) {
    case "persist/REHYDRATE":
      state = initialStatus;
      break;
    case 'STATUS:READY':
      state.ready = state.ready || state.loading.length === 0;
      break;
    case 'STATUS:LOADING':
      var name = action.payload;
      if (state.loading.indexOf(name) >= 0) state.loading.splice(state.loading.indexOf(name), 1);
      if (state.loaded.indexOf(name) >= 0) state.loaded.splice(state.loaded.indexOf(name), 1);
      state.loading.push(name);
      state.ready = state.ready || state.loading.length === 0;
      console.info('STATUS:LOADING', 'Starting', `"${name}"...`);
      break;
    case 'STATUS:LOADED':
      var name = action.payload;
      if (state.loading.indexOf(name) >= 0) state.loading.splice(state.loading.indexOf(name), 1);
      if (state.loaded.indexOf(name) >= 0) state.loaded.splice(state.loaded.indexOf(name), 1);
      state.loaded.push(name);
      state.ready = state.ready || state.loading.length === 0;
      console.info('STATUS:LOADED', 'Finished', `"${name}"...`);
      break;
    case 'STATUS:ERROR':
      var { name, error } = action.payload;
      if (state.loading.indexOf(name) >= 0) state.loading.splice(state.loading.indexOf(name), 1);
      if (state.loaded.indexOf(name) >= 0) state.loaded.splice(state.loaded.indexOf(name), 1);
      state.error[name] = error;
      state.ready = state.ready || state.loading.length === 0;
      console.error('STATUS:', 'Error Loading', `"${name}"`, error);
      break;
    default:
      break;
  }
  return state;
};

const persistConfig = {
  key: 'root',
  storage,
}

const reducers = persistCombineReducers(persistConfig, {
  api,
  status,
  notifications,
});

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(data_service)));
const persistor = persistStore(store);

export { store, persistor };
