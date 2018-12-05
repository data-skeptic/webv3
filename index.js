const express = require('express');
const app = express();
const routes = require('./routes');

const host = !process.env.NODE_ENV || process.env.NODE_ENV === 'dev' ? 'localhost:5000' : 'data-skeptic.com';
const port = process.env.PORT || 5000;
const bodyParser = require('body-parser');

app.set('host', host);
app.set('port', port);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes
app.use('/', routes);

// Static Route
app.use(express.static(`${__dirname}/build`));
app.use((req, res) => res.sendFile(`${__dirname}/build/index.html`));

// Listen
app.listen(port, () => {
  console.log(`Express Server is running at "${(host.replace(/[:\d]+$/, ''))}" on port "${port}"`);
});
