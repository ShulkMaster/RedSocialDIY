'use strict';

const express = require('express');
const session = require('express-session');
//const bodyp = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoC = require('mongoose');
const logger = require('morgan');
//const passport = require('passport');
const MongoStore = require('connect-mongo')(session);
//const LocalStrategy = require('passport-local').Strategy;
const usuario = require('./models/user');
const app = express();
var server;

const config = {
  useNewUrlParser: true,
};

mongoC.Promise = global.Promise;

const URIS = 'mongodb://sovizeapp:O%2389tiOUsrG%24%2FWS65EG6GGwsE@142.93.252.111:35059/red';
console.log(URIS);
mongoC.connect(URIS, config, function (err, db) {
  if (err) throw err;
}).then(() => console.log('connection succesful')).catch((err) => console.error(err, 'no primise'));



app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(session({
  secret: 'sodsgsdgsdgsgsd',
  name: 'usersesion',
  store: new MongoStore({ mongooseConnection: mongoC.connection }),
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000*60*60*24
  }
}));

//app.use(passport.initialize());
//app.use(passport.session());

//passport.use(usuario.createStrategy());
//passport.serializeUser(usuario.serializeUser());
//passport.deserializeUser(usuario.deserializeUser());


app.post('/srv/prueba', async function (req, res) {
  const { username, passwd } = req.body;
  const reduser = await usuario.findOne({ username, passwd });
  if (!reduser) {
    res.json({ status: false, error: 'User not found or wrong password' });
    console.log('User not found', username);
  } else {
    console.log('Query result', reduser);
    res.json({
      status: true,
      userdata: {
        username: reduser.username,
        name: reduser.name,
        age: reduser.age,
        favcolor: reduser.favcolor,
        propicture: reduser.propicture
      }
    });
    req.user = reduser;
  }
});

app.post('/srv', async (req, res) => {
  const { username, passwd } = req.body;
  const reduser = await usuario.findOne({ username, passwd });
  if (!reduser) {
    res.json({ status: false, error: 'User not found or wrong password' });
    console.log('User not found', username);
  } else {
    console.log('Query result', reduser);
    res.json({
      status: true,
      userdata: {
        username: reduser.username,
        name: reduser.name,
        age: reduser.age,
        favcolor: reduser.favcolor,
        propicture: reduser.propicture
      }
    });
    req.user = reduser;
  }
});

app.post('/srv/register', async (req, res) => {
  console.log(req.body);
  const correo = req.body.email;
  const usuarion = req.body.username;
  const password = req.body.passwd;
  if (correo && usuarion && password) {
    new usuario({ email: correo, username: usuarion, passwd: password }).save(
      function (err) {
        if (err) {
          res.json({ status: false, messege: 'No se pudo guardar el usuario, Uno o mas valores unicos han sido repetidos' });
          console.log('No se guardo el usuario', usuarion, err);
        } else {
          res.json({ status: true, messege: 'usuario creado con exito' });
        }
      }
    );
  } else {
    res.json({
      status: false,
      messege: 'uno o mas datos faltan en el servidor: requeridos'
    });
    console.log('User not created', username);
  }
});

app.get('/srv/posts', async (req, res) => {
  console.log('to post session ', req.session);
  console.log('to post user:', req.user);
  res.json({ info: 'usuerdata', data: req.session.userdata });
});


server = app.listen(3551, () => console.log('Server runing'));

function closeapp() {
  server.close();
}