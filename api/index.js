const api = require('express').Router();

// API Gateway
api.get('*', (req, res, next) => {
  /*
    Any time an API is accessed, this route will fire before passing
    control on to the next handler.

    This can be used for basic API logging and analytics.
  */
  console.log('API Access @ ', new Date().getTime());
  next();
});

// Test Title
api.get('/test', (req, res) => {
  res.send('Testing api');
});
api.get('/test/two', (req, res) => {
  res.send('Testing api 2');
});

module.exports = api;
