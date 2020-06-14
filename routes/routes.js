//import modules
const multer = require('multer');
const path = require('path');
var express = require('express');
var router = express();
//import controllers
const watchController = require('../controllers/users');

//import models
const Watch = require('../model/user');


//get All
router.get('/quanlyuser', watchController.getAll);
//get Watch
router.get('/edit/:id', watchController.getUsers);
//edit
router.post('/edit', watchController.edit);
//delete
router.get('/delete/:id', watchController.delete);



//cấu hình multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({
    storage: storage,
    //kiểm tra định dạng ảnh tải lên
    fileFilter: function (req, file, callback) {
        var ext = path.extname(file.originalname);
        if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
            return callback(new Error('Only images are allowed'));
        }
        callback(null, true);
    },
    limits: {
        fileSize: 1024 * 1024 * 5,//giới hạn filesize = 5Mb
    },
});

//thêm dữ liệu vào mongoDB
router.post('/signup', (request, response) => {
    let watch = new Watch({
        name: request.body.name,
        email: request.body.email,
        password: request.body.password,
        password2: request.body.password2,
    });

    watch.save(function (err) {
        if (err) {
            console.log(err);
            return;
        } else {
            response.redirect('/login');
        }
    });
});
module.exports = router;
