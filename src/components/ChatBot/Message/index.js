import React, { Component } from 'react'
import YouTube from 'react-youtube'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import SpotifyPlayer from 'react-spotify-player'
import ReactMarkdown from 'react-markdown'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
// import google_logo from '../assets/images/google-logo.svg'

const Text = props => {
  let text = props.message.replace(/[\s]{0,}(\\n){1,}[\s]{0,}/gi, '\\n').split(/\\n/);
  return (
    <div className="sc-bubble sc-text" key={props.index}>
      {props.source && <small className="sc-source-name">{props.source}</small>}
      <div className="sc-bubble-content">{text.map((message, i) => <p style={i == text.length - 1 ? {marginBottom: '0'} : {}} key={i}>{message}</p>)}</div>
      {props.timestamp && <small className="sc-timestamp"><em>{props.timestamp}</em></small>}
    </div>
  )
}

class SingleSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: false,
    };
  }
  onSelect(selected, message) {
    const { onSelect } = this.props;
    return () => {
      this.setState({ selected });
      onSelect(message);
    };
  }
  render() {
    const { source, options, index } = this.props;
    const { selected } = this.state;
    return (
      <div className="sc-select" key={index}>
        {source && <small className="sc-source-name">{source}</small>}
        {options.map((option, o) => <button className={`btn btn-${selected === false || selected === o ? 'warning' : 'default'}`} disabled={selected !== false} key={o} onClick={this.onSelect(o, option)}>{option}</button>)}
      </div>
    );
  }
}

const Image = props => {
  const url = props.url || '#'
  return (
    <div className="sc-image" key={props.index}>
      {props.source && <small className="sc-source-name">{props.source}</small>}
      <img src={url} />
    </div>
  )
}

const Markdown = props => {
  const { message, source, timestamp } = props;
  return (
    <div className="sc-bubble sc-markdown">
      {source && <small className="sc-source-name">{source}</small>}
      <div className="sc-bubble-content">
        <ReactMarkdown source={message} />
      </div>
      {timestamp && <small className="sc-timestamp"><em>{timestamp}</em></small>}
    </div>
  );
};

const YoutubeEmbed = props => {
  var videoId = props.message//.videoid
  console.log({props})
  var opts = {
    playerVars: { // https://developers.google.com/youtube/player_parameters
      autoplay: 0
    }
  }
  return (
    <div className="sc-youtube-embed" key={props.index}>
      <YouTube
        videoId={videoId}
        opts={opts}
      />
    </div>
  )
}

const oEmbed = props => {
  var oe = props.message
  console.log({oe})
  if (oe == "Missing o-embed details") {
    // TODO: make this more formal error passing [**]
    return (
      <div className="sc-o-embed" key={props.index}>
        Oh no, an error has occurred.
      </div>
    )
  }
  var html = oe['html']
  var htmlw = { "__html": html }
  var width = oe['width']
  var height = oe['height']
  return (
    <div className="sc-o-embed" key={props.index}>
      <div dangerouslySetInnerHTML={ htmlw } />
    </div>
  )
}

class DateTimeInput extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <button
        className={this.props.classString}
        onClick={this.props.onClick} disabled={this.props.disabled}>
        {this.props.value}
      </button>
    )
  }
}

