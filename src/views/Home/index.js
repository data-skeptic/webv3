import React, { Component } from 'react';
import { connect } from 'react-redux';

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
    return (
      <React.Fragment>
        <title>DataSkeptic</title>
        <Navbar active="Bot" />
        <main className="Home container">
          <div className="row">
            <div className="col-xs-12 col-sm-6">
              <ChatBot />
            </div>
          </div>
        </main>
        <Footer />
      </React.Fragment>
    );
  }
}

export default connect(state => ({
  api: state.api,
  status: state.status,
}))(Home);
