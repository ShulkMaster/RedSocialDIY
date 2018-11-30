'use strict';

const express = require('express');
const session = require('express-session');
const mongoC = require('mongoose');
const logger = require('morgan');
const MongoStore = require('connect-mongo')(session);
const usuario = require('./models/user');
const publicacion = require('./models/publicacion');
const path = require('path');
const app = express();
var server;

const config = {
  useNewUrlParser: true,
};

mongoC.Promise = global.Promise;

const URIS = process.env.Mongo;
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
app.use(express.static(path.join(__dirname, '../dist/RedSocialDIY/')));

app.get('/srv/login', async function (req, res) {
  console.log('data almacendad en sesion', req.session);
  if (req.session.username) {
    const reduser = await usuario.findOne({ 'username': req.session.username });
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
    req.session._id = reduser._id;
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

app.get('/srv/posts/:index', (req, res) => {
  console.log('post to /srv/posts whit user:', req.user);
  console.log('post to /srv/posts whit lastindex:', req.body.lastOne);
  const oldIndex = parseInt(req.params.index,10);
  console.log('El ultimo index es: ', oldIndex);
    publicacion.aggregate([
    {"$match": {"publish": true}},
    {"$lookup": {
        "localField": "autorid",
        "from": "usuarios",
        "foreignField": "_id",
        "as": "autor"
    }},
    {"$unwind":{"path": "$autor","preserveNullAndEmptyArrays": false}},
    {"$project": {
        "_id": "$_id",
        "titulo": "$titulo",
        "autor.id": "$autorid",
        "autor.username": "$autor.username",
        "autor.propicture": "$autor.propicture",
        "resumen": "$resumen",
        "views": "$views",
        "tags": "$tags"}},
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

app.get('/srv/posts/:user/:name', async (req, res) => {
  const username = req.params.user;
  const postname = req.params.name;
  console.log('Buscando publicacion de: ', username, ', nombre del posates: ', postname);
  const data = await usuario.aggregate([
    {"$match": {"username": username}},
    {"$lookup": {
        "localField": "_id",
        "from": "publicaciones",
        "foreignField": "autorid",
        "as": "tutorial"
    }},
    {"$unwind":{"path": "$tutorial","preserveNullAndEmptyArrays": false}},
    {"$match": {"tutorial.titulo": postname}},
    {"$project": {
      "_id": "$_id",
      "username": "$username",
      "favcolor": "$favcolor",
      "propicture": "$propicture",
      "publicacion": "$tutorial"
    }}
  ]).exec( function (err, docs) {
      if (err) {
        console.log('Error', err);
        res.json({ status: false, error: err });
      } else {
        if (docs.length === 0) {
          res.json({ status: false, data: docs, error: "Usuario sin publicaciones o no existe"});
        }
        else{
        res.json({ status: true, data: docs[0] });
        }
      }
    });
});

app.get('/srv/getauth/:publicacion', (req, res) => {
  console.log('data almacendad en sesion', req.session);
  console.log('data almacendad en PARAMETROS', req.params);
  if (req.session._id) {
    publicacion.findOne({ 'titulo': req.params.publicacion}).then( data => {
      if (data === null ) {
        console.log('ai mandamos false');
        res.json(false);
      } else if (req.session._id === data.autorid) {
        console.log('ai mandamos true');
        res.json(true);
      } else {
        res.json(false);
      }
    }, err => {
      console.log(err);
      res.json(false);
    }); 
  } else {
    console.log('ai mandamos false desde afuera');
    res.json(false);
  }
});

app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, '../dist/RedSocialDIY/index.html'));
});

server = app.listen(3551, () => console.log('Server runing'));

function closeapp() {
  server.close();
}