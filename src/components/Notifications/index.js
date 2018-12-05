import React from 'react';
import { connect } from 'react-redux';

import NotificationsReducer from './reducer';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import './styles.scss';

const Toast = props => {
  const { onClose } = props;
  let icon = null;
  let type = 'light';
  switch(props.type) {
    case 'info':
      icon = <i className="fa fa-info-circle" />;
      type = 'primary';
      break;
    case 'error':
      icon = <i className="fa fa-exclamation-triangle" />;
      type = 'danger';
      break;
    case 'debug':
      icon = <i className="fa fa-bug" />;
      type = 'warning';
      break;
    default:
      break;
  }
  return (
    <div className="toast">
      <span className={`alert alert-${type} alert-dismissible fade show`}>
        {icon}
        {props.children}
        <button type="button" className="close" onClick={onClose}>
          <span>&times;</span>
        </button>
      </span>
    </div>
  );
};

const Notifications = props => {
  const handleEvent = (event_name, event_data = {}) => {
    const { dispatch } = props;
    switch(event_name) {
      case 'ON_CLOSE':
        return dispatch.bind(this, { type: 'NOTIFY:DELETE', payload: event_data });
      default:
        break;
    }
  }
  return (
    <div id="notifications-tray">
      {props.notifications.active.map((notification, i) => <Toast type={notification.type} onClose={handleEvent('ON_CLOSE', i)} key={i}>{notification.message}</Toast>)}
    </div>
  );
}

export { NotificationsReducer };
export default connect(state => ({
  notifications: state.notifications,
}))(Notifications);
