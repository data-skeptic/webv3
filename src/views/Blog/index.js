import React, { Component } from 'react';
import { connect } from 'react-redux';

import './styles.scss';

import Loading from 'Components/Loading';
import BubbleBot from 'Components/BubbleBot';

import BlogPost from './BlogPost';
import BlogCard from './BlogCard';

class Blog extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const { dispatch, player } = this.props;
    dispatch({ type: 'API:GET_BLOGS' });
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
    const blogs = api.blogs || {};
    const category_blogs = blogs[category] || [];
    const post = blogs[category] && blogs[category][year] && blogs[category][year][name] ? blogs[category][year][name] : undefined;
    return (
      <React.Fragment>
        <main id="Blog" className="container">
          <Loading on={status.ready}>
            {post && (
              <BlogPost post={post} />
            ) || (
              <div className="card-columns open-gutter">
                {category_blogs.map((blog, b) => <BlogCard post={blog} key={b} />)}
              </div>
            )}
          </Loading>
        </main>
        <BubbleBot />
      </React.Fragment>
    );
  }
}

export default connect(state => ({
  api: state.api,
  status: state.status,
  player: state.player,
}))(Blog);
