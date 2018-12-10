import React, { Component } from 'react';
import { connect } from 'react-redux';
import ChatBot from 'Components/ChatBot';

import './styles.scss';

class BubbleBot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: props.open || false,
    };
  }
  componentDidMount() {
    const { dispatch, api, status } = this.props;
    const { open } = this.state;
  }
  handleEvent(event_name, event_data = {}) {
    const { api, status, dispatch } = this.props;
    const { open, bot_id, username, user_id, input } = this.state;
    let state = Object.assign({}, this.state);
    switch (event_name) {
      case 'ON_CLICK':
        return event => {
          switch(event_data.name || event.target.name) {
            case 'bubble':
              this.setState({ open: !open });
              break;
            default:
              break;
          }
        }
      default:
        return event => {
          console.warn('HANDLER', 'No event handler for, "' + event_name + '".');
        };
    }
  }
  render() {
    const { style } = this.props;
    const { open } = this.state;
    return (
      <div className={`BubbleBot${open ? ' open' : ''}`} style={style || {}}>
        <div className="bubble" onClick={this.handleEvent('ON_CLICK', { name: 'bubble' })}></div>
        <ChatBot bot_id="18a5cb19-7c2f-bdc8-3fc3-81532d39f162" />
      </div>
    );
  }
}

export default connect(state => ({
  api: state.api,
  status: state.status,
}))(BubbleBot);
