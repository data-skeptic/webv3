import React, { Component } from 'react';
import { connect } from 'react-redux';
import PlayerReducer from './reducer';

import moment from 'moment';
import ReactHowler from 'react-howler';

import './styles.scss';

import Loading from 'Components/Loading';

class Player extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ready: false,
      playing: false,
      volume: 1,
      progress: 0,
      duration: 0,
      current: props.player.src,
    };
    this.audio = React.createRef();
  }
  static getDerivedStateFromProps(props, state) {
    const { player } = props;
    const { current } = state;
    if (player.src !== current) {
      return {
        ready: false,
        playing: false,
        progress: 0,
        duration: 0,
        current: player.src,
      }
    };
    return null;
  }
  componentDidMount() {
    this.updateInterval = setInterval(() => {
      if (this.audio && this.state.playing) {
        this.setState({
          progress: this.audio.current.seek(),
        });
      }
    }, 1000);
  }
  componentWillUnmount() {
    clearInterval(this.updateInterval);
  }
  handleEvent(event_name, event_data = {}) {
    const { dispatch } = this.props;
    switch(event_name) {
      case 'ON_LOAD':
        return event => {
          const { player } = this.props;
          this.setState({
            ready: true,
            playing: player.playing,
            duration: this.audio.current.duration(),
          })
        };
      case 'ON_END':
        return event => {
          this.setState({
            ready: false,
            playing: false,
            current: false,
          });
          dispatch({ type: 'PLAYER:STOP' });
        };
      case 'STOP_PLAYER':
        return event => {
          dispatch({ type: 'PLAYER:STOP' });
        };
      case 'TOGGLE_PLAY':
        return event => {
          var state = Object.assign({}, this.state);
          state.playing = !state.playing;
          this.setState(state);
        };
      case 'ON_CHANGE':
        return event => {
          const name = event_data.name || event.target.name;
          const value = event_data.value || event.target.value;
          switch(name) {
            case 'progress':
              this.setState({
                progress: value,
              });
              this.audio.current.seek(value);
              break;
            case 'volume':
              this.setState({
                volume: value,
              });
              this.audio.current.volume(value);
              break;
            default:
              break;
          }
          var state = Object.assign({}, this.state);
          state[name] = value;
          this.setState(state);
        };
      default:
        return event => {
          console.warn(this.constructor.name + '::Event', 'No handler for "' + event_name + '" found.', { event_data, event });
        };
    }
  }
  render() {
    const { player } = this.props;
    const { title, subtitle, art, src } = player;
    const { ready, playing, current, volume, progress, duration } = this.state;
    const time = moment.utc(progress * 1000).format("mm:ss") + ' / ' + moment.utc(duration * 1000).format("mm:ss");
    if (!src || !current) return null;
    return (
      <div className={`Player bg-warning shadow${playing ? ' sticky-top' : ''}`}>
        <ReactHowler src={src} playing={playing} ref={this.audio} onLoad={this.handleEvent('ON_LOAD')} onEnd={this.handleEvent('ON_END')} />
        <div className="container-fluid">
          <div className="row player-display">
            <div className="col-sm-4">
              <div className="player-info">
                <img className="player-art thumbnail rounded" src={art} />
                <p className="mb-0">{title}{subtitle && <small>{subtitle}</small>}</p>
              </div>
            </div>
            {ready && (
              <div className="col-sm-5 player-progress">
                <input className="custom-range" type="range" min="0" max={duration} value={progress} onChange={this.handleEvent('ON_CHANGE', { name: 'progress' })} ref={this.progress} />
                <label>{time}</label>
              </div>
            ) || (
              <div className="col-sm-5 text-center player-empty">
                <p className="lead">Loading...</p>
              </div>
            )}
            <div className="col-sm-2">
              <input className="player-volume custom-range" type="range" min="0" max="1" step="0.1" value={volume} onChange={this.handleEvent('ON_CHANGE', { name: 'volume' })} ref={this.volume} />
            </div>
            <div className="col-sm-1 text-center">
              <Loading on={ready}>
                <button className={`player-control btn btn-dark btn-lg${!src ? ' disabled' : ''}`} onClick={this.handleEvent('TOGGLE_PLAY')} disabled={!src}><i className={`fa fa-${!playing ? 'play' : 'pause'}`} /></button>
              </Loading>
              <a className={`player-control pull-right`} onClick={this.handleEvent('STOP_PLAYER')}><i className={`fa fa-times`} /></a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export { PlayerReducer };
export default connect(state => ({
  api: state.api,
  player: state.player,
}))(Player);
