const routes = require('express').Router();
const api = require('./api');

// API Controller
routes.use('/api', api);

module.exports = routes;
