//Rutas para crear usuarios
import express from 'express';
const router = express.Router();
import auth from '../middleware/auth';
import userController from '../controllers/userController';
const { check } = require('express-validator');

//Crear un usuario
//Api/usuarios
router.post(
    '/',
    [
        check('username', 'El nombre es obligatorio').not().isEmpty(),
        check(
            'password',
            'El password debe tener mínimo 6 caracteres'
        ).isLength({ min: 6 }),
    ],
    userController.createUser
);

router.put('/add-favorite', auth, userController.addFavorite);
module.exports = router;
