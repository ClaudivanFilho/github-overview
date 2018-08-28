const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const session = require('express-session');

const isProduction = process.env.NODE_ENV === 'production';

app.use(express.static(path.join(__dirname, 'build')));
if (isProduction) {
  app.set('trust proxy', 1);
}
app.use(session({
  secret: 'github-overview',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: isProduction },
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require('./routes')(app);

app.listen(process.env.PORT || 8080);
console.log('Server started in the address localhost:8080');
