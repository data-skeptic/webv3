import React, { Component } from 'react';
import { connect } from 'react-redux';

import './styles.scss';

import PodcastPost from './PodcastPost';
import PodcastCard from './PodcastCard';
import Loading from 'Components/Loading';

class Podcast extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    let { dispatch } = this.props;
    dispatch({ type: 'API:GET_PODCASTS' });
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
    let { category, year, name } = this.props.match.params;
    category = category || 'all';
    const podcasts = api.podcasts || {};
    const category_podcasts = podcasts[category] || [];
    const post = podcasts[category] && podcasts[category][year] && podcasts[category][year][name] ? podcasts[category][year][name] : undefined;
    console.log({podcasts, category, year, name, post});
    return (
      <main id="Podcast" className="container">
        <Loading on={status.ready}>
          {post && (
            <PodcastPost post={post} />
          ) || (
            <React.Fragment>
              {category_podcasts.map((podcast, p) => <PodcastCard post={podcast} key={p} />)}
            </React.Fragment>
          )}
        </Loading>
      </main>
    );
  }
}

export default connect(state => ({
  api: state.api,
  status: state.status
}))(Podcast);
