import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import moment from 'moment';

import './styles.scss';

import Loading from 'Components/Loading';

class HomepagePlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
    };
  }
  componentDidMount() {
  }
  handleEvent(event_name, event_data = {}) {
    const component = this.constructor.name;
    switch(event_name) {
      case 'ON_LOAD':
        return event => {
          this.setState({ loaded: true });
        };
      default:
        return event => {
          console.warn(component + '::Event', 'No handler for "' + event_name + '" found.', { event_data, event });
        };
    }
  }
  render() {
    const { api, post } = this.props;
    const { blog_id, prettyname, title, abstract, publish_date } = post;
    let date = moment(publish_date, "YYYYMMDD").fromNow();
    if (date.includes('month')) date = moment(publish_date).format("MMMM Do YYYY");
    return (
      <div id="homepage-player">
        <div className="homepage-player-title"><Link to={podcast_page}>Title</Link></div>
        <div className="homepage-player-desc">Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description </div>
        <button className="homepage-player-button">Play</button>
      </div>
    );
  }
}

export default connect(state => ({
  api: state.api,
  status: state.status
}))(HomepagePlayer);
