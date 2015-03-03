var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Employees = require('../models/Employees.js');
var Hours = require('../models/Hours.js');

/* GET /employees listing. */
router.get('/', function (req, res, next) {
    Employees.find(function (err, employees) {
        if (err) return next(err);
        res.json(employees);
    });
});

/* GET /employees/id */
router.get('/:id', function (req, res, next) {
    Employees.findById(req.params.id, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* GET employee hours /employees/id/hours */
router.get('/:id/hours', function (req, res, next) {
    Hours.where({employee_id : req.params.id}).find(function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});


/* POST /employees */
router.post('/', function (req, res, next) {
    Employees.create(req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* PUT /employees/:id */
router.put('/:id', function (req, res, next) {
    Employees.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* DELETE /employees/:id */
router.delete('/:id', function (req, res, next) {
    Employees.findByIdAndRemove(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

module.exports = router;