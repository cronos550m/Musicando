const express = require('express');
const controller = require('../controller/index');
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



router.get ('/', controller.getIndex)

router.get ('/artistas', controller.getArtistas)
router.get ('/regArtista', controller.putArtista)
router.post ('/regArtista', controller.postArtista) 

router.get ('/canciones', controller.getCanciones)
router.get ('/regCancion', controller.putCancion)

router.get ('/albumes', controller.getAlbumes)
router.put ('/:id', upload.single("imagen"), controller.editAlbum)
router.get ('/editAlbum/:id', controller.getEditAlbum)
router.get ('/regAlbum', controller.getRegAlbum)
router.post ('/albumes', upload.single("imagen"), controller.regAlbum) //Se le indica que se sube una imagen con el nombre imagen que es el name del formulario
router.delete('/:id', controller.deleteAlbum)

router.get ('/generos', controller.getGeneros)
router.get ('/regGenero', controller.putGenero)


module.exports = router;