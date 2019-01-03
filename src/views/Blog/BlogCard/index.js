import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import moment from 'moment';

import './styles.scss';

import Loading from 'Components/Loading';

class BlogCard extends Component {
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
    const { post } = this.props;
    const { prettyname, title, abstract, publish_date } = post;
    let date = moment(publish_date, "YYYYMMDD").fromNow();
    if (date.includes('month')) date = moment(publish_date).format("MMMM Do YYYY");
    return (
      <article className="BlogCard col">
        <div className="card">
          <Loading on={this.state.loaded && post}>
            {this.image && <img className="card-img-top" src={this.image.src} alt={title} />}
            <div className="card-body">
              <h5 className="card-title">{title}</h5>
              <p className="card-text">{abstract}</p>
              <Link to={`/blog${prettyname}`} className="btn btn-primary">Read More</Link>
              {post.contributors && post.contributors.map((contributor, c) => <img className="contributor" src={contributor.img} title={`${contributor.prettyname}: ${contributor.contribution}`} alt={contributor.prettyname} key={c} />)}
            </div>
            <div className="card-footer">
              <small className="text-muted">Posted {date}</small>
            </div>
          </Loading>
        </div>
      </article>
    );
  }
}

export default connect(state => ({
  api: state.api,
  status: state.status
}))(BlogCard);
