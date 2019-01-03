import React, { Component } from 'react';
import { connect } from 'react-redux';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import './styles.scss';

import Navbar from 'Components/Navbar';
import Footer from 'Components/Footer';
import BubbleBot from 'Components/BubbleBot';

class About extends Component {
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
    var contributors = []
    return (
      <React.Fragment>
        <main className="container">
          <div className="about-div">
            <h2>About</h2>
            <div className="row">
              <div className="col-xs-12 col-sm-6 about-cell">
                <img
                  height="250"
                  src="https://s3.amazonaws.com/dataskeptic.com/img/2018/ds-couch-sq-400.png"
                />
              </div>
              <div className="col-xs-12 col-sm-6 about-cell">
                <p className="about-cell-p">
                  Data Skeptic produces this website and two podcasts. The show is
                  hosted by Kyle Polich. Linh Da Tran co-hosts our mini-episodes.
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col-xs-12 col-sm-6 about-cell">
                <img
                  width="250"
                  src="https://s3.amazonaws.com/dataskeptic.com/img/yoshi.jpg"
                />
              </div>
              <div className="col-xs-12 col-sm-6 about-cell">
                <p className="about-cell-p">
                  Yoshi is our official mascot and office bird. She is also the
                  focus of numerous mini-episode discussions.
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col-xs-12 col-sm-6 about-cell">
                <a href="https://itunes.apple.com/us/podcast/data-skeptic/id890348705?mt=2">
                  <img
                    width="250"
                    src="https://s3.amazonaws.com/dataskeptic.com/img/primary-logo-400.jpg"
                  />
                </a>
              </div>
              <div className="col-xs-12 col-sm-6 about-cell">
                <p className="about-cell-p">
                  Our primary output is the weekly podcast featuring short
                  mini-episodes explaining high level concepts in data science, and
                  longer interview segments with researchers and practitioners.
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col-xs-12 col-sm-6 about-cell">
                <a href="https://itunes.apple.com/us/podcast/data-skeptic-bonus-feed/id1285937559">
                  <img
                    width="250"
                    src="https://s3.amazonaws.com/dataskeptic.com/img/bonus-feed.jpg"
                  />
                </a>
              </div>
              <div className="col-xs-12 col-sm-6 about-cell">
                <p className="about-cell-p">
                  The bonus feed is extra and extended material if you just can't
                  get enough Data Skeptic.
                </p>
              </div>
            </div>
          </div>
          <p></p>
        </main>
        <BubbleBot bot_id={bot_id} initial_dialog_id={dialog_id} />
      </React.Fragment>
    );
  }
}

export default connect(state => ({
  status: state.status
}))(About);
