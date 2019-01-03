import React, { Component } from 'react';
import { connect } from 'react-redux';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import './styles.scss';

import Navbar from 'Components/Navbar';
import Footer from 'Components/Footer';
import BubbleBot from 'Components/BubbleBot';

class Contact extends Component {
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
    var dialog_id = "6f41504e-55f1-fd7c-471e-bd66f5f0f5ff"
    return (
      <React.Fragment>
        <main className="container">
          <h2>Contact</h2>
          <p></p>
        </main>
        <BubbleBot bot_id={bot_id} initial_dialog_id={dialog_id} />
      </React.Fragment>
    );
  }
}

export default connect(state => ({
  status: state.status
}))(Contact);
