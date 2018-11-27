const mongoC = require('mongoose');

const contedidoModel = new mongoC.Schema({
    parrafos: [String],
    subtitulos: [String],
    imagenes: [String]
}, { _id: false });

const publicacionModel = new mongoC.Schema({
    titulo: {type: String, required:true},
    autorid:  {type: String, required:true},
    resumen: {type: String},
    contenido: contedidoModel,
    map: {type: Array, required:true},
    publish:  {type: Boolean, default: false},
    version: {type: Number},
    tags: [String],
    views: {type: Number, default: 0}
});

const publicacionTemplate = mongoC.model('publicaciones', publicacionModel);

module.exports = publicacionTemplate;