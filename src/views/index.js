import React from 'react';
import { analytics } from 'Api';

import About from './About';
import Blog from './Blog';
import Contact from './Contact';
import Corporate from './Corporate';
import Home from './Home';
import Login from './Login';
import Membership from './Membership';
import Missing from './Missing';
import Podcast from './Podcast';
import Problem from './Problem';
import Store from './Store';

import { withCatch } from 'Components/Error';

const Views = { About, Blog, Contact, Corporate, Home, Login, Membership, Missing, Podcast, Problem, Store };

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
