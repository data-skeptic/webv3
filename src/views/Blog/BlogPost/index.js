import React, { Component } from 'react';
import { connect } from 'react-redux';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
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
  render() {
    const { api, status, post } = this.props;
    const { blogs } = api || {};
    const { blog_id, src } = post;
    return (
      <Loading on={status.loaded.includes(`GET_BLOG_${blog_id}`)}>
        <article className="BlogPost" dangerouslySetInnerHTML={{ __html: src }} />
      </Loading>
    );
  }
}

export default connect(state => ({
  api: state.api,
  status: state.status
}))(BlogPost);
