//Imports/requires
const db = require('../index');
const Sequelize = require('sequelize');

const Student = db.define('student', {
    name: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    },
    photo: {
        type: Sequelize.STRING
    }
})

module.exports = Student;
