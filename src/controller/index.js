let db = require('../database/musicando.json');
let dbUsers = require('../database/users.json')
const fs = require('fs');
const path = require("path");
const { uuid } = require("uuidv4");


// ------------- Index --------------//


const getIndex = (req, res) => {
    res.render('index');
};
const getRegistrar = (req, res) => {
    res.render('registrar');
};

// ------------- Albumes --------------//

const getAlbumes = (req, res) => {
    res.render('albumes', { musicando: db });
};

const getEditAlbum = (req, res) => {
    const id = req.params.id;
    const album = db.find((item) => item.id === id);
    res.render("editAlbum", { album: album });
};

const editAlbum = (req, res) => {
    const id = req.params.id;
    const archivo = req.file;
    const { nombre, duracion } = req.body;
    const indexAlbum = db.findIndex((item) => item.id === id);
    db[indexAlbum] = {
        id: id,
        nombre: nombre,
        duracion: duracion,
        image: `img/${archivo.filename}`,
    };
    fs.writeFileSync(
        path.join(__dirname, "../database/musicando.json"),
        JSON.stringify(db, null, 4),
        {
            encoding: "utf8",
        }
    );

    res.render('albumes', { musicando: db });
};



const regAlbum = (req, res) => {
    const archivo = req.file;
    const { nombre, duracion } = req.body;

    const album = {
        id: uuid(),
        nombre: nombre,
        duracion: duracion,
        image: `img/${archivo.filename}`,
    };
    db.push(album);
    fs.writeFileSync(
        path.join(__dirname, "../database/musicando.json"),
        JSON.stringify(db, null, 4),
        {
            encoding: "utf8",
        }
    );

    res.render('albumes', { musicando: db });
};

const deleteAlbum = (req, res) => {
    const id = req.params.id;
    db = db.filter((item) => item.id != id);
    fs.writeFileSync(
        path.join(__dirname, "../database/musicando.json"),
        JSON.stringify(db, null, 4),
        {
            encoding: "utf8",
        }
    );

    res.render('albumes', { musicando: db });
};

const getRegAlbum = (req, res) => {
    res.render('regAlbum');
};


// ------------- Canciones --------------//

const getCanciones = (req, res) => {
    res.render('canciones', { musicando: db });
};
const putCancion = (req, res) => {
    res.render('canciones');
};
const putGenero = (req, res) => {
    res.render('regGenero');
};

// ------------- Artistas --------------//

const getArtistas = (req, res) => {
    res.render('artistas', { musicando: db });
};
const putArtista = (req, res) => {
    res.render('regArtista');
};
const postArtista = (req, res) => {
    res.render('regArtista');
};

// ------------- Generos --------------//

const getGeneros = (req, res) => {
    res.render('generos', { musicando: db });
};


// ------------- Usuarios --------------//


const listUser = (req, res, next) => {
    res.render('index', { users: dbUsers })
};
const insertUser = (req, res, next) => {
    let { name, apellido, email, telefono, pass } = req.body;
    dbUsers.push({
        id: uuid(),
        name: name,
        apellido: apellido,
        email: email,
        telefono: telefono,
        pass: pass,
    });
    fs.writeFileSync(
        path.join(__dirname, "../database/users.json"),
        JSON.stringify(dbUsers, null, 4),
        { encoding: "utf8" }
    );
    res.redirect('/');
};




const updateUser = (req, res, next) => {

};
const deleteUser = (req, res, next) => {

};

module.exports = { listUser, insertUser, updateUser, deleteUser, getRegAlbum, deleteAlbum, getRegistrar, getEditAlbum, getIndex, getAlbumes, getGeneros, getArtistas, getCanciones, editAlbum, putGenero, putArtista, putCancion, postArtista, regAlbum };


