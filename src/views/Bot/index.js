import React, { Component } from 'react';
import { connect } from 'react-redux';

import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

class Bot extends Component {
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
          <div className="jumbotron">
            <h1>Welcome</h1>
            <p className="lead">To Data Skeptic's new layout!</p>
          </div>
          <div className="card-columns">
            <div className="card mb-3 col no-gutters">
              <img className="card-img-top" src="/img/placeholder.jpg" />
              <div className="card-body">
                <h5 className="card-title">Post Title</h5>
                <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
              </div>
              <div className="card-footer">
                <a href="#" className="card-link">Read More...</a>
              </div>
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
}))(Bot);
