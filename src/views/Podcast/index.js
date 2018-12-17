import React, { Component } from 'react';
import { connect } from 'react-redux';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import './styles.scss';

import PodcastCard from './PodcastCard';
import BlogCard from '../Blog/BlogCard';

import Loading from 'Components/Loading';

import Navbar from 'Components/Navbar';
import Footer from 'Components/Footer';

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
    const { podcasts } = api || {};
    const blogs = podcasts
    const { blog_id } = this.props.match.params;
    const sorted_blogs = Object.values(blogs || {}).sort((a, b) => ((new Date(a.publish_date)) < (new Date(b.publish_date)) ? 1 : -1));
    return (
      <React.Fragment>
        <Navbar active={this.constructor.name} />
        <main id="Podcast" className="container">
          <Loading on={status.ready}>
            {blog_id && (
              <BlogPost post={blogs[blog_id]} />
            ) || (
              <div className="row open-gutter">
                {sorted_blogs.map((blog, b) => <PodcastCard post={blog} key={b} />)}
              </div>
            )}
          </Loading>
        </main>
        <Footer />
      </React.Fragment>
    );
  }
}

export default connect(state => ({
  api: state.api,
  status: state.status
}))(Podcast);
