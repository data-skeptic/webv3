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

// Components
import Navbar from 'Components/Navbar';
import Player from 'Components/Player';
import Footer from 'Components/Footer';

const Router = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <React.Fragment>
            <Navbar />
            <Player />
            <Switch>
              <Route exact path="/" component={Views.Home} />
              <Route path="/about" component={Views.About} />
              <Route path="/blog/:category/:year/:name" component={Views.Blog} />
              <Route path="/blog/:category/:year" component={Views.Blog} />
              <Route path="/blog/:category" component={Views.Blog} />
              <Route path="/blog" component={Views.Blog} />
              <Route path="/contact" component={Views.Contact} />
              <Route path="/corporate" component={Views.Corporate} />
              <Route path="/login" component={Views.Login} />
              <Route path="/membership" component={Views.Membership} />
              <Route path="/podcast/:category/:year/:name" component={Views.Podcast} />
              <Route path="/podcast/:category/:year" component={Views.Podcast} />
              <Route path="/podcast/:category" component={Views.Podcast} />
              <Route path="/podcast" component={Views.Podcast} />
              <Route path="/podcast" component={Views.Podcast} />
              <Route path="/store" component={Views.Store} />
              <Route path="/account" component={Views.Account} />
              <Route component={Views.Missing} />
            </Switch>
            <Footer />
          </React.Fragment>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
};

ReactDOM.render(<Router />, document.getElementById('root'));
