const api = require('express').Router();

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') require('dotenv').load();
const expressGa = require('express-ga-middleware')(process.env.GA_TRACKING_ID);

// API Gateway
api.get((req, res, next) => {
  expressGa.event({
    category: 'API',
    action: 'GET',
    label: req.originalUrl,
  })(req, res, next);
  console.log('GET API Access @', new Date().getTime(), req.originalUrl);
  next();
});
api.post((req, res, next) => {
  expressGa.event({
    category: 'API',
    action: 'POST',
    label: req.originalUrl,
  })(req, res, next);
  console.log('GET API Access @', new Date().getTime(), req.originalUrl);
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
