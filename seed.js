'use strict';

const chance = require('chance')(123);
const toonAvatar = require('cartoon-avatar');
const Promise = require('bluebird');

const db = require('./db');
const Student = require('./db/models/student');
const Campus = require('./db/models/campus');

const numStudents = 100;
const numCampuses = 15;

const emails = chance.unique(chance.email, numStudents);

function doTimes (n, fn) {
  var results = [];
  while (n--) {
    results.push(fn());
  }
  return results;
}

function randPhoto (gender) {
  gender = gender.toLowerCase();
  var id = chance.natural({
    min: 1,
    max: gender === 'female' ? 114 : 129
  });
  return toonAvatar.generate_avatar({ gender: gender, id: id });
}

function randStudent (createdCampuses) {
  var campus = chance.pick(createdCampuses)
  var gender = chance.gender();
  return Student.build({
    name: [chance.first({gender: gender}), chance.last()].join(' '),
    photo: randPhoto(gender),
    email: emails.pop(),
    campusId: campus.id
  });
}

function randCampus () {
    return Campus.build({
      name: randCity(),
    });
  }

function randCity () {
  return chance.city()
}

function generateCampuses(){
    return doTimes(numCampuses, function(){
      return randCampus()
    });
  }
  function createCampuses () {
    return Promise.map(generateCampuses(), function (campus) {
      return campus.save();
    });
  }
  
  function generateStudents(createdCampuses){
    return doTimes(numStudents, function(){
      return randStudent(createdCampuses)
    })
  }
  
  
  function createStudents (createdCampuses) {
    return Promise.map(generateStudents(createdCampuses), function (student) {
      return student.save();
    });
  }
  
  function seed () {
    return createCampuses()
    .then(function (createdCampuses) {
      return createStudents(createdCampuses);
    });
  }

console.log('Syncing database');

db.sync()
.then(function () {
  console.log('Seeding database');
  return seed();
})
.then(function () {
  console.log('Seeding successful');
}, function (err) {
  console.error('Error while seeding');
  console.error(err.stack);
})
.finally(function () {
  db.close();
  return null;
});

//{force: true}