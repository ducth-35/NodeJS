let express = require('express')
let hbs = require('express-handlebars');
let mongoose = require('mongoose');
let routes = require('./routes/routes.js');
let routesanpham = require('./routes/routessanpham');
var Admin = require('./model/user');


mongoose.connect('mongodb+srv://duc123:duc123@cluster0-gqbxl.gcp.mongodb.net/test?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(function (conn) {
        console.log('Kết nối tới mongoDB thành công !!!')
    })


let app = express();

app.use(express.static('uploads'));
app.use(express.static('views'));
app.use(express.static('uploads'));
let bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(routes);
app.use(routesanpham);

//cầu hình handlebars
app.engine('.hbs', hbs({
    extname: 'hbs',
    defaultLayout: '',
    layoutsDir: '',
}));

app.set('view engine', '.hbs')

app.get('/', function (req, res) {
    res.render('login');
});
app.listen(5000);

app.get('/quanlysanpham', function (req, res) {
    res.render('quanlysanpham');
});
app.get('/formsanpham', function (req, res) {
    res.render('formsanpham');
})
app.get('/formdulieu', function (req, res) {
    res.render('formdulieu');
});
app.get('/modelsanpham', function (req, res) {
    res.render('formdulieu');
})
app.get('/login', function (req, res) {
    res.render('login');
});
app.get('/signup', function (req, res) {
    res.render('signup');
})

app.post('/login', function (req, res) {
    Admin.findOne({email: req.body.email})
        .then(data => {
            if (data) {
                if (data.password = req.body.password) {
                    res.redirect('quanlysanpham');
                }
            }
        });
});

app.get('/getAllJson', async (req, res) => {
    let sp = await PD.find({})
    try {
        res.send(sp);
        // res.render('users')
    } catch (e) {
        res.send('Co loi xay ra: ' + e.message)
    }
})
var PD = require('./model/sanpham')


app.get('/getAllJsonUser', async (req, res) => {
    let sp = await PD2.find({})
    try {
        res.send(sp);
        // res.render('users')
    } catch (e) {
        res.send('Co loi xay ra: ' + e.message)
    }
})
app.get('/getGioHang', async (req, res) => {
    let sp = await PD3.find({})
    try {
        res.send(sp);
        // res.render('users')
    } catch (e) {
        res.send('Co loi xay ra: ' + e.message)
    }
})
app.post('/createUser', async (req, res) => {
    let user = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        password2: req.body.password2,
    };
    let userData = await PD2.find({email: req.body.email});
    //
    if (userData.length === 0) {
        let sp = await PD2.create(user)
        try {
            res.send({status: true, user: sp});
        } catch (e) {
            res.send({status: false, msg: 'Có lỗi xảy ra: ' + e.message})
        }
    } else {
        res.send({status: false, msg: 'Tài khoản đã tồn tại'})
    }

});
// signin
app.post('/signinuser', async (req, res) => {
    let User = {
        email: req.body.email,
        password: req.body.password,
    };
    let userData = await PD2.find({email: req.body.email, password: req.body.password});
    if (userData.length === 0) {
        console.log('Đăng nhập không thành công')
    } else {
        console.log(User);
        try {
            res.send({status: true, msg: ""});
        } catch (e) {
            res.send({status: false, msg: "có lỗi xảy ra: " + e.message});
        }
    }
});
var PD2 = require('./model/user');

app.post('/addGioHang', async (req, res) => {
    const giohang = {
        theloai: req.body.theloai,
        price: req.body.price,
        image: req.body.image
    };
    console.log(giohang);
    let hangs = await PD3.create(giohang)
    try {
        res.send({status: true, giohang: hangs});
    } catch (e) {
        res.send({status: false, msg: 'Co loi xay ra: ' + e.message})
    }
});
var PD3 = require('./model/giohang');



