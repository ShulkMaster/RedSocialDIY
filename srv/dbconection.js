'use strict';

const express = require('express');
const session = require('express-session');
const bodyp = require('body-parser');
const mongoC = require('mongoose');
const usuario = require('./models/user');
const app = express();
var server;

app.use(bodyp.json());
app.use(session({
  secret: 'sodsgsdgsdgsgsd',
  name: 'sessionid',
  resave: false,
  saveUninitialized: false
}));

const config = {
  useNewUrlParser: true,
};

mongoC.Promise = global.Promise;


const URIS = 'mongodb://sovizeapp:O%2389tiOUsrG%24%2FWS65EG6GGwsE@142.93.252.111:35059/red';
console.log(URIS);
mongoC.connect( URIS, config, function (err, db) {
  if (err) throw err;
}).then(() => console.log('connection succesful')).catch((err) => console.error(err, 'no primise'));

app.post('/srv', async (req, res) => {
  const { username, passwd } = req.body;
  const userdata = await usuario.findOne({ username, passwd });
  if (!userdata) {
    res.json({ status: false, error: 'User not found or wrong password' });
    console.log('User not found', username);
  } else {
    console.log('Query result', userdata);
    res.json({
      status: true,
      userdata: {
        username: userdata.username,
        name: userdata.name,
        age: userdata.age,
        favcolor: userdata.favcolor,
        propicture: userdata.propicture
      }
    });
  }
});

app.post('/srv/register', async (req, res) => {
  console.log(req.body);
  const correo  = req.body.email;
  const usuarion = req.body.username;
  const password = req.body.passwd;
  if (correo && usuarion && password) {
    new usuario({email: correo, username: usuarion, passwd: password}).save(
      function(err){
        if(err){
          res.json({ status: false, messege: 'No se pudo guardar el usuario' });
          console.log('No se guardo el usuario', usuarion, err);
        }else{
          res.json({ status: true, messege: 'usuario creado con exito' });
        }
      }
    );
  }else {
    res.json({
      status: false,
      messege: 'uno o mas datos faltan en el servidor: requeridos'
    });
    console.log('User not created', username);
  }
});

server = app.listen(3551, () => console.log('Server runing'));

function closeapp() {
  server.close();
}