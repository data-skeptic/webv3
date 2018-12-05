import React, { Component } from 'react';
import { connect } from 'react-redux';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import './styles.scss';

import Navbar from 'Components/Navbar';
import Footer from 'Components/Footer';

class Membership extends Component {
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
          <h2>Membership</h2>
          <p>Your membership supports Data Skeptic's ability to continue delivering quality content on a weekly basis and expand into new mediums. For $1 per episode, your contributions can help us launch more projects and continuously improve the content of the podcast.</p>

          <h3>Donations</h3>
          <p>If you prefer to make a one time contribution, you can do so via the Paypal button below.</p>

          <button>Donate</button>

          <button>PayPal - $4</button>
          <button>PayPal - $8</button>
          <button>PayPal - $16</button>
          <button>PayPal - $32</button>
          <button>PayPal - $64</button>

          <p>For membership questions, changes, or cancelations, please email <a href="mailto:members@dataskeptic.com">members@dataskeptic.com</a>.</p>
        </main>
        <Footer />
      </React.Fragment>
    );
  }
}

export default connect(state => ({
  status: state.status
}))(Membership);
