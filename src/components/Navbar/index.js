import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import './styles.css';

const Navbar = props => {
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
              <li className={`nav-item${props.active === name ? ' active' : ''}`} key={i}>
                <Link className="nav-link" to={links[name]}>{name} {/*<span className="sr-only">(current)</span>*/}</Link>
              </li>
            ))}
          </ul>
          <ul className="navbar-nav mr-sm-2">
            {!props.account.email && (
              <li className={`nav-item${props.active === 'Login' ? ' active' : ''}`}>
                <Link className="nav-link" to="/login">Login</Link>
              </li>
            ) || (
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="account-dropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">My Account</a>
                <div className="dropdown-menu dropdown-menu-right" aria-labelledby="account-dropdown">
                  <Link className="dropdown-item" to="/account">My Profile</Link>
                  <Link className="dropdown-item" to="/logout">Logout</Link>
                </div>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default connect(state => ({
  status: state.status,
  account: state.account,
}))(Navbar);
