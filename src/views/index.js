import React from 'react';
import { analytics } from 'Api';

import Home from './Home';
import Podcast from './Podcast';
import Blog from './Blog';
import Store from './Store';
import Membership from './Membership';
import Corporate from './Corporate';
import Login from './Login';

import Missing from './Missing';

const Views = { Home, Podcast, Blog, Store, Membership, Corporate, Login, Missing };

Object.keys(Views).map(name => {
  Views[name] = withAnalytics(Views[name]);
})

function withAnalytics(WrappedComponent) {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        error: null,
        info: null,
      };
    }
    componentDidMount() {
      const { location } = this.props;
      if (location) analytics.pageview(location.pathname);
    }
    componentDidCatch(error, info) {
      this.setState({ error, info });
    }
    render() {
      if (this.state.error) return <div>{JSON.stringify(this.state.error.name)}: {JSON.stringify(this.state.info)}</div>
      return <WrappedComponent {...this.props} />;
    }
  };
}

export default Views;
