import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import reducers from './reducers';

// Router
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// Views
import Views from './views';

const initialState = {};

const store = createStore(reducers, initialState);

const Router = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Views.Bot} />
          <Route path="/podcast" component={Views.Podcast} />
          <Route path="/blog" component={Views.Blog} />
          <Route path="/store" component={Views.Store} />
          <Route path="/membership" component={Views.Membership} />
          <Route path="/login" component={Views.Login} />
          <Route component={Views.Missing} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
};

ReactDOM.render(<Router />, document.getElementById('root'));
