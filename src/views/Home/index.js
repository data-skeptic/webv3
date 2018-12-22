import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import './styles.scss';

import Loading from 'Components/Loading';
import Navbar from 'Components/Navbar';
import Footer from 'Components/Footer';
import ChatBot from 'Components/ChatBot';

import BlogCard from 'Views/Blog/BlogCard';
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      log: []
    };
  }
  componentDidMount() {
    let { dispatch } = this.props;
    dispatch({ type: 'API:GET_BLOGS' });
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
    const { api, status } = this.props || {};
    const { blogs } = api || {};
    const sorted_blogs = Object.values(blogs || {}).sort((a, b) => ((new Date(a.publish_date)) < (new Date(b.publish_date)) ? 1 : -1));
    const { log } = this.state;
    const podcast_page = "/blog/episodes/2018/drug-discovery-with-machine-learning"
    var bot_id = "f06d0f04-02a2-560d-9c0c-2220f96ec56f"
    return (
      <main className="Home container">
        <div className="row">
          <div className="col-xs-12 col-sm-2">
            <div id="bot-img-container">
              <img id="bot-img" src="https://s3.amazonaws.com/dataskeptic.com/img/bot/bot-200-200.png" />
            </div>
          </div>
          <div className="col-xs-12 col-sm-5">
            <ChatBot bot_id={bot_id} />
          </div>
          <div id="homepage-player" className="col-xs-12 col-sm-3">
            <div className="homepage-player-title"><Link to={podcast_page}>Title</Link></div>
            <div className="homepage-player-desc">Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description </div>
            <button className="homepage-player-button">Play</button>
          </div>
        </div>
      </main>
    );
  }
}

export default connect(state => ({
  api: state.api,
  status: state.status,
}))(Home);
