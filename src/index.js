import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { store, persistor } from './reducer';

// Router
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// Views
import Views from './views';
import './styles.scss';

const Router = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Views.Home} />
            <Route path="/podcast" component={Views.Podcast} />
            <Route exact path="/blog" component={Views.Blog} />
            <Route path="/blog/:blog_id" component={Views.Blog} />
            <Route path="/store" component={Views.Store} />
            <Route path="/membership" component={Views.Membership} />
            <Route path="/login" component={Views.Login} />
            <Route component={Views.Missing} />
          </Switch>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
};

ReactDOM.render(<Router />, document.getElementById('root'));
