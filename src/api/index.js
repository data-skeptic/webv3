import objectAssignDeep from 'object-assign-deep';
import data_service from './data_service';

const initialData = {};

const api = (nextState = initialData, action) => {
  let state = Object.assign({}, nextState);
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
export { data_service };
