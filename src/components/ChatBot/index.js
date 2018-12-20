import React, { Component } from 'react';
import { connect } from 'react-redux';
import Skeptic from 'Components/skeptic-chat';
import Message from './Message';

import './styles.scss';

class ChatBot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      input: '',
      log: [],
      typing: 0,
      awaiting_response: false,
      bot: {},
      bot_id: props.bot_id || "globally_not_found_bot",
      initial_dialog_id: props.dialog_id || undefined, // If not present, let the Bot pick
    };
    var new_username = 'random + ip + get time'
    this.session = JSON.parse(sessionStorage.getItem('CHATBOT') || JSON.stringify({ username: new_username }));
    this.state['username'] = this.session['username']
    this.chat = React.createRef();
    this.footer = React.createRef();
  }
  componentDidMount() {
    const { dispatch, api, status } = this.props;
    const { username, bot_id, initial_dialog_id } = this.state;
    
    dispatch({ type: 'STATUS:LOADING', payload: 'skeptic_bot' });
    this.io = Skeptic.Client({
      connect: process.env.BOT_SERVICE_API_URI,
      events: {
        'SERVER': message => {
          console.log('Skeptic-Chat[Client]:SERVER', message);
          Object.keys(message).map(cmd => {
            switch(cmd) {
              case 'set':
                this.setState(message.set);
                Object.keys(message.set).map(key => {
                  this.session[key] = message.set[key];
                });
                sessionStorage.setItem('CHATBOT', JSON.stringify(this.session));
                break;
              default:
                break;
            }
          })
        },
        'BOT': message => {
          console.log('Skeptic-Chat[Client]:BOT', message);
          this.handleEvent('RENDER_MESSAGE', message.source)(message);
        },
        'USER': message => {
          console.log('Skeptic-Chat[Client]:USER', message);
          if (message.source === username) this.setState({ awaiting_response: false });
          if (message.source !== username) message.show = true;
          this.handleEvent('RENDER_MESSAGE', message.source)(message);
        }
      }
    });
    const user_id = this.session.user_id || null;
    this.setState({ user_id });
    this.handleEvent('GREET_BOT')();
    dispatch({ type: 'STATUS:LOADED', payload: 'skeptic_bot' });
    this.interval = setInterval(() => {
      this.setState({ typing: this.state.typing < 3 ? this.state.typing + 1 : 0 });
    }, 750);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  handleEvent(event_name, event_data = {}) {
    const { api, status, dispatch } = this.props;
    const { open, bot_id, initial_dialog_id, username, user_id, input } = this.state;
    let state = Object.assign({}, this.state);
    switch (event_name) {
      case 'GREET_BOT':
        return () => {
          if (status.loading.includes('skeptic_bot')) return setTimeout(this.handleEvent('GREET_BOT'), 1000);
          this.io.emit('CONNECTION', { bot_id, dialog_id: initial_dialog_id, username, user_id });
        };
	    case 'RENDER_MESSAGE':
        return (message) => {
          const source = event_data || this.username;
          let delay = state.bot.humanizing || {
            delay_after_newline: {
              min_delay_ms: 500,
              delay_per_word_ms: 50,
              max_delay_ms: 1200
            }
          };
          message.sent = message.source === username ? true : false;
          message.render = [];
          if (!message.res) return;
          message.res = message.res || [];
          message.res = message.res.length ? message.res : [message.res];
          message.res.map((utterance, i) => {
            for (var type in utterance) {
              let timestamp = new Date().getTime();
              let message_delay = (Math.floor(Math.random() * delay.delay_after_newline.max_delay_ms) + delay.delay_after_newline.min_delay_ms);
              message.timestamp = timestamp + message_delay;
              switch(type) {
                case 'single-select':
                  message.render.push(<Message.SingleSelect options={utterance[type]} onSelect={this.handleEvent('ON_SEND')} index={i} key={i} />);
                  break;
                case 'image':
                  message.render.push(<Message.Image url={utterance[type]} index={i} key={i} />);
                  break;
                case 'markdown':
                  message.render.push(<Message.Markdown message={utterance[type]} index={i} key={i} />);
                  break;
                case 'youtube_embed':
                  message.render.push(<Message.YoutubeEmbed message={utterance[type]} index={i} key={i} />);
                  break;
                case 'pick-date-time':
                  message.render.push(<Message.DateTimePick message={utterance[type]}
                                                            socket={this.io.id}
                                                            onSubmit={this.handleEvent('ON_CUSTOM_SEND')} index={i}
                                                            key={i}/>);
                  break;
                case 'google_auth':
                  message.render.push(<Message.GoogleAuth url={utterance[type]} index={i}
                                                          key={i}/>)
                  break;
                case 'o_embed':
                  message.render.push(<Message.oEmbed message={utterance[type]} index={i} key={i} />);
                  break;
                case 'spotify':
                  message.render.push(<Message.Spotify message={utterance[type]} index={i} key={i} />);
                  break;
                case 'slider':
                  const { min, max, step, title } = utterance[type];
                  const value = utterance[type].default;
                  message.render.push(<Message.RangeSlider min={min} max={max} step={step} value={value} title={title} onSubmit={this.handleEvent('ON_SEND')} index={i} key={i} />);
                  break;
                default:
                  let text = (utterance.text || '').toString();
                  message.timestamp += (delay.delay_after_newline.delay_per_word_ms * text.split(/\s/g).length)
                  message.render.push(<Message.Text message={text} index={i} key={i} />);
                  break;
              }
            }
          });
          state.log.push(message);
          if (open) this.chat.current.scrollTop = this.chat.current.scrollHeight;
          this.setState(state);
          setTimeout(() => {
            if (open) this.chat.current.scrollTop = this.chat.current.scrollHeight;
          }, 500);
        };
      case 'ON_SEND':
        return message => {
          message = message || input;
          if (message.target) message = message.target.value || input;
          this.setState({ input: '', awaiting_response: true });
          this.io.emit('USER', {source: username, bot_id, text: message});
          // message = { res: [{ text: message }], source: this.username };
          // this.handleEvent('RENDER_MESSAGE', this.username)(message);
          this.footer.current.getElementsByTagName('input')[0].focus();
        };
      case 'ON_CHANGE':
        return event => {
          this.setState({ input: event.target.value });
          this.chat.current.scrollTop = this.chat.current.scrollHeight;
        };
      case 'ON_KEYDOWN':
        return event => {
          switch(event.key) {
            case 'Enter':
              this.handleEvent('ON_SEND')();
              break;
            default:
              break;
          }
        };
      default:
        return event => {
          console.warn('HANDLER', 'No event handler for, "' + event_name + '".');
        };
    }
  }
  render() {
    const { style } = this.props;
    const { bot, username, typing, input, awaiting_response, log } = this.state;
    const now = new Date().getTime();
    return (
      <div className="ChatBot card" style={style} ref={this.chat}>
        <div className="card-body">
          <h5 className="card-title">{bot.name}</h5>
          {log.map((msg, i) => {
            msg.timestamp = msg.timestamp || now;
            if (msg.timestamp <= now || msg.source === username) return <Skeptic.Message type={msg.source === username ? 'outgoing' : `incoming${msg.show ? ' user' : ''}`} key={i}>{msg.render}</Skeptic.Message>;
            return <TypingEllipses type={msg.source === username ? 'outgoing' : 'incoming'} key={`${i}_2`} count={typing} />;
          })}
          {(awaiting_response || input !== '') && <TypingEllipses type="outgoing" count={typing} />}
        </div>
        <div className="card-footer" ref={this.footer}>
          <div className="input-group">
            <input className="form-control"
              onChange={this.handleEvent('ON_CHANGE')}
              onKeyDown={this.handleEvent('ON_KEYDOWN')}
              value={input}
            />
            <div className="input-group-append">
              <button className="btn btn-primary" onClick={this.handleEvent('ON_SEND')}><i className="fa fa-paper-plane" /></button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(state => ({
  api: state.api,
  status: state.status,
}))(ChatBot);

Skeptic.Message = props => <div className={`${props.className || 'sc-message'} ${props.type || 'unknown'}`}>{props.children}</div>;

const TypingEllipses = props => {
  return (
    <Skeptic.Message type={props.type || "outgoing"}>
      <div className="sc-bubble sc-text">
      <small className="sc-source-name">{props.username}</small>
      <div className="sc-bubble-content">
        <small className="fa fa-circle" style={{
          opacity: props.count >= 1 ? 1 : 0
        }} />&nbsp;
        <small  className="fa fa-circle" style={{
          opacity: props.count >= 2 ? 1 : 0
        }} />&nbsp;
        <small  className="fa fa-circle" style={{
          opacity: props.count >= 3 ? 1 : 0
        }} />
      </div>
    </div>
  </Skeptic.Message>
  )
}
