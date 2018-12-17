import React, { Component } from 'react';
import { connect } from 'react-redux';

import './styles.scss';

import Loading from 'Components/Loading';
import Navbar from 'Components/Navbar';
import Footer from 'Components/Footer';
import BubbleBot from 'Components/BubbleBot';

import BlogPost from './BlogPost';
import BlogCard from './BlogCard';
import { Analytics } from 'aws-amplify';

class Blog extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const { api, dispatch } = this.props;
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
        <Navbar active={this.constructor.name} />
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
        <Footer />
        <BubbleBot />
      </React.Fragment>
    );
  }
}

export default connect(state => ({
  api: state.api,
  status: state.status
}))(Blog);
