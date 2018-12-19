const initialState = {
  src: false,
  art: 'https://s3.amazonaws.com/dataskeptic.com/img/primary-logo-400.jpg',
  title: 'Detecting Fast Radio Bursts with Deep Learning',
  subtitle: 'Kyle',
};

const PlayerReducer = (nextState = initialState, action) => {
  let state = Object.assign({}, nextState);
  switch (action.type) {
    case "persist/REHYDRATE":
      state = nextState;
      break;
    case 'PLAYER:LOAD':
      var { title, subtitle, src, art } = action.payload;
      state.title = title || state.title;
      state.subtitle = subtitle || state.subtitle;
      state.src = src || state.src;
      state.art = art || state.art;
      state.playing = false;
      break;
    case 'PLAYER:PLAY':
      var { title, subtitle, src, art } = action.payload;
      state.title = title || state.title;
      state.subtitle = subtitle || state.subtitle;
      state.src = src || state.src;
      state.art = art || state.art;
      state.playing = true;
      break;
    case 'PLAYER:PAUSE':
      state.playing = false;
      break;
    default:
      break;
  }
  return state;
};

export default PlayerReducer;
