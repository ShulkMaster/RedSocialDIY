const mongoC = require('mongoose');

const UserModel = new mongoC.Schema({
    username: String,
    name: String,
    passwd: String,
    age: Number
});

const userTemplate = mongoC.model('usuarios', UserModel);
module.exports = userTemplate;