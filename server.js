const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieSession = require('cookie-session');

const db = require('./model/connect');
const homeRouter = require('./routes/index');
const moviesRouter = require('./routes/movies');
const usersRouter = require('./routes/users');

const app = express();

app.set('views', './views');
app.set('view engine', 'ejs');

app.use(cookieSession({
  name: 'session',
  keys: [process.env.COOKIE_KEY || 'DOAN'],

  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));
// Connection
require("dotenv").config();
// App
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + './public'));

app.use('/api', homeRouter);
app.use('/api/movies', moviesRouter);
app.use('/api/user', usersRouter);

db.sync().then(function (){
  const port = process.env.PORT || 3001;
  console.log(`Server is listening on port ${port}`);
  app.listen(port);
}).catch(console.error);
