const mongoC = require('mongoose');

const UserModel = new mongoC.Schema({
    name: String,
    username: String,
    passwd: String,
    age: Number,
    favcolor: {r: Number, g: Number, b: Number},
    propicture: String
});

const userTemplate = mongoC.model('usuarios', UserModel);
module.exports = userTemplate;