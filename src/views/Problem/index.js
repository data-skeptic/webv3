import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactJson from 'react-json-view';

import './styles.scss';

import Navbar from 'Components/Navbar';
import Footer from 'Components/Footer';
import Error from 'Components/Error';

class Problem extends Component {
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
    const { location, error, info } = this.props;
    const name = JSON.stringify(error.name).replace(/"/g, '');
    const message = JSON.stringify(error.message);
    return (
      <main id="Problem" className="container">
        <Error className="row" error={error} info={info} {...this.props} />
      </main>
    );
  }
}

export default connect(state => ({
  status: state.status
}))(Problem);
