import express from 'express';

const router = express.Router();

import * as authController from '../controllers/authController';
import auth from '../middleware/auth';

//Iniciar sesión
router.post('/', authController.userAuth);
//Obtiene usuario autenticado
router.get('/', auth, authController.authUser);

module.exports = router;
