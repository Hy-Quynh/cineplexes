const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieSession = require('cookie-session');
const path = require('path');
// const expressLayouts = require('express-ejs-layouts');
// const flash = require('connect-flash');

const db = require('./model/connect');
const authMiddleware = require('./middlewares/auth');
const homeRouter = require('./routes/index');
const moviesRouter = require('./routes/movies');
const usersRouter = require('./routes/users');
const ticketsRouter = require('./routes/tickets');
const adminRouter = require('./routes/admin');

const app = express();

app.set('views', './views');
app.set('view engine', 'ejs');

app.use(cookieSession({
  name: 'session',
  keys: [process.env.COOKIE_KEY || 'DOAN'],

  // Cookie Options
  maxAge: 4 * 7 * 24 * 60 * 60 * 1000
}));
// Connection
require("dotenv").config();
// App
// app.use(flash());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, './public')));
app.use(authMiddleware);
// app.use(expressLayouts);

app.use('/', homeRouter);
app.use('/movies', moviesRouter);
app.use('/user', usersRouter);
app.use('/ticket', ticketsRouter);
app.use('/admin', adminRouter);

db.sync().then(function (){
  const port = process.env.PORT || 3000;
  console.log(`Server is listening on port ${port}`);
  app.listen(port);
}).catch(console.error);
