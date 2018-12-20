import React, { Component } from 'react';
import { connect } from 'react-redux';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import './styles.scss';

import Navbar from 'Components/Navbar';
import Footer from 'Components/Footer';

import BubbleBot from 'Components/BubbleBot';

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
    var bot_id = "f06d0f04-02a2-560d-9c0c-2220f96ec56f"
    var dialog_id = "7ede72f6-a400-6f5b-1b16-51367bdf2b87"
    return (
      <React.Fragment>
        <main className="container">
          <h2>Store</h2>
          <p>We've temporarily taken our store offline while we migrate to our new backend.
          Please check back in 2019 for new t-shirt designs and our hex stickers.</p>
        </main>
        <BubbleBot bot_id={bot_id} initial_dialog_id={dialog_id} />
      </React.Fragment>
    );
  }
}

export default connect(state => ({
  status: state.status
}))(Store);
