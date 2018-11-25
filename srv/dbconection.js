'use strict';

const express = require('express');
const session = require('express-session');
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

app.get('/srv/login', async function (req, res) {
  console.log('data almacendad en sesion', req.session);
  if (req.session.username) {
    const reduser = await usuario.findOne({ username: req.session.username });
    console.log('esta data se envia desde cookie en DB', reduser);
    res.json({
      status: true,
      userdata: reduser
    });
  } else {
    res.json({
      status: false,
      error: 'Session not found'
    });
  }
});

app.delete('/srv/logout', async function (req, res) {
  console.log('data almacendad en sesion borrar', req.session);
  if (req.session.username) {
    req.session.destroy(err => {
      if (err) {
        req.session = null;
        res.json({
          status: false,
          error: err
        });
      } else {
        req.session = null;
        res.json({
          status: true,
          error: 'todo bien'
        });
      }
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
    req.session.username = reduser.username;
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

app.post('/srv/posts', (req, res) => {
  console.log('post to /srv/posts whit user:', req.user);
  console.log('post to /srv/posts whit lastindex:', req.body.lastOne);
  const oldIndex = parseInt(req.body.lastOne,10);
  console.log('El ultimo index es: ', oldIndex);
    publicacion.aggregate([
    {"$match": {"publish": true}},
    {"$project": {"autorid":{"$toObjectId":"$autorid"},"publicacion": "$$ROOT"}},
    {"$lookup": {
        "localField": "autorid",
        "from": "usuarios",
        "foreignField": "_id",
        "as": "autor"
    }},
    {"$unwind":{"path": "$autor","preserveNullAndEmptyArrays": false}},
    {"$project": {
        "_id": "$_id",
        "autor.id": "$autorid",
        "autor.username": "$autor.username",
        "autor.propicture": "$autor.propicture",
        "titulo": "$publicacion.titulo",
        "resumen": {
          "$arrayElemAt": [
            "$publicacion.contenido.parrafos",
            0.0
          ]
        },
        "views": "$publicacion.views",
        "tags": "$publicacion.tags"}},
        {"$sort":{"views": -1.0}},
    {"$skip": oldIndex},
    {"$limit": 10.0}]).option({ "allowDiskUse": true }).exec(function (err, docs) {
      if (err) {
        console.log('Error', err);
        res.json({ status: false, error: err });
      } else {
        res.json({ status: true, data: docs });
      }
    });
});


server = app.listen(3551, () => console.log('Server runing'));

function closeapp() {
  server.close();
}