const mongoC = require('mongoose');

const UserModel = new mongoC.Schema({
    email: {type: String, required:true, unique:true},
    name:  {type: String},
    username: {type: String, required:true, unique:true},
    passwd: {type: String, required:true},
    age: Number,
    favcolor: {type: {r: Number, g: Number, b: Number}, default: {r:20, g: 120, b: 130}},
    propicture: {type: String, default: 'http://files.sovize.com/wp-content/uploads/2018/11/default_user.png'}
});

const userTemplate = mongoC.model('usuarios', UserModel);
module.exports = userTemplate;