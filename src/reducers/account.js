import { combineReducers } from 'redux';

const initialState = {
  email: undefined
};

const account = (nextState = initialState, action) => {
  let state = Object.assign({}, nextState);
  switch (action.type) {
    default:
      break;
  }
  return state;
};

export default account;
