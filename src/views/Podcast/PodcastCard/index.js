import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';

import './styles.scss';

import Loading from 'Components/Loading';
import Button from 'Components/Button';
import Download from '@axetroy/react-download';

class PodcastCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
    };
  }
  componentDidMount() {
    const { post } = this.props;
    post.related = post.related || [];
    post.related.map(content => {
      if (content.type === 'homepage-image') {
        this.image = new Image();
        this.image.onload = event => {
          this.setState({ loaded: true });
        }
        this.image.src = content.dest;
      }
    });
    if (!this.image) this.setState({ loaded: true });
  }
  handleEvent(event_name, event_data = {}) {
    const { dispatch } = this.props;
    switch(event_name) {
      case 'ON_LOAD':
        return event => {
          this.setState({ loaded: true });
        };
      case 'ON_CLICK':
        return event => {
          const name = event_data.name || event.target.name;
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
          console.warn(this.constructor.name + '::Event', 'No handler for "' + event_name + '" found.', { event_data, event });
        };
    }
  }
  render() {
    const { post } = this.props;
    const { prettyname, title, abstract, publish_date, related } = post;
    let date = moment(publish_date, "YYYYMMDD").fromNow();
    if (date.includes('month')) date = moment(publish_date).format("MMMM Do YYYY");
    const people = related.filter(item => item.type === 'person');
    const images = related.filter(item => item.type === 'homepage-image');
    const audio = related.filter(item => item.type === 'mp3');
    const audio_bundle = {
      title: audio[0].title,
      subtitle: audio[0].author || post.author || '',
      src: audio[0].dest,
      art: images[0] ? images[0].dest : undefined,
    };
    // TODO podcast.type == "mp3"
    return (
      <article className="PodcastCard row">
        <Loading on={this.state.loaded && post}>
          {this.image && <img className="col-xs-12 col-sm-3 podcast-img-main" src={this.image.src} alt={title} />}
          <div className="podcast-body col-xs-12 col-sm-9">
            <p className="podcast-date">{date}</p>
            <h5 className="podcast-title"><Link to={`/podcast${prettyname}`}>{title}</Link></h5>
            <Button className="btn-lg" icon="fa fa-play" onClick={this.handleEvent('ON_CLICK', { name: 'play_button', ...audio_bundle })}>Play</Button>
            <Download file={audio_bundle.src}><Button className="Button btn btn-dark rounded btn-lg" icon="fa fa-download">Download</Button></Download>
            <p className="podcast-text">{abstract}</p>
            <Link to={`/podcast${prettyname}`} className="btn btn-primary">Read More</Link>
          </div>
        </Loading>
      </article>
    );
  }
}

export default connect(state => ({
  api: state.api,
  status: state.status
}))(PodcastCard);
