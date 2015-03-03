var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Hours = require('../models/Hours.js');

/* GET /hours listing. */
router.get('/', function (req, res, next) {
    Hours.find(function (err, hours) {
        if (err) return next(err);
        res.json(hours);
    });
});

/* GET /hours/id */
router.get('/:id', function (req, res, next) {
    Hours.findById(req.params.id, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* POST /hours */
router.post('/', function (req, res, next) {
    Hours.create(req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* PUT /hours/:id */
router.put('/:id', function (req, res, next) {
    Hours.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* DELETE /hours/:id */
router.delete('/:id', function (req, res, next) {
    Hours.findByIdAndRemove(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

module.exports = router;