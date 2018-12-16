import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactJson from 'react-json-view';

import './styles.scss';

class Error extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    let { dispatch } = this.props;
    dispatch({ type: 'STATUS:READY' });
  }
  handleEvent(event_name, event_data = {}) {
    switch (event_name) {
      default:
        return event => {
          console.warn( `${this.constructor.name}::EVENT`, `No event handler for, "${event_name}".`, { event_data, event } );
        };
    }
  }
  render() {
    const { location, children, className, style, error, info } = this.props;
    const name = JSON.stringify(error.name).replace(/"/g, '');
    const message = JSON.stringify(error.message);
    return (
      <div className={`Error ${className || ''}`} style={style || {}}>
        {!process.env.SHOW_ERRORS && (
          <div className="ErrorContent col-xs-12">
            <h3>{name}: {message}</h3>
            <ReactJson src={info} name={'Details'} displayDataTypes={false} enableClipboard={false} />
          </div>
        ) || children && (
          <React.Fragment>
            {children}
          </React.Fragment>
        ) || (
          <React.Fragment>
            {location && (
              <div className="Confused col-xs-12 col-sm-3 offset-sm-1">
                <embed src="https://s3.amazonaws.com/dataskeptic.com/animations/bot/confused/demo.html" />
              </div>
            )}
            <div className={`ErrorContent col-xs-12 ${location ? 'col-sm-6' : 'text-center'}`}>
              <h3>There was a problem...</h3>
              <p className="lead">We're sorry, something seems to have gone wrong.</p>
              <p className="lead">Please try refreshing and if this error continues, contact our support team so that we can look into the issue.</p>
            </div>
          </React.Fragment>
        )}
      </div>
    );
  }
}

function withCatch(WrappedComponent, HandlerComponent = Error) {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        error: null,
        info: null,
      };
    }
    componentDidCatch(error, info) {
      this.setState({ error, info });
    }
    render() {
      if (this.state.error) return <HandlerComponent error={this.state.error} info={this.state.info} {...this.props} />;
      return <WrappedComponent {...this.props} />;
    }
  };
}

export { withCatch };
export default connect(state => ({
  status: state.status
}))(Error);
