import React, { Component } from 'react';
import { connect } from 'react-redux';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import './styles.scss';

import Navbar from 'Components/Navbar';
import Footer from 'Components/Footer';

class Podcast extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    let { dispatch } = this.props;
    dispatch({ type: 'API:GET_PODCASTS' });
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
        Podcast
      </main>
    );
  }
}

export default connect(state => ({
  status: state.status
}))(Podcast);
