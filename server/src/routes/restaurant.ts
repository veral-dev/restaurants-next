import express from 'express';
const router = express.Router();
import restaurantController from '../controllers/restaurantController';
import auth from '../middleware/auth';
import { check } from 'express-validator';

// Crear restaurante
router.post(
    '/create',
    auth,
    [
        check('name', ' El nombre del restaurante es obligatorio')
            .not()
            .isEmpty(),
    ],
    restaurantController.restaurantCreate
);

//Obtener restaurantes
router.get('/', restaurantController.getRestaurants);

router.get('/:id', restaurantController.getOneRestaurant);

//Actualizar restaurante por ID
router.put(
    '/:id',
    auth,
    [
        check('name', ' El nombre del restaurante es obligatorio')
            .not()
            .isEmpty(),
    ],
    restaurantController.updateRestaurant
);

//Eliminar restaurante
router.delete('/:id', auth, restaurantController.deleteRestaurant);

module.exports = router;
