import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';

import './styles.scss';

import Loading from 'Components/Loading';

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
    const { podcasts } = api || {};
    const { blog_id, title, abstract, publish_date } = post;
    let date = moment(publish_date, "YYYYMMDD").fromNow();
    if (date.includes('month')) date = moment(publish_date).format("MMMM Do YYYY");
    /*
      date
      title
      play | download
      desc
      read more
      guest image
    */
    return (
      <article className="PodcastCard row">
        <Loading on={this.state.loaded && podcasts[blog_id]}>
          {this.image && <img className="col-xs-12 col-sm-3 podcast-img-main" src={this.image.src} alt={title} />}
          <div className="podcast-body col-xs-12 col-sm-9">
            <p className="podcast-date">{date}</p>
            <h5 className="podcast-title">{title}</h5>
            <div>
              <button>Play</button>
              <button>Download</button>
            </div>
            <p className="podcast-text">{abstract}</p>
            <Link to={`/blog/${blog_id}`} className="btn btn-primary">Read More</Link>
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
