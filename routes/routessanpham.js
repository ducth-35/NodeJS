//import modules
const multer = require('multer');
const path = require('path');
var express = require('express');
var router = express();
//import controllers
const sanphamController = require('../controllers/sanphamcontrollers');

//import models
const Sanphammodel = require('../model/sanpham');

//get All
router.get('/quanlysanpham', sanphamController.getAll);
//get Watch
router.get('/editsanpham/:id', sanphamController.getsanpham);
//edit
router.post('/editsanpham', sanphamController.editsanpham);
//delete
router.get('/deletesanpham/:id', sanphamController.deletesanpham);



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
    //kiểm tra file upload có phải là hình ảnh hay không
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


//upload thông tin sản phẩm và ảnh vào bảng sản phẩm
router.post('/uploads', upload.single('image'), (request, response) => {
    let sanphammodel = new Sanphammodel({
        tensanpham: request.body.tensanpham,
        price: request.body.price,
        mausac: request.body.mausac,
        description:request.body.description,
        theloai: request.body.theloai,
        image: request.file.originalname, //chỉ lấy tên file upload
    });

    sanphammodel.save(function (err) {
        if (err) {
            console.log(err);
            return;
        } else {
            response.redirect('/quanlysanpham');
        }
    });
});
module.exports = router;
