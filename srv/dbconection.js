'use strict';

const express = require('express');
const bodyp = require('body-parser');
var mongoC = require('mongoose');
var usuario = require('./models/user');
const app = express();
var server;
var database;

app.use(bodyp.json());

const config = {
  useNewUrlParser: true,
};

mongoC.Promise = global.Promise;

mongoC.connect('mongodb://localhost:27017/red', config, function (err, db) {
    if (err) throw err;
  }).then(() => console.log('connection succesful')).catch((err) => console.error(err,'no primise'));

app.post('/srv', async (req, res) => {
  const {username, passwd} = req.body;
  const resp = await  usuario.findOne({username, passwd});
  if(!resp){
    res.send({"status": "failed"});
    console.log('mongo no hayo nada');
  }else{
    console.log(resp, 'esto hayo mongo');
    res.send({status: 'ok',user: resp.username,name:  resp.name});
  }
});

server = app.listen(3551, () => console.log('Server runing'));

function closeapp() {
  server.close();
}
