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

mongoC.connect('mongodb://localhost:27017/red', config, function (err, db) {
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
  /*
  const { email, passwd } = req.body;
  const userdata = await usuario.save({ username, passwd });
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
  }*/
  console.log(req.body);
  res.json({status: true, messege: 'fackiu man'});
});

server = app.listen(3551, () => console.log('Server runing'));

function closeapp() {
  server.close();
}
