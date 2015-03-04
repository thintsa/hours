var express = require('express');
var router = express.Router();
var multer  = require('multer'); // for multipart form handling at image upload

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {});
});

// image upload
router.post('/upload', [ multer({ dest: './public/images/upload/'}), function (req, res) {
    console.log(req.files);
    var fs = require('fs');

    var webpath = '/images/upload/';

    var filename = req.files.imageupload.path;
    filename = filename.substring(filename.lastIndexOf('/') + 1);

    var output = {
        filename: webpath + filename
    };

    //XXX: delay to ensure the thumbnail image is written to disk
    setTimeout(function () {
        res.send(JSON.stringify(output));
    }, 500);
}]);

module.exports = router;
