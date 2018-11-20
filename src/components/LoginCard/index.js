import React, { Component } from 'react';
import { connect } from 'react-redux';

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

class LoginCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      remember: false,
    };
  }
  handleEvent(event_name, event_data = {}) {
    switch(event_name) {
      case 'ON_CHANGE':
        return event => {
          let name = event_data.name || event.target.name;
          let value = event_data.value || event.target.value;
          this.setState({ [name]: value });
        };
      default:
        break;
    }
  }
  render() {
    return (
      <form className="login-card card col-4 offset-4 text-center mb-3">
        <div className="login-icon text-center">
          <img className="mb-4 mt-4 rounded" src="/img/dataskeptic_dark.jpg" alt="Data Skeptic" />
          </div>
        <h1 className="h3 mb-3 font-weight-normal">Please Sign In</h1>
        <label htmlFor="inputEmail" className="sr-only">Email Address</label>
        <input type="email" id="inputEmail" className="form-control" placeholder="Email Address" required autoFocus onChange={this.handleEvent('ON_CHANGE', { name: 'email' })} />
        <label htmlFor="inputPassword" className="sr-only">Password</label>
        <input type="password" id="inputPassword" className="form-control" placeholder="Password" required onChange={this.handleEvent('ON_CHANGE', { name: 'password' })} />
        <div className="checkbox mb-3 mt-3">
          <label>
            <input type="checkbox" value="remember-me" onChange={this.handleEvent('ON_CHANGE', { name: 'remember', value: !this.state.remember })} /> Remember me
          </label>
        </div>
        <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
      </form>
    );
  }
}

export default connect(state => ({
  status: state.status,
  account: state.account
}))(LoginCard);
