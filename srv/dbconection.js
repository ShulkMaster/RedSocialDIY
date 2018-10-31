const express = require('express');
const app = express();
const bodyp = requiere('body-parser');

app.use(bodyp.json());

app.post('/mongo/db', (req, res) =>{
  console.log(req.body);
  const {username, password} = req.body;

});

app.listen(3551, () => console.log('Server runing'));