import objectAssignDeep from 'object-assign-deep';
import data_service from './data_service';

import analytics from 'react-ga';
import { Auth } from 'aws-amplify';
analytics.initialize(process.env.GA_TRACKING_ID);

const initialData = {};

const api = (nextState = initialData, action) => {
  let state = Object.assign({}, nextState);
  state.analytics = analytics;
  state.auth = Auth;
  switch (action.type) {
    case 'API:UPDATE':
      state = objectAssignDeep(state, action.payload);
      break;
    default:
      break;
  }
  return state;
};

export default api;
export { data_service, analytics };
