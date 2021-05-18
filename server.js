const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieSession = require('cookie-session');

const db = require('./model/connect');
const homeRouter = require('./routes/home/index');

const app = express();

app.use(cookieSession({
  name: 'session',
  keys: [process.env.COOKIE_KEY || 'DOAN'],

  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + './public'));


// app.get('/', function(req, res){
//   res.send("Rendering file");
// });
app.use('/home', homeRouter);

db.sync().then(function (){
  const port = process.env.PORT || 3000;
  console.log(`Server is listening on port ${port}`);
  app.listen(port);
}).catch(console.error);
