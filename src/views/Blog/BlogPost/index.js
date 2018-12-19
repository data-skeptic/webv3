import React, { Component } from 'react';
import { connect } from 'react-redux';

import './styles.scss';

import Loading from 'Components/Loading';

class BlogPost extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    const { post, dispatch } = this.props;
    dispatch({ type: 'API:GET_BLOG', payload: { post }})
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
    const { blogs } = api || {};
    const { blog_id, related, src } = post;
    const people = related.filter(item => item.type === 'person');
    const images = related.filter(item => item.type === 'homepage-image');
    const audio = related.filter(item => item.type === 'mp3');
    console.log({people, images, audio});
    return (
      <Loading on={status.loaded.includes(`GET_BLOG_${blog_id}`)}>
        {audio.length > 0 && audio.map((file_data, f) => {
          const audio_bundle = {
            title: file_data.title,
            subtitle: file_data.author || post.author || '',
            src: file_data.dest,
            art: images[0] ? images[0].dest : undefined,
          };
          return (
            <aside className="BlogAudio alert alert-info" key={f}>
              <button className="btn btn-lg btn-success" onClick={this.handleEvent('ON_CLICK', { name: 'play_button', ...audio_bundle })}><i className="fa fa-play" /></button>
            </aside>
          );
        })}
        <article className="BlogPost" dangerouslySetInnerHTML={{ __html: src }} />
      </Loading>
    );
  }
}

export default connect(state => ({
  api: state.api,
  status: state.status
}))(BlogPost);
