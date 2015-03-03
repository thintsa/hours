var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Categories = require('../models/Categories.js');

/* GET /categories listing. */
router.get('/', function (req, res, next) {
    Categories.find(function (err, categories) {
        if (err) return next(err);
        res.json(categories);
    });
});

/* GET /categories/id */
router.get('/:id', function (req, res, next) {
    Categories.findById(req.params.id, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});


/* POST /categories */
router.post('/', function (req, res, next) {
    Categories.create(req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* PUT /categories/:id */
router.put('/:id', function (req, res, next) {
    Categories.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* DELETE /categories/:id */
router.delete('/:id', function (req, res, next) {
    Categories.findByIdAndRemove(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

module.exports = router;