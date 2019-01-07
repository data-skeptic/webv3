import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router";
import { Link } from 'react-router-dom';

import './styles.scss';

class Navbar extends Component {
  constructor(props) {
    super(props);
  }
  handleEvent(event_name, event_data = {}) {
    const { api, history } = this.props;
    switch(event_name) {
      case 'ON_LOGOUT':
        return event => {
          api.auth.signOut()
            .then(data => {
              this.forceUpdate();
              history.push("/");
            })
            .catch(console.error);
        }
      default:
        break;
    }
  }
  render() {
    const { api, active } = this.props;
    const { auth } = api;
    const links = {
      Bot: '/',
      Podcast: '/podcast',
      Blog: '/blog',
      Store: '/store',
      Membership: '/membership',
      Corporate: '/corporate',
    };
    return (
      <nav id="main-nav" className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <img src="/img/logo.svg" />
          </Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#main-nav-content" aria-controls="main-nav-content" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="main-nav-content">
            <ul className="navbar-nav mr-auto">
              {Object.keys(links).map((name, i) => (
                <li className={`nav-item${active === name ? ' active' : ''}`} key={i}>
                  <Link className="nav-link" to={links[name]}>{name} {/*<span className="sr-only">(current)</span>*/}</Link>
                </li>
              ))}
            </ul>
            <ul className="navbar-nav mr-sm-2">
              <li className={`nav-item`}>
                <Link className="nav-link" to="/account">{auth.user ? 'My Account' : 'Login'}</Link>
              </li>
              {auth.user && (
                <li className={`nav-item`}>
                  <a className="nav-link" style={{ cursor: 'pointer' }} onClick={this.handleEvent('ON_LOGOUT')}>Log Out</a>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}

export default connect(state => ({
  api: state.api,
  status: state.status,
}))(withRouter(Navbar));
