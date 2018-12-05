import React, { Component } from 'react';
import { connect } from 'react-redux';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import './styles.scss';

import Loading from 'Components/Loading';
import Navbar from 'Components/Navbar';
import Footer from 'Components/Footer';

import BlogPost from './BlogPost';
import BlogCard from './BlogCard';

class Blog extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    let { dispatch } = this.props;
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
    const { blog_id } = this.props.match.params;
    const { blogs } = api || {};
    const sorted_blogs = Object.values(blogs || {}).sort((a, b) => ((new Date(a.publish_date)) < (new Date(b.publish_date)) ? 1 : -1));
    return (
      <React.Fragment>
        <Navbar active={this.constructor.name} />
        <main id="Blog" className="container">
          <Loading on={status.ready}>
            {blog_id && (
              <BlogPost post={blogs[blog_id]} />
            ) || (
              <div className="card-columns open-gutter">
                {sorted_blogs.map((blog, b) => <BlogCard post={blog} key={b} />)}
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
}))(Blog);
