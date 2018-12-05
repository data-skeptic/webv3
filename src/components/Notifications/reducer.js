const initialNotifications = {
  active: [],
  inactive: [],
};

const NotificationsReducer = (nextState = initialNotifications, action) => {
  let state = Object.assign({}, nextState);
  switch (action.type) {
    case "persist/REHYDRATE":
      state = initialNotifications;
      break;
    case 'NOTIFY:NEW':
      var { type, message } = action.payload;
      state.active.push({type, message});
      break;
    case 'NOTIFY:DELETE':
      var index = action.payload;
      state.active.splice(index, 1);
      break;
    default:
      break;
  }
  return state;
};

export default NotificationsReducer;
