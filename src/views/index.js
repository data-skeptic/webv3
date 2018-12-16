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
      const { location } = this.props;
      if (location) analytics.pageview(location.pathname);
    }
    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
}

export default Views;
