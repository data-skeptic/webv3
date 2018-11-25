import React, { Component } from 'react';
import { connect } from 'react-redux';

import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

class Store extends Component {
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
          <h2>Store</h2>
          <p>We've temporarily taken our store offline while we migrate to our new backend.
          Please check back in 2019 for new t-shirt designs and our hex stickers.</p>
        </main>
        <Footer />
      </React.Fragment>
    );
  }
}

export default connect(state => ({
  status: state.status
}))(Store);
