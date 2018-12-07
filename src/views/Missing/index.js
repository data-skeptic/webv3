import React, { Component } from 'react';
import { connect } from 'react-redux';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import './styles.scss';

import Navbar from 'Components/Navbar';
import Footer from 'Components/Footer';

class Missing extends Component {
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
          <div id="Missing" className="row">
            <div className="DazedBot col-xs-12 col-sm-3 offset-sm-1">
              <embed src="https://s3.amazonaws.com/dataskeptic.com/animations/bot/dazed/demo.html" />
            </div>
            <div className="MissingContent col-xs-12 col-sm-6">
              <h3>404 - PAGE NOT FOUND</h3>
              <p className="lead">The page you are looking for might have been removed, had its name changed or is temporarily unavailable.</p>
            </div>
          </div>
        </main>
        <Footer />
      </React.Fragment>
    );
  }
}

export default connect(state => ({
  status: state.status
}))(Missing);