class DateTimePick extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      disabled: false
    };
  }

  handleEvent(event_name, event_data) {
    switch (event_name) {
      case 'ON_DATE_CHANGE':
        return date => {
          let dt = new Date(date.toDateString() + " " + this.state.date.getHours() + ":" + this.state.date.getMinutes()) //only change date
          this.setState({date: dt});
          (this.props.onChange || (() => {}))(date);
        };
      case 'ON_TIME_CHANGE':
        return date => {
          let dt = new Date(this.state.date.toDateString() + " " + date.getHours() + ":" + date.getMinutes()) //only change time
          this.setState({date: dt});
          (this.props.onChange || (() => {}))(date);
        };
      case 'ON_SUBMIT':
        return event => {
          this.setState({disabled: true});
          (this.props.onSubmit || (() => {}))({
            // text: this.state.date.getTime().toString(),
            calendar_response: {
              date: this.state.date,
              socket: this.props.socket
            }
          });
        };
    }
  }

  render() {
    const {date, disabled} = this.state
    return (
      <span className="sc-date-time-wrapper">
            <DatePicker
              value={date.toLocaleString(undefined, {year: 'numeric', month: '2-digit', day: '2-digit'})}
              customInput={<DateTimeInput classString="btn btn-primary date-time-input sc-left-round"/>}
              disabled={disabled}
              onChange={this.handleEvent('ON_DATE_CHANGE')}
              shouldCloseOnSelect={false}
              popperModifiers={{
                offset: {
                  enabled: true,
                  offset: '-50px, 0px'
                },
                preventOverflow: {
                  enabled: true,
                  escapeWithReference: false,
                  boundariesElement: 'scrollParent'
                }
              }}
            />
            <DatePicker
              value={date.toLocaleString(undefined, {hour: 'numeric', minute: 'numeric'})}
              customInput={<DateTimeInput classString="btn btn-primary date-time-input sc-mid-round"/>}
              onChange={this.handleEvent('ON_TIME_CHANGE')}
              disabled={disabled}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={30}
              shouldCloseOnSelect={false}
              popperModifiers={{
                offset: {
                  enabled: true,
                },
                preventOverflow: {
                  enabled: true,
                  escapeWithReference: false,
                  boundariesElement: 'scrollParent'
                }
              }}
            />
            <button className="btn btn-primary sc-right-round" onClick={this.handleEvent('ON_SUBMIT')}
                    disabled={disabled}>Submit</button>
          </span>
    )
  }
}

class GoogleAuth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: false,
      url: props.url
    };
  }

  handleClick = () => {
    if (!this.state.disabled) {
      window.open(this.state.url, "Google Auth", `menubar=no, toolbar=no, width=500, height=800, top=${(window.innerHeight / 2) - 400}, left=${(window.innerWidth / 2) - 250}`)
      this.setState({disabled: true});
    }
  }

  render() {
    return (
      <div className="sc-google-auth-btn">
        <button className="btn" disabled={this.state.disabled} onClick={() => this.handleClick()}>
          <img src={google_logo}></img>Sign in with Google
        </button>
      </div>
    )
  }
}

const Spotify = props => {
  var spotify = props.message
  var uri = spotify['uri']
  const size = {
    width: '100%',
    height: 300,
  };
  const view = 'list'; // or 'coverart'
  const theme = 'black'; // or 'white'
  var uri = spotify['uri']
  return (
    <div className="sc-spotify" key={props.index}>
      <SpotifyPlayer
        uri={uri}
        size={size}
        view={view}
        theme={theme}
      />
    </div>
  )
}

class RangeSlider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
      disabled: props.disabled !== undefined
    };
  }
  handleEvent(event_name, event_data) {
    switch(event_name) {
      case 'ON_CHANGE':
        return value => {
          this.setState({ value });
          ( this.props.onChange || (() => {}))(value);
        };
      case 'ON_SUBMIT':
        return event => {
          this.setState({ disabled: true });
          ( this.props.onSubmit || (() => {}))(this.state.value);
        };
    }
  }
  render() {
    const { min, max, step, title } = this.props
    const { value } = this.state
    return (
      <div className="sc-slider" style={{
        height: '50px',
        margin: '12px 0',
      }}>
        {title && <h2 style={{
          marginTop: '0',
          paddingTop: '0'
        }}>{title}</h2>}
        <div className="sc-slider-wrapper">
          <Slider
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={this.handleEvent('ON_CHANGE')}
            disabled={this.state.disabled}
          />
        </div>
        {!this.state.disabled && <a className="btn btn-primary" onClick={this.handleEvent('ON_SUBMIT')}>Done</a>}
      </div>
    );
  }
}

const Message = { Text, SingleSelect, Image, Markdown, YoutubeEmbed, oEmbed,  DateTimePick, GoogleAuth, Spotify, RangeSlider };

export default Message
