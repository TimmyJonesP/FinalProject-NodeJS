const mongoConnect = require('../../db');
const { PERSISTANCE } = require('../config/factory.config')

let DAO;

switch (PERSISTANCE) {
    case 'Mongo':
        const connection = mongoConnect()
        const MongoDAO = require('./mongo/products.dao')
        DAO = new MongoDAO();
        break;
    case 'FileSystem':
        const FileSystemDAO = require('./filemanager.dao');
        DAO = new FileSystemDAO();
        break;
    default:
        throw new Error('Tipo de persistencia no válido');
}

module.exports = DAO;