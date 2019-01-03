import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import moment from 'moment';

import './styles.scss';

import Loading from 'Components/Loading';
import Button from 'Components/Button';

class HomepagePlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      latest_podcast: undefined
    };
  }
  componentDidMount() {
    const { podcast } = this.props;
    if (podcast) this.setState({ loaded: true });
  }
  handleEvent(event_name, event_data = {}) {
    const { dispatch } = this.props;
    const component = this.constructor.name;
    switch(event_name) {
      case 'ON_LOAD':
        return event => {
          this.setState({ loaded: true });
        };
      case 'ON_CLICK':
        return event => {
          const name = event_data.name || event.target.name;
          const { post } = event_data;
          switch(name) {
            case 'play_button':
              const { title, subtitle, src, art } = event_data;
              dispatch({ type: 'PLAYER:PLAY', payload: { title, subtitle, src, art }});
              break;
            case 'download_button':
              break;
            default:
              break;
          }
        };
      default:
        return event => {
          console.warn(component + '::Event', 'No handler for "' + event_name + '" found.', { event_data, event });
        };
    }
  }
  render() {
    const { api, podcast } = this.props;
    if (!this.state.loaded) {
      return <Loading on={this.state.loaded} />
    }
    const { blog_id, prettyname, title, abstract, publish_date, related } = podcast;
    const audio = related.filter(item => item.type === 'mp3');
    const images = related.filter(item => item.type === 'homepage-image');
    const audio_bundle = {
      title: audio[0].title,
      subtitle: '',
      src: audio[0].dest,
      art: images[0] ? images[0].dest : undefined,
    };
    let date = moment(publish_date, "YYYYMMDD").fromNow();
    if (date.includes('month')) date = moment(publish_date).format("MMMM Do YYYY");
    return (
      <div id="homepage-player">
        <Loading on={this.state.loaded}>
          <div className="homepage-player-title"><Link to={prettyname}>{title}</Link></div>
          <div className="homepage-player-date"><p>{date}</p></div>
          <div className="homepage-player-desc"><p>{abstract}</p></div>
          <Button className="btn-lg" icon="fa fa-play" onClick={this.handleEvent('ON_CLICK', { name: 'play_button', ...audio_bundle })}>Play</Button>
        </Loading>
      </div>
    );
  }
}

export default connect(state => ({
  api: state.api,
  status: state.status
}))(HomepagePlayer);
