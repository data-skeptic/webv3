import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { store, persistor } from './reducer';

// Router
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// STYLE LIBRARIES
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'font-awesome/css/font-awesome.min.css';

import './styles.scss';

// Views
import Views from './views';

const Router = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Views.Home} />
            <Route path="/podcast" component={Views.Podcast} />
            <Route exact path="/blog" component={Views.Blog} />
            <Route path="/blog/:category/:year/:name" component={Views.Blog} />
            <Route path="/store" component={Views.Store} />
            <Route path="/membership" component={Views.Membership} />
            <Route path="/corporate" component={Views.Corporate} />
            <Route path="/login" component={Views.Login} />
            <Route component={Views.Missing} />
          </Switch>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
};

ReactDOM.render(<Router />, document.getElementById('root'));
