import React, { Component } from 'react';
import { connect } from 'react-redux';

import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

class Podcast extends Component {
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
      <React.Fragment>
        <Navbar active={this.constructor.name} />
        <main className="container">
          Podcast
        </main>
        <Footer />
      </React.Fragment>
    );
  }
}

export default connect(state => ({
  status: state.status
}))(Podcast);
