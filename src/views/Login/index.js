import React, { Component } from 'react';
import { connect } from 'react-redux';

import './styles.scss';

import LoginCard from 'Components/LoginCard';

class Login extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    let { dispatch } = this.props;
    dispatch({ type: 'STATUS:READY' });
  }
  handleEvent(event_name, event_data = {}) {
    switch (event_name) {
      default:
        return event => {
          console.warn( `${this.constructor.name}::EVENT`, `No event handler for, "${event_name}".`, { event_data, event } );
        };
    }
  }
  render() {
    return (
      <main className="container">
        <LoginCard />
      </main>
    );
  }
}

export default connect(state => ({
  status: state.status
}))(Login);
