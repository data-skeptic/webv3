import React, { Component } from 'react';
import { connect } from 'react-redux';

import './styles.scss';

import Navbar from 'Components/Navbar';
import Footer from 'Components/Footer';
import BubbleBot from 'Components/BubbleBot';

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
    var bot_id = "f06d0f04-02a2-560d-9c0c-2220f96ec56f"
    var initial_dialog_id = "18a5cb19-7c2f-bdc8-3fc3-81532d39f162"
    return (
      <React.Fragment>
        <main id="Missing" className="container">
          <div className="row">
            <div className="DazedBot col-xs-12 col-sm-3 offset-sm-1">
              <embed className="col-sm-12" src="https://s3.amazonaws.com/dataskeptic.com/animations/bot/dazed/demo.html" />
            </div>
            <div className="MissingContent col-xs-12 col-sm-6 text-center text-sm-left">
              <h3>404 - PAGE NOT FOUND</h3>
              <p className="lead">The page you are looking for might have been removed, had its name changed or is temporarily unavailable.</p>
            </div>
          </div>
        </main>
        <BubbleBot open bot_id={bot_id} initial_dialog_id={initial_dialog_id} />
      </React.Fragment>
    );
  }
}

export default connect(state => ({
  status: state.status
}))(Missing);
