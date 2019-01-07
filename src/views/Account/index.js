import React, { Component } from 'react';
import { connect } from 'react-redux';

import './styles.scss';

class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    let { dispatch } = this.props;
    console.log(this.props);
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
    const { api, status } = this.props || {};
    return (
      <main className="Account container">
        <div className="row">
          <h1>My Account</h1>
        </div>
      </main>
    );
  }
}

export default connect(state => ({
  api: state.api,
  status: state.status,
}))(withAuth(Account));
