import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import './styles.scss';

import Loading from 'Components/Loading';
import Button from 'Components/Button';

class PodcastPost extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    const { post, dispatch } = this.props;
    dispatch({ type: 'API:GET_PODCAST', payload: { post }});
  }
  handleEvent(event_name, event_data = {}) {
    const { dispatch } = this.props;
    switch (event_name) {
      case 'ON_CLICK':
        return event => {
          const name = event_data.name || event.target.name;
          switch(name) {
            case 'play_button':
              const { title, subtitle, src, art } = event_data;
              dispatch({ type: 'PLAYER:PLAY', payload: { title, subtitle, src, art }});
              break;
            default:
              break;
          };
        }
      default:
        return event => {
          console.warn( `${this.constructor.name}::EVENT`, `No event handler for, "${event_name}".`, { event_data, event } );
        };
    }
  }
  render() {
    const { api, status, post } = this.props;
    const { blog_id, related, src } = post;
    const people = related.filter(item => item.type === 'person');
    const images = related.filter(item => item.type === 'homepage-image');
    const audio = related.filter(item => item.type === 'mp3');
    return (
      <Loading on={status.loaded.includes(`GET_PODCAST_${blog_id}`)}>
        {audio.length > 0 && audio.map((file_data, f) => {
          const audio_bundle = {
            title: file_data.title,
            subtitle: file_data.author || post.author || '',
            src: file_data.dest,
            art: images[0] ? images[0].dest : undefined,
          };
          const date = moment(post.publish_date).format("MMMM Do YYYY");
          return (
            <aside className="PodcastAudio alert alert-warning" key={f}>
              <div className="row mb-0">
                <div className="col-sm-7">
                  {people[0] && <img className="speaker" src={people[0].dest} title={people[0].title} />}
                  <h5 className="d-inline-block mb-0">{file_data.title}<small className="d-block font-italic">{date}</small></h5>
                </div>
                <div className="col-sm-5 text-right">
                  <Button className="btn-lg" icon="fa fa-download" onClick={this.handleEvent('ON_CLICK', { name: 'download_button', ...audio_bundle })}>Download</Button>
                  <Button className="btn-lg" icon="fa fa-play" onClick={this.handleEvent('ON_CLICK', { name: 'play_button', ...audio_bundle })}>Play</Button>
                </div>
              </div>
            </aside>
          );
        })}
        <article className="PodcastPost" dangerouslySetInnerHTML={{ __html: src }} />
      </Loading>
    );
  }
}

export default connect(state => ({
  api: state.api,
  status: state.status
}))(PodcastPost);
