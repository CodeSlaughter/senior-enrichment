'use strict'
const express = require('express');
const router = express.Router();
const models = require('../db/models');
const Student = models.Student;
const Campus = models.Campus;

router.get('/', (req, res, next) => {
    Student.findAll({
        include: [
            { model: Campus, as: 'campus' }
        ]
    })
        .then(students => res.json(students))
        .catch(next);
});

router.post('/', (req, res, next) => {
    Student.create(req.body, {
        include: [
            { model: Campus, as: 'campus' }
        ]
    })
        .then((student) => {
            res.status(201).json(student);
        })
        .catch(next);
});

router.get('/:studentid', (req, res, next) => {
    Student.findById(req.params.studentid, {
        include: [
            { model: Campus, as: 'campus' }
        ]
    })
        .then(student => res.json(student))
        .catch(next);
});

router.put('/:studentid', (req, res, next) => {
    Student.update(req.body, {
        where: {
            id: req.params.studentid
        }
    })
        .then((student) => {
            res.status(201).json(student);
        })
        .catch(next);
});

router.delete('/:studentid', (req, res, next) => {
    Student.destroy({
        where: {
            id: req.params.studentid
        }
    })
        .catch(next);
})

module.exports = router;
