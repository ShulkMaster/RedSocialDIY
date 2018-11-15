'use strict';

const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const mongoC = require('mongoose');
const logger = require('morgan');
const MongoStore = require('connect-mongo')(session);
const usuario = require('./models/user');
const publicacion = require('./models/publicacion');
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
    maxAge: 1000 * 60 * 60 * 24
  }
}));

app.get('/srv/login', function (req, res) {
  console.log('data almacendad en sesion', req.session);
  if (req.session.userdata) {
    res.json({
      status: true,
      userdata: req.session.userdata
    });
  } else {
    res.json({
      status: false,
      error: 'Session not found'
    });
  }
});

app.post('/srv/login', async function (req, res) {
  const { username, passwd } = req.body;
  const reduser = await usuario.findOne({ username, passwd });
  if (!reduser) {
    res.json({ status: false, error: 'User not found or wrong password' });
    console.log('User not found', username);
  } else {
    console.log('Query result', reduser);
    req.session.userdata = reduser;
    res.json({
      status: true,
      userdata: reduser
    });
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

app.get('/srv/posts', (req, res) => {
  console.log('get to /srv/posts whit:  ', req.session);
  console.log('get to /srv/posts whit:', req.user);
  publicacion.find({}, { '_id': false }, function (err, docs) {
    if (err) {
      console.log('Error', err);
      res.json({ status: false, error: 'No se pudo optener data' });
    } else {
      res.json({ status: true, data: docs });
    }
  }).sort(
    {
      "views": -1.0
    }
  ).limit(10);
});


server = app.listen(3551, () => console.log('Server runing'));

function closeapp() {
  server.close();
}