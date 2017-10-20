//Imports/requires
const db = require('../index');
const Sequelize = require('sequelize');

const Campus = db.define('campus', {
    name: {
        type: Sequelize.STRING
    },
    image: {
        type: Sequelize.STRING
    }
})

module.exports = Campus;
