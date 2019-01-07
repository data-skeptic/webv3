import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

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
    console.log(year);
    category = category || 'episodes';
    const podcasts = api.podcasts || {};
    const category_podcasts = podcasts[category] || {};
    const year_podcasts = podcasts[category] && podcasts[category][year] ? podcasts[category][year] : [];
    const post = podcasts[category] && podcasts[category][year] && podcasts[category][year][name] ? podcasts[category][year][name] : undefined;
    return (
      <React.Fragment>
        <main id="Podcast" className="container">
          <div className="row">
            <div className={`col-12${!post ? ' col-sm-9' : ''}`}>
              <Loading on={status.ready}>
                {post && (
                  <PodcastPost post={post} />
                ) || year && (
                  <React.Fragment>
                    {Object.values(year_podcasts).map((podcast, p) => <PodcastCard post={podcast} key={p} />)}
                  </React.Fragment>
                ) || (
                  <React.Fragment>
                    {Object.keys(category_podcasts).map((year, y) => (
                      <React.Fragment key={y}>
                        {Object.values(category_podcasts[year]).map((podcast, p) => <PodcastCard post={podcast} key={p} />)}
                      </React.Fragment>
                    ))}
                  </React.Fragment>
                )}
              </Loading>
            </div>
            {!post && (
              <aside className="col-12 col-sm-3 sticky-top">
                <div className="list-group">
                  {Object.keys(category_podcasts).map((cat_year, y) => <Link className={`list-group-item list-group-item-action${cat_year === year ? ' active' : ''}`} to={`/podcast/${category}/${cat_year}`} key={y}>{cat_year}</Link>)}
                </div>
              </aside>
            )}
          </div>
        </main>
      </React.Fragment>
    );
  }
}

export default connect(state => ({
  api: state.api,
  status: state.status
}))(Podcast);
