const controller = require('../controller/index');
const db = require('../database/users.json')
const express = require('express');
const router = express.Router();
const multer = require("multer")
const path = require('path')



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '../public/img')) //Configuramos la carpeta donde queremos que se guarde la imagen
    },
    filename: function (req, file, cb) {
        const uniqueSuffix =
          Date.now() + "-" + Math.round(Math.random() * 1e9) + file.originalname; //le decimos que nombre queremos que tenga el archivo
        cb(null, file.fieldname + "-" + uniqueSuffix);
      },
    });
  
const upload = multer({ storage: storage });

// router.get('/', function(req,res,next) {
//     res.send('respond with a source');
// });

// router.post('/', (req, res, next) => {
//     let {name, pass} = req.body
//     let result = db.find(item => item.nombre == name && item.password == pass)
//     if (result){
//         res.send ('bienvenido')
//         req.session.Logeado = `Bienvenido`
//     } else {
//         res.send('Debes ingresar un usuario y contraseña validos, si no lo tienes registrate')
//     }
// })

router.get('/register', function(req,res,next) {
    res.render('partial/register');
});

router.get('/', controller.listUser);
router.post('/', controller.insertUser);
router.get('/', controller.updateUser);
router.get('/', controller.deleteUser);

module.exports = router;