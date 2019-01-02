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
import Problem from './Problem';
import { withCatch } from 'Components/Error';

const Views = { Home, Podcast, Blog, Store, Membership, Corporate, Login, Missing };

Object.keys(Views).map(name => {
  Views[name] = withCatch(withAnalytics(Views[name]), Problem);
})

function withAnalytics(WrappedComponent) {
  return class extends React.Component {
    constructor(props) {
      super(props);
    }
    componentDidMount() {
      const is_development = (!process || !process.env || !process.env.NODE_ENV) || process.env.NODE_ENV === 'development';
      const { location } = this.props;
      if (is_development) {
        console.info('ANALYTICS:VIEW', 'Development - Skipping Google Analytics page view.');
      } else if (location) analytics.pageview(location.pathname);
    }
    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
}

export default Views;
