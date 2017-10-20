'use strict'
const express = require('express');
const router = express.Router();
const models = require('../db/models');
const Campus = models.Campus;
const Student = models.Student;


router.get('/', (req, res, next) => {
    Campus.findAll()
        .then(campuses => res.json(campuses))
        .catch(next);
});

router.post('/', (req, res, next) => {
    Campus.create(req.body)
        .then((campus) => {
            res.status(201).json(campus);
        })
        .catch(next);
});

router.get('/:campusid/students', (req, res, next) => {
    Student.findAll({
        where: {
            campusId: req.params.campusid
        }
    })
        .then((students) => {
            res.json(students)
        })
        .catch(next);
});

router.get('/:campusid', (req, res, next) => {
    Campus.findById(req.params.campusid)
        .then(campus => res.json(campus))
        .catch(next);
});

router.put('/:campusid', (req, res, next) => {
    Campus.update(req.body, {
        where: {
            id: req.params.campusid
        }
    })
        .then((campus) => {
            res.status(201).json(campus);
        })
        .catch(next);
});

router.delete('/:campusid', (req, res, next) => {
    Campus.destroy({
        where: {
            id: req.params.campusid
        }
    })
    .catch(next);
})

module.exports = router;
