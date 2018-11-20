var express = require('express');
var app = express();

app.set('port', process.env.PORT || 5000);

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const host = !process.env.NODE_ENV || process.env.NODE_ENV === 'dev' ? "localhost:5000" : 'dataskeptic.com';

// Site/Routing
app.use(express.static(`${__dirname}/build`));
app.use((req, res) => res.sendFile(`${__dirname}/build/index.html`));

app.listen(app.get('port'), () => {
  console.log(`Server is running at "${host}" on port "${app.get('port')}`);
});
